import Link from "next/link";
import { splitEvents, type EventItem } from "@/lib/events";
import { Placeholder } from "./Placeholder";

const day = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "America/New_York" });
const year = (iso: string) => new Date(iso).toLocaleDateString("en-US", { year: "numeric", timeZone: "America/New_York" });
const time = (iso: string) => new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" });

// A plain dated list: one row per event, date on the left. Replaces flyers and the grid calendar.
export function EventRow({ e, past = false }: { e: EventItem; past?: boolean }) {
  return (
    <li className="grid grid-cols-[5.5rem_1fr] gap-4 border-t border-ink/10 py-4">
      <p className="leading-tight"><span className="block font-display text-xl text-gov">{day(e.start)}</span><span className="text-sm text-ink/60">{year(e.start)}</span></p>
      <div>
        <h3 className="font-semibold">{e.url ? <a href={e.url} className="underline focus-ring">{e.title}</a> : e.title}</h3>
        {!past && <p className="text-sm text-ink/70">{time(e.start)} ET{e.location ? ` · ${e.location}` : ""}</p>}
        {e.placeholder && !past && <p className="mt-2"><Placeholder>Details pending</Placeholder></p>}
      </div>
    </li>
  );
}

export function UpcomingList({ limit, heading = "Upcoming" }: { limit?: number; heading?: string }) {
  const { upcoming } = splitEvents(new Date());
  const list = limit ? upcoming.slice(0, limit) : upcoming;
  return (
    <div>
      <h2 className="font-display text-2xl">{heading}</h2>
      <ul className="mt-4 border-b border-ink/10">
        {list.length === 0 && <li className="border-t border-ink/10 py-4 text-ink/70">No upcoming events are listed right now.</li>}
        {list.map((e) => <EventRow key={e.id} e={e} />)}
      </ul>
      {limit && <Link href="/events" className="mt-4 inline-block font-semibold text-navy underline focus-ring">All events</Link>}
    </div>
  );
}
