"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/lib/motion";
import { images } from "@/config/images";
import Photo from "@/components/ui/Photo";
import { ArrowIcon } from "@/components/ui/Arrow";

const STATEMENT = "At Sunrise Builders, we don't just focus on constructing buildings. We focus on creating lasting value.";
const BADGE = "CONTACT US • START YOUR PROJECT • ";

/** About page closer: "Built on Trust. Designed for Tomorrow." Editorial split + rotating seal CTA. */
export default function ClosingStatement() {
  const root = useRef<HTMLElement>(null);

  useMotion(root, (desktop) => {
    const st = { trigger: root.current, start: "top 70%" };
    gsap.fromTo(".cs-line", { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.12, ease: "power4.out", scrollTrigger: st });
    gsap.fromTo(".cs-flow", { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 70%", scrub: true } });
    gsap.fromTo(".cs-img", { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }, { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", duration: 1.6, ease: "power4.inOut", scrollTrigger: st });
    gsap.fromTo(".cs-img .photo-in", { scale: 1.3 }, { scale: 1, duration: 2, ease: "power3.out", scrollTrigger: st });
    gsap.fromTo(".cs-fade", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, delay: 0.4, ease: "power3.out", scrollTrigger: st });
    if (desktop) gsap.to(".cs-par", { yPercent: -14, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
  });

  return (
    <section ref={root} className="relative overflow-hidden bg-offwhite pb-12 pt-12 md:pb-20 md:pt-20">

      {/* flowing gold accent across the composition */}
      <svg aria-hidden viewBox="0 0 1440 800" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
        <path
          className="cs-flow"
          d="M-20 520 C 240 640 460 380 720 470 S 1080 700 1460 300"
          pathLength={1}
          strokeDasharray="1"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="wrap relative grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h2 className="font-heading text-[clamp(2.6rem,7vw,6.25rem)] font-extrabold leading-[0.98] tracking-tight text-charcoal">
            <span className="block overflow-hidden pb-[0.06em]"><span className="cs-line block">Built on Trust.</span></span>
            <span className="block overflow-hidden pb-[0.06em]"><span className="cs-line outline-text-navy block">Designed for</span></span>
            <span className="block overflow-hidden pb-[0.06em]"><span className="cs-line block text-navy">Tomorrow<span className="text-gold">.</span></span></span>
          </h2>

          <div className="mt-12 grid items-center gap-10 sm:grid-cols-[1fr_auto]">
            <p className="cs-fade max-w-md border-l-2 border-gold pl-6 font-sub text-lg leading-relaxed text-charcoal">{STATEMENT}</p>

            {/* rotating seal CTA */}
            <Link href="/contact-us" aria-label="Contact us – start your project" className="cs-fade group relative grid h-36 w-36 shrink-0 place-items-center justify-self-start sm:justify-self-end">
              <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 h-full w-full text-navy" aria-hidden>
                <defs>
                  <path id="cs-circle" d="M60 60 m-47 0 a47 47 0 1 1 94 0 a47 47 0 1 1 -94 0" />
                </defs>
                <text className="font-sub" fontSize="9.4" fontWeight="600" letterSpacing="2.6" fill="currentColor">
                  <textPath href="#cs-circle">{BADGE}</textPath>
                </text>
              </svg>
              <span className="relative grid h-20 w-20 place-items-center overflow-hidden rounded-full bg-navy text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-navy">
                <span className="absolute inset-0 scale-0 rounded-full bg-gold transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-100" />
                <span className="relative transition-transform duration-500 group-hover:-rotate-45">
                  <ArrowIcon className="h-6 w-6" />
                </span>
              </span>
            </Link>
          </div>
        </div>

        <div className="cs-par relative mx-auto w-full max-w-md lg:col-span-5">
          <div className="cs-img relative aspect-[3/4] overflow-hidden [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]">
            <div className="h-full w-full [clip-path:polygon(0_0,82%_0,100%_12%,100%_100%,18%_100%,0_88%)]">
              <Photo src={images.residential[0]} alt="A finished residence – designed for tomorrow" sizes="(min-width:1024px) 30vw, 80vw" className="h-full w-full" />
            </div>
          </div>
          <div aria-hidden className="cs-fade absolute -bottom-8 right-6 h-24 w-24 border-b border-r border-gold" />
        </div>
      </div>
    </section>
  );
}
