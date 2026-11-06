"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { makeCraneDrawer } from "@/lib/crane";

/* Shared scene coordinates (viewBox 0 0 1440 560): tower crane + a building going up. */
export const GROUND = 540;
export const FL_H = 48;
export const BX = [880, 940, 1000, 1060];
export const BLD_X = 970;
export const PILE_X = 1078;
export const floorTop = (k: number) => GROUND - FL_H * (k + 1);

export function CranePaths() {
  return (
    <g className="crane" transform="translate(900 20)" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none">
      <path d="M186 130V520M214 130V520" />
      <path d="M186 520L214 490L186 460L214 430L186 400L214 370L186 340L214 310L186 280L214 250L186 220L214 190L186 160L214 130" />
      <path d="M174 520h52" />
      <rect x="180" y="112" width="40" height="18" />
      <rect x="224" y="96" width="24" height="18" />
      <path d="M200 112V50M200 50L24 104M200 50L330 104" />
      <path d="M214 92L30 102M20 104H214M214 104H336" />
      <path d="M30 102L50 104L70 101.5L90 104L110 100L130 104L150 98.5L170 104L190 96L210 104" />
      <rect x="300" y="104" width="34" height="26" fill="var(--navy-soft)" />
    </g>
  );
}

export function HookGear({ x = BLD_X, y = 190 }: { x?: number; y?: number }) {
  return (
    <g stroke="currentColor" strokeWidth="2" fill="none">
      <rect className="h-trolley" x={x - 9} y={124} width={18} height={7} fill="var(--gold)" stroke="none" />
      <line className="h-cable" x1={x} x2={x} y1={131} y2={y} />
      <g className="h-block" transform={`translate(${x} ${y})`}>
        <rect x="-7" y="0" width="14" height="9" fill="var(--gold)" stroke="none" />
        <path d="M-3 9v6a3 3 0 0 0 6 0" />
        <rect className="h-load" x="-28" y="18" width="56" height="9" fill="var(--gold)" stroke="none" opacity="0" />
      </g>
    </g>
  );
}

export function Pile() {
  return (
    <g fill="var(--gold)" opacity=".85">
      <rect x={PILE_X - 28} y={GROUND - 9} width="56" height="9" />
      <rect x={PILE_X - 24} y={GROUND - 18} width="48" height="9" opacity=".7" />
    </g>
  );
}

export function Floors({ from = 0, to = 8 }: { from?: number; to?: number }) {
  return (
    <>
      {Array.from({ length: to - from }, (_, i) => from + i).map((k) => {
        const top = floorTop(k);
        return (
          <g key={k} className={`fl fl-${k}`}>
            {BX.map((x) => (
              <line key={x} x1={x} x2={x} y1={top} y2={top + FL_H} stroke="currentColor" strokeWidth="2" />
            ))}
            {[0, 1, 2].map((b) => (
              <g key={b}>
                <rect x={BX[b] + 8} y={top + 12} width={44} height={26} fill="var(--navy-deep)" opacity=".55" />
                <rect className="win-lit" x={BX[b] + 8} y={top + 12} width={44} height={26} fill="var(--gold)" opacity="0" />
              </g>
            ))}
            <rect x={BX[0] - 8} y={top - 6} width={BX[3] - BX[0] + 16} height={8} fill="var(--navy-soft)" stroke="var(--gold)" strokeWidth="1.5" />
          </g>
        );
      })}
    </>
  );
}

/** Decorative crane + building for banners and CTAs; the hook slowly swings. */
export default function SiteScene({
  viewBox = "860 40 480 520",
  floors = 8,
  className = "",
}: {
  viewBox?: string;
  floors?: number;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const draw = makeCraneDrawer(svg);
    const p = { x: BLD_X, y: 180 };
    draw(p);
    gsap.set(svg.querySelector(".h-load"), { opacity: 1 });
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } });
    tl.to(p, { x: PILE_X - 20, y: 150, duration: 4.5, onUpdate: () => draw(p) }).to(p, { x: BLD_X - 10, y: 215, duration: 4.5, onUpdate: () => draw(p) });
    return () => { tl.kill(); };
  }, []);

  return (
    <svg ref={ref} viewBox={viewBox} preserveAspectRatio="xMaxYMax meet" className={`overflow-visible ${className}`} aria-hidden>
      <CranePaths />
      <Floors to={floors} />
      <Pile />
      <HookGear />
      <rect x="-3000" y={GROUND - 1} width="6000" height="4" fill="var(--gold)" />
    </svg>
  );
}
