import Link from "next/link";
import { Ticker, type TickerItem } from "./Ticker";
import { splitEvents } from "@/lib/events";
import { HeaderShell } from "./HeaderShell";
import { MobileMenu } from "./MobileMenu";
import { CartButton } from "./Cart";

const nav = [
  { href: "/forums", label: "Forums" },
  { href: "/keynotes", label: "Keynotes" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/work-and-impact", label: "Work & Impact" },
  { href: "/insights", label: "Insights" },
];
const training = [
  { href: "/interactive-advocacy", label: "A.C.T© Training" },
  { href: "/interactive-advocacy/shop", label: "Shop & Merch" },
  { href: "/interactive-advocacy#inquire", label: "Request a training quote" },
];

export function Header() {
  const next = splitEvents().upcoming[0];
  const items: TickerItem[] = [
    ...(next ? [{ label: `Next: ${next.title}, ${new Date(next.start).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/New_York" })}`, href: "/events" }] : []),
    { label: "Host a Policy & Leadership Forum", href: "/forums#inquire" },
    { label: "Keynotes and panels", href: "/keynotes" },
    { label: "A.C.T© violence-prevention training", href: "/interactive-advocacy" },
    { label: "Shop and merch", href: "/interactive-advocacy/shop" },
    { label: "Book Dr. Jones", href: "/forums#inquire" },
  ];
  return (
    <HeaderShell ticker={<Ticker items={items} />}>
      <div className="mx-auto max-w-7xl px-4 pt-4 text-center">
        <Link href="/" className="inline-block focus-ring" aria-label="Dr. Tanya O. Jones, home">
          {/* Draft crop from the current site. Replace public/images/logo.png with the original transparent PNG. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="Dr. Tanya O. Jones" width={130} height={98} className="logo-dark mx-auto h-16 w-auto lg:h-24" />
          <img src="/images/logo-light.png" alt="" aria-hidden width={137} height={125} className="logo-light mx-auto h-16 w-auto lg:h-24" />
        </Link>
        <p className="tagline mt-1 hidden text-[11px] sm:block font-semibold uppercase tracking-[0.3em] text-teal">Global Thought Leader | Governance | Humanity</p>
        <MobileMenu nav={nav} ia={training} />
        <nav aria-label="Primary" className="mt-4 hidden border-t border-ink/10 lg:block">
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-1 py-3 text-sm font-semibold uppercase tracking-wider text-gov">
            {nav.map((n) => <li key={n.href}><Link href={n.href} className="py-2 hover:text-teal focus-ring">{n.label}</Link></li>)}
            <li className="group relative">
              <Link href="/interactive-advocacy" className="py-2 hover:text-teal focus-ring">Interactive Advocacy</Link>
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
            <li><CartButton /></li>
            <li><Link href="/forums#inquire" className="rounded-sm bg-teal px-4 py-2 text-white hover:bg-brass hover:text-gov focus-ring">Book</Link></li>
          </ul>
        </nav>
      </div>
    </HeaderShell>
  );
}
