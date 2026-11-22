"use client";
import { useEffect, useRef, useState } from "react";

// Product photos: a main image and thumbnails. Clicking the main image opens it full screen (a lightbox),
// with arrow keys, swipe-free buttons and Escape to close. Native <dialog>, no library.
export function Gallery({ images, title }: { images: { url: string; alt: string }[]; title: string }) {
  const [i, setI] = useState(0);
  const dlg = useRef<HTMLDialogElement>(null);
  const n = images.length;
  const go = (d: number) => setI((x) => (x + d + n) % n);

  useEffect(() => {
    const el = dlg.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => { if (!el.open) return; if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (n === 0) return <div className="flex aspect-square w-full items-center justify-center rounded-sm border border-dashed border-ink/20 bg-white text-sm text-ink/50">Photo coming soon</div>;
  const img = images[i];
  return (
    <div>
      <button type="button" onClick={() => dlg.current?.showModal()} className="group relative block w-full overflow-hidden rounded-sm border border-ink/10 bg-white focus-ring" aria-label={`Enlarge photo ${i + 1} of ${n}: ${img.alt}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.url} alt={img.alt} className="aspect-square w-full object-contain" />
        <span className="absolute bottom-3 right-3 rounded-sm bg-gov/80 px-2 py-1 text-xs font-semibold text-white">Enlarge</span>
      </button>
      {n > 1 && (
        <ul className="mt-3 grid grid-cols-5 gap-2">
          {images.map((m, k) => (
            <li key={m.url}>
              <button type="button" onClick={() => setI(k)} aria-label={`Show photo ${k + 1}`} aria-current={k === i} className={`block overflow-hidden rounded-sm border-2 focus-ring ${k === i ? "border-teal" : "border-transparent"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.url} alt="" className="aspect-square w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <dialog ref={dlg} aria-label={`${title} photos`} className="m-auto max-h-[92vh] max-w-[92vw] rounded-sm bg-white p-0 backdrop:bg-gov/85" onClick={(e) => { if (e.target === dlg.current) dlg.current?.close(); }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.url} alt={img.alt} className="h-[min(80vh,92vw)] w-[min(80vh,92vw)] object-contain" />
        <div className="flex items-center justify-between gap-4 border-t border-ink/10 px-4 py-3 text-sm">
          {n > 1 ? <button type="button" onClick={() => go(-1)} className="min-h-[44px] px-3 font-semibold focus-ring">&larr; Previous</button> : <span />}
          <span className="text-ink/60">{i + 1} / {n}</span>
          <div className="flex gap-2">
            {n > 1 && <button type="button" onClick={() => go(1)} className="min-h-[44px] px-3 font-semibold focus-ring">Next &rarr;</button>}
            <button type="button" onClick={() => dlg.current?.close()} className="min-h-[44px] rounded-sm bg-ink px-4 font-semibold text-white focus-ring">Close</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
