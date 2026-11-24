"""Turns the static demo export (./out, built with base path "") into a one-page preview for a claude.ai artifact.

Artifacts allow one HTML page plus its own files, and only plain #name hashes, so every route becomes a
section of one page and links become #names. React is gone; a small script redoes the interactive parts:
page routing, the banner carousel, mobile menu, product photo viewer, cart and simulated forms.
Usage: node scripts/build-demo.mjs "" && python3 scripts/build-preview.py <outdir>
"""
import os, re, shutil, sys, html, json

SRC = "out"
DST = sys.argv[1] if len(sys.argv) > 1 else "/home/claude/preview-site"

def name_for(path):
    p = path.strip("/")
    if p in ("", "index.html"): return "home"
    parts = p.split("/")
    if parts[0] == "interactive-advocacy":
        if len(parts) == 1: return "interactive-advocacy"
        if parts[1] == "shop": return "shop" if len(parts) == 2 else "shop-" + parts[2]
        return "ia-team" if parts[1] == "team" else "program-" + parts[1]
    return parts[0]

pages = {}
for root, _, files in os.walk(SRC):
    if "index.html" in files and "/_next" not in root and "/404" not in root:
        rel = os.path.relpath(root, SRC)
        pages[name_for("" if rel == "." else rel)] = open(os.path.join(root, "index.html")).read()

def rewrite(s):
    def href(m):
        url = m.group(1)
        path, _, frag = url.partition("#")
        n = name_for(path)
        return f'href="#{n}--{frag}"' if frag else f'href="#{n}"'
    s = re.sub(r'href="(/[^"]*)"', href, s)
    s = re.sub(r'(src|href)="/(images|icons)/', r'\1="\2/', s)
    s = re.sub(r'<script\b[^>]*>.*?</script>', "", s, flags=re.S)
    s = re.sub(r'<link\b[^>]*(preload|modulepreload)[^>]*>', "", s)
    return s

def parts(doc):
    body = re.search(r"<body[^>]*>(.*)</body>", doc, re.S).group(1)
    head, rest = body.split('<main id="main"', 1)
    main_open_end = rest.index(">") + 1
    main, foot = rest[main_open_end:].split("</main>", 1)
    return head, main, foot

home_head, _, footer = parts(pages["home"])
plain_head, _, _ = parts(pages["about"])
ia_head, _, _ = parts(pages["interactive-advocacy"])
titles = {n: html.unescape(re.search(r"<title>(.*?)</title>", d).group(1)) for n, d in pages.items()}

sections = []
order = ["home"] + sorted(n for n in pages if n != "home")
for n in order:
    _, main, _ = parts(pages[n])
    sections.append(f'<section data-page="{n}" hidden>{rewrite(main)}</section>')

os.makedirs(DST, exist_ok=True)
css_file = [f for f in os.listdir(f"{SRC}/_next/static/css")][0]
css = open(f"{SRC}/_next/static/css/{css_file}").read().replace("/_next/static/media/", "media/")
open(f"{DST}/site.css", "w").write(css)
shutil.copytree(f"{SRC}/_next/static/media", f"{DST}/media", dirs_exist_ok=True)
shutil.copytree(f"{SRC}/images", f"{DST}/images", dirs_exist_ok=True)

script = open(os.path.join(os.path.dirname(__file__), "preview.js")).read()
page = f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Dr. Tanya O. Jones site preview</title><link rel="stylesheet" href="site.css">
<style>[data-page][hidden]{{display:none}} .pv-panel a{{color:#fff}}</style></head>
<body>
<div id="hdr-home" hidden>{rewrite(home_head)}</div><div id="hdr-plain" hidden>{rewrite(plain_head)}</div><div id="hdr-ia" hidden>{rewrite(ia_head)}</div>
<div id="hdr"></div>
<main id="main">{''.join(sections)}</main>
{rewrite(footer)}
<script>const TITLES={json.dumps(titles)};
{script}</script></body></html>"""
open(f"{DST}/index.html", "w").write(page)
print("pages:", len(sections), "size:", len(page))
