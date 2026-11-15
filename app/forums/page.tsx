import type { Metadata } from "next";
import { VideoHero } from "@/components/VideoHero";
import { heroImage } from "@/lib/hero";
import { Placeholder } from "@/components/Placeholder";
import { Faq } from "@/components/Faq";
import { InquiryForm } from "@/components/InquiryForm";
import { formats, topics, outcomes, faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Policy & Leadership Forums | Dr. Tanya O. Jones",
  description: "Policy and leadership forums for government, international and institutional hosts: formats, topics, outcomes and how to book.",
};

const eventSchema = {
  "@context": "https://schema.org", "@type": "Service",
  name: "Policy & Leadership Forums", provider: { "@type": "Person", name: "Dr. Tanya O. Jones" },
  audience: { "@type": "Audience", audienceType: "Government, international and institutional hosts" },
};

export default function Forums() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />
      <VideoHero image={heroImage()} eyebrow="Policy & Leadership Forums" title="Convenings that bridge grassroots groups and global policymakers." sub="Substantive, outcome-driven dialogue for hosts who need decisions, not just discussion.">
        <a href="#inquire" className="rounded-full bg-brass px-6 py-3 font-semibold text-ink hover:bg-white focus-ring">Request a Forum</a>
        <a href="#formats" className="rounded-full border border-white/50 px-6 py-3 font-semibold hover:bg-white/10 focus-ring">View formats</a>
      </VideoHero>

      <section id="formats" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl md:text-4xl">Formats</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {formats.map((f) => (
            <article key={f.title} className="rounded-sm border border-ink/10 bg-white p-6">
              <div className="flex items-start justify-between gap-3"><h3 className="font-display text-xl">{f.title}</h3>{f.placeholder && <Placeholder />}</div>
              <p className="mt-3 text-ink/75">{f.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="topics" className="bg-navy py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-3xl md:text-4xl">Topics</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {topics.map((t) => (
              <li key={t.title} className="rounded-sm border border-white/15 p-6">
                <div className="flex items-start justify-between gap-3"><h3 className="font-display text-xl">{t.title}</h3>{t.placeholder && <Placeholder />}</div>
                <p className="mt-2 text-white/80">{t.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">What hosts walk away with</h2>
            <ul className="mt-6 space-y-3">{outcomes.map((o) => <li key={o} className="flex gap-3"><span className="text-brass" aria-hidden>&#9679;</span>{o}</li>)}</ul>
            <p className="mt-4"><Placeholder>Confirm outcomes</Placeholder></p>
          </div>
          <div>
            <h2 className="font-display text-3xl">Past convenings</h2>
            <div className="mt-6 rounded-sm border border-dashed border-brass bg-white p-6">
              <Placeholder>Pending</Placeholder>
              <p className="mt-3 text-ink/75">Dated convenings with host name, audience, a short outcome summary and a linked source. Host testimonials appear here with written permission.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-display text-3xl">Host FAQ</h2>
          <div className="mt-8"><Faq items={faqs} /></div>
        </div>
      </section>

      <section id="inquire" className="mx-auto max-w-4xl scroll-mt-8 px-6 py-20">
        <h2 className="font-display text-3xl md:text-4xl">Request a Forum</h2>
        <p className="mt-3 max-w-2xl text-ink/75">Tell us about your audience and goals. Inquiries are routed by type, and you receive an instant confirmation.</p>
        <div className="mt-8"><InquiryForm /></div>
      </section>
    </>
  );
}
