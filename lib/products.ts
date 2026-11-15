// Source: interactiveadvocacy.com store, as shown Nov 2026. Prices and descriptions must be confirmed before launch.
export type Product = { slug: string; title: string; kind: "Book" | "Training tool"; price: string; blurb?: string; image: string };
export const products: Product[] = [
  { slug: "moguls-unleashed", title: "Moguls Unleashed: Secrets of Business Brilliance", kind: "Book", price: "$20.00", image: "/images/product-moguls-unleashed.jpg", blurb: "An anthology on entrepreneurship with contributions from business leaders. Cover credits and authorship to be confirmed." },
  { slug: "sisters-in-arms", title: "Sisters in Arms", kind: "Book", price: "$20.00", image: "/images/product-sisters-in-arms.jpg" },
  { slug: "hot-topic-isb-toolkit", title: "HOT TOPIC ISB Toolkit", kind: "Training tool", price: "$1,700.00", image: "/images/product-hot-topic-isb-toolkit.jpg" },
  { slug: "tingo-lets-talk-about-it", title: "TINGO™ Let's Talk About It (Healthy Relationships)", kind: "Training tool", price: "$699.00", image: "/images/product-tingo-lets-talk-about-it.jpg" },
  { slug: "hot-topic-isb-training-tool", title: "HOT TOPIC ISB Training Tool", kind: "Training tool", price: "$299.99", image: "/images/product-hot-topic-isb-training-tool.jpg" },
  { slug: "hot-topic-isb-workbooks", title: "HOT TOPIC ISB Workbooks", kind: "Training tool", price: "$105.00", image: "/images/product-hot-topic-isb-workbooks.jpg" },
  { slug: "the-black-box", title: "THE BLACK BOX", kind: "Training tool", price: "$75.00", image: "/images/product-the-black-box.jpg" },
];
