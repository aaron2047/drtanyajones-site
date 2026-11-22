import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts, provider } from "@/lib/commerce";
import { AddToCart } from "@/components/Cart";
import { Gallery } from "@/components/Gallery";

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
          <AddToCart available={p.available} item={{ productId: p.id, slug: p.slug, title: p.title, price: p.price, image: p.images[0]?.url }} />
          <p className="mt-4 text-sm text-ink/60">{provider === "local" ? "Online checkout opens soon. Orders placed now go to the team as a request." : "Secure checkout. Promo codes, shipping and tax at checkout."}</p>
          <p className="mt-6 text-sm text-ink/70">Ordering for an organization? <Link href="/interactive-advocacy#inquire" className="font-semibold text-navy underline focus-ring">Request a quote</Link> for bulk orders and purchase orders.</p>
        </div>
      </section>
    </>
  );
}
