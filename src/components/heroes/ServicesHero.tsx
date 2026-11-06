"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { introDelay, useMotion } from "@/lib/motion";
import { scrollToId } from "@/lib/scrollTo";
import { services } from "@/config/services";
import Photo from "@/components/ui/Photo";
import Breadcrumb from "@/components/ui/Breadcrumb";

const SUBTITLE = "Comprehensive construction solutions for residential, commercial, industrial and infrastructure development.";
const OFFSETS = ["md:mt-0", "md:mt-16", "md:mt-6", "md:mt-24"];

/** Light, dynamic hero: oversized heading + four architectural panels, one per sector. */
export default function ServicesHero() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const hovering = useRef(false);

  // slow auto-cycle through the sectors (paused on hover, off-screen or reduced motion)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    if (root.current) io.observe(root.current);
    const id = window.setInterval(() => {
      if (!hovering.current && visible) setActive((a) => (a + 1) % services.length);
    }, 3400);
    return () => { window.clearInterval(id); io.disconnect(); };
  }, []);

  useMotion(root, (desktop) => {
    const d = introDelay();
    const tl = gsap.timeline({ delay: d });
    tl.fromTo(".sh-line", { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.1, ease: "power4.out" })
      .fromTo(".sh-panel", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, stagger: 0.12, ease: "power4.inOut" }, 0.15)
      .fromTo(".sh-panel .photo-in", { scale: 1.4 }, { scale: 1, duration: 2, stagger: 0.12, ease: "power3.out" }, 0.15)
      .fromTo(".sh-fade", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "power3.out" }, 0.5)
      .fromTo(".sh-frame", { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }, 0.9);
    if (desktop) {
      gsap.to(".sh-panels", { yPercent: -6, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".sh-num", { yPercent: 30, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    }
  });

  const go = (slug: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(slug);
  };

  return (
    <section ref={root} className="relative overflow-hidden bg-white pb-16 pt-32 text-navy md:pb-24 md:pt-40">
      <div
        aria-hidden
        className="absolute -right-[20vw] -top-[30vw] h-[70vw] w-[70vw] rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--gold) 35%, transparent), transparent 62%)" }}
      />
      <span aria-hidden className="sh-num outline-text-navy pointer-events-none absolute -left-[3vw] bottom-0 select-none font-heading text-[34vw] font-extrabold leading-[0.75] opacity-[0.05]">
        02
      </span>

      <div className="wrap relative grid items-end gap-12 lg:grid-cols-12 lg:gap-12">
        {/* copy */}
        <div className="lg:col-span-5">
          <div className="sh-fade"><Breadcrumb crumb="Services" tone="light" /></div>
          <h1 className="mt-10">
            <span className="sh-fade mb-5 flex items-center gap-3 font-sub text-xs font-semibold uppercase tracking-[0.3em] text-gold-ink">
              <span className="h-px w-8 bg-gold" /> Our Construction Services
            </span>
            <span className="block font-heading text-[clamp(3rem,7.4vw,6.6rem)] font-extrabold leading-[0.95] tracking-tight">
              <span className="block overflow-hidden pb-[0.06em]"><span className="sh-line block">Built for</span></span>
              <span className="block overflow-hidden pb-[0.06em]"><span className="sh-line outline-text-navy block">Every</span></span>
              <span className="block overflow-hidden pb-[0.06em]"><span className="sh-line block text-gold-ink">Vision.</span></span>
            </span>
          </h1>
          <p className="sh-fade mt-8 max-w-md font-sub text-base leading-relaxed text-navy/70 md:text-lg">{SUBTITLE}</p>

          {/* animated service index */}
          <ol className="sh-fade mt-10 grid grid-cols-4 gap-2 border-t border-navy/12 pt-5" aria-label="Service sectors">
            {services.map((s, i) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  onClick={go(s.slug)}
                  onMouseEnter={() => { hovering.current = true; setActive(i); }}
                  onMouseLeave={() => { hovering.current = false; }}
                  className="group block"
                >
                  <span className="relative mb-3 block h-[2px] overflow-hidden bg-navy/12">
                    <span
                      className={`absolute inset-0 origin-left bg-gold ${active === i ? "scale-x-100 transition-transform duration-[3400ms] ease-linear" : "scale-x-0 transition-none"}`}
                    />
                  </span>
                  <span className={`block font-sub text-[11px] font-semibold tabular-nums transition-colors ${active === i ? "text-gold-ink" : "text-navy/40"}`}>{s.no}</span>
                  <span className={`mt-1 hidden truncate font-sub text-[11px] uppercase sm:block tracking-[0.12em] transition-colors sm:text-xs ${active === i ? "text-navy" : "text-navy/50 group-hover:text-navy"}`}>
                    {s.title.split(" ")[0]}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* four sector panels */}
        <div className="relative lg:col-span-7">
          <div aria-hidden className="sh-frame absolute -inset-4 border border-gold/25 md:-inset-6" />
          <div
            className="sh-panels relative grid grid-cols-2 gap-3 md:flex md:h-[clamp(400px,60vh,600px)] md:items-start"
            onMouseLeave={() => { hovering.current = false; }}
          >
            {services.map((s, i) => {
              const on = active === i;
              return (
                <a
                  key={s.slug}
                  href={`#${s.slug}`}
                  onClick={go(s.slug)}
                  onMouseEnter={() => { hovering.current = true; setActive(i); }}
                  onFocus={() => setActive(i)}
                  aria-label={`${s.title} – jump to section`}
                  className={`group relative block min-w-0 transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(.7,0,.2,1)] ${OFFSETS[i]} ${
                    i % 2 ? "translate-y-6 md:translate-y-0" : ""
                  } md:h-[calc(100%-6rem)] ${on ? "md:flex-[2.4]" : "md:flex-1"}`}
                >
                  <div className="sh-panel relative aspect-[3/4] h-full w-full overflow-hidden md:aspect-auto">
                    <Photo
                      src={s.images[0]}
                      alt={`${s.title} by Sunrise Builders`}
                      priority={i < 2}
                      sizes="(min-width:768px) 30vw, 50vw"
                      className={`h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.8,.2,1)] ${on ? "scale-105" : "scale-100"}`}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-navy-deep/10 transition-opacity duration-700 ${on ? "opacity-80" : "opacity-95"}`} />
                    <span className={`absolute inset-x-0 top-0 h-[3px] origin-left bg-gold transition-transform duration-700 ${on ? "scale-x-100" : "scale-x-0"}`} />
                    <span className="absolute left-4 top-4 font-sub text-xs font-semibold tabular-nums text-gold">{s.no}</span>
                    <div className="absolute inset-x-4 bottom-4">
                      <p className={`truncate font-heading text-sm font-bold text-offwhite md:text-base ${on ? "" : "md:hidden"}`}>{s.title.split(" ")[0]}</p>
                      {/* narrow (inactive) panels on desktop: label runs vertically */}
                      <p aria-hidden className={`hidden rotate-180 font-heading text-base font-bold tracking-wide text-offwhite [writing-mode:vertical-rl] ${on ? "" : "md:block"}`}>
                        {s.title.split(" ")[0]}
                      </p>
                      <div className={`grid transition-all duration-700 ${on ? "md:grid-rows-[1fr] md:opacity-100" : "md:grid-rows-[0fr] md:opacity-0"} grid-rows-[0fr] opacity-0`}>
                        <p className="overflow-hidden text-sm leading-snug text-offwhite/75">
                          <span className="mt-2 line-clamp-3 block">{s.short}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
