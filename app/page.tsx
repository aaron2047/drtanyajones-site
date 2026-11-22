import Link from "next/link";
import { HeroCarousel, type Slide } from "@/components/HeroCarousel";
import { Placeholder } from "@/components/Placeholder";
import { site } from "@/lib/content";

const paths = [
  { title: "Government and international hosts", body: "Policy & Leadership Forums that connect grassroots voices with policymakers and intergovernmental bodies.", href: "/forums", cta: "Explore Forums" },
  { title: "Military and veteran communities", body: "Safety, accountability and lasting cultural change, led by a U.S. Army veteran.", href: "/forums#topics", cta: "See topics" },
  { title: "Schools, workplaces and institutions", body: "Proactive violence-prevention training through theatrical presentation and prevention tools.", href: "/training", cta: "Explore Training" },
];

const slides: Slide[] = [
  { eyebrow: "Who we are", title: "A U.S. Army veteran turning lived experience into leadership.", body: "Global thought leader in governance and humanity. Speaker, author and founder of Interactive Advocacy.", cta: "Meet Dr. Jones", href: "/about", image: "/images/hero-closeup.jpg", pos: "70% center", kb: "in" },
  { eyebrow: "What we do", title: "Turning conversation into policy, and policy into safer communities.", body: "Policy & Leadership Forums, keynotes and A.C.T\u00a9 violence-prevention training.", cta: "Host a Forum", href: "/forums#inquire", image: "/images/hero-wide.jpg", pos: "center", kb: "in" },
  { eyebrow: "Who we serve", title: "For the people and institutions committed to lasting change.", body: "Governments and intergovernmental bodies, military and veteran communities, schools, workplaces and public institutions.", cta: "Find your path", href: "#paths", image: "/images/hero-podium.jpg", pos: "center", kb: "pan", fx: false },
];

export default function Home() {
  return (
    <>
      <HeroCarousel slides={slides} />

      <section className="mx-auto max-w-6xl px-6 py-20" aria-labelledby="paths">
        <h2 id="paths" className="font-display text-3xl md:text-4xl">Who this is for</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {paths.map((p) => (
            <article key={p.title} className="flex flex-col rounded-sm border border-ink/10 bg-white p-6">
              <h3 className="font-display text-xl">{p.title}</h3>
              <p className="mt-3 flex-1 text-ink/75">{p.body}</p>
              <Link href={p.href} className="mt-5 font-semibold text-navy underline focus-ring">{p.cta}</Link>
            </article>
          ))}
        </div>
      </section>

      <section aria-label="Priorities" className="space-y-1 bg-white">
        {[
          { t: "Host a Policy & Leadership Forum", href: "/forums", img: "/images/hero-forums.jpg" },
          { t: "Book a keynote or panel", href: "/keynotes", img: "/images/hero-home.jpg" },
          { t: "Prevent violence with A.C.T© training", href: "/training", img: "/images/portrait-about.jpg" },
        ].map((x) => (
          <Link key={x.t} href={x.href} className="group relative flex h-64 items-end justify-end overflow-hidden bg-gov p-6 focus-ring md:h-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={x.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top opacity-70 transition group-hover:opacity-90" />
            <span className="relative text-xs font-semibold uppercase tracking-[0.25em] text-white">{x.t} &rsaquo;</span>
          </Link>
        ))}
        <p className="px-6 py-2 text-center text-xs text-ink/60"><Placeholder>Video panels pending</Placeholder> Stacked full-width video panels, modeled on whitehouse.gov priorities, replace these images when footage arrives.</p>
      </section>

      <section className="bg-brass/10 py-12" aria-labelledby="seen">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 id="seen" className="text-xs font-semibold uppercase tracking-[0.3em] text-gov">As seen on</h2>
          <ul className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-2 font-display text-lg text-ink/70">
            {["Fox News", "NBC", "CBS News", "ABC News", "iHeartRadio", "WHLF 95.3", "WOW", "Botswana Guardian", "The Sun", "Zondra TV"].map((m) => <li key={m}>{m}</li>)}
          </ul>
          <p className="mt-4 text-sm text-ink/60"><Placeholder>Logos, links and permission pending</Placeholder> Listed from the current site.</p>
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
            <div key={t} className="aspect-video overflow-hidden rounded-sm bg-gradient-to-br from-navy to-ink p-4 text-white">
              <div className="flex h-full flex-col justify-between"><Placeholder>Video pending</Placeholder><p className="font-semibold">{t}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-mist py-16">
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
