export function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <section className="bg-gradient-to-br from-ink via-navy to-[#2a3f66] pb-16 pt-36 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brass">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-5xl">{title}</h1>
        {sub && <p className="mt-4 max-w-2xl text-lg text-white/85">{sub}</p>}
      </div>
    </section>
  );
}
