import { products as local } from "./products";

// One product shape for the site, whether it comes from Shopify or the local list.
// Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_TOKEN (Headless channel) and the shop reads from Shopify;
// leave them empty and it shows the local list with "Request this item" in place of checkout.
export type ShopProduct = {
  slug: string;
  title: string;
  kind: string;
  price: string;
  description?: string;
  images: { url: string; alt: string }[];
  variantId?: string;
  available: boolean;
};

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_TOKEN;
export const shopifyOn = Boolean(domain && token);

async function storefront<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(`https://${domain}/api/2025-10/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": token! },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300 },
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data as T;
}

type SNode = {
  handle: string; title: string; productType: string; description: string; availableForSale: boolean;
  images: { nodes: { url: string; altText: string | null }[] };
  variants: { nodes: { id: string; price: { amount: string; currencyCode: string } }[] };
};
const FIELDS = `handle title productType description availableForSale
  images(first: 10) { nodes { url altText } }
  variants(first: 1) { nodes { id price { amount currencyCode } } }`;

const money = (a: string, c: string) => new Intl.NumberFormat("en-US", { style: "currency", currency: c }).format(Number(a));
const fromShopify = (n: SNode): ShopProduct => ({
  slug: n.handle, title: n.title, kind: n.productType || "Product", description: n.description,
  price: n.variants.nodes[0] ? money(n.variants.nodes[0].price.amount, n.variants.nodes[0].price.currencyCode) : "",
  images: n.images.nodes.map((i) => ({ url: i.url, alt: i.altText || n.title })),
  variantId: n.variants.nodes[0]?.id, available: n.availableForSale,
});
const fromLocal = (p: (typeof local)[number]): ShopProduct => ({
  slug: p.slug, title: p.title, kind: p.kind, price: p.price, description: p.blurb,
  images: (p.images ?? (p.image ? [p.image] : [])).map((url) => ({ url, alt: p.title })), available: true,
});

export async function getProducts(): Promise<ShopProduct[]> {
  if (!shopifyOn) return local.map(fromLocal);
  const d = await storefront<{ products: { nodes: SNode[] } }>(`{ products(first: 100, sortKey: TITLE) { nodes { ${FIELDS} } } }`);
  return d.products.nodes.map(fromShopify);
}

export async function getProduct(slug: string): Promise<ShopProduct | undefined> {
  if (!shopifyOn) { const p = local.find((x) => x.slug === slug); return p && fromLocal(p); }
  const d = await storefront<{ product: SNode | null }>(`query($h: String!) { product(handle: $h) { ${FIELDS} } }`, { h: slug });
  return d.product ? fromShopify(d.product) : undefined;
}

// Creates a Shopify cart with this item and returns Shopify's hosted checkout address.
export async function checkoutUrl(variantId: string, quantity: number): Promise<string> {
  const d = await storefront<{ cartCreate: { cart: { checkoutUrl: string } | null; userErrors: { message: string }[] } }>(
    `mutation($lines: [CartLineInput!]!) { cartCreate(input: { lines: $lines }) { cart { checkoutUrl } userErrors { message } } }`,
    { lines: [{ merchandiseId: variantId, quantity }] },
  );
  if (!d.cartCreate.cart) throw new Error(d.cartCreate.userErrors.map((e) => e.message).join("; "));
  return d.cartCreate.cart.checkoutUrl;
}
