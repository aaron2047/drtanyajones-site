import { Placeholder } from "./Placeholder";

// Coalition logos, cropped from the current Interactive Advocacy site (small copies; replace with originals).
// Names marked "?" could not be read from the logo and must come from Interactive Advocacy.
const logos: { file: string; name: string }[] = [
  { file: "logo-01.png", name: "U.S. Coast Guard" },
  { file: "logo-02.png", name: "Coalition partner (name needed)" },
  { file: "logo-03.png", name: "U.S. Army" },
  { file: "logo-04.png", name: "Nissi's Network" },
  { file: "logo-05.png", name: "Coalition partner (name needed)" },
  { file: "logo-06.png", name: "Coalition partner (name needed)" },
  { file: "logo-07.png", name: "Coalition partner (name needed)" },
  { file: "logo-08.png", name: "Coalition partner (name needed)" },
  { file: "logo-09.png", name: "Medgar Evers College, City University of New York" },
  { file: "logo-10.png", name: "NYC Department of Youth & Community Development, Workforce Connect" },
  { file: "logo-11.png", name: "My Fitness GPS" },
  { file: "logo-12.png", name: "Modern Kaizen" },
  { file: "logo-13.png", name: "Magellan Federal" },
  { file: "logo-14.png", name: "Institute on Violence, Abuse and Trauma (IVAT)" },
  { file: "logo-15.png", name: "NOVA" },
  { file: "logo-16.png", name: "Military & Veteran Organization Task Force" },
  { file: "logo-17.png", name: "Summer Youth Employment Program" },
  { file: "logo-18.png", name: "North Carolina Veterans Business Association" },
];

// One line of logos in black and white, scrolling slowly; it pauses on hover or keyboard focus.
// With reduced motion it stops and can be scrolled sideways instead.
export function CoalitionStrip() {
  const row = (dup: boolean) => (
    <ul className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={dup || undefined}>
      {logos.map((l) => (
        <li key={l.file} className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/coalition/${l.file}`} alt={dup ? "" : l.name} loading="lazy" className="coalition-logo h-12 w-auto max-w-[130px] object-contain md:h-14 md:max-w-[150px]" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-labelledby="coalition-title" className="border-y border-ink/10 bg-white py-10">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="coalition-title" className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-gov">Backed by a nationwide coalition of organizations and institutions</h2>
      </div>
      <div className="coalition mt-8 overflow-hidden" tabIndex={0} aria-label="Coalition members">
        <div className="coalition-track flex w-max">{row(false)}{row(true)}</div>
      </div>
      <p className="mx-auto mt-6 max-w-6xl px-6 text-center text-xs text-ink/60"><Placeholder>Permission pending</Placeholder> Each logo appears only with the organization&apos;s written permission; military and agency seals imply endorsement.</p>
    </section>
  );
}
