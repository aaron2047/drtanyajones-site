"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// The header logo: Dr. Jones's logo everywhere, Interactive Advocacy's on its own section
// (/interactive-advocacy and the program and shop pages under it), with the endorsement line beneath.
export function HeaderLogo() {
  const ia = usePathname().startsWith("/interactive-advocacy");
  if (ia)
    return (
      <>
        <Link href="/interactive-advocacy" className="inline-block focus-ring" aria-label="Interactive Advocacy, section home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/ia-logo-header.png" alt="Interactive Advocacy" width={381} height={352} className="mx-auto h-16 w-auto lg:h-24" />
        </Link>
        <p className="tagline mt-1 hidden text-[11px] font-semibold uppercase tracking-[0.3em] text-teal sm:block">A Dr. Tanya O. Jones company</p>
      </>
    );
  return (
    <>
      <Link href="/" className="inline-block focus-ring" aria-label="Dr. Tanya O. Jones, home">
        {/* Draft crop from the current site. Replace public/images/logo.png with the original transparent PNG. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logo.png" alt="Dr. Tanya O. Jones" width={130} height={98} className="logo-dark mx-auto h-16 w-auto lg:h-24" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logo-light.png" alt="" aria-hidden width={137} height={125} className="logo-light mx-auto h-16 w-auto lg:h-24" />
      </Link>
      <p className="tagline mt-1 hidden text-[11px] font-semibold uppercase tracking-[0.3em] text-teal sm:block">Global Thought Leader | Governance | Humanity</p>
    </>
  );
}
