"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotion } from "@/lib/motion";
import { scrollToId } from "@/lib/scrollTo";
import { services } from "@/config/services";
import Photo from "@/components/ui/Photo";
import { Words } from "@/components/ui/Text";
import { ArrowLink, SwapArrow } from "@/components/ui/Arrow";

export default function ServicesExplorer() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useMotion(root, (desktop) => {
    root.current!.querySelectorAll<HTMLElement>(".svc").forEach((sec, i) => {
      // scroll-spy
      ScrollTrigger.create({
        trigger: sec,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => self.isActive && setActive(i),
      });
      // giant sector number drifts
      gsap.fromTo(sec.querySelector(".svc-num"), { yPercent: 30 }, { yPercent: -20, ease: "none", scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(sec.querySelectorAll(".svc-fade"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sec, start: "top 75%" } });
      // expertise rows
      gsap.fromTo(sec.querySelectorAll(".exp"), { x: -24, opacity: 0 }, {
        x: 0, opacity: 1, stagger: 0.07, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sec.querySelector(".exp-list"), start: "top 85%" },
      });
      // gallery: clip reveal (outer) + parallax
      sec.querySelectorAll<HTMLElement>(".shot").forEach((shot, k) => {
        gsap.fromTo(shot,
          { clipPath: k % 2 ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power4.inOut", scrollTrigger: { trigger: shot, start: "top 88%" } },
        );
        gsap.fromTo(shot.querySelector(".photo-in"), { scale: 1.3 }, { scale: 1, duration: 1.8, ease: "power3.out", scrollTrigger: { trigger: shot, start: "top 88%" } });
        if (desktop) {
          gsap.to(shot, {
            yPercent: k === 0 ? -4 : k === 1 ? -12 : 8, ease: "none",
            scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });
    });
  });

  const go = (slug: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(slug);
  };

  return (
    <div ref={root} className="relative">
      {/* mobile / tablet sticky sector bar */}
      <nav aria-label="Services index (compact)" className="sticky top-[5.25rem] z-30 border-y border-navy/10 bg-offwhite/90 backdrop-blur-md lg:hidden">
        <ul className="wrap flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
          {services.map((s, i) => (
            <li key={s.slug} className="shrink-0">
              <a
                href={`#${s.slug}`}
                onClick={go(s.slug)}
                aria-current={active === i ? "true" : undefined}
                className={`flex items-center gap-2 rounded-full px-4 py-2 font-sub text-xs font-semibold transition-colors duration-500 ${
                  active === i ? "bg-navy text-offwhite" : "text-slate"
                }`}
              >
                <span className={active === i ? "text-gold" : "text-gold/70"}>{s.no}</span>
                {s.title.split(" ")[0]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="wrap grid gap-12 py-12 lg:grid-cols-[260px_1fr] lg:gap-20 lg:py-20">
        {/* desktop sticky index */}
        <aside className="hidden lg:block">
          <nav aria-label="Services index" className="sticky top-32">
                        {/* odometer number */}
            <div className="relative mt-2 flex items-start font-heading font-extrabold leading-none text-navy">
              <div className="h-[6.5rem] overflow-hidden text-[6.5rem]">
                <div className="transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)]" style={{ transform: `translateY(-${active * 6.5}rem)` }}>
                  {services.map((s) => <div key={s.slug} className="h-[6.5rem]">{s.no}</div>)}
                </div>
              </div>
              <span className="ml-2 mt-3 font-sub text-sm font-semibold text-gold">/ 0{services.length}</span>
            </div>

            <ul className="relative mt-8 space-y-1 pl-6">
              <span aria-hidden className="absolute bottom-2 left-0 top-2 w-px bg-navy/15" />
              <span
                aria-hidden
                className="absolute left-0 top-2 w-px origin-top bg-gold transition-[height] duration-700 ease-[cubic-bezier(.7,0,.2,1)]"
                style={{ height: `calc(${((active + 1) / services.length) * 100}% - 1rem)` }}
              />
              {services.map((s, i) => (
                <li key={s.slug}>
                  <a
                    href={`#${s.slug}`}
                    onClick={go(s.slug)}
                    aria-current={active === i ? "true" : undefined}
                    className={`group relative flex items-center justify-between py-2.5 font-sub text-sm transition-colors duration-500 ${
                      active === i ? "font-semibold text-navy" : "text-slate hover:text-navy"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute -left-[1.6rem] top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border transition-all duration-500 ${
                        i <= active ? "border-gold bg-gold" : "border-navy/25 bg-offwhite"
                      }`}
                    />
                    <span className="flex items-center gap-3">
                      <span className="text-[11px] tabular-nums text-gold">{s.no}</span>
                      {s.title.split(" ")[0]}
                    </span>
                    <span className={`text-gold transition-all duration-500 ${active === i ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`}>
                      <SwapArrow className="h-3.5 w-3.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-10 max-w-[14rem] text-sm leading-relaxed text-slate">{services[active].short}</p>
          </nav>
        </aside>

        <div className="space-y-36 md:space-y-48">
          {services.map((s, idx) => {
            const flip = idx % 2 === 1;
            return (
              <section key={s.slug} id={s.slug} className="svc relative scroll-mt-36">
                <span
                  aria-hidden
                  className="svc-num outline-text-navy pointer-events-none absolute -top-16 right-0 select-none font-heading text-[clamp(7rem,18vw,15rem)] font-extrabold leading-none opacity-[0.1]"
                >
                  {s.no}
                </span>

                <p className="svc-fade relative mb-5 flex items-center gap-3 font-sub text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                  <span className="h-px w-8 bg-gold" /> Level {s.no} — {s.title}
                </p>
                <div className="relative">
                  <Words text={s.heading} className="max-w-3xl font-heading text-4xl font-extrabold leading-[1.05] text-charcoal md:text-6xl" />
                </div>
                <p className="svc-fade relative mt-6 max-w-2xl text-lg leading-relaxed text-slate">{s.body}</p>

                <div className="mt-12 grid gap-12 xl:grid-cols-12 xl:gap-10">
                  {/* expertise */}
                  <div className={`xl:col-span-5 ${flip ? "xl:order-2" : ""}`}>
                    <h3 className="font-sub text-xs font-semibold uppercase tracking-[0.25em] text-navy">Our Expertise</h3>
                    <ul className="exp-list mt-4 border-t border-navy/15">
                      {s.expertise.map((x, k) => (
                        <li key={x} className="exp group relative overflow-hidden border-b border-navy/10">
                          <span aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-navy transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-x-100" />
                          <span className="relative flex items-center gap-4 px-2 py-4 font-sub text-charcoal transition-colors duration-500 group-hover:text-offwhite">
                            <span className="w-10 text-[11px] font-semibold tabular-nums text-gold">{s.no}.{k + 1}</span>
                            <span className="flex-1 transition-transform duration-500 group-hover:translate-x-1">{x}</span>
                            <span className="h-2 w-2 rotate-45 bg-gold transition-transform duration-500 group-hover:rotate-[225deg] group-hover:scale-125" />
                          </span>
                        </li>
                      ))}
                    </ul>
                    <ArrowLink href={`/contact-us?service=${encodeURIComponent(s.title)}#enquiry`} tone="navy" className="mt-10">{`Enquire About ${s.title.split(" ")[0]}`}</ArrowLink>
                  </div>

                  {/* gallery with architectural masks */}
                  <div className={`grid grid-cols-12 gap-3 sm:gap-4 xl:col-span-7 ${flip ? "xl:order-1" : ""}`}>
                    <figure className={`shot relative col-span-12 sm:col-span-8 ${flip ? "sm:order-2" : ""}`}>
                      <div className={`aspect-[4/5] w-full ${flip ? "[clip-path:polygon(0_10%,14%_0,100%_0,100%_100%,0_100%)]" : "[clip-path:polygon(0_0,86%_0,100%_10%,100%_100%,0_100%)]"}`}>
                        <Photo src={s.images[0]} alt={`${s.title} – featured project`} sizes="(min-width:1280px) 30vw, (min-width:640px) 60vw, 90vw" className="h-full w-full" />
                      </div>
                    </figure>
                    <div className={`col-span-12 grid grid-cols-2 gap-3 sm:col-span-4 sm:grid-cols-1 sm:gap-4 ${flip ? "sm:order-1" : ""}`}>
                      <div className="shot">
                        <div className="aspect-[3/4] overflow-hidden rounded-t-full">
                          <Photo src={s.images[1]} alt={`${s.title} – detail`} sizes="(min-width:640px) 20vw, 45vw" className="h-full w-full" />
                        </div>
                      </div>
                      <div className="shot relative">
                        <div className="relative aspect-square">
                          <Photo src={s.images[2]} alt={`${s.title} – structure`} sizes="(min-width:640px) 20vw, 45vw" className="h-full w-full" />
                          <span aria-hidden className="absolute inset-2 border border-offwhite/60" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}