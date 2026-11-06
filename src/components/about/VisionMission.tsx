"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/lib/motion";
import { images } from "@/config/images";
import Photo from "@/components/ui/Photo";

type Props = { vision: string; mission: string };

// four precision markers along the mission timeline (decorative)
const STEPS = ["a", "b", "c", "d"];

/** "Two Perspectives, One Purpose": the long view (Vision) and the daily discipline (Mission), joined by one gold line. */
export default function VisionMission({ vision, mission }: Props) {
  const root = useRef<HTMLElement>(null);

  useMotion(root, (desktop) => {
    // section title
    gsap.fromTo(".vm-title", { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.1, ease: "power4.out", scrollTrigger: { trigger: ".vm-head", start: "top 80%" } });

    // the connecting spine draws as you scroll the whole section
    gsap.fromTo(".vm-spine", { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: ".vm-link", start: "top 75%", end: "bottom 55%", scrub: true } });
    

    // VISION
    const v = { trigger: ".vm-vision", start: "top 72%" };
    gsap.fromTo(".vm-v-arch", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "power4.inOut", scrollTrigger: v });
    gsap.fromTo(".vm-v-arch .photo-in", { scale: 1.3 }, { scale: 1, duration: 2, ease: "power3.out", scrollTrigger: v });
    gsap.fromTo(".vm-v-arc", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2, stagger: 0.15, ease: "power2.inOut", scrollTrigger: v });
    gsap.fromTo(".vm-v-num", { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.4, ease: "power3.out", scrollTrigger: v });
    gsap.fromTo(".vm-v-word", { opacity: 0.12 }, { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: ".vm-v-text", start: "top 80%", end: "bottom 55%", scrub: true } });

    // MISSION
    const m = { trigger: ".vm-mission", start: "top 70%" };
    gsap.fromTo(".vm-m-img", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.inOut", scrollTrigger: m });
    gsap.fromTo(".vm-m-plate", { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, delay: 0.5, ease: "power3.out", scrollTrigger: m });
    gsap.fromTo(".vm-m-num", { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.4, ease: "power3.out", scrollTrigger: m });
    gsap.fromTo(".vm-m-word", { opacity: 0.15 }, { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: ".vm-m-text", start: "top 80%", end: "bottom 55%", scrub: true } });
    gsap.fromTo(".vm-track", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".vm-steps", start: "top 85%", end: "bottom 60%", scrub: true } });
    gsap.fromTo(".vm-step", { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".vm-steps", start: "top 85%" } });

    if (desktop) {
      gsap.to(".vm-v-par", { yPercent: -12, ease: "none", scrollTrigger: { trigger: ".vm-vision", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.to(".vm-m-par", { yPercent: 10, ease: "none", scrollTrigger: { trigger: ".vm-mission", start: "top bottom", end: "bottom top", scrub: true } });
    }
  });

  const words = (t: string, cls: string) =>
    t.split(" ").map((w, i) => (
      <span key={i} className={cls}>{w} </span>
    ));

  return (
    <section ref={root} className="stone relative overflow-hidden">
      {/* heading */}
      <div className="vm-head wrap relative pb-12 pt-12 md:pt-20 md:pb-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-5 flex items-center gap-3 font-sub text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-8 bg-gold" /> Vision &amp; Mission
            </p>
            <h2 className="font-heading text-[clamp(2.5rem,6.5vw,5.5rem)] font-extrabold leading-[0.98] tracking-tight text-charcoal">
              <span className="block overflow-hidden pb-[0.06em]"><span className="vm-title block">Two Perspectives.</span></span>
              <span className="block overflow-hidden pb-[0.06em]"><span className="vm-title outline-text-navy block">One Purpose.</span></span>
            </h2>
          </div>
        </div>
      </div>

      {/* ---------- 01 VISION ---------- */}
      <div className="vm-vision wrap relative z-20 grid items-center gap-14 pb-28 md:pb-40 lg:grid-cols-12 lg:gap-10">
        {/* one gold line: from the Vision horizon down into the Mission (desktop) */}
        <div aria-hidden className="vm-link pointer-events-none absolute inset-x-6 -bottom-36 hidden h-[19rem] lg:block">
          <svg viewBox="0 0 1200 300" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
            <path className="vm-spine" d="M936 0 C 936 135, 264 120, 264 300" pathLength={1} strokeDasharray="1" fill="none" stroke="var(--navy)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="absolute bottom-0 left-[22%] h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rotate-45 bg-navy" />
        </div>
        <div className="relative lg:col-span-7">
          <span aria-hidden className="vm-v-num outline-text-navy pointer-events-none absolute -left-2 -top-16 select-none font-heading text-[clamp(8rem,20vw,17rem)] font-extrabold leading-none opacity-[0.13] md:-top-24">
            01
          </span>
          <div className="relative">
            <p className="flex items-center gap-4 font-sub text-xs font-semibold uppercase tracking-[0.3em] text-navy">
              <span className="font-heading text-sm text-gold">01</span>
              <span className="h-px w-10 bg-navy/30" />
              Our Vision
            </p>
            <p className="vm-v-text mt-8 max-w-2xl font-heading text-[clamp(1.5rem,2.9vw,2.6rem)] font-semibold leading-[1.25] text-charcoal">
              {words(vision, "vm-v-word")}
            </p>
          </div>
        </div>

        <div className="vm-v-par relative mx-auto w-full max-w-md lg:col-span-5">
          {/* concentric horizon arcs */}
          <svg aria-hidden viewBox="0 0 400 260" className="absolute -left-[12%] -top-[14%] w-[124%]" fill="none">
            {[190, 160, 130].map((r) => (
              <path key={r} className="vm-v-arc" d={`M${200 - r} 250 A ${r} ${r} 0 0 1 ${200 + r} 250`} pathLength={1} strokeDasharray="1" stroke="var(--gold)" strokeOpacity={r === 190 ? 0.8 : 0.35} />
            ))}
          </svg>
          <div className="vm-v-arch relative aspect-[4/5] overflow-hidden rounded-t-full">
            <Photo src={images.aboutBanner} alt="Long-term vision – modern architecture" sizes="(min-width:1024px) 30vw, 80vw" className="h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
          </div>
        </div>
      </div>

      {/* ---------- 02 MISSION ---------- */}
      <div className="vm-mission relative bg-gold pb-28 pt-28 text-navy [clip-path:polygon(0_6%,100%_0,100%_100%,0_100%)] md:pb-36 md:pt-40">
        <div className="wrap relative grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          {/* overlapping image + text plate */}
          <div className="vm-m-par relative order-2 lg:order-1 lg:col-span-5">
            <div className="vm-m-img relative aspect-[5/4] w-[88%] overflow-hidden">
              <Photo src={images.intro} alt="Daily execution – planning and coordination on site" sizes="(min-width:1024px) 30vw, 85vw" className="h-full w-full" />
              <div className="absolute inset-0 bg-navy/30 mix-blend-multiply" />
            </div>
            <div aria-hidden className="vm-m-plate absolute -bottom-6 right-0 h-2/3 w-1/2 border border-navy/50" />
          </div>

          <div className="relative order-1 lg:order-2 lg:col-span-7 lg:pl-10">
            <span aria-hidden className="vm-m-num outline-text-navy pointer-events-none absolute -top-16 right-0 select-none font-heading text-[clamp(8rem,20vw,17rem)] font-extrabold leading-none opacity-[0.12] md:-top-28">
              02
            </span>
            <div className="relative">
              <p className="flex items-center gap-4 font-sub text-xs font-semibold uppercase tracking-[0.3em] text-navy">
                <span className="font-heading text-sm text-navy">02</span>
                <span className="h-px w-10 bg-navy/30" />
                Our Mission
              </p>
              <p className="vm-m-text mt-8 max-w-2xl font-heading text-[clamp(1.4rem,2.6vw,2.3rem)] font-semibold leading-[1.28]">
                {words(mission, "vm-m-word")}
              </p>
            </div>

            {/* precision timeline */}
            <ol aria-hidden className="vm-steps relative mt-14 grid grid-cols-4 gap-x-6 pt-8">
              <span aria-hidden className="absolute left-0 right-0 top-0 h-px bg-navy/20" />
              <span aria-hidden className="vm-track absolute left-0 right-0 top-0 h-px origin-left bg-navy" />
              {STEPS.map((s, i) => (
                <li key={s} className="vm-step relative">
                  <span aria-hidden className="absolute -top-[2.375rem] left-0 h-3 w-3 rotate-45 border border-navy bg-gold" />
                  <span className="block font-sub text-[11px] font-semibold tabular-nums text-navy">0{i + 1}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}