// Source: current drtanyaojones.com/shop. Prices, formats and descriptions are not published there: all placeholders.
export type Product = { slug: string; title: string; kind: "Book" | "Gear" | "Other"; price?: string; format?: string; blurb: string; buyUrl?: string };
export const products: Product[] = [
  { slug: "mogul-unleashed", title: "Mogul Unleashed", kind: "Book", blurb: "Description pending from Dr. Jones.", buyUrl: undefined },
  { slug: "sisters-in-arms", title: "Sisters in Arms", kind: "Other", blurb: "Description pending from Dr. Jones.", buyUrl: undefined },
];
