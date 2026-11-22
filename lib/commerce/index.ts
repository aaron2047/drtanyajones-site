import type { Provider, ShopProduct } from "./types";
import { localProducts } from "./local";

// Which store runs the shop. COMMERCE_PROVIDER=wix (default plan), shopify (alternative) or empty for the local preview catalog.
export const provider: Provider = (process.env.COMMERCE_PROVIDER as Provider) || "local";

export async function getProducts(): Promise<ShopProduct[]> {
  if (provider === "wix") return (await import("./wix")).products();
  if (provider === "shopify") return (await import("./shopify")).products();
  return localProducts();
}
export async function getProduct(slug: string): Promise<ShopProduct | undefined> {
  if (provider === "wix") return (await import("./wix")).product(slug);
  if (provider === "shopify") return (await import("./shopify")).product(slug);
  return localProducts().find((p) => p.slug === slug);
}
export type { ShopProduct } from "./types";
