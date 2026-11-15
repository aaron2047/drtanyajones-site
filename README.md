# Dr. Tanya O. Jones: site preview

Next.js 14 + Tailwind preview of the redesigned personal site (home + Policy & Leadership Forums).

## Run
    npm install
    cp .env.example .env.local
    npm run dev

## Status
- Content marked **Placeholder** is not verified. See the Digital Presence Review, section 07 and "What we need from you".
- GLOW framework intentionally not built yet (audit questions 8 to 12 open).
- Inquiry API routes by type via `INQUIRY_TO_*`; logs to console without a Resend key.
- Hero video via `NEXT_PUBLIC_HERO_VIDEO` / `NEXT_PUBLIC_HERO_POSTER`.

## Pages
/ (home), /forums, /keynotes, /events (calendar + auto-archive), /shop (2 placeholder products), /about, /work-and-impact.
Event and product data live in `lib/events.ts` and `lib/products.ts` until the CMS and Shopify are connected.

## Redesign draft (government-style)
- Header: scrolling announcement strip (pausable on hover/focus, static for reduced motion), centered wordmark, centered menu, Training dropdown. Swap the wordmark for the logo image in `components/Header.tsx`.
- Hero image: drop `public/images/hero-*.jpg (explicit paths per page)` (or .webp/.png) and every hero uses it automatically.
- `/training` = A.C.T© division with Shop & Merch (links to interactiveadvocacy.com) and a training quote form. `/shop` redirects there.
- Installable app (PWA): manifest, icons and service worker included. Native App Store / Google Play builds would be a later wrapper (Capacitor).
- Fonts: Source Serif 4 and Inter, self-hosted via @fontsource.
