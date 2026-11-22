"use client";
import { useEffect } from "react";
export function RegisterSW() {
  useEffect(() => { if ("serviceWorker" in navigator && process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_DEMO) navigator.serviceWorker.register("/sw.js").catch(() => {}); }, []);
  return null;
}
