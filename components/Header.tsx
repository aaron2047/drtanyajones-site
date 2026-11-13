import Link from "next/link";
const nav = [
  { href: "/forums", label: "Forums" },
  { href: "/keynotes", label: "Keynotes" },
  { href: "/events", label: "Events" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
];
export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 text-white">
        <Link href="/" className="font-display text-lg tracking-wide focus-ring">Dr. Tanya O. Jones</Link>
        <nav aria-label="Primary" className="hidden gap-7 text-sm md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="opacity-90 hover:opacity-100 focus-ring">{n.label}</Link>
          ))}
        </nav>
        <Link href="/forums#inquire" className="rounded-full bg-brass px-4 py-2 text-sm font-semibold text-ink hover:bg-white focus-ring">Host a Forum</Link>
      </div>
    </header>
  );
}
