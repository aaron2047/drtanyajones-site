import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { programs } from "@/lib/programs";
import { Placeholder } from "@/components/Placeholder";

export const dynamicParams = false;
export function generateStaticParams() { return programs.map((p) => ({ slug: p.slug })); }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = programs.find((x) => x.slug === params.slug);
  return p ? { title: `${p.title} Training | Interactive Advocacy`, description: p.summary.slice(0, 155) } : {};
}

export default function Program({ params }: { params: { slug: string } }) {
  const p = programs.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const schema = { "@context": "https://schema.org", "@type": "Service", name: `${p.title} training`, serviceType: "Violence-prevention training", description: p.summary, provider: { "@type": "Organization", name: "Interactive Advocacy", url: "https://www.drtanyaojones.com/interactive-advocacy" }, areaServed: "US" };
  const others = programs.filter((x) => x.slug !== p.slug);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="bg-gradient-to-br from-gov via-navy to-teal pb-14 pt-14 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <nav aria-label="Breadcrumb" className="text-sm text-white/70"><Link href="/interactive-advocacy" className="underline focus-ring">Interactive Advocacy</Link> / Training programs</nav>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-brass">Theatrical performance-based training</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">{p.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/85">{p.summary}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1fr_320px]">
        <div className="space-y-4 text-lg text-ink/85">
          {p.detail ? <p>{p.detail}</p> : <p className="flex flex-wrap items-center gap-3 text-base"><Placeholder>Program details pending</Placeholder> The &quot;read more&quot; page for this program is broken on the current site. Format, staffing and group size are needed from Interactive Advocacy.</p>}
          <p>Each session is adapted to the host organization&apos;s audience, setting and goals, and can be delivered in person or virtually.</p>
        </div>
        <aside className="rounded-sm border border-ink/10 bg-white p-6">
          <h2 className="font-display text-xl">Performance includes</h2>
          {p.includes ? (
            <dl className="mt-4 space-y-3 text-sm">
              <div><dt className="font-semibold">Team and materials</dt><dd className="text-ink/75">{p.includes.join(" · ")}</dd></div>
              <div><dt className="font-semibold">Session</dt><dd className="text-ink/75">{p.session}</dd></div>
              <div><dt className="font-semibold">Group size</dt><dd className="text-ink/75">{p.audience}</dd></div>
            </dl>
          ) : <p className="mt-3 text-sm text-ink/70">Details on request.</p>}
          <Link href="/interactive-advocacy#inquire" className="mt-6 block rounded-sm bg-ink px-5 py-3 text-center font-semibold text-white hover:bg-navy focus-ring">Book this training</Link>
        </aside>
      </section>
      <section className="border-t border-ink/10 bg-mist py-12">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl">Other programs</h2>
          <ul className="mt-4 flex flex-wrap gap-3">{others.map((o) => <li key={o.slug}><Link href={`/interactive-advocacy/${o.slug}`} className="inline-block rounded-sm border border-navy/30 bg-white px-4 py-2 text-sm font-semibold hover:border-teal focus-ring">{o.title}</Link></li>)}</ul>
        </div>
      </section>
    </>
  );
}
