import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { MonthCalendar } from "@/components/MonthCalendar";
import { Placeholder } from "@/components/Placeholder";
import { splitEvents } from "@/lib/events";

export const revalidate = 3600;
export const metadata: Metadata = { title: "Speaking Engagements & Events | Dr. Tanya O. Jones", description: "Upcoming and recent speaking engagements." };

const fmt = (iso: string) => new Date(iso).toLocaleString("en-US", { dateStyle: "long", timeStyle: "short", timeZone: "America/New_York" });

export default function Events() {
  const now = new Date();
  const { upcoming, past } = splitEvents(now);
  const focus = upcoming[0] ? new Date(upcoming[0].start) : now;
  const all = [...upcoming, ...past];
  const schema = upcoming.map((e) => ({ "@context": "https://schema.org", "@type": "Event", name: e.title, startDate: e.start, performer: { "@type": "Person", name: "Dr. Tanya O. Jones" } }));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero eyebrow="Speaking engagements" title="Where Dr. Jones is speaking next." sub="Upcoming events appear here automatically. Past events move to Recent appearances with the year shown." />
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.4fr_1fr]">
        <MonthCalendar year={focus.getFullYear()} month={focus.getMonth()} events={all} />
        <div>
          <h2 className="font-display text-2xl">Upcoming</h2>
          <ul className="mt-4 space-y-4">
            {upcoming.length === 0 && <li className="text-ink/70">No upcoming events are listed right now.</li>}
            {upcoming.map((e) => (
              <li key={e.id} className="rounded-sm border border-ink/10 bg-white p-5">
                <p className="text-sm font-semibold text-brass">{fmt(e.start)}</p>
                <h3 className="mt-1 font-display text-lg">{e.title}</h3>
                {e.location && <p className="mt-1 text-sm text-ink/70">{e.location}</p>}
                {e.placeholder && <p className="mt-3"><Placeholder>Details pending</Placeholder></p>}
              </li>
            ))}
          </ul>
          <h2 className="mt-10 font-display text-2xl">Recent appearances</h2>
          <ul className="mt-4 space-y-3">
            {past.length === 0 && <li className="text-ink/70">Past events will archive here automatically.</li>}
            {past.map((e) => <li key={e.id} className="text-sm"><span className="font-semibold">{e.title}</span>, {new Date(e.start).getFullYear()}</li>)}
          </ul>
        </div>
      </section>
    </>
  );
}
