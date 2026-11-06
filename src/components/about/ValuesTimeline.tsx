"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/lib/motion";
import { Eyebrow, Words } from "@/components/ui/Text";

const values = [
  { t: "Integrity", d: "Maintaining honesty and transparency in every professional relationship." },
  { t: "Quality", d: "Giving importance to workmanship, materials and execution." },
  { t: "Commitment", d: "Taking responsibility for every project and its requirements." },
  { t: "Innovation", d: "Embracing better ideas and practical construction approaches." },
];

/** Four pillars. Pinned horizontal scroll on desktop; a measuring tape shows progress. */
export default function ValuesTimeline() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useMotion(root, (desktop) => {
    const t = track.current!;
    if (!desktop) {
      gsap.from(".val", { y: 50, opacity: 0, stagger: 0.15, duration: 0.9, scrollTrigger: { trigger: t, start: "top 80%" } });
      return;
    }
    gsap
      .timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${t.scrollWidth}`, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 },
      })
      .to(t, { x: () => -(t.scrollWidth - window.innerWidth) }, 0)
      .fromTo(".val-bar", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)" }, 0);
  });

  return (
    <div>
      <section ref={root} className="relative overflow-hidden bg-gold py-24 text-navy md:flex md:h-screen md:flex-col md:justify-center md:py-20">
        <div className="hazard absolute inset-x-0 top-0 h-2" />
        <div className="wrap relative">
          <Eyebrow tone="navy">Our Core Values</Eyebrow>
          <Words text="The Values Behind Every Structure" className="max-w-3xl font-heading text-4xl font-extrabold leading-[1.1] md:text-6xl" />
        </div>

        <div ref={track} className="relative mt-14 flex flex-col gap-6 px-6 md:w-max md:flex-row md:gap-10 md:px-[8vw]">
          {values.map((v, i) => (
            <div key={v.t} className="val relative border border-offwhite/10 border-t-4 border-t-gold bg-navy p-8 shadow-[0_30px_60px_-30px_rgba(24,50,74,.55)] md:w-[30vw] md:p-12">
              <p className="font-sub text-xs font-semibold uppercase tracking-[0.3em] text-gold">Pillar 0{i + 1}</p>
              <span className="outline-text mt-3 block font-heading text-7xl font-extrabold leading-none md:text-8xl">0{i + 1}</span>
              <h3 className="mt-6 font-heading text-2xl font-bold text-gold">{v.t}</h3>
              <p className="mt-3 text-offwhite/75">{v.d}</p>
            </div>
          ))}
        </div>

        <div className="wrap relative mt-12 hidden md:block">
          <div className="relative h-4">
            <div className="tape absolute inset-0 text-navy/25" />
            <div className="val-bar tape absolute inset-0 text-navy" />
          </div>
        </div>
      </section>
    </div>
  );
}