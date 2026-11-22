import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";

export const metadata: Metadata = {
  title: "About Dr. Tanya O. Jones | Leadership Strategist",
  description: "Leadership strategist, humanitarian advocate, U.S. Army veteran and founder of Interactive Advocacy.",
};

// Listed on her current site. Each needs a source link (program page, photo or certificate) before launch.
const memberships = [
  "President, North Carolina Veterans Business Association (NCVETBIZ)",
  "Collaborative partner and member, Annual Hawaii International Summit Planning Committee, Institute of Violence, Abuse, and Trauma (IVAT)",
  "Member, AWHPI Global Foundation",
  "Member, AWLO (Charlotte Chapter)",
];

const honors = [
  "Presidential Lifetime Achievement Award, February 2024, signed by former President Joe Biden",
  "Global Icon, First Ladies Forum Economic Summit, Doha, Qatar, April 2024",
  "Leadership Award, Pan-African American Leaders Awards (PAALA), October 2024",
  "Global Icon, Women's Economic Summit, Dubai, March 2023",
  "Chase Your Dreams Human Trafficking Awareness Award of Distinction, presented by Nissi Network and the Women of AT&T, 2022",
  "Certificate of Recognition as a Humanitarian Honoree, Houston Community College Board of Trustees, 2022",
];

// Only facts both of her sites agree on go into structured data. Titles and numbers still in question stay out.
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tanya O. Jones",
  honorificPrefix: "Dr.",
  jobTitle: "Leadership strategist and speaker",
  description: "Leadership strategist, humanitarian advocate and U.S. Army veteran.",
  url: "https://www.drtanyaojones.com/about",
  worksFor: { "@type": "Organization", name: "Interactive Advocacy", url: "https://www.drtanyaojones.com/interactive-advocacy" },
  memberOf: { "@type": "Organization", name: "North Carolina Veterans Business Association" },
};

export default function About() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <PageHero eyebrow="About" title="Dr. Tanya O. Jones" sub="Leadership strategist, humanitarian advocate and U.S. Army veteran." />
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1fr_340px]">
        <div className="space-y-5 text-lg text-ink/85">
          <h2 className="font-display text-2xl text-gov">Who is Dr. Tanya O. Jones?</h2>
          <p>Dr. Tanya O. Jones is a leadership strategist, humanitarian advocate, and creator of the GLOW Framework — a philosophy designed to help individuals and institutions grow through adversity, lead with compassion, own their story, and become warriors for change.</p>
          <p>Through keynote speaking, executive masterclasses, and global initiatives, Dr. Jones partners with institutional leaders across government, corporate, academic, and community sectors to advance resilience, ethical leadership, and measurable cultural transformation.</p>
          <p>A U.S. Army Veteran and former Department of Defense professional, she brings deep experience in federal service and institutional systems. She is the Founder and Chief Executive Officer of <Link href="/interactive-advocacy" className="underline">Interactive Advocacy</Link>, where her immersive, evidence-informed programs have reached more than 80,000 individuals nationally and internationally.</p>
          <p>Dr. Jones also serves as the two-time elected President of the North Carolina Veterans Business Association, advancing veteran entrepreneurship and economic resilience. Her leadership and humanitarian impact have been recognized through her appointment as a United Nations Peacekeeping Ambassador and as a recipient of the Presidential Lifetime Achievement Award.</p>
          <p>An award-winning speaker and author, Dr. Jones continues to champion people-centered leadership and global impact through the GLOW Framework.</p>
          <p className="flex flex-wrap items-center gap-3 text-base"><Placeholder>Verify before launch</Placeholder> Her wording, unchanged. Three items need a source: 80,000 (her Interactive Advocacy bio says 50,000), &quot;United Nations Peacekeeping Ambassador&quot; (elsewhere &quot;Ambassador for Peace&quot;; this also decides the &quot;Amb.&quot; prefix), and the Presidential Lifetime Achievement Award. GLOW wording is on hold.</p>

          <h2 className="pt-4 font-display text-2xl text-gov">Her story</h2>
          <p>Tanya O. Jones&apos; story is one of resilience, strength, and unwavering determination. Her journey from trauma to triumph began with isolation, but it was in that solitude that she discovered the power of creative expression. Through art, writing, and storytelling, she found her voice and transformed her pain into a catalyst for change. As an Army veteran, her experiences have shaped her perspective and fueled her passion for making a difference.</p>
          <p>Tanya is not just a survivor; she is a thriver. Her personal journey, shaped by her military experiences, is a testament to the power of resilience and self-discovery. She believes in the innate potential of every individual to make a difference, and she urges others to join her in creating a world where violence has no place.</p>

          <h2 className="pt-4 font-display text-2xl text-gov">Federal service</h2>
          <p>She has held positions within the Department of Defense and the U.S. Armed Forces, including Assistant Adjudicator, Assistant Inspector General, Sexual Assault Response Coordinator, Senior-Level Special Emphasis Program Manager, Equal Opportunity Program Manager, EEO, and Diversity &amp; Inclusion Specialist. She has also served as a Legislative Assistant at the Maryland General Assembly. She holds degrees in Political Science, Human Rights, and Genocide.</p>
          <p className="flex flex-wrap items-center gap-3 text-base"><Placeholder>Pending</Placeholder> Degree titles and institutions.</p>

          <h2 className="pt-4 font-display text-2xl text-gov">Global advocacy</h2>
          <p>Dr. Jones holds Special Consultative Status with the United Nations Economic and Social Council (ECOSOC) and was conferred as an Ambassador for Peace on February 4, 2025, aligning her work with the UN Sustainable Development Goals 2030.</p>
          <p className="flex flex-wrap items-center gap-3 text-base"><Placeholder>Verify</Placeholder> Wording from her Interactive Advocacy bio. Confirm the conferring body, and whether the status belongs to her or to an organization, before launch.</p>

          <h2 className="pt-4 font-display text-2xl text-gov">Memberships</h2>
          <ul className="list-disc space-y-1 pl-6 text-base">{memberships.map((m) => <li key={m}>{m}</li>)}</ul>

          <h2 className="pt-4 font-display text-2xl text-gov">Recognition</h2>
          <ul className="list-disc space-y-1 pl-6 text-base">{honors.map((h) => <li key={h}>{h}</li>)}</ul>
          <p className="flex flex-wrap items-center gap-3 text-base"><Placeholder>Sources pending</Placeholder> Each award links to its program page, photo or certificate once supplied.</p>
        </div>
        <aside className="space-y-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/portrait-about.jpg" alt="Dr. Tanya O. Jones" className="w-full rounded-sm" />
          <div className="rounded-sm bg-mist p-5">
            <p className="font-display text-lg">Book Dr. Jones</p>
            <p className="mt-1 text-sm text-ink/75">Keynotes, Policy &amp; Leadership Forums, panels and executive conversations.</p>
            <Link href="/forums#inquire" className="mt-4 inline-block rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white hover:bg-navy focus-ring">Start an inquiry</Link>
          </div>
        </aside>
      </section>
    </>
  );
}
