"use client";
import { usePathname } from "next/navigation";

// On the home page the logo and menu float over the full-bleed hero (whitehouse.gov style).
// Everywhere else they sit on a solid white bar.
export function HeaderShell({ ticker, children }: { ticker: React.ReactNode; children: React.ReactNode }) {
  const overlay = usePathname() === "/";
  return (
    <header data-overlay={overlay ? "true" : "false"} className={overlay ? "relative z-30" : "bg-white"}>
      {ticker}
      <div className={overlay ? "absolute left-0 right-0 top-full bg-gradient-to-b from-gov/80 to-transparent pb-10" : ""}>{children}</div>
    </header>
  );
}
