import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";

export const metadata: Metadata = { title: "Insights | Dr. Tanya O. Jones", description: "Essays, reflections and messages from Dr. Tanya O. Jones." };
export default function Insights() {
  return (
    <>
      <PageHero eyebrow="Insights" title="My rules for advocacy." sub="Essays and messages on leadership, service and justice." />
      <section className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-[1fr_280px]">
        <div className="space-y-5 text-lg text-ink/85">
          <p className="font-display text-2xl text-gov">Access is not achievement; it is responsibility.</p>
          <p className="flex flex-wrap items-center gap-3 text-base"><Placeholder>Full essay to be pasted</Placeholder> The six-paragraph essay moves in from her current Insights page, tagged by topic. GLOW tagging is on hold.</p>
          <h2 className="mt-8 font-display text-2xl text-gov">Latest</h2>
          <article className="rounded-sm border border-ink/10 bg-white p-5">
            <h3 className="font-display text-xl">Honoring Those Who Served</h3>
            <p className="mt-2 text-base text-ink/75">A Veterans Day message from Dr. Jones to the Army veteran, active-duty, National Guard, reserve and military family communities.</p>
          </article>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/portrait-insights.jpg" alt="Dr. Tanya O. Jones" className="w-full self-start rounded-sm" />
      </section>
    </>
  );
}
