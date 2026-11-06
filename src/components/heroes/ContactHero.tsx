"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { introDelay, useMotion } from "@/lib/motion";
import { scrollToId } from "@/lib/scrollTo";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { ArrowButton } from "@/components/ui/Arrow";

const SUBTITLE = "Have a project in mind? Connect with Sunrise Builders and take the first step towards making it happen.";

// connection map (viewBox 600 x 560): every conversation topic links back to the hub
const W = 600, H = 560;
const HUB = { x: 300, y: 280 };
const NODES = [
  { x: 96, y: 112 },
  { x: 498, y: 84 },
  { x: 538, y: 330 },
  { x: 104, y: 418 },
  { x: 384, y: 498 },
];
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/** Conversation-driven hero: headline + an interactive "connection map" that reacts to the cursor. */
export default function ContactHero() {
  const root = useRef<HTMLElement>(null);

  useMotion(root, () => {
    const d = introDelay();
    gsap.timeline({ delay: d })
      .fromTo(".ch-line", { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.1, ease: "power4.out" })
      .fromTo(".ch-fade", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "power3.out" }, 0.45)
      .fromTo(".ch-ring", { scale: 0.6, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 1.6, stagger: 0.12, ease: "power3.out" }, 0.2)
      .fromTo(".ch-link", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, stagger: 0.1, ease: "power2.inOut" }, 0.5)
      .fromTo(".ch-node", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, stagger: 0.08, ease: "back.out(2)" }, 0.9);
    gsap.to(".ch-num", { yPercent: 30, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
  });

  // cursor-reactive depth (fine pointers only)
  useEffect(() => {
    const el = root.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-depth]")).map((l) => ({
      d: Number(l.dataset.depth),
      x: gsap.quickTo(l, "x", { duration: 1, ease: "power3" }),
      y: gsap.quickTo(l, "y", { duration: 1, ease: "power3" }),
    }));
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      layers.forEach((l) => { l.x(nx * l.d); l.y(ny * l.d); });
    };
    const leave = () => layers.forEach((l) => { l.x(0); l.y(0); });
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden pb-20 pt-32 text-navy md:pb-28 md:pt-40"
      style={{ background: "linear-gradient(135deg, #ffffff 0%, #ffffff 55%, var(--offwhite) 100%)" }}
    >
      <div
        aria-hidden
        className="absolute bottom-[-30%] left-[-10%] h-[60vw] w-[60vw] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--gold) 45%, transparent), transparent 60%)" }}
      />
      <span aria-hidden className="ch-num outline-text-navy pointer-events-none absolute -right-[2vw] -top-[4vw] select-none font-heading text-[32vw] font-extrabold leading-none opacity-[0.05]">
        03
      </span>

      <div className="wrap relative grid items-center gap-10 lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-7">
          <div className="ch-fade"><Breadcrumb crumb="Contact Us" tone="light" /></div>
          <h1 className="mt-10 font-heading text-[clamp(2.75rem,7.6vw,6.75rem)] font-extrabold leading-[0.98] tracking-tight">
            <span className="block overflow-hidden pb-[0.06em]"><span className="ch-line block">Let&apos;s Create</span></span>
            <span className="block overflow-hidden pb-[0.06em]"><span className="ch-line outline-text-navy block">Something</span></span>
            <span className="block overflow-hidden pb-[0.06em]"><span className="ch-line block text-gold-ink">Remarkable.</span></span>
          </h1>
          <p className="ch-fade mt-8 max-w-lg font-sub text-base leading-relaxed text-navy/70 md:text-lg">{SUBTITLE}</p>
          <div className="ch-fade mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <ArrowButton type="button" onClick={() => scrollToId("enquiry")}>Start a Conversation</ArrowButton>
          </div>
        </div>

        {/* connection map */}
        <div aria-hidden className="relative mx-auto aspect-[600/560] w-full max-w-[560px] lg:col-span-5">
          <div data-depth="14" className="absolute inset-0">
            <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" fill="none">
              {[70, 140, 210, 280].map((r, i) => (
                <circle key={r} className="ch-ring" cx={HUB.x} cy={HUB.y} r={r} stroke="var(--navy)" strokeOpacity={0.2 - i * 0.035} strokeDasharray={i % 2 ? "2 7" : undefined} />
              ))}
              <path d={`M${HUB.x - 290} ${HUB.y}H${HUB.x + 290}M${HUB.x} ${HUB.y - 270}V${HUB.y + 270}`} stroke="var(--navy)" strokeOpacity=".06" />
            </svg>
          </div>
          <div data-depth="30" className="absolute inset-0">
            <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" fill="none">
              {NODES.map((n, i) => {
                const mx = (n.x + HUB.x) / 2 + (i % 2 ? 40 : -40);
                const my = (n.y + HUB.y) / 2 + (i % 2 ? -30 : 30);
                const d = `M${HUB.x} ${HUB.y} Q${mx} ${my} ${n.x} ${n.y}`;
                return (
                  <g key={i}>
                    <path className="ch-link" d={d} pathLength={1} strokeDasharray="1" stroke="var(--gold)" strokeOpacity=".55" strokeWidth="1.2" />
                    <path className="dash-flow" d={d} stroke="var(--navy)" strokeOpacity=".35" strokeWidth="1.2" />
                  </g>
                );
              })}
              <path className="ch-link" d={`M${NODES[0].x} ${NODES[0].y} C 220 20 380 10 ${NODES[1].x} ${NODES[1].y}`} pathLength={1} strokeDasharray="1" stroke="var(--navy)" strokeOpacity=".18" />
              <path className="ch-link" d={`M${NODES[3].x} ${NODES[3].y} C 160 540 300 560 ${NODES[4].x} ${NODES[4].y}`} pathLength={1} strokeDasharray="1" stroke="var(--navy)" strokeOpacity=".18" />
            </svg>
          </div>
          <div data-depth="50" className="absolute inset-0">
            {NODES.map((n, i) => (
              <div key={i} className="ch-node absolute -translate-x-1/2 -translate-y-1/2" style={{ left: pct(n.x, W), top: pct(n.y, H) }}>
                <span className="node-pulse absolute left-1/2 top-1/2 -ml-3 -mt-3 h-6 w-6 rounded-full bg-gold/40" style={{ animationDelay: `${i * 0.5}s` }} />
                <span className="relative block h-2.5 w-2.5 rounded-full border-2 border-gold bg-white" />
              </div>
            ))}
            <div className="ch-node absolute -translate-x-1/2 -translate-y-1/2" style={{ left: pct(HUB.x, W), top: pct(HUB.y, H) }}>
              <span className="pulse-ring absolute inset-0 rounded-full border border-gold" />
              <span className="pulse-ring delay absolute inset-0 rounded-full border border-gold" />
              <span className="relative grid h-20 w-20 place-items-center rounded-full bg-gold text-center font-heading text-[9px] font-extrabold uppercase leading-tight tracking-[0.2em] text-navy shadow-[0_0_60px_rgba(217,164,65,.35)] sm:h-28 sm:w-28 sm:text-[11px]">
                <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" aria-hidden><path d="M12 30a12 12 0 0 1 24 0Z" fill="var(--navy)" /><path d="M24 15v-4M10.1 24.3 6.4 22.7M37.9 24.3l3.7-1.6M13.4 19.4l-2.8-2.8M34.6 19.4l2.8-2.8" stroke="var(--navy)" strokeWidth="2.4" strokeLinecap="round" /></svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
