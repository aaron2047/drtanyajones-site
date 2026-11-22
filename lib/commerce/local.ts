import { products } from "../products";
import type { ShopProduct } from "./types";

// The catalog copied from the current store (Nov 2026). Used for previews and the demo.
export const localProducts = (): ShopProduct[] =>
  products.map((p) => ({
    id: p.slug, slug: p.slug, title: p.title, kind: p.kind, price: p.price, description: p.blurb,
    images: (p.images ?? (p.image ? [p.image] : [])).map((url) => ({ url, alt: p.title })), available: true,
  }));
