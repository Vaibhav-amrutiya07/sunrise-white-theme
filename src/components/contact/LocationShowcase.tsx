"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/lib/motion";
import { site } from "@/config/site";
import { ArrowLink } from "@/components/ui/Arrow";

const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.address)}`;
const embed = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`;

/** Pre-footer location showcase on a light surface: framed interactive map + office panel. */
export default function LocationShowcase() {
  const root = useRef<HTMLElement>(null);
  // first two parts (e.g. unit + building) read as one headline line
  const parts = site.address.split(", ");
  const lines = parts.length > 2 ? [parts.slice(0, 2).join(", "), ...parts.slice(2)] : parts;

  useMotion(root, (desktop) => {
    const st = { trigger: root.current, start: "top 70%" };
    gsap.fromTo(".ls-map", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "power4.inOut", scrollTrigger: st });
    gsap.fromTo(".ls-frame", { opacity: 0, x: -30, y: 30 }, { opacity: 1, x: 0, y: 0, duration: 1.2, delay: 0.8, ease: "power3.out", scrollTrigger: st });
    gsap.fromTo(".ls-line", { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.1, delay: 0.2, ease: "power4.out", scrollTrigger: st });
    gsap.fromTo(".ls-rule", { scaleX: 0 }, { scaleX: 1, duration: 1.4, delay: 0.4, ease: "power3.inOut", scrollTrigger: st });
    gsap.fromTo(".ls-addr", { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: 0.07, delay: 0.5, ease: "power3.out", scrollTrigger: st });
    gsap.fromTo(".ls-fade", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.9, ease: "power3.out", scrollTrigger: st });
    gsap.fromTo(".ls-pin", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, delay: 1.3, ease: "back.out(2)", scrollTrigger: st });
    if (desktop) gsap.to(".ls-rings", { rotate: 25, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
  });

  return (
    <section ref={root} className="stone relative overflow-hidden pb-12 pt-12 md:pb-28 md:pt-20">
      {/* geometric location rings behind the map */}
      <svg aria-hidden viewBox="0 0 600 600" className="ls-rings pointer-events-none absolute -left-40 top-1/2 h-[40rem] w-[40rem] -translate-y-1/2 text-gold" fill="none" stroke="currentColor">
        {[290, 230, 170, 110].map((r, i) => (
          <circle key={r} cx="300" cy="300" r={r} strokeOpacity={0.5 - i * 0.08} strokeDasharray={i % 2 ? "3 10" : undefined} />
        ))}
      </svg>

      <div className="wrap relative grid items-center gap-16 lg:grid-cols-12 lg:gap-14">
        {/* framed map */}
        <div className="relative order-2 lg:order-1 lg:col-span-7">
          <div aria-hidden className="ls-frame absolute -bottom-5 -left-5 h-full w-full border border-gold md:-bottom-7 md:-left-7" />
          <div className="ls-map relative overflow-hidden bg-white p-2 shadow-[0_40px_80px_-40px_rgba(24,50,74,.45)] md:p-3">
            <div className="relative aspect-[4/3] w-full md:aspect-[16/11]">
              <iframe
                title="Sunrise Builders office location"
                src={embed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale-[0.6]"
              />
            </div>
          </div>
          <span aria-hidden className="ls-pin absolute -right-4 -top-4 grid h-14 w-14 place-items-center rounded-full bg-navy text-gold shadow-xl md:-right-6 md:-top-6 md:h-16 md:w-16">
            <span className="pulse-ring absolute inset-0 rounded-full border border-navy" />
            <svg viewBox="0 0 24 24" className="relative h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
          </span>
        </div>

        {/* office panel */}
        <div className="order-1 lg:order-2 lg:col-span-5">
          <h2 className="font-heading text-[clamp(2.6rem,6vw,5rem)] font-extrabold leading-[0.98] tracking-tight text-charcoal">
            <span className="block overflow-hidden pb-[0.06em]"><span className="ls-line block">Our</span></span>
            <span className="block overflow-hidden pb-[0.06em]"><span className="ls-line block text-navy">Office<span className="text-gold">.</span></span></span>
          </h2>

          <div className="ls-rule mt-8 h-[2px] w-24 origin-left bg-gold" />
          <address className="mt-8 border-l border-navy/15 pl-6 not-italic">
            {lines.map((l, i) => (
              <span key={i} className={`ls-addr block ${i === 0 ? "font-heading text-xl font-bold leading-snug text-navy md:text-2xl" : "mt-1 font-sub text-base text-slate"}`}>
                {l}
              </span>
            ))}
          </address>

          <div className="ls-fade mt-10">
            <ArrowLink href={directions} tone="navy" external>Get Directions</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
