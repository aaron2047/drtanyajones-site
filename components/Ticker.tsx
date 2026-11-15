"use client";
import Link from "next/link";
import { useState } from "react";

export type TickerItem = { label: string; href: string };

// Scrolling link strip. Pauses on hover/focus and via a visible button; static and scrollable for reduced motion.
export function Ticker({ items }: { items: TickerItem[] }) {
  const [paused, setPaused] = useState(false);
  const row = (suffix: string) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={suffix === "b" ? true : undefined}>
      {items.map((i) => (
        <li key={i.label + suffix}>
          <Link href={i.href} tabIndex={suffix === "b" ? -1 : 0} className="whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-white/90 hover:text-brass focus-ring">{i.label}</Link>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="bg-gov" role="region" aria-label="Announcements">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2">
        <div className="ticker group relative flex-1 overflow-hidden motion-reduce:overflow-x-auto" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          <div className={`ticker-track flex w-max motion-reduce:animate-none ${paused ? "[animation-play-state:paused]" : ""}`}>{row("a")}{row("b")}</div>
        </div>
      </div>
    </div>
  );
}
