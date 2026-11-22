import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts, shopifyOn } from "@/lib/commerce";
import { Gallery } from "@/components/Gallery";
import { buyNow } from "../actions";

export const revalidate = 300;
export async function generateStaticParams() { return (await getProducts()).map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getProduct(params.slug);
  return p ? { title: `${p.title} | Interactive Advocacy Shop`, description: (p.description || `${p.title}, ${p.price}.`).slice(0, 155) } : {};
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const p = await getProduct(params.slug);
  if (!p) notFound();
  const amount = p.price.replace(/[^0-9.]/g, "");
  const schema = { "@context": "https://schema.org", "@type": "Product", name: p.title, image: p.images.map((i) => i.url), description: p.description, brand: { "@type": "Organization", name: "Interactive Advocacy" }, offers: { "@type": "Offer", price: amount, priceCurrency: "USD", availability: p.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" } };
  const canBuy = shopifyOn && p.variantId && p.available;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mx-auto max-w-6xl px-6 pt-8 text-sm text-ink/60">
        <nav aria-label="Breadcrumb"><Link href="/interactive-advocacy" className="underline focus-ring">Interactive Advocacy</Link> / <Link href="/interactive-advocacy/shop" className="underline focus-ring">Shop</Link> / {p.kind}</nav>
      </div>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-8 md:grid-cols-[1.1fr_1fr]">
        <Gallery images={p.images} title={p.title} />
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brass">{p.kind}</p>
          <h1 className="mt-2 font-display text-3xl md:text-4xl">{p.title}</h1>
          <p className="mt-3 text-2xl font-semibold text-gov">{p.price}</p>
          {p.description && <p className="mt-5 text-ink/80">{p.description}</p>}
          {canBuy ? (
            <form action={buyNow} className="mt-8 flex flex-wrap items-end gap-4">
              <input type="hidden" name="variantId" value={p.variantId} />
              <label className="text-sm font-semibold">Quantity<input name="quantity" type="number" min={1} max={50} defaultValue={1} className="mt-1 block w-24 rounded-sm border border-ink/20 px-3 py-2" /></label>
              <button type="submit" className="min-h-[48px] rounded-sm bg-ink px-8 font-semibold text-white hover:bg-navy focus-ring">Buy now</button>
            </form>
          ) : (
            <Link href="/interactive-advocacy#inquire" className="mt-8 inline-flex min-h-[48px] items-center rounded-sm bg-ink px-8 font-semibold text-white hover:bg-navy focus-ring">{p.available ? "Request this item" : "Ask about availability"}</Link>
          )}
          <p className="mt-4 text-sm text-ink/60">{canBuy ? "Secure checkout by Shopify." : "Online checkout opens soon. Send a request and the team will follow up."}</p>
          <p className="mt-6 text-sm text-ink/70">Ordering for an organization? <Link href="/interactive-advocacy#inquire" className="font-semibold text-navy underline focus-ring">Request a quote</Link> for bulk orders and purchase orders.</p>
        </div>
      </section>
    </>
  );
}
