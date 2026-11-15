import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";
import { InquiryForm } from "@/components/InquiryForm";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "A.C.T© Training | Dr. Tanya O. Jones",
  description: "Violence-prevention training through theatrical presentation and prevention tools, delivered through Interactive Advocacy.",
};

const pillars = [
  { t: "Theatrical presentations", d: "Live, story-driven performances that make prevention memorable." },
  { t: "Teaching", d: "Skills and empathy training that equips participants to act." },
  { t: "Prevention tools", d: "Practical resources organizations can keep using after the session." },
];
const audiences = ["Military and veteran communities", "Schools", "Workplaces", "Public institutions"];

export default function Training() {
  return (
    <>
      <PageHero eyebrow="Training division" title="A.C.T©: actively create transformation." sub="Engaging, empowering and transforming individuals and communities to prevent violence. Delivered through Interactive Advocacy." />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-3xl">What it is</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => <li key={p.t} className="rounded-sm border border-ink/10 bg-white p-6"><h3 className="font-display text-xl">{p.t}</h3><p className="mt-2 text-ink/75">{p.d}</p></li>)}
        </ul>
        <h2 className="mt-14 font-display text-3xl">Who it serves</h2>
        <ul className="mt-6 flex flex-wrap gap-3">{audiences.map((a) => <li key={a} className="rounded-full border border-navy/30 px-4 py-2 text-sm">{a}</li>)}</ul>
        <p className="mt-10 flex flex-wrap items-center gap-3 text-sm text-ink/70"><Placeholder>Procurement details pending</Placeholder> Certifications and capability statement are added once confirmed.</p>
      </section>

      <section id="shop" className="scroll-mt-8 bg-mist py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-3xl">Shop &amp; Merch</h2>
          <p className="mt-2 max-w-2xl text-ink/75">Books and advocacy-inspired gear. Products are currently sold on interactiveadvocacy.com.</p>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {products.map((p) => (
              <li key={p.slug} className="flex flex-col overflow-hidden rounded-sm border border-ink/10 bg-white">
                <div className="flex aspect-[4/5] items-start bg-gradient-to-br from-navy to-ink p-4"><Placeholder>Product photo pending</Placeholder></div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brass">{p.kind}</p>
                  <h3 className="mt-1 font-display text-xl">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-ink/75">{p.blurb}</p>
                  <a href="https://interactiveadvocacy.com" rel="noopener" className="mt-4 inline-block text-sm font-semibold text-navy underline focus-ring">Shop on Interactive Advocacy &#8599;</a>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink/70"><Placeholder>Merch photos pending</Placeholder> Gear and merch photos from Interactive Advocacy slot in here.</p>
        </div>
      </section>

      <section id="inquire" className="mx-auto max-w-4xl scroll-mt-8 px-6 py-16">
        <h2 className="font-display text-3xl">Request a training quote</h2>
        <p className="mt-3 max-w-2xl text-ink/75">Tell us about your group and goals. You receive an instant confirmation.</p>
        <div className="mt-8"><InquiryForm defaultType="training" /></div>
      </section>
    </>
  );
}
