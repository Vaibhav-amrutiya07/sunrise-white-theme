"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotion } from "@/lib/motion";
import { services } from "@/config/services";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import { Eyebrow, Words } from "@/components/ui/Text";

/** Services are the levels of a building. A crane hook rides down the mast as you scroll. */
export default function ServicesTower() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLDivElement>(null);

  useMotion(root, () => {
    const trigger = { trigger: list.current, start: "top 60%", end: "bottom 60%", scrub: true };
    gsap.fromTo(".mast-fill", { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: trigger });
    gsap.fromTo(".mast-hook", { top: "0%" }, { top: "100%", ease: "none", scrollTrigger: trigger });

    list.current!.querySelectorAll<HTMLElement>(".floor").forEach((floor) => {
      ScrollTrigger.create({ trigger: floor, start: "top 62%", end: "bottom 38%", toggleClass: { targets: floor, className: "is-lit" } });
      gsap
        .timeline({ scrollTrigger: { trigger: floor, start: "top 75%" } })
        // the photo panel is lowered into place from above
        .from(floor.querySelector(".floor-img"), { clipPath: "inset(0% 0% 100% 0%)", y: -40, duration: 1.2, ease: "power4.out" })
        .from(floor.querySelector(".floor-img .photo-in"), { scale: 1.35, duration: 1.4, ease: "power3.out" }, 0)
        .from(floor.querySelectorAll(".floor-txt > *"), { y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }, 0.2);
    });
  });

  return (
    <section ref={root} className="relative overflow-hidden bg-gold py-12 text-navy md:py-20">
      <div className="hazard absolute inset-x-0 top-0 h-2" />
      <div className="wrap relative">
        <div className="max-w-3xl">
          <Eyebrow tone="navy">Our Construction Services</Eyebrow>
          <Words text="Complete Construction Solutions Under One Roof" className="font-heading text-4xl font-extrabold leading-[1.1] md:text-6xl" />
          <p className="mt-6 max-w-2xl font-sub text-lg text-navy/80">
            Every project has a different purpose. We bring the right approach, planning and execution to every
            construction requirement.
          </p>
        </div>

        {/* inside the list, the shared "gold" accent (lit floor node + halo, floor-number outline) is re-coloured navy so it stays visible on the gold background */}
        <div ref={list} className="relative mt-24" style={{ "--gold": "var(--navy)", "--gold-soft": "color-mix(in srgb, var(--navy) 18%, transparent)" } as React.CSSProperties}>
          {/* crane mast */}
          <div className="lattice absolute left-[27px] top-0 h-full w-6 -translate-x-1/2 bg-navy/20 md:left-1/2" />
          <div className="mast-fill lattice absolute left-[27px] top-0 h-full w-6 -translate-x-1/2 bg-navy md:left-1/2" />
          <div className="mast-hook absolute left-[27px] z-10 -translate-x-1/2 md:left-1/2" aria-hidden>
            <svg viewBox="0 0 24 34" className="h-9 w-6" fill="none">
              <rect x="4" y="0" width="16" height="12" fill="var(--navy)" />
              <path d="M12 12v10a5 5 0 1 1-5 5" stroke="var(--navy)" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          {services.map((s, i) => (
            <article key={s.slug} className="floor relative grid items-center gap-8 py-14 pl-16 md:grid-cols-2 md:gap-28 md:pl-0">
              <span className="node absolute left-[27px] top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-navy bg-offwhite md:left-1/2" />
              <div className={`floor-txt ${i % 2 ? "md:order-2" : ""}`}>
                <p className="mb-3 flex items-center gap-3 font-sub text-xs font-semibold uppercase tracking-[0.25em] text-navy">
                  <svg viewBox="0 0 16 10" className="h-3 w-4" fill="currentColor" aria-hidden><path d="M0 0h16L8 10Z" /></svg>
                  Level {s.no} · +{(3.2 * (i + 1)).toFixed(2)} M
                </p>
                <span className="floor-no outline-text block font-heading text-7xl font-extrabold leading-none md:text-8xl">{s.no}</span>
                <h3 className="mt-4 font-heading text-2xl font-bold md:text-3xl">{s.title}</h3>
                <p className="mt-4 max-w-md text-navy/80">{s.short}</p>
                <Button href={`/services#${s.slug}`} variant="outlineNavy" size="sm" className="mt-8">Explore More</Button>
              </div>
              <div className={`floor-img ${i % 2 ? "md:order-1" : ""}`}>
                <Photo src={s.images[0]} alt={`${s.title} by Sunrise Builders`} sizes="(min-width:768px) 45vw, 90vw" className="aspect-[4/3] w-full" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}