import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";
import { products } from "@/lib/products";

export const metadata: Metadata = { title: "Shop | Dr. Tanya O. Jones", description: "Books and advocacy-inspired gear from Dr. Tanya O. Jones." };

export default function Shop() {
  return (
    <>
      <PageHero eyebrow="Shop" title="Books and advocacy-inspired gear." sub="Preview of the store. Prices, formats and checkout are placeholders until product details and the payee entity are confirmed." />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <ul className="grid gap-8 md:grid-cols-3">
          {products.map((p) => (
            <li key={p.slug} className="flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white">
              <div className="flex aspect-[4/5] items-start bg-gradient-to-br from-navy to-ink p-4"><Placeholder>Cover image pending</Placeholder></div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-brass">{p.kind}</p>
                <h2 className="mt-1 font-display text-xl">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm text-ink/75">{p.blurb}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm">{p.price ?? <Placeholder>Price pending</Placeholder>}</span>
                  <button disabled className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white opacity-50" aria-disabled>Buy (checkout pending)</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-sm text-ink/70">Today these products are sold on interactiveadvocacy.com. The rebuild moves checkout to Shopify once the paying entity, prices and fulfillment are confirmed.</p>
      </section>
    </>
  );
}
