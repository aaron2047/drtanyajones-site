import Link from "next/link";
import { Ticker, type TickerItem } from "./Ticker";
import { splitEvents } from "@/lib/events";

const nav = [
  { href: "/forums", label: "Forums" },
  { href: "/keynotes", label: "Keynotes" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/work-and-impact", label: "Work & Impact" },
];
const training = [
  { href: "/training", label: "A.C.T© Training" },
  { href: "/training#shop", label: "Shop & Merch" },
  { href: "https://interactiveadvocacy.com", label: "Interactive Advocacy" },
];

export function Header() {
  const next = splitEvents().upcoming[0];
  const items: TickerItem[] = [
    ...(next ? [{ label: `Next: ${next.title}, ${new Date(next.start).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/New_York" })}`, href: "/events" }] : []),
    { label: "Host a Policy & Leadership Forum", href: "/forums#inquire" },
    { label: "Keynotes and panels", href: "/keynotes" },
    { label: "A.C.T© violence-prevention training", href: "/training" },
    { label: "Shop and merch", href: "/training#shop" },
    { label: "Book Dr. Jones", href: "/forums#inquire" },
  ];
  return (
    <header className="bg-white">
      <Ticker items={items} />
      <div className="mx-auto max-w-7xl px-4 pt-6 text-center">
        <Link href="/" className="inline-block focus-ring" aria-label="Dr. Tanya O. Jones, home">
          {/* Replace with logo image when supplied */}
          <span className="block font-display text-3xl font-bold uppercase tracking-[0.18em] text-gov md:text-4xl">Dr. Tanya O. Jones</span>
          <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.3em] text-brass">Policy &amp; Leadership Forums</span>
        </Link>
        <nav aria-label="Primary" className="mt-5 border-t border-ink/10">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-1 py-3 text-sm font-semibold uppercase tracking-wider text-gov">
            {nav.map((n) => <li key={n.href}><Link href={n.href} className="py-2 hover:text-brass focus-ring">{n.label}</Link></li>)}
            <li className="group relative">
              <Link href="/training" className="py-2 hover:text-brass focus-ring">Training</Link>
              <ul className="invisible absolute left-1/2 top-full z-30 w-56 -translate-x-1/2 border border-ink/10 bg-white py-2 text-left opacity-0 shadow-lg transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                {training.map((t) => (
                  <li key={t.href}>
                    {t.href.startsWith("http")
                      ? <a href={t.href} rel="noopener" className="block px-4 py-2 text-xs normal-case tracking-normal hover:bg-cream focus-ring">{t.label} &#8599;</a>
                      : <Link href={t.href} className="block px-4 py-2 text-xs normal-case tracking-normal hover:bg-cream focus-ring">{t.label}</Link>}
                  </li>
                ))}
              </ul>
            </li>
            <li><Link href="/forums#inquire" className="rounded-sm bg-gov px-4 py-2 text-white hover:bg-brass hover:text-gov focus-ring">Book</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
