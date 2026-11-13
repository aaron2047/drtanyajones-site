import Link from "next/link";
import { VideoHero } from "@/components/VideoHero";
import { Placeholder } from "@/components/Placeholder";
import { site } from "@/lib/content";

const paths = [
  { title: "Government and international hosts", body: "Policy & Leadership Forums that connect grassroots voices with policymakers and intergovernmental bodies.", href: "/forums", cta: "Explore Forums" },
  { title: "Military and veteran communities", body: "Safety, accountability and lasting cultural change, led by a U.S. Army veteran.", href: "/forums#topics", cta: "See topics" },
  { title: "Schools, workplaces and institutions", body: "Proactive violence-prevention training through theatrical presentation and prevention tools.", href: "https://interactiveadvocacy.com", cta: "Visit Interactive Advocacy", external: true },
];

export default function Home() {
  return (
    <>
      <VideoHero eyebrow="Policy & Leadership Forums" title="Turning conversation into policy, and policy into safer communities." sub={site.tagline}>
        <Link href="/forums#inquire" className="rounded-full bg-brass px-6 py-3 font-semibold text-ink hover:bg-white focus-ring">Host a Forum</Link>
        <Link href="/forums" className="rounded-full border border-white/50 px-6 py-3 font-semibold hover:bg-white/10 focus-ring">See how forums work</Link>
      </VideoHero>

      <section className="mx-auto max-w-6xl px-6 py-20" aria-labelledby="paths">
        <h2 id="paths" className="font-display text-3xl md:text-4xl">Who this is for</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {paths.map((p) => (
            <article key={p.title} className="flex flex-col rounded-2xl border border-ink/10 bg-white p-6">
              <h3 className="font-display text-xl">{p.title}</h3>
              <p className="mt-3 flex-1 text-ink/75">{p.body}</p>
              {p.external
                ? <a href={p.href} rel="noopener" className="mt-5 font-semibold text-navy underline focus-ring">{p.cta}</a>
                : <Link href={p.href} className="mt-5 font-semibold text-navy underline focus-ring">{p.cta}</Link>}
            </article>
          ))}
        </div>
      </section>

      <section id="impact" className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-3xl">Credentials</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {site.credentials.map((c) => <li key={c} className="rounded-full border border-white/30 px-4 py-2 text-sm">{c}</li>)}
          </ul>
          <p className="mt-6 flex items-center gap-3 text-sm text-white/70">
            <Placeholder>Pending</Placeholder> Media features, awards and impact figures appear here once each is verified and linked to its source.
          </p>
        </div>
      </section>

      <section id="watch" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl md:text-4xl">Watch</h2>
        <p className="mt-3 max-w-2xl text-ink/75">A 60 to 90 second reel, followed by captioned talk clips by topic.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {["Speaker reel", "Forum highlights", "Training performance"].map((t) => (
            <div key={t} className="aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-navy to-ink p-4 text-white">
              <div className="flex h-full flex-col justify-between"><Placeholder>Video pending</Placeholder><p className="font-semibold">{t}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="keynotes" className="bg-mist py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl">Ready to convene?</h2>
            <p className="mt-2 text-ink/75">Tell us your audience, date and goals. You get an instant confirmation and a discovery-call link.</p>
          </div>
          <Link href="/forums#inquire" className="rounded-full bg-ink px-6 py-3 font-semibold text-white hover:bg-navy focus-ring">Start an inquiry</Link>
        </div>
      </section>
    </>
  );
}
