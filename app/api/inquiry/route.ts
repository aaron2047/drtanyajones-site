import { NextResponse } from "next/server";

const ROUTES: Record<string, string | undefined> = {
  forum: process.env.INQUIRY_TO_FORUM,
  keynote: process.env.INQUIRY_TO_KEYNOTE,
  training: process.env.INQUIRY_TO_TRAINING,
  probono: process.env.INQUIRY_TO_PROBONO,
  other: process.env.INQUIRY_TO_OTHER,
};

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
const emailOk = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

async function send(to: string, subject: string, html: string, replyTo?: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) { console.log("[inquiry:preview] would send to", to, "|", subject); return; }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.INQUIRY_FROM, to, subject, html, reply_to: replyTo }),
  });
  if (!res.ok) throw new Error("Email provider error");
}

export async function POST(req: Request) {
  let body: Record<string, string>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (body.website) return NextResponse.json({ ok: true }); // honeypot

  const required = ["type", "name", "email", "organization", "hostType", "message"];
  for (const k of required) if (!body[k]?.toString().trim()) return NextResponse.json({ error: `Please complete: ${k}.` }, { status: 400 });
  if (!emailOk(body.email)) return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  if (!(body.type in ROUTES)) return NextResponse.json({ error: "Unknown inquiry type." }, { status: 400 });

  const to = ROUTES[body.type] || process.env.INQUIRY_TO_OTHER;
  const rows = Object.entries(body).filter(([k]) => k !== "website").map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(String(v))}</td></tr>`).join("");
  try {
    if (to) await send(to, `New ${body.type} inquiry: ${body.organization}`, `<table>${rows}</table>`, body.email);
    else console.log("[inquiry:preview] no route configured", body);
    await send(body.email, "We received your inquiry", `<p>Thank you, ${esc(body.name)}. Dr. Jones's team has your inquiry and will reply with next steps.</p>`);
  } catch { return NextResponse.json({ error: "We could not send your inquiry. Please try again." }, { status: 502 }); }
  return NextResponse.json({ ok: true });
}
