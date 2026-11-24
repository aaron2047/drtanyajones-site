import type { Metadata } from "next";
import { Placeholder } from "@/components/Placeholder";
import { InquiryForm } from "@/components/InquiryForm";
import { products } from "@/lib/products";
import Link from "next/link";
import { Faq } from "@/components/Faq";
import { CoalitionStrip } from "@/components/CoalitionStrip";
import { dontJustStandThere as djst, programs, iaFaqs, toolStory } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Interactive Advocacy: Violence-Prevention Training",
  description: "Trauma-informed, performance-based violence-prevention training from Interactive Advocacy, a Dr. Tanya O. Jones company.",
};

const audiences = ["Military and veteran communities", "Schools", "Workplaces", "Public institutions"];
// The four colors of the Interactive Advocacy logo, in her words.
// "A beacon of hope" section (the four logo colors). Hidden for now; set to true to bring it back.
const SHOW_LOGO_COLORS = false;
const colors = [
  { name: "Teal", means: "Sexual assault", hex: "#2ad2c9" },
  { name: "Purple", means: "Domestic violence", hex: "#7b3fa0" },
  { name: "Yellow", means: "Suicide prevention", hex: "#d3af37" },
  { name: "Green", means: "Mental health", hex: "#5aa04a" },
];

const org = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Interactive Advocacy",
  url: "https://www.drtanyaojones.com/interactive-advocacy",
  logo: "https://www.drtanyaojones.com/images/ia-logo-full.png",
  founder: { "@type": "Person", name: "Dr. Tanya O. Jones", url: "https://www.drtanyaojones.com/about" },
  description: "A national violence-prevention organization delivering trauma-informed education, advocacy training, and culture-shifting tools.",
};
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: iaFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

const h2 = "font-display text-3xl text-gov";
const kicker = "text-sm font-semibold uppercase tracking-[0.2em] text-brass";

