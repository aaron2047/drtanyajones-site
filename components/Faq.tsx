export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
      {items.map((f) => (
        <details key={f.q} className="group p-5 open:bg-cream/60">
          <summary className="flex cursor-pointer list-none items-center justify-between font-semibold focus-ring">
            {f.q}
            <span className="ml-4 text-brass transition group-open:rotate-45" aria-hidden>+</span>
          </summary>
          <p className="mt-3 max-w-3xl text-ink/80">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
