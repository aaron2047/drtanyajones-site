"use client";
import { useEffect, useState } from "react";

// Shown when the store's checkout sends the shopper back with ?order=complete.
export function OrderComplete() {
  const [done, setDone] = useState(false);
  useEffect(() => setDone(new URLSearchParams(window.location.search).get("order") === "complete"), []);
  return done ? <p role="status" className="mx-auto max-w-6xl px-6 py-4 font-semibold text-gov">Thank you. Your order is in, and a confirmation is on its way to your email.</p> : null;
}
