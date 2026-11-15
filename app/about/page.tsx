import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";

export const metadata: Metadata = { title: "About Dr. Tanya O. Jones", description: "Violence-prevention expert, humanitarian advocate and U.S. Army veteran." };
const honors = [
  "Presidential Lifetime Achievement Award, February 2024",
  "Global Icon, First Ladies Forum Economic Summit, Doha, April 2024",
  "Leadership Award, Pan-African American Leaders Awards (PAALA), October 2024",
  "Global Icon, Women's Economic Summit, Dubai, March 2023",
  "Chase Your Dreams Human Trafficking Awareness Award of Distinction, 2022",
  "Humanitarian Honoree certificate, Houston Community College Board of Trustees",
];
export default function About() {
  return (
    <>
      <PageHero eyebrow="About" title="A seasoned expert in violence prevention." sub="U.S. Army veteran, former Department of Defense professional and founder of Interactive Advocacy." />
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1fr_340px]">
        <div className="space-y-5 text-lg text-ink/85">
          <p>Dr. Tanya O. Jones is an advocate and expert in violence prevention with over two decades of experience. She has held influential positions within the Department of Defense and the U.S. Armed Forces, including Assistant Adjudicator, Assistant Inspector General, Sexual Assault Response Coordinator, Senior-Level Special Emphasis Program Manager, Equal Opportunity Program Manager, EEO, and Diversity &amp; Inclusion Specialist. She has also served as a Legislative Assistant at the Maryland General Assembly.</p>
          <h2 className="font-display text-2xl text-gov">Recognition</h2>
          <ul className="list-disc space-y-1 pl-6 text-base">{honors.map((h) => <li key={h}>{h}</li>)}</ul>
          <h2 className="font-display text-2xl text-gov">Leadership and service</h2>
          <p>She has served as President of the North Carolina Veterans Business Association (NCVETBIZ), is a collaborative partner and member of the Annual Hawaii International Summit Planning Committee for the Institute of Violence, Abuse, and Trauma (IVAT), and is an active member of AWHPI Global Foundation and AWLO (Charlotte Chapter).</p>
          <p className="flex flex-wrap items-center gap-3 text-base"><Placeholder>Verify before launch</Placeholder> Copy is drawn from the current site. Awards, titles, the reach figure and &quot;Amb. Dr.&quot; need source confirmation and Dr. Jones&apos;s approval.</p>
        </div>
        <aside>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/portrait-about.jpg" alt="Dr. Tanya O. Jones" className="w-full rounded-sm" />
          <p className="mt-2 text-xs text-ink/60">Draft crop from the current site. Original photo to be supplied.</p>
        </aside>
      </section>
    </>
  );
}
