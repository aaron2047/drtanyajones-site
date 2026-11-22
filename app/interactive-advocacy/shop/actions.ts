"use server";
import { redirect } from "next/navigation";
import { checkoutUrl } from "@/lib/commerce";

export async function buyNow(form: FormData) {
  const variantId = String(form.get("variantId") || "");
  const qty = Math.min(Math.max(Number(form.get("quantity")) || 1, 1), 50);
  if (!variantId) redirect("/interactive-advocacy#inquire");
  redirect(await checkoutUrl(variantId, qty));
}
