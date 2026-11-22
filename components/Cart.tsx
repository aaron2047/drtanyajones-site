"use client";
import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { emptyCart, type Cart, type CartLine } from "@/lib/commerce/types";

// The cart drawer. With a store connected (NEXT_PUBLIC_COMMERCE = wix or shopify) the cart lives in that store,
// through /api/cart. Without one (preview and demo), it lives in this browser and "checkout" becomes an order request.
const mode = process.env.NEXT_PUBLIC_COMMERCE || "local";
const KEY = "ia-cart";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

type Add = { productId: string; slug: string; title: string; price: string; image?: string; qty: number };
type Ctx = { cart: Cart; open: boolean; busy: boolean; error: string; setOpen: (o: boolean) => void; add: (a: Add) => Promise<void>; setQty: (l: CartLine, q: number) => Promise<void>; checkout: () => Promise<void> };
const CartCtx = createContext<Ctx | null>(null);
export const useCart = () => useContext(CartCtx)!;

const toNum = (p: string) => Number(p.replace(/[^0-9.]/g, "")) || 0;
const usd = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
function localCart(lines: CartLine[]): Cart {
  return { lines, count: lines.reduce((n, l) => n + l.qty, 0), subtotal: usd(lines.reduce((n, l) => n + toNum(l.price) * l.qty, 0)) };
}
function readLocal(): CartLine[] { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } }
function writeLocal(lines: CartLine[]) { try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch { /* storage off */ } }

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>(emptyCart);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const api = useCallback(async (body?: object) => {
    const res = await fetch(`${BASE}/api/cart`, body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : {});
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "The cart is unavailable right now.");
    return json;
  }, []);

  useEffect(() => {
    if (mode === "local") setCart(localCart(readLocal()));
    else api().then(setCart).catch(() => {});
  }, [api]);

  const run = async (fn: () => Promise<void>) => { setBusy(true); setError(""); try { await fn(); } catch (e) { setError((e as Error).message); } finally { setBusy(false); } };

  const add = (a: Add) => run(async () => {
    if (mode === "local") {
      const lines = readLocal();
      const hit = lines.find((l) => l.productId === a.productId);
      const next = hit ? lines.map((l) => (l === hit ? { ...l, qty: Math.min(l.qty + a.qty, 99) } : l)) : [...lines, { id: a.productId, productId: a.productId, slug: a.slug, title: a.title, price: a.price, image: a.image, qty: a.qty }];
      writeLocal(next); setCart(localCart(next));
    } else setCart(await api({ action: "add", productId: a.productId, qty: a.qty }));
    setOpen(true);
  });

  const setQty = (l: CartLine, q: number) => run(async () => {
    if (mode === "local") {
      const next = readLocal().map((x) => (x.id === l.id ? { ...x, qty: q } : x)).filter((x) => x.qty > 0);
      writeLocal(next); setCart(localCart(next));
    } else setCart(await api({ action: "qty", lineId: l.id, qty: q }));
  });

  const checkout = () => run(async () => {
    if (mode === "local") {
      const summary = readLocal().map((l) => `${l.qty} × ${l.title} (${l.price})`).join("\n");
      try { sessionStorage.setItem("order-request", `Order request:\n${summary}\nSubtotal: ${localCart(readLocal()).subtotal}`); } catch { /* ignore */ }
      setOpen(false);
      window.location.href = `${BASE}/interactive-advocacy/#inquire`;
      return;
    }
    const { url } = await api({ action: "checkout" });
    window.location.href = url;
  });

  return <CartCtx.Provider value={{ cart, open, busy, error, setOpen, add, setQty, checkout }}>{children}<CartDrawer /></CartCtx.Provider>;
}

export function CartButton({ className = "" }: { className?: string }) {
  const { cart, setOpen } = useCart();
  if (!cart.count) return null;
  return (
    <button type="button" onClick={() => setOpen(true)} className={`cart-btn inline-flex min-h-[44px] items-center gap-2 rounded-sm border border-gov/30 px-3 text-sm font-semibold focus-ring ${className}`} aria-label={`Cart, ${cart.count} item${cart.count === 1 ? "" : "s"}`}>
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" /><circle cx="10" cy="20" r="1.3" /><circle cx="17" cy="20" r="1.3" /></svg>
      <span>{cart.count}</span>
    </button>
  );
}

