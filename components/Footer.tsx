import Link from "next/link";
export function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-xl text-white">Dr. Tanya O. Jones</p>
          <p className="mt-2 text-sm">Policy &amp; Leadership Forums, keynotes and violence-prevention training.</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Explore</p>
          <ul className="mt-2 space-y-1">
            <li><Link href="/forums" className="hover:text-white">Policy &amp; Leadership Forums</Link></li>
            <li><Link href="/forums#inquire" className="hover:text-white">Book Dr. Jones</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Training arm</p>
          <p className="mt-2">Live theatrical violence-prevention training is offered through Interactive Advocacy.</p>
          <a href="https://interactiveadvocacy.com" rel="noopener" className="mt-2 inline-block underline hover:text-white">Visit Interactive Advocacy</a>
        </div>
      </div>
      <p className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/50">
        Preview build. Content marked Placeholder is not final. Year: {new Date().getFullYear()}
      </p>
    </footer>
  );
}
