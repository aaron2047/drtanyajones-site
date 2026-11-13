"use client";
import { useState } from "react";
import { inquiryTypes } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";

export function InquiryForm({ defaultType = "forum" }: { defaultType?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [type, setType] = useState(defaultType);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending"); setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
    } catch (err: any) { setError(err.message); setStatus("error"); }
  }

  if (status === "sent")
    return (
      <div role="status" className="rounded-2xl border border-brass bg-white p-8">
        <h3 className="font-display text-2xl">Thank you. Your inquiry is in.</h3>
        <p className="mt-2 text-ink/80">A confirmation is on its way to your email. Dr. Jones&apos;s team will follow up with next steps and a discovery-call link.</p>
      </div>
    );

  const field = "mt-1 w-full rounded-lg border border-ink/20 bg-white px-3 py-2 focus-ring";
  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl border border-ink/10 bg-white p-6 md:grid-cols-2 md:p-8" noValidate={false}>
      <label className="md:col-span-2 text-sm font-semibold">What are you inquiring about?
        <select name="type" required value={type} onChange={(e) => setType(e.target.value)} className={field}>
          {inquiryTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </label>
      <label className="text-sm font-semibold">Your name<input name="name" required autoComplete="name" className={field} /></label>
      <label className="text-sm font-semibold">Email<input name="email" type="email" required autoComplete="email" className={field} /></label>
      <label className="text-sm font-semibold">Organization<input name="organization" required autoComplete="organization" className={field} /></label>
      <label className="text-sm font-semibold">Host type
        <select name="hostType" required className={field} defaultValue="">
          <option value="" disabled>Select</option>
          <option>Government</option><option>International / intergovernmental</option><option>University or school</option>
          <option>Military or veteran organization</option><option>Corporate</option><option>Nonprofit or association</option><option>Faith-based</option><option>Other</option>
        </select>
      </label>
      <label className="text-sm font-semibold">Preferred date or window<input name="date" placeholder="e.g. Spring 2027" className={field} /></label>
      <label className="text-sm font-semibold">Audience size<input name="audience" placeholder="e.g. 150" className={field} /></label>
      <label className="text-sm font-semibold">Format
        <select name="format" className={field} defaultValue="">
          <option value="">Not sure yet</option><option>In person</option><option>Virtual</option><option>Hybrid</option>
        </select>
      </label>
      {type === "probono" ? (
        <label className="text-sm font-semibold">Budget or honorarium context<input name="budget" placeholder="Tell us about your situation" className={field} /></label>
      ) : (
        <label className="text-sm font-semibold">Budget range (optional)<input name="budget" className={field} /></label>
      )}
      <label className="md:col-span-2 text-sm font-semibold">Goals for the event
        <textarea name="message" rows={4} required className={field} />
      </label>
      <label className="hidden" aria-hidden>Leave blank<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="md:col-span-2 flex flex-wrap items-center gap-4">
        <button disabled={status === "sending"} className="rounded-full bg-ink px-6 py-3 font-semibold text-white hover:bg-navy disabled:opacity-60 focus-ring">
          {status === "sending" ? "Sending..." : "Send inquiry"}
        </button>
        {status === "error" && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <p className="text-xs text-ink/60">Routed by inquiry type. Confirmation is sent instantly.</p>
      </div>
    </form>
  );
}