export default function InteractiveAdvocacy() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([org, faqSchema]) }} />

      <section className="bg-gradient-to-br from-gov via-navy to-teal pb-14 pt-14 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-[1fr_auto]">
          <div>
            <p className={kicker}>Interactive Advocacy · a Dr. Tanya O. Jones company</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-5xl">Violence prevention, from awareness to action.</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">Interactive Advocacy is a national violence-prevention organization delivering trauma-informed education, advocacy training, and culture-shifting tools that move communities from awareness to action.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="#inquire" className="rounded-sm bg-brass px-6 py-3 font-semibold text-gov hover:bg-white focus-ring">Request a training quote</Link>
              <Link href="#dont-just-stand-there" className="rounded-sm border border-white/60 px-6 py-3 font-semibold text-white hover:bg-white/10 focus-ring">Book a live stage performance</Link>
            </div>
          </div>
          {/* Interactive Advocacy mark (rings only; the name is in the header and the headline). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/ia-logo-mark.png" alt="" width={306} height={314} className="order-first h-auto w-28 md:order-none md:w-56" />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <p className={kicker}>What we do</p>
          <p className="mt-3 text-lg text-ink/85">Interactive Advocacy delivers evidence-based violence prevention training, trauma-informed education, and sexual assault prevention programs that help organizations recognize early warning signs, intervene safely, and prevent harm before it escalates.</p>
        </div>
        <div>
          <p className={kicker}>Who we serve</p>
          <p className="mt-3 text-lg text-ink/85">We serve military and veteran communities, schools, workplaces, and public institutions committed to safety, accountability, and lasting cultural change.</p>
          <ul className="mt-4 flex flex-wrap gap-2">{audiences.map((a) => <li key={a} className="rounded-sm border border-navy/30 px-3 py-1 text-sm">{a}</li>)}</ul>
        </div>
      </section>

      <CoalitionStrip />

      <section id="dont-just-stand-there" className="scroll-mt-8 bg-gov py-16 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <p className={kicker}>Work with us</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">{djst.title}</h2>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-white/70">{djst.kicker}</p>
          <p className="mt-5 max-w-3xl text-lg text-white/85">{djst.body}</p>
          <p className="mt-6 text-sm font-semibold text-white/70">Topics include</p>
          <ul className="mt-2 flex flex-wrap gap-2">{djst.topics.map((t) => <li key={t} className="rounded-sm border border-white/30 px-3 py-1 text-sm">{t}</li>)}<li className="px-1 py-1 text-sm text-white/70">and more</li></ul>
          <Link href="#inquire" className="mt-8 inline-block rounded-sm bg-brass px-6 py-3 font-semibold text-gov hover:bg-white focus-ring">Book a live stage performance</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className={kicker}>Training programs</p>
        <h2 className={"mt-2 " + h2}>Theatrical performance-based training</h2>
        <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
          {programs.map((p) => (
            <li key={p.slug} className="grid gap-3 py-6 md:grid-cols-[16rem_1fr_auto] md:items-start">
              <h3 className="font-display text-xl"><Link href={`/interactive-advocacy/${p.slug}`} className="hover:text-teal focus-ring">{p.title}</Link></h3>
              <div>
                <p className="text-ink/75">{p.summary}</p>
                {p.audience && <p className="mt-2 text-sm text-ink/60">{p.session} · {p.audience}</p>}
              </div>
              <Link href={`/interactive-advocacy/${p.slug}`} className="font-semibold text-navy underline focus-ring">Details<span className="sr-only"> on {p.title}</span></Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-mist py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
          <div>
            <h2 className={h2}>Our vision</h2>
            <p className="mt-4 text-ink/80">Our vision is to Actively Create Transformation (A.C.T©) by engaging, empowering, and transforming individuals and communities proactively to prevent violence. By equipping participants with the knowledge, skills, and empathy needed, we strive to effect positive change. Through our pioneering efforts, we boldly challenge societal norms, reshape perceptions, and build a safer, more compassionate world.</p>
            <p className="mt-3 text-ink/80">We ignite transformative change with groundbreaking theatrical presentations, revolutionary teachings, and innovative prevention tools. Our relentless pursuit is to dismantle all forms of oppression, fostering inclusivity and equality. We envision a world where every individual thrives, and together, we turn this vision into a captivating reality.</p>
          </div>
          <div>
            <h2 className={h2}>Our mission</h2>
            <p className="mt-4 font-display text-xl text-gov">Ignite Change, Redefine Training, Empower ALL.</p>
            <p className="mt-3 text-ink/80">At Interactive Advocacy, we unleash a powerful force for transformation. Through cutting-edge violence prevention training, we shatter the limits of traditional methods. Our unrivaled storytelling and captivating engagement create an unforgettable experience. Empowering individuals and communities, we catalyze profound and lasting change.</p>
          </div>
        </div>
      </section>

      {SHOW_LOGO_COLORS && (
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1fr_1fr]">
        <div>
          <p className={kicker}>A beacon of hope</p>
          <h2 className={"mt-2 " + h2}>The colors that define Interactive Advocacy</h2>
          <p className="mt-4 text-ink/80">The colors selected for the Interactive Advocacy logo hold deep meaning and visually represent Tanya&apos;s triumphant spirit. Each color represents a battle she has fought and overcome. These colors tell her story of survival, resilience, and the transformative power of art and creative expression.</p>
        </div>
        <ul className="grid grid-cols-2 gap-4 self-center">
          {colors.map((c) => (
            <li key={c.name} className="flex items-center gap-3 rounded-sm border border-ink/10 bg-white p-4">
              <span aria-hidden className="h-10 w-10 shrink-0 rounded-full" style={{ background: c.hex }} />
              <span><span className="block font-semibold">{c.name}</span><span className="text-sm text-ink/70">{c.means}</span></span>
            </li>
          ))}
        </ul>
      </section>
      )}

      <section className="bg-cream py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[260px_1fr]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/portrait-impact.jpg" alt="Dr. Tanya O. Jones" loading="lazy" className="w-full rounded-sm" />
          <div>
            <p className={kicker}>Founder and CEO</p>
            <h2 className={"mt-2 " + h2}>Redefining training through storytelling</h2>
            <p className="mt-4 text-ink/80">Dr. Tanya O. Jones has revolutionized the approach to violence prevention training. Her company blends storytelling, lived experiences, drama, comedy, and audience engagement to create a training experience beyond traditional methods. Her storytelling, rooted in her own personal journey, challenges preconceived notions and inspires individuals to Actively Create Transformation (A.C.T©). Tanya has trained over 50 thousand individuals.</p>
            <p className="mt-3 flex flex-wrap items-center gap-3 text-sm text-ink/70"><Placeholder>Verify</Placeholder> This site says 50 thousand; her personal bio says 80,000. Use one figure on both pages.</p>
            <div className="mt-5 flex flex-wrap gap-6"><Link href="/about" className="font-semibold text-navy underline focus-ring">Read her full bio</Link><Link href="/interactive-advocacy/team" className="font-semibold text-navy underline focus-ring">Meet the team</Link></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className={kicker}>Tanya&apos;s journey to empower through training tools</p>
        <h2 className={"mt-2 " + h2}>&ldquo;THIS IS NOT A GAME™&rdquo;</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-2">
          {toolStory.map((s, i) => (
            <li key={s.t} className="border-l-2 border-brass pl-5">
              <p className="text-sm font-semibold text-ink/50">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="font-display text-xl">{s.t}</h3>
              <p className="mt-2 text-ink/75">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="shop" className="scroll-mt-8 bg-mist py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className={h2}>Shop</h2>
              <p className="mt-2 max-w-2xl text-ink/75">Training tools, books and Awareness Vibes merch.</p>
            </div>
            <Link href="/interactive-advocacy/shop" className="font-semibold text-navy underline focus-ring">See the full shop</Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {products.filter((p) => p.image).slice(0, 4).map((p) => (
              <li key={p.slug} className="overflow-hidden rounded-sm border border-ink/10 bg-white">
                <Link href={`/interactive-advocacy/shop/${p.slug}`} className="block focus-ring">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" width={241} height={241} loading="lazy" className="aspect-square w-full object-contain" />
                  <span className="block border-t border-ink/10 p-4"><span className="block font-display text-lg leading-snug">{p.title}</span><span className="mt-2 block font-semibold text-gov">{p.price}</span></span>
                </Link>
              </li>
            ))}
          </ul>
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

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div>
          <p className={kicker}>Professional speaking engagements</p>
          <h2 className={"mt-2 " + h2}>Keynote speaker · Panelist · Moderator · Facilitator</h2>
          <p className="mt-4 text-ink/80">Make an impact at your next organization-wide event with an Interactive Advocacy speaker as the keynote speaker, moderator, or panelist, with experience as advocates and survivors of trauma.</p>
          <p className="mt-3 text-ink/80">Please request a speaker at least six weeks before your event. Submitting the form does not confirm a booking.</p>
          <Link href="#inquire" className="mt-5 inline-block font-semibold text-navy underline focus-ring">Request a speaker</Link>
        </div>
      </section>

      <section id="faq" className="scroll-mt-8 bg-mist py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className={h2}>Frequently asked questions</h2>
          <div className="mt-8"><Faq items={iaFaqs} /></div>
        </div>
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
        <p className="mt-3 max-w-2xl text-ink/75">Training, live stage performances, speakers and orders. Tell us about your group and goals, and you receive an instant confirmation.</p>
        <div className="mt-8"><InquiryForm defaultType="training" /></div>
      </section>
    </>
  );
}
