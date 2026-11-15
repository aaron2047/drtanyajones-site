import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";

export const metadata: Metadata = { title: "Keynotes, Panels and Workshops | Dr. Tanya O. Jones", description: "Keynotes, forums, panels, faith and values, and executive conversations." };
const items = [
  { t: "Keynotes", d: "Leadership, governance, ethics and social responsibility for conferences and summits." },
  { t: "Policy & Leadership Forums", d: "Contributions to policy discussions and strategic dialogues in government, international and institutional settings.", href: "/forums" },
  { t: "Panels & Moderation", d: "Participating in and facilitating panels and inclusive conversations." },
  { t: "Faith, Values & Leadership", d: "The role of faith and values in leadership and public life." },
  { t: "Workshops & Executive Conversations", d: "Facilitated sessions for reflection, alignment and practical application." },
];
export default function Keynotes() {
  return (
    <>
      <PageHero eyebrow="Keynotes and more" title="Five ways to bring Dr. Jones to your event." />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <ul className="grid gap-6 md:grid-cols-2">
          {items.map((i) => (
            <li key={i.t} className="rounded-sm border border-ink/10 bg-white p-6">
              <h2 className="font-display text-xl">{i.t}</h2>
              <p className="mt-2 text-ink/75">{i.d}</p>
              <p className="mt-3 flex items-center gap-3 text-sm"><Placeholder>Audience fit and outcomes pending</Placeholder>{i.href && <Link href={i.href} className="font-semibold underline">Learn more</Link>}</p>
            </li>
          ))}
        </ul>
        <Link href="/forums#inquire" className="mt-10 inline-block rounded-full bg-ink px-6 py-3 font-semibold text-white hover:bg-navy focus-ring">Book Dr. Jones</Link>
      </section>
    </>
  );
}
