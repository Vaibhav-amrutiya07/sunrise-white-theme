"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/lib/motion";
import { site } from "@/config/site";
import { SwapArrow } from "@/components/ui/Arrow";

const mapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;

const ico = "h-6 w-6";
const icons = {
  call: <svg viewBox="0 0 24 24" className={ico} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /><path d="M15 3.5a6 6 0 0 1 5.5 5.5M15 7a2.5 2.5 0 0 1 2 2" /></svg>,
  mail: <svg viewBox="0 0 24 24" className={ico} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="m3 7 9 6 9-6" /></svg>,
  pin: <svg viewBox="0 0 24 24" className={ico} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /><path d="M8 21h8" /></svg>,
};

/** "Get in Touch": asymmetric editorial bento of three interactive contact blocks. */
export default function ContactInfo() {
  const root = useRef<HTMLElement>(null);

  useMotion(root, () => {
    const st = { trigger: root.current, start: "top 70%" };
    gsap.fromTo(".gi-line", { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.1, ease: "power4.out", scrollTrigger: st });
    gsap.fromTo(".gi-block", { y: 60, opacity: 0, clipPath: "inset(20% 0% 0% 0%)" }, { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, stagger: 0.12, ease: "power4.out", scrollTrigger: st });
      });

  return (
    <section ref={root} className="relative overflow-hidden bg-offwhite py-12 md:py-20">
      <div className="wrap relative grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <h2 className="font-heading text-[clamp(3rem,8vw,6.5rem)] font-extrabold leading-[0.92] tracking-tight text-charcoal">
            <span className="block overflow-hidden pb-[0.06em]"><span className="gi-line block">Get in</span></span>
            <span className="block overflow-hidden pb-[0.06em]"><span className="gi-line outline-text-navy block">Touch<span className="text-gold [-webkit-text-stroke:0]">.</span></span></span>
          </h2>
        </div>

        <div className="grid grid-cols-6 gap-4 lg:col-span-8">
          {/* CALL – the hero block */}
          <a href={site.phoneHref} className="gi-block group relative col-span-6 overflow-hidden bg-navy p-7 text-offwhite sm:p-10 md:p-12">
            <span aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--gold) 35%, transparent), transparent 65%)" }} />
            <div className="relative flex items-start justify-between">
              <p className="font-sub text-[11px] font-semibold uppercase tracking-[0.3em] text-offwhite/60"><span className="text-gold">01</span> &nbsp;/&nbsp; Call Us</p>
              <span className="grid h-12 w-12 place-items-center rounded-full border border-offwhite/15 text-gold transition-colors duration-500 group-hover:border-gold">{icons.call}</span>
            </div>
            <p className="relative mt-10 inline-block font-heading text-[clamp(1.8rem,5.2vw,3.75rem)] font-extrabold leading-none tracking-tight md:mt-16">
              {site.phone}
              <span className="absolute -bottom-3 left-0 h-[2px] w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-x-100" />
            </p>
            <div className="relative mt-10 flex items-center justify-between">
              <span />
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gold text-navy"><SwapArrow dir="diag" /></span>
            </div>
          </a>

          {/* EMAIL */}
          <a href={`mailto:${site.email}`} className="gi-block group relative col-span-6 overflow-hidden border border-navy/12 bg-white p-7 sm:p-9 md:col-span-3">
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-700 group-hover:scale-x-100" />
            <div className="flex items-start justify-between">
              <p className="font-sub text-[11px] font-semibold uppercase tracking-[0.3em] text-slate"><span className="text-gold">02</span> &nbsp;/&nbsp; Email Us</p>
              <span className="text-navy transition-transform duration-500 group-hover:-translate-y-1">{icons.mail}</span>
            </div>
            <p className="mt-12 break-words font-heading text-[clamp(1.15rem,2vw,1.6rem)] font-bold leading-tight text-navy">
              <span className="bg-[linear-gradient(var(--gold),var(--gold))] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-700 group-hover:bg-[length:100%_2px]">{site.email}</span>
            </p>
            <span className="mt-8 inline-flex items-center gap-2 font-sub text-[11px] font-semibold uppercase tracking-[0.25em] text-navy">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-navy/15 text-gold"><SwapArrow dir="diag" className="h-3.5 w-3.5" /></span>
            </span>
          </a>

          {/* VISIT */}
          <a href={mapsSearch} target="_blank" rel="noopener noreferrer" className="gi-block group relative col-span-6 overflow-hidden p-7 sm:p-9 md:col-span-3 md:translate-y-10" style={{ background: "color-mix(in srgb, var(--gold) 16%, var(--offwhite))" }}>
            <svg aria-hidden viewBox="0 0 200 200" className="absolute -bottom-16 -right-16 h-52 w-52 text-gold transition-transform duration-[1200ms] group-hover:rotate-45" fill="none" stroke="currentColor">
              <circle cx="100" cy="100" r="96" strokeOpacity=".5" />
              <circle cx="100" cy="100" r="66" strokeDasharray="2 6" />
              <circle cx="100" cy="100" r="36" strokeOpacity=".5" />
              <path d="M100 0v200M0 100h200" strokeOpacity=".3" />
            </svg>
            <div className="relative flex items-start justify-between">
              <p className="font-sub text-[11px] font-semibold uppercase tracking-[0.3em] text-navy/60"><span className="text-navy">03</span> &nbsp;/&nbsp; Visit Us</p>
              <span className="text-navy transition-transform duration-500 group-hover:-translate-y-1">{icons.pin}</span>
            </div>
            <address className="relative mt-12 font-sub text-base not-italic leading-relaxed text-charcoal">{site.address}</address>
            <span className="relative mt-8 inline-flex items-center gap-2 font-sub text-[11px] font-semibold uppercase tracking-[0.25em] text-navy">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-navy/20"><SwapArrow dir="diag" className="h-3.5 w-3.5" /></span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
