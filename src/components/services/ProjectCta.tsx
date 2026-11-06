"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/lib/motion";
import { ArrowLink, ArrowIcon } from "@/components/ui/Arrow";

const RAYS = Array.from({ length: 36 }, (_, i) => (i * Math.PI) / 35);

/** Services closer: a "sunrise" composition. The horizon arc rises on scroll; the arrow tracks the cursor. */
export default function ProjectCta() {
  const root = useRef<HTMLElement>(null);
  const arrow = useRef<HTMLSpanElement>(null);

  useMotion(root, (desktop) => {
    const scrub = { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true };
    gsap.fromTo(".pc-sun", { yPercent: 28 }, { yPercent: 0, ease: "none", scrollTrigger: scrub });
    gsap.fromTo(".pc-rays", { rotate: -12, opacity: 0.2 }, { rotate: 0, opacity: 1, ease: "none", scrollTrigger: scrub });
    if (desktop) {
      gsap.fromTo(".pc-l1", { xPercent: -8 }, { xPercent: 4, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(".pc-l2", { xPercent: 10 }, { xPercent: -4, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
    }
    gsap.fromTo(".pc-fade", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 65%" } });
  });

  // the big arrow always points at the cursor (fine pointers); on touch it gently idles toward the button
  useEffect(() => {
    const el = root.current, a = arrow.current;
    if (!el || !a || !window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const rot = gsap.quickTo(a, "rotation", { duration: 0.6, ease: "power3" });
    let last = 0;
    const move = (e: MouseEvent) => {
      const r = a.getBoundingClientRect();
      let deg = (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) / Math.PI;
      // take the shortest way round
      while (deg - last > 180) deg -= 360;
      while (deg - last < -180) deg += 360;
      last = deg;
      rot(deg);
    };
    const leave = () => { last = 0; rot(0); };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, []);

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden pb-16 pt-16 text-offwhite md:pb-32 md:pt-20"
      style={{ background: "linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 55%, color-mix(in srgb, var(--navy) 55%, var(--gold)) 100%)" }}
    >
      {/* curved top silhouette */}
      <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-10 w-full md:h-16">
        <path d="M0 0H1440V0C1100 70 340 70 0 0Z" fill="var(--offwhite)" />
      </svg>

      {/* rising sun + protractor linework */}
      <div aria-hidden className="pc-sun pointer-events-none absolute bottom-0 left-1/2 -z-10 aspect-square w-[min(150vw,1500px)] -translate-x-1/2 translate-y-[55%]">
        <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--gold) 95%, white) 0%, var(--gold) 28%, color-mix(in srgb, var(--gold) 30%, transparent) 46%, transparent 62%)" }} />
        <svg viewBox="-500 -500 1000 1000" className="pc-rays absolute inset-0 h-full w-full" fill="none" stroke="var(--offwhite)">
          {[300, 360, 430].map((r, i) => (
            <circle key={r} r={r} strokeOpacity={0.22 - i * 0.05} strokeDasharray={i === 1 ? "3 9" : undefined} />
          ))}
          {RAYS.map((t, i) => (
            <line key={i} x1={Math.cos(Math.PI + t) * 300} y1={Math.sin(Math.PI + t) * 300} x2={Math.cos(Math.PI + t) * (i % 3 ? 330 : 360)} y2={Math.sin(Math.PI + t) * (i % 3 ? 330 : 360)} strokeOpacity=".35" />
          ))}
        </svg>
      </div>

      <div className="wrap relative">
        <p className="pc-fade mb-8 flex items-center justify-center gap-3 font-sub text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          <span className="h-px w-8 bg-gold" /> Have a project requirement? <span className="h-px w-8 bg-gold" />
        </p>
        <h2 className="text-center font-heading text-[clamp(2.4rem,8vw,7.5rem)] font-extrabold leading-[0.98] tracking-tight">
          <span className="pc-l1 block whitespace-nowrap max-sm:whitespace-normal">Your Next Project</span>
          <span className="pc-l2 block">
            <span className="outline-text">Starts with a</span>
          </span>
          <span className="block text-gold">Conversation.</span>
        </h2>
        <p className="pc-fade mx-auto mt-8 max-w-xl text-center font-sub text-lg text-offwhite/80">
          Let&apos;s discuss how Sunrise Builders can help bring your vision to life.
        </p>

        <div className="pc-fade mt-12 flex flex-col items-center justify-center gap-8 sm:flex-row">
          <Link
            href="/contact-us"
            aria-label="Discuss your project"
            className="group relative grid h-12 w-12 place-items-center rounded-full border border-offwhite/25 backdrop-blur-sm md:h-28 md:w-28"
          >
            <span className="absolute inset-2 rounded-full bg-offwhite transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-[1.08]" />
            <span className="absolute inset-0 rounded-full border border-dashed border-gold/60 spin-slow" />
            <span ref={arrow} className="relative text-navy">
              <ArrowIcon className="h-10 w-10 md:h-12 md:w-12" />
            </span>
          </Link>
          <ArrowLink href="/contact-us" tone="navy">Discuss Your Project</ArrowLink>
        </div>
      </div>
    </section>
  );
}
