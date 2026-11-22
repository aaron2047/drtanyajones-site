// Shared shapes for the shop, whichever store system is behind it.
export type ShopProduct = {
  id: string; // what the cart needs: Wix product id, Shopify variant id, or the local slug
  slug: string;
  title: string;
  kind: string;
  price: string;
  description?: string;
  images: { url: string; alt: string }[];
  available: boolean;
};

export type CartLine = { id: string; productId: string; slug?: string; title: string; qty: number; price: string; image?: string };
export type Cart = { lines: CartLine[]; subtotal: string; count: number };
export const emptyCart: Cart = { lines: [], subtotal: "$0.00", count: 0 };

export type Provider = "wix" | "shopify" | "local";
