"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/lib/motion";
import Button from "@/components/ui/Button";
import SiteScene from "@/components/ui/ConstructionArt";
import { Eyebrow } from "@/components/ui/Text";

const text = "Let's Build Something Meaningful Together.";
const cls = "font-heading text-[clamp(2.6rem,8vw,7rem)] font-extrabold leading-[1.02]";

export default function FinalCta() {
  const root = useRef<HTMLElement>(null);

  useMotion(root, () => {
    // the headline is "formwork": gold is poured in from the bottom as you scroll
    gsap.fromTo(
      ".cta-fill",
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: ".cta-head", start: "top 85%", end: "bottom 45%", scrub: true } },
    );
    gsap.from(".cta-scene", { y: 80, opacity: 0, duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 70%" } });
  });

  return (
    <section ref={root} className="relative overflow-hidden bg-navy-deep py-12 text-offwhite md:py-20">
      <div className="hazard absolute inset-x-0 top-0 h-3" />
      <div className="cta-scene pointer-events-none absolute bottom-0 right-0 h-[85%] w-1/2 opacity-60">
        <SiteScene floors={8} className="h-full w-full text-offwhite/25" />
      </div>
      <div className="wrap relative">
        <Eyebrow>Ready to Break Ground?</Eyebrow>
        <div className="cta-head relative max-w-6xl">
          <h2 className={`outline-text ${cls}`}>{text}</h2>
          <p aria-hidden className={`cta-fill absolute inset-0 text-gold ${cls}`}>{text}</p>
        </div>
        <p className="mt-10 max-w-xl font-sub text-lg text-offwhite/75">
          Have a construction project in mind? Let&apos;s discuss your requirements and explore the right solutions for your vision.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/contact-us">Start Your Project</Button>
          <Button href="/contact-us" variant="outline">Contact Our Team</Button>
        </div>
      </div>
    </section>
  );
}
