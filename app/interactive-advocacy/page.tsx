import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";
import { InquiryForm } from "@/components/InquiryForm";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Interactive Advocacy: A.C.T© Training and Shop",
  description: "Interactive Advocacy, founded by Dr. Tanya O. Jones: A.C.T© violence-prevention training, training tools, books and merch.",
};

const pillars = [
  { t: "Theatrical presentations", d: "Live, story-driven performances that make prevention memorable." },
  { t: "Teaching", d: "Skills and empathy training that equips participants to act." },
  { t: "Prevention tools", d: "Practical resources organizations can keep using after the session." },
];
const audiences = ["Military and veteran communities", "Schools", "Workplaces", "Public institutions"];

const org = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Interactive Advocacy",
  url: "https://www.drtanyaojones.com/interactive-advocacy",
  founder: { "@type": "Person", name: "Dr. Tanya O. Jones", url: "https://www.drtanyaojones.com/about" },
  description: "Violence-prevention training through theatrical presentations, teaching and prevention tools.",
};

export default function InteractiveAdvocacy() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <PageHero eyebrow="Interactive Advocacy" title="A.C.T©: actively create transformation." sub="Dr. Jones's company for violence-prevention training. Engaging, empowering and transforming individuals and communities to prevent violence." />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-3xl">What it is</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {pillars.map((p) => <li key={p.t} className="rounded-sm border border-ink/10 bg-white p-6"><h3 className="font-display text-xl">{p.t}</h3><p className="mt-2 text-ink/75">{p.d}</p></li>)}
        </ul>
        <h2 className="mt-14 font-display text-3xl">Who it serves</h2>
        <ul className="mt-6 flex flex-wrap gap-3">{audiences.map((a) => <li key={a} className="rounded-full border border-navy/30 px-4 py-2 text-sm">{a}</li>)}</ul>
      </section>

      <section id="shop" className="scroll-mt-8 bg-mist py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-3xl">Shop &amp; Merch</h2>
          <p className="mt-2 max-w-2xl text-ink/75">THIS IS NOT A GAME: a series of interactive training tools designed to increase critical thinking and problem solving skills and to integrate fun into your training environment. Books, training tools and advocacy gear, all in one place.</p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <li key={p.slug} className="flex flex-col overflow-hidden rounded-sm border border-ink/10 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.title} width={241} height={241} loading="lazy" className="aspect-square w-full object-cover" />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal">{p.kind}</p>
                  <h3 className="mt-1 font-display text-xl">{p.title}</h3>
                  {p.blurb ? <p className="mt-2 text-sm text-ink/75">{p.blurb}</p> : null}
                  <p className="mt-auto pt-3 text-lg font-semibold text-gov">{p.price}</p>
                  <a href="https://interactiveadvocacy.com" rel="noopener" className="mt-2 inline-block text-sm font-semibold text-gov underline focus-ring">Buy on Interactive Advocacy &#8599;</a>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink/70"><Placeholder>Confirm prices</Placeholder> Prices are as shown on interactiveadvocacy.com in Nov 2026 and need confirmation before launch. Cart and checkout stay on Interactive Advocacy for now.</p>

          <h3 className="mt-14 font-display text-2xl">Awareness Vibes merch</h3>
          <p className="mt-2 max-w-3xl text-ink/75">Created to raise public awareness of toxic behaviors that impact our communities. For the free-thinking, independent, responsive and empowered (FIRE) bystander: don&apos;t just stand there; be your unstoppable self.</p>
          <ul className="mt-5 grid gap-2 text-sm text-ink/80 sm:grid-cols-2 lg:grid-cols-3">
            {[["Advocate Chenille Hoodie","$65.00"],["Be Unstoppable Hoodie","$45.00"],["Be Unstoppable Sweatshirt","$40.00"],["Advocate Voyager Bag","$75.00"],["Advocate Comfy Roll","$20.00"],["Don't Just Stand There Varsity Jacket","$150.00"],["Chenille Awareness Ribbon Patch","$10.00"],["Advocate T-Shirt","$30.00"]].map(([n,pr]) => <li key={n} className="flex justify-between border-b border-ink/10 py-2"><span>{n}</span><span className="font-semibold">{pr}</span></li>)}
          </ul>
          <p className="mt-4 flex flex-wrap items-center gap-3 text-sm text-ink/70"><Placeholder>Merch photos pending</Placeholder> A sample of the full catalog. Product photography and the full catalog sync come with the store decision.</p>
        </div>
      </section>

      <section id="psa-boxes" className="mx-auto max-w-6xl scroll-mt-8 px-6 py-16">
        <h2 className="font-display text-3xl">Customized PSA video boxes</h2>
        <p className="mt-2 max-w-3xl text-ink/75">Personalized video messages that blend the tactile experience of print with the power of video. Branded video brochures with custom screen sizes, memory and buttons. Currently a waiting list, priced by quote.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-sm border border-ink/10 bg-white p-6">
            <h3 className="font-display text-xl">Basic package: boxes with your video</h3>
            <p className="mt-1 text-sm text-teal">Call for a quote</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink/80">
              <li>50 PSA boxes with custom graphic design</li>
              <li>Swappable MP4 files up to 10 minutes</li>
              <li>2.5&quot; pocket or 5&quot; flyer screen, 256 Mb to 4 Gb memory</li>
              <li>USB recharge and content updates, landscape or portrait</li>
              <li>Soft or hardcover, glossy or matte stock</li>
            </ul>
          </div>
          <div className="rounded-sm border border-ink/10 bg-white p-6">
            <h3 className="font-display text-xl">Production package: content creation</h3>
            <p className="mt-1 text-sm text-teal">Call for a quote</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink/80">
              <li>50 PSA boxes plus one scripted video</li>
              <li>Pre-production, location shoot with HD/4K crew, post-production</li>
              <li>Up to 2 leading actors and 2 featured extras</li>
              <li>Closed captioning and music licensing included</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm text-ink/70">Waiting-list form fields on the current site: package, purpose, timeline, video content, target audience, duration and format. Use the quote form below.</p>
      </section>

      <section className="bg-cream py-12">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl">Procurement</h2>
          <p className="mt-2 max-w-3xl text-ink/75">Interactive Advocacy is a Service-Disabled Veteran-Owned small business and a National Center for Procurement graduate, per its current site. <Placeholder>CAGE and UEI to copy from SAM.gov</Placeholder></p>
          <p className="mt-3 text-sm text-ink/70">Contact: (980) 222-1150 · info@interactiveadvocacy.com · Charlotte, NC. <Placeholder>Reconcile contact details with Dr. Jones&apos;s own</Placeholder></p>
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
