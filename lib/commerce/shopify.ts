import type { Cart, ShopProduct } from "./types";

// Shopify Headless channel → Storefront API. Needs SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_TOKEN.
const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_TOKEN;

async function sf<T>(query: string, variables: Record<string, unknown> = {}, cache = true): Promise<T> {
  const res = await fetch(`https://${domain}/api/2025-10/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": token! },
    body: JSON.stringify({ query, variables }),
    ...(cache ? { next: { revalidate: 300 } } : { cache: "no-store" as const }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data as T;
}

const money = (a: string, c = "USD") => new Intl.NumberFormat("en-US", { style: "currency", currency: c }).format(Number(a));

type PNode = {
  handle: string; title: string; productType: string; description: string; availableForSale: boolean;
  images: { nodes: { url: string; altText: string | null }[] };
  variants: { nodes: { id: string; price: { amount: string; currencyCode: string } }[] };
};
const P = `handle title productType description availableForSale images(first: 10) { nodes { url altText } } variants(first: 1) { nodes { id price { amount currencyCode } } }`;
const toProduct = (n: PNode): ShopProduct => ({
  id: n.variants.nodes[0]?.id ?? "", slug: n.handle, title: n.title, kind: n.productType || "Product", description: n.description,
  price: n.variants.nodes[0] ? money(n.variants.nodes[0].price.amount, n.variants.nodes[0].price.currencyCode) : "",
  images: n.images.nodes.map((i) => ({ url: i.url, alt: i.altText || n.title })), available: n.availableForSale,
});

export async function products(): Promise<ShopProduct[]> {
  const d = await sf<{ products: { nodes: PNode[] } }>(`{ products(first: 100, sortKey: TITLE) { nodes { ${P} } } }`);
  return d.products.nodes.map(toProduct);
}
export async function product(slug: string) {
  const d = await sf<{ product: PNode | null }>(`query($h: String!) { product(handle: $h) { ${P} } }`, { h: slug });
  return d.product ? toProduct(d.product) : undefined;
}

// Cart: Shopify keeps it; we keep its id in a cookie.
const C = `id checkoutUrl totalQuantity cost { subtotalAmount { amount currencyCode } }
  lines(first: 100) { nodes { id quantity cost { totalAmount { amount currencyCode } }
    merchandise { ... on ProductVariant { id image { url } product { title handle } } } } }`;
type CNode = {
  id: string; checkoutUrl: string; totalQuantity: number; cost: { subtotalAmount: { amount: string; currencyCode: string } };
  lines: { nodes: { id: string; quantity: number; cost: { totalAmount: { amount: string; currencyCode: string } }; merchandise: { id: string; image: { url: string } | null; product: { title: string; handle: string } } }[] };
};
const toCart = (c: CNode | null): Cart & { checkoutUrl?: string; cartId?: string } =>
  !c ? { lines: [], subtotal: "$0.00", count: 0 } : {
    cartId: c.id, checkoutUrl: c.checkoutUrl, count: c.totalQuantity, subtotal: money(c.cost.subtotalAmount.amount, c.cost.subtotalAmount.currencyCode),
    lines: c.lines.nodes.map((l) => ({ id: l.id, productId: l.merchandise.id, slug: l.merchandise.product.handle, title: l.merchandise.product.title, qty: l.quantity, price: money(l.cost.totalAmount.amount, l.cost.totalAmount.currencyCode), image: l.merchandise.image?.url })),
  };

export async function getCart(cartId?: string) {
  if (!cartId) return toCart(null);
  const d = await sf<{ cart: CNode | null }>(`query($id: ID!) { cart(id: $id) { ${C} } }`, { id: cartId }, false);
  return toCart(d.cart);
}
export async function addLine(cartId: string | undefined, productId: string, qty: number) {
  if (!cartId) {
    const d = await sf<{ cartCreate: { cart: CNode } }>(`mutation($l: [CartLineInput!]!) { cartCreate(input: { lines: $l }) { cart { ${C} } } }`, { l: [{ merchandiseId: productId, quantity: qty }] }, false);
    return toCart(d.cartCreate.cart);
  }
  const d = await sf<{ cartLinesAdd: { cart: CNode } }>(`mutation($id: ID!, $l: [CartLineInput!]!) { cartLinesAdd(cartId: $id, lines: $l) { cart { ${C} } } }`, { id: cartId, l: [{ merchandiseId: productId, quantity: qty }] }, false);
  return toCart(d.cartLinesAdd.cart);
}
export async function setQty(cartId: string, lineId: string, qty: number) {
  if (qty <= 0) {
    const d = await sf<{ cartLinesRemove: { cart: CNode } }>(`mutation($id: ID!, $l: [ID!]!) { cartLinesRemove(cartId: $id, lineIds: $l) { cart { ${C} } } }`, { id: cartId, l: [lineId] }, false);
    return toCart(d.cartLinesRemove.cart);
  }
  const d = await sf<{ cartLinesUpdate: { cart: CNode } }>(`mutation($id: ID!, $l: [CartLineUpdateInput!]!) { cartLinesUpdate(cartId: $id, lines: $l) { cart { ${C} } } }`, { id: cartId, l: [{ id: lineId, quantity: qty }] }, false);
  return toCart(d.cartLinesUpdate.cart);
}
