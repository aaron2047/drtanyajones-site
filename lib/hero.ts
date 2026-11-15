import fs from "node:fs";
import path from "node:path";
// Drop a full-bleed image at public/hero.jpg (or .webp) and it is used automatically by every hero.
export function heroImage(): string | undefined {
  for (const f of ["hero.jpg", "hero.webp", "hero.png"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", f))) return `/${f}`;
  }
  return undefined;
}
