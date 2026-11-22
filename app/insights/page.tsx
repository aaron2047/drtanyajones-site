import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";

export const metadata: Metadata = { title: "Insights: My Rules for Advocacy | Dr. Tanya O. Jones", description: "Essays and perspectives from Dr. Tanya O. Jones on advocacy, governance, women's leadership and values." };

const article = { "@context": "https://schema.org", "@type": "Article", headline: "My Rules for Advocacy", author: { "@type": "Person", name: "Dr. Tanya O. Jones" } };

export default function Insights() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <PageHero eyebrow="Insights" title="Perspectives on advocacy, governance and leadership." sub="Essays and messages from Dr. Jones." />
      <section className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-[1fr_260px]">
        <article className="space-y-5 text-lg leading-relaxed text-ink/85">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brass">Essay</p>
          <h2 className="font-display text-3xl text-gov">My Rules for Advocacy</h2>
          <p>Global advocacy is not about visibility or access. It is quieter, more demanding, and rooted in responsibility. At its core, it requires discipline, humility, and a commitment to people over performance.</p>
          <p>My approach to advocacy is guided by lived principles shaped through governance work and community-centred engagement. Credible advocacy begins with proximity—listening before speaking, presence before policy, and relationship before representation.</p>
          <p>Clarity matters more than noise. Leadership requires knowing what to speak into, what to step back from, and when restraint is the most responsible choice. Governance without humanity fails. Systems must serve dignity, and leadership must remain accountable to real lives.</p>
          <p>Women’s leadership is not optional—it is central to justice, accountability, and sustainable progress.</p>
          <p>Values and faith must be lived, not performed. In global spaces, values-based leadership must remain ethical, inclusive, and grounded in service.</p>
          <blockquote className="border-l-4 border-brass pl-5 font-display text-2xl text-gov">Access is not achievement; it is responsibility.</blockquote>
          <p>I measure success by whether my presence contributes to justice and meaningful progress.</p>
          <p className="flex flex-wrap items-center gap-3 text-base"><Placeholder>Date pending</Placeholder> Add the original publish date.</p>
        </article>
        <aside className="space-y-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/portrait-insights.jpg" alt="Dr. Tanya O. Jones" className="w-full rounded-sm" />
          <div>
            <h2 className="font-display text-xl">More from Dr. Jones</h2>
            <ul className="mt-3 space-y-3 text-base">
              <li className="border-t border-ink/10 pt-3"><p className="font-semibold">Honoring Those Who Served</p><p className="text-sm text-ink/70">A Veterans Day message.</p></li>
            </ul>
            <p className="mt-3 text-sm text-ink/60"><Placeholder>Blog posts move here</Placeholder></p>
          </div>
        </aside>
      </section>
    </>
  );
}
