import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";
import { UpcomingList } from "@/components/UpcomingList";

export const metadata: Metadata = {
  title: "Speaking Engagements | Dr. Tanya O. Jones",
  description: "Keynotes, Policy & Leadership Forums, panels, faith and values, workshops and executive conversations.",
};

// Her wording from the current Speaking Engagements page.
const items = [
  { t: "Keynotes", d: "Inspiring and strategic keynote addresses that set the tone for conferences, summits, and high-level gatherings, with a focus on leadership, governance, ethics, and social responsibility." },
  { t: "Policy & Leadership Forums", d: "Substantive contributions to policy discussions, leadership convenings, and strategic dialogues within government, international, and institutional settings.", href: "/forums" },
  { t: "Panels & Moderation", d: "Thoughtful participation and facilitation of panels and conversations requiring clarity, balance, and inclusive dialogue." },
  { t: "Faith, Values & Leadership", d: "Engagements exploring the role of faith and values in leadership and public life, delivered with global fluency and inclusivity." },
  { t: "Workshops & Executive Conversations", d: "Facilitated sessions designed to support leaders and teams through reflection, alignment, and practical application." },
];

export default function Keynotes() {
  return (
    <>
      <PageHero eyebrow="Speaking engagements" title="Five ways to bring Dr. Jones to your event." sub="Leadership, governance, ethics and values, for conferences, summits and institutional gatherings." />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <ul className="grid gap-6 md:grid-cols-2">
          {items.map((i) => (
            <li key={i.t} className="rounded-sm border border-ink/10 bg-white p-6">
              <h2 className="font-display text-xl">{i.t}</h2>
              <p className="mt-2 text-ink/75">{i.d}</p>
              {i.href && <Link href={i.href} className="mt-3 inline-block font-semibold text-navy underline focus-ring">Formats, topics and host FAQ</Link>}
            </li>
          ))}
        </ul>
        <p className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink/70"><Placeholder>Pending</Placeholder> Sample topics, audience fit and a one-sheet download for each format.</p>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl">Book Dr. Jones</h2>
            <p className="mt-2 text-ink/75">Our team will be in touch to discuss your event, audience, and objectives.</p>
            <Link href="/forums#inquire" className="mt-5 inline-block rounded-full bg-ink px-6 py-3 font-semibold text-white hover:bg-navy focus-ring">Start an inquiry</Link>
          </div>
          <UpcomingList limit={3} />
        </div>
      </section>
    </>
  );
}
