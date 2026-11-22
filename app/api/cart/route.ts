import { NextRequest, NextResponse } from "next/server";
import { provider } from "@/lib/commerce";
import { emptyCart } from "@/lib/commerce/types";

// One cart endpoint for the site. The browser never sees store tokens: they live in httpOnly cookies.
// GET → cart. POST {action: "add", productId, qty} | {action: "qty", lineId, qty} | {action: "checkout"} → cart or {url}.
export const dynamic = "force-dynamic";
const COOKIE = { httpOnly: true, sameSite: "lax" as const, secure: true, path: "/", maxAge: 60 * 60 * 24 * 30 };

export async function GET(req: NextRequest) { return handle(req, { action: "get" }); }
export async function POST(req: NextRequest) { return handle(req, await req.json()); }

async function handle(req: NextRequest, body: { action: string; productId?: string; lineId?: string; qty?: number }) {
  const qty = Math.min(Math.max(Math.trunc(Number(body.qty ?? 1)), 0), 99);
  try {
    if (provider === "wix") {
      const wix = await import("@/lib/commerce/wix");
      const raw = req.cookies.get("wix_tokens")?.value;
      const tokens = await wix.visitorTokens(raw ? JSON.parse(raw) : undefined);
      let out: { cart: unknown; tokens: unknown; url?: string };
      if (body.action === "add" && body.productId) out = await wix.addLine(tokens, body.productId, Math.max(qty, 1));
      else if (body.action === "qty" && body.lineId) out = await wix.setQty(tokens, body.lineId, qty);
      else if (body.action === "checkout") out = { cart: null, tokens, url: await wix.checkout(tokens, new URL("/interactive-advocacy/shop?order=complete", req.url).toString()) };
      else out = await wix.getCart(tokens);
      const res = NextResponse.json(out.url ? { url: out.url } : out.cart);
      res.cookies.set("wix_tokens", JSON.stringify(out.tokens), COOKIE);
      return res;
    }
    if (provider === "shopify") {
      const shop = await import("@/lib/commerce/shopify");
      const id = req.cookies.get("shopify_cart")?.value;
      let cart;
      if (body.action === "add" && body.productId) cart = await shop.addLine(id, body.productId, Math.max(qty, 1));
      else if (body.action === "qty" && body.lineId && id) cart = await shop.setQty(id, body.lineId, qty);
      else cart = await shop.getCart(id);
      if (body.action === "checkout") return NextResponse.json({ url: cart.checkoutUrl });
      const { checkoutUrl: _c, cartId, ...rest } = cart;
      const res = NextResponse.json(rest);
      if (cartId) res.cookies.set("shopify_cart", cartId, COOKIE);
      return res;
    }
    return NextResponse.json(emptyCart); // local preview keeps the cart in the browser
  } catch (e) {
    console.error("cart", e);
    return NextResponse.json({ error: "The cart is unavailable right now. Please try again, or request a quote." }, { status: 502 });
  }
}
