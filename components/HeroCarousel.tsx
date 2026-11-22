"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Placeholder } from "./Placeholder";

export type Slide = { eyebrow: string; title: string; body: string; cta: string; href: string; image: string; pos?: string; kb?: "in" | "pan" | "out"; fx?: boolean };

// Rotating hero modeled on the HighPoint banner: headline left, person right, outlined button, dots.
// Auto-advances every 7s; pauses on hover/focus and for reduced-motion visitors. Slides are real
// content in the DOM, so screen readers and crawlers get all of them.
export function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => { setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);
  useEffect(() => {
    if (hold || reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, [hold, reduce, slides.length]);

  return (
    <section
      aria-roledescription="carousel" aria-label="Featured"
      onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)} onBlur={() => setHold(false)}
      className="relative isolate h-[calc(100svh-2.5rem)] min-h-[34rem] w-full overflow-hidden bg-gov text-white"
    >
      {slides.map((s, n) => (
        <div key={s.title} role="group" aria-roledescription="slide" aria-label={`${n + 1} of ${slides.length}`} aria-hidden={n !== i}
          className={`absolute inset-0 transition-opacity duration-700 ${n === i ? "opacity-100" : "pointer-events-none opacity-0"}`}>
          <div className="absolute inset-0 -z-20 bg-gradient-to-br from-gov via-navy to-teal" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.image} alt="" loading={n === 0 ? "eager" : "lazy"} data-kb={s.kb ?? "in"} data-active={n === i} style={{ objectPosition: s.pos ?? "right top" }} className="hero-kb absolute inset-0 -z-10 h-full w-full object-cover" />
          {s.fx !== false && <div className="hero-haze" aria-hidden />}
          {s.fx !== false && <div className="hero-motes" aria-hidden>{Array.from({ length: 14 }).map((_, k) => <span key={k} style={{ left: `${(k * 37) % 100}%`, animationDelay: `${-(k * 1.7) % 14}s`, animationDuration: `${12 + (k % 5) * 3}s`, width: 2 + (k % 3), height: 2 + (k % 3) }} />)}</div>}
          <div className="absolute inset-0 bg-gradient-to-r from-gov/85 via-gov/45 to-gov/10 md:from-gov/80 md:via-gov/15" aria-hidden />
          <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-6 pb-24 pt-48">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brass">{s.eyebrow}</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight md:text-6xl">{s.title}</h2>
            <p className="mt-5 max-w-xl text-lg text-white/85">{s.body}</p>
            <div className="mt-8"><Link href={s.href} tabIndex={n === i ? 0 : -1} className="inline-block rounded-md border-2 border-brass px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:bg-brass hover:text-gov focus-ring">{s.cta}</Link></div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center gap-2">
        <div className="flex gap-3" role="tablist" aria-label="Choose slide">
          {slides.map((s, n) => (
            <button key={s.title} role="tab" aria-selected={n === i} aria-label={`Show slide ${n + 1}: ${s.eyebrow}`} onClick={() => setI(n)}
              className={`h-3 w-3 rounded-full border-2 border-white focus-ring ${n === i ? "bg-white" : "bg-transparent"}`} />
          ))}
        </div>
        <p className="text-xs text-white/70"><Placeholder>AI-generated scenes, pending approval</Placeholder> Replaced by real footage when available.</p>
      </div>
    </section>
  );
}
