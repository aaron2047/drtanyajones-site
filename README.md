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
