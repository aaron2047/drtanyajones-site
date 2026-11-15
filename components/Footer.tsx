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
            <li><Link href="/keynotes" className="hover:text-white">Keynotes</Link></li>
            <li><Link href="/events" className="hover:text-white">Events</Link></li>
            <li><Link href="/training" className="hover:text-white">Training</Link></li>
            <li><Link href="/training#shop" className="hover:text-white">Shop &amp; Merch</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/work-and-impact" className="hover:text-white">Work &amp; Impact</Link></li>
            <li><Link href="/forums#inquire" className="hover:text-white">Book Dr. Jones</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Training division</p>
          <p className="mt-2">A.C.T© violence-prevention training is delivered through Interactive Advocacy.</p>
          <a href="https://interactiveadvocacy.com" rel="noopener" className="mt-2 inline-block underline hover:text-white">Visit Interactive Advocacy</a>
        </div>
      </div>
      <p className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/50">
        Preview build. Content marked Placeholder is not final. Year: {new Date().getFullYear()}
      </p>
    </footer>
  );
}
