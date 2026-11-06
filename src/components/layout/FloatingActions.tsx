"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { lenisRef } from "@/lib/lenis";
import { SwapArrow } from "@/components/ui/Arrow";

const R = 22;
const C = 2 * Math.PI * R;
const WA_URL = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Sunrise Builders, I would like to discuss a construction project.")}`;

/** Scroll-progress "back to top" ring + WhatsApp control. Designed as a pair. */
export default function FloatingActions() {
  const [show, setShow] = useState(false);
  const ring = useRef<SVGCircleElement>(null);
  const pct = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (ring.current) ring.current.style.strokeDashoffset = String(C * (1 - p));
      if (pct.current) pct.current.textContent = `${Math.round(p * 100)}%`;
      setShow(window.scrollY > 520);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  const top = () =>
    lenisRef.current
      ? lenisRef.current.scrollTo(0, { duration: 1.6, easing: (t: number) => 1 - Math.pow(1 - t, 4) })
      : window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div
      className="fixed z-40 flex flex-col items-end gap-3"
      style={{ right: "max(1rem, env(safe-area-inset-right))", bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      {/* back to top + scroll progress */}
      <button
        onClick={top}
        aria-label="Back to top"
        tabIndex={show ? 0 : -1}
        className={`group relative grid h-12 w-12 place-items-center rounded-full bg-navy-deep/85 text-offwhite shadow-[0_14px_40px_-14px_rgba(0,0,0,.6)] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(.7,0,.2,1)] md:h-[3.25rem] md:w-[3.25rem] ${
          show ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-75 opacity-0"
        }`}
      >
        <svg viewBox="0 0 52 52" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
          <circle cx="26" cy="26" r={R} fill="none" stroke="var(--offwhite)" strokeOpacity=".14" strokeWidth="1.5" />
          <circle
            ref={ring}
            cx="26"
            cy="26"
            r={R}
            fill="none"
            stroke="var(--gold)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C}
          />
        </svg>
        <span className="relative text-gold transition-opacity duration-300 group-hover:opacity-0">
          <SwapArrow dir="up" className="h-4 w-4" />
        </span>
        <span ref={pct} aria-hidden className="absolute font-sub text-[10px] font-semibold tabular-nums text-offwhite opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          0%
        </span>
      </button>

      {/* WhatsApp: opens only on click (plain link, no auto-open) */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute right-[calc(100%+0.75rem)] hidden origin-right items-center gap-2 whitespace-nowrap rounded-full border border-gold/30 bg-navy-deep/90 py-2 pl-4 pr-3 font-sub text-xs font-semibold text-offwhite opacity-0 shadow-xl backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(.7,0,.2,1)] [transform:translateX(12px)_scaleX(.85)] group-hover:opacity-100 group-hover:[transform:none] md:flex"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
          Discuss Your Project
          <span className="text-gold"><SwapArrow className="h-3.5 w-3.5" /></span>
        </span>

        <span className="relative grid h-14 w-14 place-items-center md:h-[3.75rem] md:w-[3.75rem]">
          <span aria-hidden className="pulse-ring absolute inset-0 rounded-full border border-gold" />
          <span aria-hidden className="pulse-ring delay absolute inset-0 rounded-full border border-gold" />
          <span className="absolute inset-0 rounded-full bg-gold shadow-[0_16px_40px_-12px_rgba(217,164,65,.55)] transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-105" />
          <span aria-hidden className="absolute inset-[5px] rounded-full border border-navy/15" />
          <svg viewBox="0 0 24 24" className="relative h-7 w-7 text-navy transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:-rotate-12 group-hover:scale-110" fill="currentColor" aria-hidden>
            <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.27-1.38A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.2 8.2 0 1 1 6.98 3.87Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-1.98-1.22 7.4 7.4 0 0 1-1.37-1.7c-.14-.25-.02-.38.1-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.76-1.85-.2-.48-.41-.41-.56-.42h-.48c-.16 0-.43.06-.66.31-.23.25-.87.85-.87 2.08s.9 2.41 1.02 2.58c.12.16 1.76 2.69 4.27 3.77.6.26 1.06.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.46-.6 1.67-1.17.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.48-.29Z" />
          </svg>
          <span aria-hidden className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full border-2 border-offwhite bg-[#25D366]" />
        </span>
      </a>
    </div>
  );
}
