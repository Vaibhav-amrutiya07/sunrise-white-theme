import { lenisRef } from "./lenis";

/** Smooth-scroll to an element id via Lenis (falls back to native). */
export function scrollToId(id: string, offset = -90) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisRef.current) lenisRef.current.scrollTo(el, { offset, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}
