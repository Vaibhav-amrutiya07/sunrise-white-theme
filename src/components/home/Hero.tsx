"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { introDelay, useMotion } from "@/lib/motion";
import { makeCraneDrawer } from "@/lib/crane";
import { images } from "@/config/images";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import { Eyebrow, Words } from "@/components/ui/Text";
import { BLD_X, CranePaths, Floors, GROUND, HookGear, PILE_X, Pile, floorTop } from "@/components/ui/ConstructionArt";

const CITY = "M-400 540V470H70V420H140V470H200V380H260V350H320V380H380V450H450V410H520V470H600V430H680V490H760V540Z";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useMotion(root, () => {
    const d = introDelay();
    const draw = makeCraneDrawer(root.current!);
    const p = { x: BLD_X, y: floorTop(2) - 25 };
    draw(p);

    // entrance: city, crane and the first three floors
    gsap.set(".h-load", { opacity: 0 });
    gsap.set(".fl-3, .fl-4, .fl-5, .fl-6, .fl-7", { opacity: 0 });
    gsap.from(".city", { yPercent: 30, opacity: 0, duration: 1.6, delay: d, ease: "power3.out" });
    gsap.from(".crane", { opacity: 0, y: -40, duration: 1.2, delay: d + 0.2, ease: "power3.out" });
    gsap.from(".fl-0, .fl-1, .fl-2", { opacity: 0, y: -24, stagger: 0.25, duration: 0.7, delay: d + 0.5, ease: "bounce.out" });
    gsap.from(".hero-photo", { scale: 1.15, duration: 2.8, delay: d, ease: "power3.out" });
    gsap.from(".hero-fade", { y: 28, opacity: 0, stagger: 0.14, duration: 1, delay: d + 0.7, ease: "power3.out" });

    // scroll = construction progress: the crane lifts floors 4-8 into place while the sun rises
    gsap.set(".sun", { xPercent: -50, yPercent: 75 });
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: root.current, start: "top top", end: "+=180%", pin: true, scrub: 1, anticipatePin: 1 },
    });
    let t = 0;
    for (let k = 3; k < 8; k++) {
      tl.to(p, { x: PILE_X, y: GROUND - 27, duration: 0.5, onUpdate: () => draw(p) }, t)
        .set(".h-load", { opacity: 1 }, t + 0.5)
        .to(p, { x: BLD_X, y: floorTop(k) - 25, duration: 0.9, ease: "power1.inOut", onUpdate: () => draw(p) }, t + 0.5)
        .fromTo(`.fl-${k}`, { opacity: 0, y: -18 }, { opacity: 1, y: 0, duration: 0.25, immediateRender: false }, t + 1.4)
        .set(".h-load", { opacity: 0 }, t + 1.4);
      t += 1.65;
    }
    tl.to(".win-lit", { opacity: 0.9, stagger: 0.02, duration: 0.3 }, t);
    const end = t + 1.2;
    tl.to(".sun", { yPercent: -45, duration: end }, 0)
      .to(".dawn", { opacity: 1, duration: end }, 0)
      .to(".night", { opacity: 0.6, duration: end }, 0)
      .to(".hero-copy", { yPercent: -8, duration: end }, 0)
      .to(".cue", { opacity: 0, duration: 1 }, 0);
  });

  return (
    <div>
      <section ref={root} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-white text-navy">
        <Photo src={images.hero} alt="Modern architectural building by Sunrise Builders" priority className="hero-photo absolute inset-0" />
        <div className="night absolute inset-0 bg-white/85" />
        <div
          className="dawn absolute inset-0 opacity-0"
          style={{ background: "radial-gradient(120% 80% at 74% 100%, color-mix(in srgb, var(--gold) 55%, transparent), transparent 62%)" }}
        />

        <div
          className="sun absolute bottom-0 left-[74%] aspect-square w-[min(40vmin,420px)] rounded-full"
          style={{
            background: "radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--gold) 60%, white), var(--gold) 62%)",
            boxShadow: "0 0 120px 40px color-mix(in srgb, var(--gold) 35%, transparent)",
          }}
        />

        {/* construction site: crane + building under construction */}
        <svg
          viewBox="0 0 1440 560"
          preserveAspectRatio="xMaxYMax meet"
          className="absolute bottom-0 right-0 h-[64vh] min-h-[360px] w-full overflow-visible text-navy/70 md:text-navy/85"
          aria-hidden
        >
          <path className="city" d={CITY} fill="#fff" />
          <CranePaths />
          <Floors />
          <Pile />
          <HookGear />
          <rect x="-3000" y={GROUND - 1} width="6000" height="600" fill="#fff" />
          <rect x="-3000" y={GROUND - 1} width="6000" height="4" fill="var(--gold)" />
        </svg>
        <div className="hazard absolute inset-x-0 bottom-0 h-2" />

        <div className="wrap relative z-10 flex h-full flex-col justify-center pb-[18vh] pt-28">
          <div className="hero-copy max-w-3xl">
            <div className="hero-fade"><Eyebrow tone="ink">Construction &amp; Infrastructure</Eyebrow></div>
            <Words
              as="h1"
              immediate
              accentFrom={1}
              accentClass="text-gold-ink"
              text={"Building Today.\nShaping Tomorrow."}
              className="font-heading text-5xl font-extrabold leading-[1.02] sm:text-6xl md:text-7xl lg:text-7xl"
            />
            <p className="hero-fade mt-8 max-w-xl font-sub text-base text-navy/75 md:text-lg">
              From thoughtfully designed homes to large-scale commercial and industrial developments, we bring
              construction ideas to life with quality, precision and commitment.
            </p>
            <div className="hero-fade mt-10 flex flex-wrap gap-4">
              <Button href="/services">Explore Our Services</Button>
              <Button href="/contact-us" variant="outlineDark">Get a Quote</Button>
            </div>
          </div>
        </div>

        <div className="cue absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-sub text-[10px] uppercase tracking-[0.4em] text-navy/60">
          Scroll to build
          <span className="cue-line h-8 w-px bg-gold" />
        </div>
      </section>
    </div>
  );
}
