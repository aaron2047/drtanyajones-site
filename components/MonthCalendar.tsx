import type { EventItem } from "@/lib/events";

export function MonthCalendar({ year, month, events }: { year: number; month: number; events: EventItem[] }) {
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7; // Monday first
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(startOffset).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);
  const label = first.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const byDay = new Map<number, EventItem[]>();
  events.forEach((e) => {
    const d = new Date(e.start);
    if (d.getFullYear() === year && d.getMonth() === month) byDay.set(d.getDate(), [...(byDay.get(d.getDate()) ?? []), e]);
  });
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-4 md:p-6">
      <h3 className="font-display text-2xl">{label}</h3>
      <div role="grid" aria-label={label} className="mt-4 grid grid-cols-7 gap-px overflow-hidden rounded-lg bg-ink/10 text-sm">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <div key={d} className="bg-mist p-2 text-center text-xs font-semibold">{d}</div>)}
        {cells.map((d, i) => (
          <div key={i} className="min-h-[72px] bg-white p-1.5 md:min-h-[96px]">
            {d && <span className="text-xs text-ink/60">{d}</span>}
            {d && byDay.get(d)?.map((e) => (
              <p key={e.id} className="mt-1 break-words rounded bg-brass/20 px-1 py-1 text-[10px] font-semibold leading-tight md:text-[11px]">{e.title}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
