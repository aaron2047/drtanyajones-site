import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";

export const metadata: Metadata = {
  title: "Work & Global Impact | Dr. Tanya O. Jones",
  description: "Leadership and governance advisory, women's leadership and equity, and convening and thought leadership.",
};

// Her wording from the current Work & Impact page.
const areas = [
  { t: "Leadership & Governance Advisory", d: "Dr. Jones works with leaders, institutions, and organizations to strengthen governance and decision-making in ways that are ethical, inclusive, and future-oriented. Her work includes policy and strategy development, values-based leadership frameworks, institutional strengthening, and cross-sector collaboration.", href: "/forums", cta: "Policy & Leadership Forums" },
  { t: "Women, Leadership, and Equity", d: "A core focus of Dr. Jones’ work is advancing women’s leadership in public, civic, and governance spaces. She supports leadership development, inclusive participation, and values-driven pathways that equip women to lead with confidence and influence.", href: "/keynotes", cta: "Keynotes and workshops" },
  { t: "Convening & Thought Leadership", d: "Through forums, dialogues, and speaking engagements, Dr. Jones brings together diverse voices to engage critical questions around leadership, governance, justice, and values, bridging ideas with action and insight with impact.", href: "/insights", cta: "Read her Insights" },
];

export default function Impact() {
  return (
    <>
      <PageHero eyebrow="Global impact" title="People-centred leadership, effective governance, sustainable impact." />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1fr_300px]">
          <div className="space-y-4 text-lg text-ink/85">
            <p>Dr. Tanya O. Jones advances people-centred leadership, effective governance, and sustainable impact in complex and evolving contexts. Her work integrates policy insight, ethical leadership, and grounded engagement to support leaders and systems that serve communities with integrity and purpose.</p>
            <p>Her approach is strategic and relational, guided by partnership, lived experience, and long-term outcomes.</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/portrait-impact.jpg" alt="Dr. Tanya O. Jones" className="w-full rounded-sm" />
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {areas.map((a) => (
            <li key={a.t} className="flex flex-col rounded-sm border border-ink/10 bg-white p-6">
              <h2 className="font-display text-xl">{a.t}</h2>
              <p className="mt-3 flex-1 text-ink/75">{a.d}</p>
              <Link href={a.href} className="mt-5 font-semibold text-navy underline focus-ring">{a.cta}</Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 rounded-sm border border-dashed border-brass bg-white p-6">
          <Placeholder>Proof pending</Placeholder>
          <p className="mt-3 text-ink/75">Named examples go here: past convenings, partner institutions and outcomes, each with a date and a link. This is what forum hosts look for before they book.</p>
        </div>
      </section>
    </>
  );
}
