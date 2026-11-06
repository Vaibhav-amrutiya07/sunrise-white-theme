"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Desktop-only gold ring cursor that grows over links and buttons. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
    const move = (e: MouseEvent) => {
      el.style.opacity = "1";
      x(e.clientX);
      y(e.clientY);
      const hot = (e.target as HTMLElement).closest("a, button, [data-cursor]");
      gsap.to(el, { scale: hot ? 2.6 : 1, duration: 0.3, overwrite: "auto" });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200] h-4 w-4 rounded-full border border-gold bg-gold/20 opacity-0"
    />
  );
}
