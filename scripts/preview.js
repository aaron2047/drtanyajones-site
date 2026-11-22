{
  // ---------- routing: #page or #page--anchor ----------
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const hdr = $("#hdr");
  let current = "";

  function show(name, anchor) {
    const sec = $(`[data-page="${name}"]`);
    if (!sec) return false;
    if (name !== current) {
      $$("[data-page]").forEach((s) => (s.hidden = s !== sec));
      hdr.innerHTML = $(name === "home" ? "#hdr-home" : "#hdr-plain").innerHTML;
      current = name;
      document.title = TITLES[name] || document.title;
      wireHeader();
      wirePage(sec);
    }
    const target = anchor && sec.querySelector("#" + CSS.escape(anchor));
    if (target) target.scrollIntoView(); else if (!anchor) window.scrollTo(0, 0);
    return true;
  }
  function route() {
    const h = decodeURIComponent(location.hash.slice(1));
    if (!h) return show("home");
    const [page, anchor] = h.split("--");
    if (show(page, anchor)) return;
    const el = current && $(`[data-page="${current}"]`).querySelector("#" + CSS.escape(h));
    if (el) el.scrollIntoView(); else if (!current) show("home");
  }
  // same-page anchors (#inquire) scroll inside the current page
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const h = a.getAttribute("href").slice(1);
    if (h.includes("--") || $(`[data-page="${h}"]`)) return; // handled by hashchange
    const el = $(`[data-page="${current}"]`)?.querySelector("#" + CSS.escape(h));
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); }
  });
  window.addEventListener("hashchange", route);

  // ---------- header: mobile menu + cart button ----------
  function wireHeader() {
    const btn = $$("#hdr button").find((b) => b.textContent.trim().startsWith("Menu"));
    if (btn) btn.onclick = openMenu;
    renderCartButtons();
  }
  function openMenu() {
    const links = $$('#hdr nav[aria-label="Primary"] a').map((a) => `<a href="${a.getAttribute("href")}" class="block border-b border-white/15 py-3 text-lg font-semibold">${a.textContent}</a>`).join("");
    const p = document.createElement("div");
    p.className = "pv-panel fixed inset-0 z-50 overflow-y-auto bg-gov px-6 pb-10 pt-5 text-white";
    p.setAttribute("role", "dialog"); p.setAttribute("aria-label", "Site menu");
    p.innerHTML = `<div class="flex items-center justify-between"><p class="font-display text-xl">Dr. Tanya O. Jones</p><button class="min-h-[44px] rounded-sm border border-white/40 px-4 text-sm font-semibold uppercase">Close</button></div>
      <div class="mt-6"><a href="#home" class="block border-b border-white/15 py-3 text-lg font-semibold">Home</a>${links}</div>`;
    const close = () => { p.remove(); document.body.style.overflow = ""; };
    p.querySelector("button").onclick = close;
    p.addEventListener("click", (e) => { if (e.target.closest("a")) close(); });
    document.addEventListener("keydown", function esc(e) { if (e.key === "Escape") { close(); document.removeEventListener("keydown", esc); } });
    document.body.style.overflow = "hidden";
    document.body.append(p);
  }

  // ---------- per page ----------
  let timer;
  function wirePage(sec) {
    clearInterval(timer);
    // banner carousel
    const car = sec.querySelector('[aria-roledescription="carousel"]');
    if (car) {
      const slides = $$('[aria-roledescription="slide"]', car), dots = $$('[role="tab"]', car);
      let i = 0, hold = false;
      const go = (n) => {
        i = (n + slides.length) % slides.length;
        slides.forEach((s, k) => {
          s.classList.toggle("opacity-100", k === i); s.classList.toggle("opacity-0", k !== i); s.classList.toggle("pointer-events-none", k !== i);
          s.setAttribute("aria-hidden", k !== i); const img = s.querySelector("img.hero-kb"); if (img) img.dataset.active = k === i;
        });
        dots.forEach((d, k) => { d.classList.toggle("bg-white", k === i); d.classList.toggle("bg-transparent", k !== i); d.setAttribute("aria-selected", k === i); });
      };
      dots.forEach((d, k) => (d.onclick = () => go(k)));
      car.onmouseenter = () => (hold = true); car.onmouseleave = () => (hold = false);
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(() => !hold && go(i + 1), 7000);
      go(0);
    }
    // product photo viewer
    const enlarge = sec.querySelector('button[aria-label^="Enlarge"]'), dlg = sec.querySelector("dialog");
    if (enlarge && dlg) {
      enlarge.onclick = () => dlg.showModal();
      $$("button", dlg).forEach((b) => { if (b.textContent.trim() === "Close") b.onclick = () => dlg.close(); });
      dlg.onclick = (e) => { if (e.target === dlg) dlg.close(); };
    }
    // add to cart
    const add = $$("button", sec).find((b) => b.textContent.trim() === "Add to cart");
    if (add) add.onclick = () => {
      const qty = Math.max(1, Math.min(99, Number(sec.querySelector('input[type="number"]')?.value) || 1));
      const title = sec.querySelector("h1").textContent.trim();
      const price = sec.querySelector("h1 + p").textContent.trim();
      const image = sec.querySelector('button[aria-label^="Enlarge"] img')?.getAttribute("src");
      addToCart({ id: current, title, price, image, qty });
    };
    // forms: simulated
    $$("form", sec).forEach((f) => {
      const msg = sessionStorage.getItem("pv-order");
      if (msg && f.message) { f.message.value = msg; sessionStorage.removeItem("pv-order"); }
      f.onsubmit = (e) => {
        e.preventDefault();
        if (!f.reportValidity()) return;
        f.outerHTML = `<div role="status" class="rounded-sm border border-brass bg-white p-8"><h3 class="font-display text-2xl">Thank you. Your inquiry is in.</h3><p class="mt-2 text-ink/80">In the live site, a confirmation email goes out and the team follows up. (Preview: nothing was sent.)</p></div>`;
      };
    });
  }

  // ---------- cart (kept in this browser) ----------
  const KEY = "pv-cart";
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } };
  const write = (l) => { try { localStorage.setItem(KEY, JSON.stringify(l)); } catch {} };
  const num = (p) => Number(String(p).replace(/[^0-9.]/g, "")) || 0;
  const usd = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });
  let mem = read();
  function save(l) { mem = l; write(l); renderCartButtons(); }
  function addToCart(item) {
    const hit = mem.find((l) => l.id === item.id);
    save(hit ? mem.map((l) => (l === hit ? { ...l, qty: Math.min(99, l.qty + item.qty) } : l)) : [...mem, item]);
    openCart();
  }
  function renderCartButtons() {
    const count = mem.reduce((n, l) => n + l.qty, 0);
    $$(".pv-cart-btn").forEach((b) => b.remove());
    if (!count) return;
    $$("#hdr a").filter((a) => a.textContent.trim() === "Book").forEach((book) => {
      const b = document.createElement("button");
      b.className = "pv-cart-btn cart-btn mr-2 inline-flex min-h-[44px] items-center gap-2 rounded-sm border border-gov/30 px-3 text-sm font-semibold";
      b.textContent = `Cart (${count})`; b.onclick = openCart;
      book.parentElement.insertBefore(b, book);
    });
  }
  function openCart() {
    $("#pv-cart")?.remove();
    const d = document.createElement("div");
    d.id = "pv-cart"; d.className = "fixed inset-0 z-50";
    const total = mem.reduce((n, l) => n + num(l.price) * l.qty, 0);
    d.innerHTML = `<div class="absolute inset-0 bg-gov/60" data-x></div>
      <div role="dialog" aria-label="Cart" class="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-xl">
        <div class="flex items-center justify-between bg-gov px-5 py-4 text-white"><h2 class="font-display text-xl">Cart</h2><button data-x class="min-h-[44px] rounded-sm border border-white/40 px-3 text-sm font-semibold">Close</button></div>
        <ul class="flex-1 divide-y divide-ink/10 overflow-y-auto px-5">${mem.length ? "" : '<li class="py-8 text-ink/70">Your cart is empty.</li>'}${mem.map((l, k) => `
          <li class="grid grid-cols-[64px_1fr_auto] gap-4 py-4">${l.image ? `<img src="${l.image}" alt="" class="h-16 w-16 rounded-sm border border-ink/10 object-cover">` : '<span class="h-16 w-16 rounded-sm bg-mist"></span>'}
            <div><p class="font-semibold leading-snug">${l.title}</p><div class="mt-2 inline-flex items-center rounded-sm border border-ink/20"><button data-q="${k}" data-d="-1" class="h-9 w-9">−</button><span class="w-8 text-center text-sm">${l.qty}</span><button data-q="${k}" data-d="1" class="h-9 w-9">+</button></div></div>
            <div class="text-right"><p class="font-semibold">${usd(num(l.price) * l.qty)}</p><button data-r="${k}" class="mt-2 text-sm text-ink/60 underline">Remove</button></div></li>`).join("")}</ul>
        <div class="border-t border-ink/10 px-5 py-5"><div class="flex justify-between text-lg"><span>Subtotal</span><span class="font-semibold">${usd(total)}</span></div>
          <p class="mt-1 text-sm text-ink/60">Live site: checkout on the Interactive Advocacy store, with promo codes, shipping and tax.</p>
          <button data-go ${mem.length ? "" : "disabled"} class="mt-4 min-h-[48px] w-full rounded-sm bg-brass font-semibold text-gov disabled:opacity-50">Checkout</button></div></div>`;
    d.onclick = (e) => {
      const t = e.target;
      if (t.dataset.x !== undefined) { d.remove(); document.body.style.overflow = ""; }
      else if (t.dataset.q) { const k = +t.dataset.q; save(mem.map((l, i) => (i === k ? { ...l, qty: l.qty + +t.dataset.d } : l)).filter((l) => l.qty > 0)); openCart(); }
      else if (t.dataset.r) { save(mem.filter((_, i) => i !== +t.dataset.r)); openCart(); }
      else if (t.dataset.go !== undefined) {
        sessionStorage.setItem("pv-order", "Order request:\n" + mem.map((l) => `${l.qty} × ${l.title} (${l.price})`).join("\n") + `\nSubtotal: ${usd(total)}`);
        d.remove(); document.body.style.overflow = "";
        location.hash = "interactive-advocacy--inquire";
      }
    };
    document.addEventListener("keydown", function esc(e) { if (e.key === "Escape") { d.remove(); document.body.style.overflow = ""; document.removeEventListener("keydown", esc); } });
    document.body.style.overflow = "hidden";
    document.body.append(d);
  }

  route();
}
