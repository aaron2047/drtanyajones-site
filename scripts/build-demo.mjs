// Builds the presentation demo: a static copy of the site for GitHub Pages.
// Forms and checkout are simulated (no server), the shop uses the preview catalog, and old-site redirects are off.
// Usage: node scripts/build-demo.mjs [basePath]   (default /drtanyajones-site, the repo name)
import { cpSync, rmSync, writeFileSync, readdirSync, readFileSync, statSync, mkdtempSync, existsSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { execSync } from "node:child_process";

const base = process.argv[2] ?? "/drtanyajones-site";
const root = process.cwd();
const work = mkdtempSync(join(tmpdir(), "demo-"));
cpSync(root, work, { recursive: true, filter: (p) => !/node_modules|\.next|\/out(\/|$)|\.git(\/|$)/.test(p.slice(root.length)) });
execSync(`ln -s ${join(root, "node_modules")} ${join(work, "node_modules")}`);

// Server-only parts have no place on a static host.
for (const p of ["app/api", "app/manifest.ts"]) rmSync(join(work, p), { recursive: true, force: true });
writeFileSync(join(work, "next.config.mjs"), `export default { output: "export", basePath: ${JSON.stringify(base)}, trailingSlash: true, images: { unoptimized: true } };\n`);

execSync("npx next build", { cwd: work, stdio: "inherit", env: { ...process.env, NEXT_PUBLIC_DEMO: "1", NEXT_PUBLIC_BASE_PATH: base, COMMERCE_PROVIDER: "", NEXT_PUBLIC_COMMERCE: "" } });

// Plain <img src="/images/..."> paths do not get the base path from Next, so add it.
const out = join(work, "out");
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
for (const f of walk(out).filter((f) => /\.(html|js|txt|json|css)$/.test(f))) {
  const s = readFileSync(f, "utf8");
  const t = s.replace(/(["'(])\/(images|icons)\//g, `$1${base}/$2/`);
  if (t !== s) writeFileSync(f, t);
}
writeFileSync(join(out, ".nojekyll"), "");
rmSync(join(root, "out"), { recursive: true, force: true });
cpSync(out, join(root, "out"), { recursive: true });
console.log(`Demo built in ./out (base path ${base})`);
