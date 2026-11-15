"use client";
import { useEffect, useRef, useState } from "react";
import { Placeholder } from "./Placeholder";

// Poster-first hero: the LCP element is the poster/gradient, video loads after, and is skipped for
// reduced-motion or data-saver visitors. Muted, looped, no autoplay with sound.
export function VideoHero({ eyebrow, title, sub, image, children }: { eyebrow: string; title: string; sub: string; image?: string; children?: React.ReactNode }) {
  const src = process.env.NEXT_PUBLIC_HERO_VIDEO;
  const poster = image ?? process.env.NEXT_PUBLIC_HERO_POSTER;
  const ref = useRef<HTMLVideoElement>(null);
  const [play, setPlay] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as any).connection?.saveData === true;
    if (src && !reduce && !saveData) setPlay(true);
  }, [src]);

  function toggle() {
    const v = ref.current; if (!v) return;
    if (v.paused) { v.play(); setPaused(false); } else { v.pause(); setPaused(true); }
  }

  return (
    <section className="relative isolate flex min-h-[70vh] items-end overflow-hidden bg-navy text-white">
      <div
        className="absolute inset-0 -z-20 bg-gradient-to-br from-ink via-navy to-[#2a3f66]"
        style={poster ? { backgroundImage: `url(${poster})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
        aria-hidden
      />
      {play && src && (
        <video ref={ref} className="absolute inset-0 -z-10 h-full w-full object-cover" src={src} poster={poster} autoPlay muted loop playsInline preload="metadata" aria-hidden />
      )}
      <div className="absolute inset-0 -z-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" aria-hidden />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-28">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brass">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-white/85">{sub}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">{children}</div>
        <div className="mt-8 flex items-center gap-3 text-xs text-white/70">
          {!src && <Placeholder>Hero reel pending</Placeholder>}
          {src && play && (
            <button onClick={toggle} className="rounded-full border border-white/40 px-3 py-1 hover:bg-white/10 focus-ring" aria-label={paused ? "Play background video" : "Pause background video"}>
              {paused ? "Play video" : "Pause video"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
