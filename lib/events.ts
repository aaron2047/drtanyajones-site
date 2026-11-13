// Replace with CMS data. Source: current drtanyaojones.com/speaking-engagements calendar (one event, Nov 2026).
export type EventItem = { id: string; title: string; start: string; location?: string; url?: string; placeholder?: boolean };

export const events: EventItem[] = [
  { id: "ncvetbiz-2026", title: "NCVETBIZ Procurement Summit & Business Expo 2026", start: "2026-11-26T09:00:00-05:00", location: "Location to be confirmed", placeholder: true },
];

export function splitEvents(now = new Date()) {
  const sorted = [...events].sort((a, b) => +new Date(a.start) - +new Date(b.start));
  return {
    upcoming: sorted.filter((e) => new Date(e.start) >= now),
    past: sorted.filter((e) => new Date(e.start) < now).reverse(),
  };
}
