"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CartButton } from "./Cart";

type Item = { href: string; label: string };

// Phones and small tablets: a Menu button that opens a full-screen panel. Escape, the close button or any link closes it,
// focus moves into the panel and back to the button, and the page behind does not scroll while it is open.
export function MobileMenu({ nav, ia }: { nav: Item[]; ia: Item[] }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const btn = useRef<HTMLButtonElement>(null);
  const first = useRef<HTMLAnchorElement>(null);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    first.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); btn.current?.focus(); };
  }, [open]);

  const link = "block py-3 text-lg font-semibold !text-white hover:!text-brass focus-ring";
  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between border-t border-ink/10 py-3">
        <button ref={btn} type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}
          className="menu-btn flex min-h-[44px] items-center gap-2 rounded-sm border border-gov/30 px-4 text-sm font-semibold uppercase tracking-wider text-gov focus-ring">
          <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden><path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="2" /></svg>
          Menu
        </button>
        <div className="flex gap-2"><CartButton />
        <Link href="/forums#inquire" className="flex min-h-[44px] items-center rounded-sm bg-teal px-5 text-sm font-semibold uppercase tracking-wider !text-white focus-ring">Book</Link></div>
      </div>
      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu" className="fixed inset-0 z-50 overflow-y-auto bg-gov px-6 pb-10 pt-5 text-left">
          <div className="flex items-center justify-between">
            <p className="font-display text-xl text-white">Dr. Tanya O. Jones</p>
            <button type="button" onClick={() => setOpen(false)} className="flex min-h-[44px] items-center gap-2 rounded-sm border border-white/40 px-4 text-sm font-semibold uppercase tracking-wider text-white focus-ring">
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" /></svg>
              Close
            </button>
          </div>
          <div className="mt-6 divide-y divide-white/15 border-y border-white/15">
            <Link ref={first} href="/" className={link}>Home</Link>
            {nav.map((n) => <Link key={n.href} href={n.href} className={link}>{n.label}</Link>)}
            <div className="py-3">
              <Link href="/interactive-advocacy" className={link + " !py-0"}>Interactive Advocacy</Link>
              <div className="mt-2 border-l-2 border-brass/60 pl-4">
                {ia.map((t) => <Link key={t.href} href={t.href} className="block py-2 text-base !text-white/85 hover:!text-brass focus-ring">{t.label}</Link>)}
              </div>
            </div>
          </div>
          <Link href="/forums#inquire" className="mt-8 flex min-h-[48px] items-center justify-center rounded-sm bg-brass text-base font-semibold uppercase tracking-wider !text-gov focus-ring">Book Dr. Jones</Link>
        </div>
      )}
    </div>
  );
}
