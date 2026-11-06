"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/lib/motion";
import { images } from "@/config/images";
import Photo from "@/components/ui/Photo";
import { Eyebrow, Words } from "@/components/ui/Text";

const PARAGRAPHS = [
  "At Sunrise Builders, we believe that every structure begins with an idea and becomes meaningful through thoughtful planning and quality execution.",
  "Our approach is centred on understanding the unique requirements of every project and delivering construction solutions that balance functionality, durability and design.",
  "With a focus on residential, commercial, industrial and infrastructure development, we aim to contribute to the spaces and environments where people live, work and grow.",
];

/** Our Story: heading, a wide photograph that opens on scroll, then three editorial columns. */
export default function StoryChapters() {
  const root = useRef<HTMLElement>(null);

  useMotion(root, (desktop) => {
    const band = { trigger: ".st-band", start: "top 85%", end: "center 50%", scrub: 0.6 };
    gsap.fromTo(".st-band", { clipPath: "inset(0% 12% 0% 12% round 24px)" }, { clipPath: "inset(0% 0% 0% 0% round 24px)", ease: "none", scrollTrigger: band });
    if (desktop) gsap.fromTo(".st-band .photo-in", { yPercent: -8, scale: 1.15 }, { yPercent: 8, scale: 1.15, ease: "none", scrollTrigger: { trigger: ".st-band", start: "top bottom", end: "bottom top", scrub: true } });
    gsap.fromTo(".st-col", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".st-cols", start: "top 80%" } });
    gsap.fromTo(".st-rule", { scaleX: 0 }, { scaleX: 1, stagger: 0.12, duration: 1.2, ease: "power3.inOut", scrollTrigger: { trigger: ".st-cols", start: "top 80%" } });
  });

  return (
    <section ref={root} className="relative bg-offwhite py-24 md:py-36">
      <div className="wrap">
        <div className="max-w-3xl">
          <Eyebrow>Our Story</Eyebrow>
          <Words text="Building with Purpose. Growing with Trust." className="font-heading text-4xl font-extrabold leading-[1.08] text-charcoal md:text-6xl" />
        </div>

        <div className="st-band relative mt-14 aspect-[16/10] overflow-hidden rounded-3xl md:mt-16 md:aspect-[21/8]">
          <Photo src={images.commercial[0]} alt="Sunrise Builders – spaces where people live, work and grow" sizes="100vw" className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
        </div>

        <div className="st-cols mt-14 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-12">
          {PARAGRAPHS.map((p) => (
            <div key={p} className="st-col">
              <span aria-hidden className="st-rule block h-[2px] w-14 origin-left bg-gold" />
              <p className="mt-6 text-lg leading-relaxed text-charcoal">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}