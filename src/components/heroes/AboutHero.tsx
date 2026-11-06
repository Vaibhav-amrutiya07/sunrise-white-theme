"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { introDelay, useMotion } from "@/lib/motion";
import { images } from "@/config/images";
import Photo from "@/components/ui/Photo";
import Breadcrumb from "@/components/ui/Breadcrumb";

const SUBTITLE = "Creating spaces, developing structures and building a foundation for tomorrow.";

/** About banner: white like the other inner pages, with a layered photo composition on the right. */
export default function AboutHero() {
  const root = useRef<HTMLElement>(null);

  useMotion(root, (desktop) => {
    const d = introDelay();
    gsap.timeline({ delay: d })
      .fromTo(".ah-line", { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.1, ease: "power4.out" })
      .fromTo(".ah-main", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.inOut" }, 0.1)
      .fromTo(".ah-main .photo-in", { scale: 1.3 }, { scale: 1, duration: 2, ease: "power3.out" }, 0.1)
      .fromTo(".ah-sub", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" }, 0.6)
      .fromTo(".ah-fade", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "power3.out" }, 0.5)
      .fromTo(".ah-frame", { opacity: 0, x: 20, y: -20 }, { opacity: 1, x: 0, y: 0, duration: 1, ease: "power3.out" }, 1);
    if (desktop) {
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".ah-par-a", { yPercent: -8, ease: "none", scrollTrigger: st });
      gsap.to(".ah-par-b", { yPercent: 14, ease: "none", scrollTrigger: st });
    }
  });

  return (
    <section ref={root} className="relative overflow-hidden bg-white pb-20 pt-32 text-navy md:pb-28 md:pt-40">
      <div
        aria-hidden
        className="absolute -right-[15vw] -top-[25vw] h-[60vw] w-[60vw] rounded-full opacity-35"
        style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--gold) 40%, transparent), transparent 62%)" }}
      />

      <div className="wrap relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <div className="ah-fade"><Breadcrumb crumb="About Us" tone="light" /></div>
          <h1 className="mt-10 font-heading text-[clamp(3rem,7.4vw,6.6rem)] font-extrabold leading-[0.98] tracking-tight">
            <span className="block overflow-hidden pb-[0.06em]"><span className="ah-line block">About</span></span>
            <span className="block overflow-hidden pb-[0.06em]"><span className="ah-line outline-text-navy block">Sunrise</span></span>
            <span className="block overflow-hidden pb-[0.06em]"><span className="ah-line block text-gold-ink">Builders.</span></span>
          </h1>
          <div className="mt-8 flex max-w-md items-start gap-5">
            <span className="ah-fade mt-3 h-px w-12 shrink-0 bg-gold" />
            <p className="ah-fade font-sub text-base leading-relaxed text-navy/70 md:text-lg">{SUBTITLE}</p>
          </div>
        </div>

        <div className="relative h-[clamp(340px,56vh,540px)] lg:col-span-6">
          <div className="ah-par-a absolute right-0 top-0 h-[86%] w-[76%]">
            <div aria-hidden className="ah-frame absolute -right-4 -top-4 h-full w-full rounded-tl-[5rem] border border-gold/50" />
            <div className="ah-main relative h-full w-full overflow-hidden rounded-tl-[5rem]">
              <Photo src={images.aboutBanner} alt="Modern architecture – About Sunrise Builders" priority sizes="(min-width:1024px) 38vw, 80vw" className="h-full w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/50 to-transparent" />
            </div>
          </div>
          <div className="ah-par-b absolute bottom-0 left-0 w-[44%]">
            <div className="ah-sub relative aspect-square overflow-hidden border-[6px] border-white shadow-[0_30px_60px_-25px_rgba(24,50,74,.35)]">
              <Photo src={images.intro} alt="Planning and site coordination" sizes="(min-width:1024px) 20vw, 45vw" className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}