export function AddToCart({ item, available = true }: { item: Omit<Add, "qty">; available?: boolean }) {
  const { add, busy, error } = useCart();
  const [qty, setQ] = useState(1);
  if (!available) return <Link href="/interactive-advocacy#inquire" className="mt-8 inline-flex min-h-[48px] items-center rounded-sm bg-ink px-8 font-semibold text-white focus-ring">Ask about availability</Link>;
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-end gap-4">
        <label className="text-sm font-semibold">Quantity
          <input type="number" min={1} max={99} value={qty} onChange={(e) => setQ(Math.min(Math.max(Number(e.target.value) || 1, 1), 99))} className="mt-1 block w-24 rounded-sm border border-ink/20 px-3 py-2" />
        </label>
        <button type="button" disabled={busy} onClick={() => add({ ...item, qty })} className="min-h-[48px] rounded-sm bg-ink px-8 font-semibold text-white hover:bg-navy disabled:opacity-60 focus-ring">{busy ? "Adding…" : "Add to cart"}</button>
      </div>
      {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
    </div>
  );
}

function CartDrawer() {
  const { cart, open, busy, error, setOpen, setQty, checkout } = useCart();
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open, setOpen]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-gov/60" onClick={() => setOpen(false)} aria-hidden />
      <div ref={panel} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Cart" className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-xl outline-none">
        <div className="flex items-center justify-between bg-gov px-5 py-4 text-white">
          <h2 className="font-display text-xl">Cart <span className="text-sm text-white/70">({cart.count} item{cart.count === 1 ? "" : "s"})</span></h2>
          <button type="button" onClick={() => setOpen(false)} className="min-h-[44px] rounded-sm border border-white/40 px-3 text-sm font-semibold focus-ring">Close</button>
        </div>
        <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-5">
          {cart.lines.length === 0 && <li className="py-8 text-ink/70">Your cart is empty.</li>}
          {cart.lines.map((l) => (
            <li key={l.id} className="grid grid-cols-[64px_1fr_auto] gap-4 py-4">
              {l.image
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={l.image.startsWith("/") ? BASE + l.image : l.image} alt="" className="h-16 w-16 rounded-sm border border-ink/10 object-cover" />
                : <span className="h-16 w-16 rounded-sm bg-mist" />}
              <div>
                <p className="font-semibold leading-snug">{l.title}</p>
                <div className="mt-2 inline-flex items-center rounded-sm border border-ink/20">
                  <button type="button" disabled={busy} onClick={() => setQty(l, l.qty - 1)} className="h-9 w-9 focus-ring" aria-label={`One fewer ${l.title}`}>−</button>
                  <span className="w-8 text-center text-sm" aria-live="polite">{l.qty}</span>
                  <button type="button" disabled={busy} onClick={() => setQty(l, l.qty + 1)} className="h-9 w-9 focus-ring" aria-label={`One more ${l.title}`}>+</button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{mode === "local" ? usd(toNum(l.price) * l.qty) : l.price}</p>
                <button type="button" disabled={busy} onClick={() => setQty(l, 0)} className="mt-2 text-sm text-ink/60 underline focus-ring">Remove<span className="sr-only"> {l.title}</span></button>
              </div>
            </li>
          ))}
        </ul>
        <div className="border-t border-ink/10 px-5 py-5">
          <div className="flex justify-between text-lg"><span>Subtotal</span><span className="font-semibold">{cart.subtotal}</span></div>
          <p className="mt-1 text-sm text-ink/60">{mode === "local" ? "Online checkout opens soon. Sending the order creates a request the team follows up on." : "Promo codes, shipping and tax at checkout."}</p>
          {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
          <button type="button" disabled={busy || !cart.count} onClick={checkout} className="mt-4 min-h-[48px] w-full rounded-sm bg-brass font-semibold text-gov hover:bg-gov hover:text-white disabled:opacity-50 focus-ring">{mode === "local" ? "Send order request" : "Checkout"}</button>
        </div>
      </div>
    </div>
  );
}
