# Dr. Tanya O. Jones: website redesign

Next.js 14 + Tailwind build of drtanyaojones.com, with Interactive Advocacy as a section of the site ("a Dr. Tanya O. Jones company").

**Presentation demo:** https://aaron2047.github.io/drtanyajones-site/ (forms and checkout are simulated; hidden from search engines).

## Run locally

```
npm install
cp .env.example .env.local
npm run dev
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Three-slide banner (who we are, what we do, who we serve), upcoming events, audience paths |
| `/forums`, `/keynotes` | Policy & Leadership Forums and speaking formats, each with an inquiry form |
| `/events` | Dated list by month; past events move to Recent appearances automatically |
| `/about`, `/work-and-impact`, `/insights` | Her bio, focus areas and writing |
| `/interactive-advocacy` | The company section: programs, Don't Just Stand There! Series©, coalition, FAQ, procurement, request form |
| `/interactive-advocacy/<program>` | One page per training program |
| `/interactive-advocacy/shop` and `/shop/<product>` | Shop, product pages with photo viewer, slide-out cart |

## Store

`COMMERCE_PROVIDER` / `NEXT_PUBLIC_COMMERCE` choose the store: `wix` (Interactive Advocacy's existing Wix Store through Wix Headless, the plan), `shopify` (alternative), or empty for the local preview catalog in `lib/products.ts`. See `.env.example`.

## Deploys

- `.github/workflows/demo.yml` builds the static presentation demo (`scripts/build-demo.mjs`) and publishes it to GitHub Pages on every push to `main`. Pages source must be set to **GitHub Actions**.
- `scripts/build-preview.py` turns the same build into the one-page preview used on claude.ai.

## Status

Content marked **Placeholder** is not verified yet; see the session summary and the Digital Presence Review. GLOW Framework is on hold. Redirects from interactiveadvocacy.com are in `next.config.mjs`; some old Wix addresses are marked "confirm".
