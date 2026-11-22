/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient, OAuthStrategy } from "@wix/sdk";
import { products as wixProducts, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import { redirects } from "@wix/redirects";
import type { Cart, ShopProduct } from "./types";

// Wix Headless: the products, cart and checkout stay in Interactive Advocacy's existing Wix Store.
// Setup: in the Wix dashboard, Settings → Headless Settings → create an OAuth app, add drtanyaojones.com as an
// allowed redirect domain, and put its client ID in WIX_CLIENT_ID. Written against the Wix Stores V1 catalog API;
// if the store has been moved to Catalog V3, the product queries need the productsV3 module instead.
const clientId = process.env.WIX_CLIENT_ID!;
const STORES_APP_ID = "215238eb-22a5-4c36-9e7b-e7c08025e04e"; // Wix Stores, for cart catalog references

export type WixTokens = { accessToken: any; refreshToken: any };
const client = (tokens?: WixTokens) =>
  createClient({ modules: { wixProducts, collections, currentCart, redirects }, auth: OAuthStrategy({ clientId, tokens }) });

// Visitor tokens identify one shopper's cart; the cart API route keeps them in an httpOnly cookie.
export async function visitorTokens(existing?: WixTokens): Promise<WixTokens> {
  if (existing?.refreshToken) return existing;
  return (await client().auth.generateVisitorTokens()) as WixTokens;
}
export const tokensOf = (c: ReturnType<typeof client>) => c.auth.getTokens() as WixTokens;

const stripHtml = (s?: string) => (s || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

let kinds: Map<string, string> | undefined;
async function collectionNames() {
  if (kinds) return kinds;
  const res: any = await client().collections.queryCollections().limit(100).find();
  kinds = new Map(res.items.map((c: any) => [c._id, c.name]));
  return kinds;
}
// Groups on the site follow the Wix collection names: "Training tools", "Books", "Merch" map to the shop's sections.
const kindFrom = (names: string[]) =>
  names.find((n) => /train/i.test(n)) ? "Training tool" : names.find((n) => /book/i.test(n)) ? "Book" : names.find((n) => /merch|apparel|vibes/i.test(n)) ? "Merch" : names[0] || "Product";

const toProduct = (p: any, names: Map<string, string>): ShopProduct => ({
  id: p._id, slug: p.slug, title: p.name,
  kind: kindFrom((p.collectionIds || []).map((id: string) => names.get(id)).filter(Boolean)),
  price: p.priceData?.formatted?.price ?? p.price?.formatted?.price ?? "",
  description: stripHtml(p.description),
  images: ((p.media?.items as any[]) || []).filter((m) => m.image?.url).map((m) => ({ url: m.image.url, alt: m.image.altText || p.name })),
  available: p.stock?.inStock !== false,
});

export async function products(): Promise<ShopProduct[]> {
  const [res, names]: [any, Map<string, string>] = await Promise.all([client().wixProducts.queryProducts().limit(100).find(), collectionNames()]);
  return res.items.filter((p: any) => p.visible !== false).map((p: any) => toProduct(p, names));
}
export async function product(slug: string) {
  const [res, names]: [any, Map<string, string>] = await Promise.all([client().wixProducts.queryProducts().eq("slug", slug).limit(1).find(), collectionNames()]);
  return res.items[0] ? toProduct(res.items[0], names) : undefined;
}

const toCart = (c: any): Cart =>
  !c ? { lines: [], subtotal: "$0.00", count: 0 } : {
    count: (c.lineItems || []).reduce((n: number, l: any) => n + (l.quantity || 0), 0),
    subtotal: c.subtotal?.formattedAmount ?? "",
    lines: (c.lineItems || []).map((l: any) => ({
      id: l._id, productId: l.catalogReference?.catalogItemId, title: l.productName?.translated || l.productName?.original,
      qty: l.quantity, price: l.price?.formattedAmount ?? "", image: l.image ? wixImage(l.image) : undefined,
    })),
  };
// Cart images come back as wix:image:// references; turn them into a web address.
function wixImage(ref: string) {
  const m = /wix:image:\/\/v1\/([^/]+)\//.exec(ref);
  return m ? `https://static.wixstatic.com/media/${m[1]}` : ref;
}

export async function getCart(tokens: WixTokens) {
  const c = client(tokens);
  try { return { cart: toCart(await c.currentCart.getCurrentCart()), tokens: tokensOf(c) }; }
  catch { return { cart: toCart(null), tokens: tokensOf(c) }; } // no cart yet
}
export async function addLine(tokens: WixTokens, productId: string, qty: number) {
  const c = client(tokens);
  const r: any = await c.currentCart.addToCurrentCart({ lineItems: [{ catalogReference: { appId: STORES_APP_ID, catalogItemId: productId }, quantity: qty }] });
  return { cart: toCart(r.cart), tokens: tokensOf(c) };
}
export async function setQty(tokens: WixTokens, lineId: string, qty: number) {
  const c = client(tokens);
  const r: any = qty <= 0
    ? await c.currentCart.removeLineItemsFromCurrentCart([lineId])
    : await c.currentCart.updateCurrentCartLineItemQuantity([{ _id: lineId, quantity: qty }]);
  return { cart: toCart(r.cart), tokens: tokensOf(c) };
}
// Checkout happens on Wix's hosted checkout page (promo codes, shipping, tax, payment), then returns to the site.
export async function checkout(tokens: WixTokens, returnUrl: string) {
  const c = client(tokens);
  const { checkoutId }: any = await c.currentCart.createCheckoutFromCurrentCart({ channelType: "WEB" as any });
  const { redirectSession }: any = await c.redirects.createRedirectSession({ ecomCheckout: { checkoutId }, callbacks: { postFlowUrl: returnUrl } });
  return redirectSession.fullUrl as string;
}
