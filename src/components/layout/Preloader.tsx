"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { makeCraneDrawer } from "@/lib/crane";
import { BLD_X, CranePaths, Floors, GROUND, HookGear, PILE_X, Pile, floorTop } from "@/components/ui/ConstructionArt";

const BUILD_TIME = 3.8; // seconds before the curtain lifts (keep in sync with introDelay)

/** Once per session: a tower crane builds a building floor by floor, then the curtain lifts. */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const tape = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    let seen = false;
    try { seen = sessionStorage.getItem("sb-pre") === "1"; } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduce) {
      html.dataset.pre = "seen";
      setGone(true);
      return;
    }

    html.dataset.pre = "first";
    html.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const el = root.current!;
      const draw = makeCraneDrawer(el);
      const p = { x: PILE_X, y: 150 };
      draw(p);

      gsap.set(".fl", { opacity: 0 });
      gsap.set(".crane", { opacity: 0, y: -30 });

      const update = (time: number) => {
        const v = Math.min(100, Math.round((time / BUILD_TIME) * 100));
        if (pct.current) pct.current.textContent = `${v}%`;
        if (tape.current) tape.current.style.clipPath = `inset(0 ${100 - v}% 0 0)`;
        if (label.current) {
          label.current.textContent =
            v < 12 ? "Surveying the site" : v < 30 ? "Laying the foundation" : v < 85 ? "Raising the structure" : "Finishing touches";
        }
      };

      const tl = gsap.timeline({
        onUpdate: () => update(tl.time()),
        onComplete: () => {
          try { sessionStorage.setItem("sb-pre", "1"); } catch {}
          html.dataset.pre = "seen";
          html.style.overflow = "";
          setGone(true);
        },
      });

      tl.fromTo(".ground", { scaleX: 0, svgOrigin: "1000 540" }, { scaleX: 1, duration: 0.6, ease: "power3.out" }, 0)
        .to(".crane", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.15);

      let t = 0.6;
      for (let k = 0; k < 5; k++) {
        tl.to(p, { x: PILE_X, y: GROUND - 27, duration: 0.14, onUpdate: () => draw(p) }, t)
          .set(".h-load", { opacity: 1 }, t + 0.14)
          .to(p, { x: BLD_X, y: floorTop(k) - 25, duration: 0.26, ease: "power1.inOut", onUpdate: () => draw(p) }, t + 0.14)
          .fromTo(`.fl-${k}`, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.1, immediateRender: false }, t + 0.4)
          .set(".h-load", { opacity: 0 }, t + 0.4);
        t += 0.5;
      }
      tl.to(".win-lit", { opacity: 0.9, stagger: 0.025, duration: 0.25 }, t)
        .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "power4.inOut" }, BUILD_TIME);
    }, root);

    return () => {
      ctx.revert();
      html.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white text-navy/85 [clip-path:inset(0_0_0_0)]"
    >
      <div className="hazard absolute inset-x-0 top-0 h-3" />
      <svg viewBox="840 60 480 500" className="w-[min(82vw,460px)] overflow-visible">
        <CranePaths />
        <Floors to={5} />
        <Pile />
        <HookGear />
        <rect className="ground" x="760" y={GROUND - 1} width="480" height="4" fill="var(--gold)" />
      </svg>

      <div className="mt-8 w-[min(80vw,420px)]">
        <div className="mb-3 flex items-center justify-between font-sub text-xs font-semibold uppercase tracking-[0.25em]">
          <span ref={label} className="text-navy">Surveying the site</span>
          <span ref={pct} className="text-gold-ink">0%</span>
        </div>
        <div className="relative h-4">
          <div className="tape absolute inset-0 text-navy/20" />
          <div ref={tape} className="tape absolute inset-0 text-gold-ink [clip-path:inset(0_100%_0_0)]" />
        </div>
      </div>

      <p className="mt-8 font-heading text-2xl font-extrabold tracking-[0.3em] text-navy">SUNRISE</p>
      <p className="mt-1 font-heading text-xs font-medium tracking-[0.7em] text-gold-ink">BUILDERS</p>
      <div className="hazard absolute inset-x-0 bottom-0 h-3" />
    </div>
  );
}
