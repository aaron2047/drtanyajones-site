import type { Metadata } from "next";
import Link from "next/link";
import { leadership, facilitators, network, type Member } from "@/lib/team";
import { Placeholder } from "@/components/Placeholder";

export const metadata: Metadata = {
  title: "Our Team | Interactive Advocacy",
  description: "Interactive Advocacy's leadership and lead facilitators: military sexual assault prevention, social work, self-defense, trafficking prevention and resiliency training.",
};

const initials = (n: string) => n.replace(/^Dr\. /, "").split(/[ ,]+/).slice(0, 2).map((w) => w[0]).join("");

function Card({ m }: { m: Member }) {
  return (
    <li className="flex flex-col overflow-hidden rounded-sm border border-ink/10 bg-white">
      {m.photo
        // eslint-disable-next-line @next/next/no-img-element
        ? <img src={m.photo} alt={m.name} loading="lazy" className="aspect-[4/5] w-full object-cover object-top grayscale" />
        : <div aria-hidden className="flex aspect-[4/5] w-full items-center justify-center bg-mist font-display text-5xl text-gov/40">{initials(m.name)}</div>}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brass">{m.role}</p>
        <h3 className="mt-2 font-display text-xl leading-snug">{m.name}</h3>
        <p className="mt-2 text-sm text-ink/75">{m.line}</p>
        <details className="mt-auto pt-4 text-sm">
          <summary className="cursor-pointer font-semibold text-navy focus-ring">Read bio<span className="sr-only"> of {m.name}</span></summary>
          <div className="mt-2 space-y-2 text-ink/80">{m.bio.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div>
          {m.link && <Link href={m.link} className="mt-2 inline-block font-semibold text-navy underline focus-ring">Full biography</Link>}
        </details>
      </div>
    </li>
  );
}

export default function Team() {
  const people = [...leadership, ...facilitators];
  const schema = { "@context": "https://schema.org", "@type": "Organization", name: "Interactive Advocacy", url: "https://www.drtanyaojones.com/interactive-advocacy", employee: people.map((p) => ({ "@type": "Person", name: p.name, jobTitle: p.role })) };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="bg-gradient-to-br from-gov via-navy to-teal pb-12 pt-12 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <nav aria-label="Breadcrumb" className="text-sm text-white/70"><Link href="/interactive-advocacy" className="underline focus-ring">Interactive Advocacy</Link> / Our team</nav>
          <h1 className="mt-4 font-display text-4xl md:text-5xl">Our team</h1>
          <p className="mt-3 max-w-3xl text-lg text-white/85">Veterans, prevention specialists, clinicians and performers who deliver Interactive Advocacy training in military, school, workplace and public settings.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="font-display text-3xl text-gov">Leadership and lead facilitators</h2>
        <p className="mt-2 max-w-3xl text-ink/75">The people who run Interactive Advocacy and the subject-matter experts who lead each training alongside our edutainers.</p>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{people.map((m) => <Card key={m.slug} m={m} />)}</ul>
        <p className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink/60"><Placeholder>Approval pending</Placeholder> Each person approves their card and photo before launch. Full photos needed for Neal Gaulden and Nicole Snell.</p>
      </section>

      <section className="bg-mist py-14">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-3xl text-gov">The wider team</h2>
          <p className="mt-2 max-w-3xl text-ink/75">Supported by a nationwide network of collaborative partners, facilitators and edutainers: actors, comedians and educators who bring each scenario to life.</p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div><h3 className="font-semibold">Collaborative partners</h3><ul className="mt-2 space-y-1 text-ink/80">{network.partners.map((n) => <li key={n}>{n}</li>)}</ul></div>
            <div><h3 className="font-semibold">Edutainers</h3><ul className="mt-2 space-y-1 text-ink/80">{network.edutainers.map((n) => <li key={n}>{n}</li>)}</ul></div>
            <div><h3 className="font-semibold">Operations</h3><ul className="mt-2 space-y-1 text-ink/80">{network.staff.map((n) => <li key={n}>{n}</li>)}</ul></div>
          </div>
          <Link href="/interactive-advocacy#inquire" className="mt-10 inline-block rounded-sm bg-ink px-6 py-3 font-semibold text-white hover:bg-navy focus-ring">Request a training quote</Link>
        </div>
      </section>
    </>
  );
}
