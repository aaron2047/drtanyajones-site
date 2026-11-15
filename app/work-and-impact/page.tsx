import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";

export const metadata: Metadata = { title: "Work & Impact | Dr. Tanya O. Jones", description: "Leadership and governance advisory, women's leadership and equity, convening and thought leadership." };
const areas = [
  { t: "Leadership & Governance Advisory", d: "Ethical, inclusive governance: policy and strategy, values-based leadership frameworks, institutional strengthening and cross-sector collaboration." },
  { t: "Women, Leadership and Equity", d: "Supporting women's leadership in public, civic and governance roles through development programs and values-driven pathways." },
  { t: "Convening & Thought Leadership", d: "Forums, dialogues and speaking engagements that bring diverse voices together on leadership, governance, justice and values." },
];
export default function Impact() {
  return (
    <>
      <PageHero eyebrow="Work & Impact" title="People-centred leadership with lasting results." />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <ul className="grid gap-6 md:grid-cols-3">
          {areas.map((a) => <li key={a.t} className="rounded-sm border border-ink/10 bg-white p-6"><h2 className="font-display text-xl">{a.t}</h2><p className="mt-2 text-ink/75">{a.d}</p></li>)}
        </ul>
        <div className="mt-10 grid gap-6 md:grid-cols-[280px_1fr]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/portrait-impact.jpg" alt="Dr. Tanya O. Jones" className="w-full rounded-sm" />
          <div className="space-y-3 text-ink/80">
            <p>Dr. Jones works across leadership and governance advisory, women&apos;s leadership and equity, and convening and thought leadership, drawing on two decades of violence-prevention experience.</p>
            <p className="flex flex-wrap items-center gap-3 text-sm"><Placeholder>Her own intro copy pending</Placeholder> Replace with the current site paragraph once approved.</p>
          </div>
        </div>
        <div className="mt-10 rounded-sm border border-dashed border-brass bg-white p-6">
          <Placeholder>Proof pending</Placeholder>
          <p className="mt-3 text-ink/75">Verified credentials, awards, media features and impact figures appear here, each linked to its source.</p>
        </div>
      </section>
    </>
  );
}
