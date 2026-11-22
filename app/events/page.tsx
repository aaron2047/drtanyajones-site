import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { EventRow } from "@/components/UpcomingList";
import { splitEvents, type EventItem } from "@/lib/events";

export const revalidate = 3600;
export const metadata: Metadata = { title: "Events & Appearances | Dr. Tanya O. Jones", description: "Upcoming speaking engagements and recent appearances by Dr. Tanya O. Jones." };

const monthKey = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "America/New_York" });
function byMonth(list: EventItem[]) {
  const m = new Map<string, EventItem[]>();
  list.forEach((e) => m.set(monthKey(e.start), [...(m.get(monthKey(e.start)) ?? []), e]));
  return [...m.entries()];
}

export default function Events() {
  const { upcoming, past } = splitEvents(new Date());
  const schema = upcoming.map((e) => ({ "@context": "https://schema.org", "@type": "Event", name: e.title, startDate: e.start, ...(e.location && !e.placeholder ? { location: { "@type": "Place", name: e.location } } : {}), performer: { "@type": "Person", name: "Dr. Tanya O. Jones" } }));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero eyebrow="Events" title="Where Dr. Jones is speaking next." sub="Upcoming events by month. Past events move to Recent appearances automatically, with the year shown." />
      <section className="mx-auto grid max-w-5xl gap-14 px-6 py-16 md:grid-cols-[1.5fr_1fr]">
        <div>
          <h2 className="font-display text-3xl">Upcoming</h2>
          {upcoming.length === 0 && <p className="mt-4 text-ink/70">No upcoming events are listed right now.</p>}
          {byMonth(upcoming).map(([month, list]) => (
            <div key={month} className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brass">{month}</h3>
              <ul className="mt-2 border-b border-ink/10">{list.map((e) => <EventRow key={e.id} e={e} />)}</ul>
            </div>
          ))}
        </div>
        <div>
          <h2 className="font-display text-2xl">Recent appearances</h2>
          <ul className="mt-4 border-b border-ink/10">
            {past.length === 0 && <li className="border-t border-ink/10 py-4 text-ink/70">Past events archive here automatically.</li>}
            {past.map((e) => <EventRow key={e.id} e={e} past />)}
          </ul>
        </div>
      </section>
    </>
  );
}
