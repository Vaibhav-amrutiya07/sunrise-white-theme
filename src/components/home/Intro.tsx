"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/lib/motion";
import { images } from "@/config/images";
import Photo from "@/components/ui/Photo";
import { ArrowLink } from "@/components/ui/Arrow";
import { Eyebrow, ScrubText, Words } from "@/components/ui/Text";

const tickH = "before:absolute before:-top-2 before:left-0 before:h-4 before:w-px before:bg-gold after:absolute after:-top-2 after:right-0 after:h-4 after:w-px after:bg-gold";
const tickV = "before:absolute before:-left-2 before:top-0 before:h-px before:w-4 before:bg-gold after:absolute after:-left-2 after:bottom-0 after:h-px after:w-4 after:bg-gold";

/**
 * Home "Who We Are": story on the left; on the right a sun rises behind an arched
 * building photograph as you scroll, with architect's dimension lines.
 */
export default function Intro() {
  const root = useRef<HTMLElement>(null);

  useMotion(root, (desktop) => {
    const st = { trigger: ".wi-art", start: "top 75%" };
    gsap.fromTo(".wi-main", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "power4.inOut", scrollTrigger: st });
    gsap.fromTo(".wi-main .photo-in", { scale: 1.35 }, { scale: 1, duration: 2, ease: "power3.out", scrollTrigger: st });
    gsap.fromTo(".wi-small", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, delay: 0.6, ease: "power4.inOut", scrollTrigger: st });
    gsap.fromTo(".wi-horizon", { scaleX: 0 }, { scaleX: 1, duration: 1.4, delay: 0.3, ease: "power3.inOut", scrollTrigger: st });
    gsap.fromTo(".wi-dim-h", { scaleX: 0 }, { scaleX: 1, duration: 1.3, delay: 0.8, ease: "power3.inOut", scrollTrigger: st });
    gsap.fromTo(".wi-dim-v", { scaleY: 0 }, { scaleY: 1, duration: 1.3, delay: 1, ease: "power3.inOut", scrollTrigger: st });
    gsap.fromTo(".wi-fade", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".wi-cta", start: "top 92%" } });

    // the sunrise: the sun climbs from behind the horizon as the section scrolls by
    const scrub = { trigger: root.current, start: "top bottom", end: "bottom 30%", scrub: true };
    gsap.fromTo(".wi-sun", { yPercent: 70 }, { yPercent: -15, ease: "none", scrollTrigger: scrub });
    gsap.fromTo(".wi-rays", { rotate: -20, opacity: 0.2 }, { rotate: 10, opacity: 1, ease: "none", scrollTrigger: scrub });
    if (desktop) gsap.fromTo(".wi-small", { yPercent: 8 }, { yPercent: -12, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
  });

  // gentle depth on mouse move (fine pointers only)
  useEffect(() => {
    const el = root.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const box = el.querySelector<HTMLElement>(".wi-art");
    const main = el.querySelector<HTMLElement>(".wi-main-wrap");
    const small = el.querySelector<HTMLElement>(".wi-small-wrap");
    if (!box || !main || !small) return;
    const mx = gsap.quickTo(main, "x", { duration: 1, ease: "power3" }), my = gsap.quickTo(main, "y", { duration: 1, ease: "power3" });
    const sx = gsap.quickTo(small, "x", { duration: 1, ease: "power3" }), sy = gsap.quickTo(small, "y", { duration: 1, ease: "power3" });
    const move = (e: MouseEvent) => {
      const r = box.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
      mx(nx * 8); my(ny * 8); sx(nx * -20); sy(ny * -20);
    };
    const leave = () => { mx(0); my(0); sx(0); sy(0); };
    box.addEventListener("mousemove", move);
    box.addEventListener("mouseleave", leave);
    return () => { box.removeEventListener("mousemove", move); box.removeEventListener("mouseleave", leave); };
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-offwhite py-12 md:py-20">
      <div className="wrap grid items-center gap-20 lg:grid-cols-12 lg:gap-16">
        {/* left: content */}
        <div className="lg:col-span-6">
          <Eyebrow>Who We Are</Eyebrow>
          <Words
            text="Construction Built on Trust. Driven by Excellence."
            className="font-heading text-4xl font-extrabold leading-[1.1] text-charcoal md:text-5xl"
          />
          <div className="mt-8 space-y-5 border-l-2 border-gold/60 pl-6 text-lg leading-relaxed text-charcoal">
            <ScrubText text="Sunrise Builders is committed to delivering dependable construction solutions across residential, commercial and industrial sectors." />
            <ScrubText text="We bring together thoughtful planning, skilled execution and quality-focused practices to create structures that serve people and businesses for years to come." />
            <ScrubText text="From the initial concept to project completion, our focus remains on delivering value through responsible construction and attention to detail." />
          </div>
          <div className="wi-cta wi-fade mt-10">
            <ArrowLink href="/about-us" tone="navy">Discover Our Story</ArrowLink>
          </div>
        </div>

        {/* right: sunrise behind the arch */}
        <div className="wi-art relative mx-auto w-full max-w-xl lg:col-span-6">
          <div className="relative aspect-[1/1.05] w-full">
            {/* sun + rays (clipped at the horizon) */}
            <div aria-hidden className="absolute inset-x-0 bottom-[8%] top-0 [clip-path:inset(-40%_-40%_0_-40%)]">
              <div className="wi-sun absolute left-[36%] top-[8%] aspect-square w-[56%]">
                <svg viewBox="-100 -100 200 200" className="wi-rays absolute -inset-[30%] h-[160%] w-[160%]" fill="none" stroke="var(--gold)">
                  {Array.from({ length: 24 }, (_, i) => {
                    const a = (i / 24) * Math.PI * 2;
                    return <line key={i} x1={Math.cos(a) * 58} y1={Math.sin(a) * 58} x2={Math.cos(a) * (i % 2 ? 70 : 80)} y2={Math.sin(a) * (i % 2 ? 70 : 80)} strokeOpacity=".55" strokeWidth="1.2" />;
                  })}
                </svg>
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ background: "radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--gold) 55%, white), var(--gold) 68%)", boxShadow: "0 0 90px 20px color-mix(in srgb, var(--gold) 30%, transparent)" }}
                />
              </div>
            </div>

            {/* arched building photograph */}
            <div className="wi-main-wrap absolute bottom-[8%] left-[6%] h-[78%] w-[52%]">
              <div className="wi-main relative h-full w-full overflow-hidden rounded-t-full border-[6px] border-b-0 border-offwhite bg-offwhite">
                <Photo src={images.intro} alt="Sunrise Builders planning and site coordination" sizes="(min-width:1024px) 26vw, 55vw" className="h-full w-full rounded-t-full" />
              </div>
              <div aria-hidden className={`wi-dim-h pointer-events-none absolute -top-8 left-0 right-0 flex h-px items-center justify-center bg-gold ${tickH}`}>
                <span className="bg-offwhite px-3 font-sub text-[11px] font-semibold tracking-widest text-gold">12.00 M</span>
              </div>
            </div>

            {/* second photograph standing on the horizon */}
            <div className="wi-small-wrap absolute bottom-[8%] right-[4%] w-[34%]">
              <div className="wi-small relative aspect-[3/4] overflow-hidden border-[6px] border-b-0 border-offwhite bg-offwhite shadow-[0_30px_60px_-30px_rgba(24,50,74,.55)]">
                <Photo src={images.residential[1]} alt="Sunrise Builders residential project detail" sizes="(min-width:1024px) 18vw, 35vw" className="h-full w-full" />
              </div>
              <div aria-hidden className={`wi-dim-v pointer-events-none absolute -right-6 bottom-0 top-0 hidden w-px items-center justify-center bg-gold sm:flex ${tickV}`}>
                <span className="rotate-90 whitespace-nowrap bg-offwhite px-3 font-sub text-[11px] font-semibold tracking-widest text-gold">15.00 M</span>
              </div>
            </div>

            {/* horizon / ground line */}
            <div aria-hidden className="wi-horizon absolute bottom-[8%] left-0 right-0 h-[2px] origin-left bg-navy" />
            <div aria-hidden className="ruler absolute bottom-[calc(8%-14px)] left-0 right-0 text-navy/30" />
          </div>
        </div>
      </div>
    </section>
  );
}