"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Template({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const skip =
      document.documentElement.dataset.pre === "first" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (skip) {
      el.style.display = "none";
    } else {
      gsap.set(el, { display: "block" });
      gsap.fromTo(".shutter-gold", { yPercent: 0 }, { yPercent: -100, duration: 0.9, ease: "power4.inOut", delay: 0.05 });
      gsap.fromTo(".shutter-navy", { yPercent: 0 }, { yPercent: -100, duration: 0.9, ease: "power4.inOut", delay: 0.17, onComplete: () => { el.style.display = "none"; } });
    }
    const t = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div ref={root} aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
        <div className="shutter-gold absolute inset-0 bg-gold" />
        <div className="shutter-navy absolute inset-0 bg-white" />
      </div>
      {children}
    </>
  );
}
