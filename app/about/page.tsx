import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";

export const metadata: Metadata = { title: "About Dr. Tanya O. Jones", description: "Leadership strategist, humanitarian advocate and U.S. Army veteran." };
export default function About() {
  return (
    <>
      <PageHero eyebrow="About" title="Leadership strategist and humanitarian advocate." sub="U.S. Army veteran and former Department of Defense professional." />
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1fr_320px]">
        <div className="space-y-5 text-lg text-ink/85">
          <p>Dr. Tanya O. Jones speaks, leads executive masterclasses and runs global initiatives, working with leaders in government, business, academia and community groups on resilience, ethical leadership and cultural change.</p>
          <p>She founded Interactive Advocacy and has advocated for veteran entrepreneurship and economic resilience through veteran business leadership.</p>
          <p className="flex flex-wrap items-center gap-3 text-base"><Placeholder>Pending</Placeholder> Final bio text, verified titles and awards, and the reach figure are added once Dr. Jones approves wording and sources.</p>
        </div>
        <aside className="rounded-2xl border border-dashed border-brass bg-white p-5 text-sm">
          <Placeholder>Portrait pending</Placeholder>
          <div className="mt-3 aspect-[4/5] rounded-xl bg-gradient-to-br from-navy to-ink" />
        </aside>
      </section>
    </>
  );
}
