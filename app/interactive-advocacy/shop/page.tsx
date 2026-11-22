import type { Metadata } from "next";
import Link from "next/link";
import { getProducts, shopifyOn, type ShopProduct } from "@/lib/commerce";
import { Placeholder } from "@/components/Placeholder";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Shop: Training Tools, Books and Merch | Interactive Advocacy",
  description: "THIS IS NOT A GAME™ training tools, HOT TOPIC© kits, books and Awareness Vibes merch from Interactive Advocacy.",
};

const groups = [
  { kind: "Training tool", title: "Training tools", note: "THIS IS NOT A GAME™: interactive training tools that build critical thinking and problem solving, for any learning environment or use at home with families." },
  { kind: "Book", title: "Books", note: "" },
  { kind: "Merch", title: "Awareness Vibes merch", note: "Created to raise public awareness of toxic behaviors that impact our communities. For the free-thinking, independent, responsive and empowered (FIRE) bystander: don't just stand there; be your unstoppable self." },
];

function Card({ p }: { p: ShopProduct }) {
  const img = p.images[0];
  return (
    <li className="flex flex-col overflow-hidden rounded-sm border border-ink/10 bg-white">
      <Link href={`/interactive-advocacy/shop/${p.slug}`} className="block focus-ring" tabIndex={-1} aria-hidden>
        {img
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={img.url} alt="" loading="lazy" className="aspect-square w-full object-contain" />
          : <div className="flex aspect-square w-full items-center justify-center bg-mist text-sm text-ink/50">Photo coming soon</div>}
      </Link>
      <div className="flex flex-1 flex-col border-t border-ink/10 p-4">
        <h3 className="font-display text-lg leading-snug"><Link href={`/interactive-advocacy/shop/${p.slug}`} className="hover:text-teal focus-ring">{p.title}</Link></h3>
        <p className="mt-auto pt-3 font-semibold text-gov">{p.price}</p>
      </div>
    </li>
  );
}

export default async function Shop() {
  const all = await getProducts();
  return (
    <>
      <section className="bg-gradient-to-br from-gov via-navy to-teal pb-12 pt-12 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <nav aria-label="Breadcrumb" className="text-sm text-white/70"><Link href="/interactive-advocacy" className="underline focus-ring">Interactive Advocacy</Link> / Shop</nav>
          <h1 className="mt-4 font-display text-4xl md:text-5xl">Shop</h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">Training tools, books and advocacy gear from Interactive Advocacy.</p>
          <ul className="mt-6 flex flex-wrap gap-2 text-sm">{groups.map((g) => <li key={g.kind}><a href={`#${g.kind.replace(" ", "-").toLowerCase()}`} className="inline-block rounded-sm border border-white/40 px-3 py-1 hover:bg-white/10 focus-ring">{g.title}</a></li>)}</ul>
        </div>
      </section>
      {!shopifyOn && <p className="mx-auto mt-6 flex max-w-6xl flex-wrap items-center gap-3 px-6 text-sm text-ink/70"><Placeholder>Preview catalog</Placeholder> Prices from the current store, Nov 2026. Checkout turns on when the Shopify store is connected.</p>}
      {groups.map((g) => {
        const list = all.filter((p) => p.kind === g.kind);
        if (!list.length) return null;
        return (
          <section key={g.kind} id={g.kind.replace(" ", "-").toLowerCase()} className="mx-auto max-w-6xl scroll-mt-8 px-6 py-10">
            <h2 className="font-display text-3xl text-gov">{g.title}</h2>
            {g.note && <p className="mt-2 max-w-3xl text-ink/75">{g.note}</p>}
            <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{list.map((p) => <Card key={p.slug} p={p} />)}</ul>
          </section>
        );
      })}
      <section className="border-t border-ink/10 bg-cream py-10">
        <div className="mx-auto max-w-6xl px-6 text-ink/80">
          <h2 className="font-display text-2xl">Ordering for an organization?</h2>
          <p className="mt-2 max-w-3xl">Bulk orders, purchase orders and training-tool bundles go through a quote. <Link href="/interactive-advocacy#inquire" className="font-semibold text-navy underline focus-ring">Request a quote</Link></p>
        </div>
      </section>
    </>
  );
}
