"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/lib/motion";
import { Eyebrow, Words } from "@/components/ui/Text";

const points = [
  { t: "Quality-Focused Execution", d: "Attention to materials, workmanship and construction standards." },
  { t: "Thoughtful Planning", d: "Every project begins with proper understanding and planning." },
  { t: "Skilled Professionals", d: "A coordinated approach to construction activities." },
  { t: "Transparent Communication", d: "Clear communication throughout the project journey." },
  { t: "Commitment to Delivery", d: "Focus on responsible execution and project progress." },
];

/** Five bricks laid in running bond: mortar is spread, then each brick drops into place. */
export default function WhyLayers() {
  const root = useRef<HTMLElement>(null);

  useMotion(root, () => {
    root.current!.querySelectorAll<HTMLElement>(".course").forEach((el, i) => {
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top 90%" } })
        .from(el.querySelector(".mortar"), { scaleX: 0, transformOrigin: i % 2 ? "right" : "left", duration: 0.6, ease: "power3.out" })
        .from(el.querySelector(".brick"), { y: -90, opacity: 0, rotate: i % 2 ? 2.5 : -2.5, duration: 1, ease: "bounce.out" }, 0.35);
    });
    gsap.from(".foundation", { scaleX: 0, transformOrigin: "left", ease: "power3.inOut", duration: 1.4, scrollTrigger: { trigger: ".foundation", start: "top 92%" } });
  });

  return (
    <section ref={root} className="brick-bg bg-offwhite py-12 md:py-20">
      <div className="wrap relative grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="self-start lg:sticky lg:top-32">
          <Eyebrow>Why Choose Sunrise Builders?</Eyebrow>
          <Words text="The Right Foundation for Every Project" className="font-heading text-4xl font-extrabold leading-[1.1] text-charcoal md:text-5xl" />
          <span className="outline-text-navy mt-10 hidden font-heading text-9xl font-extrabold leading-none opacity-30 lg:block">05</span>
        </div>

        <div className="flex flex-col gap-1">
          {points.map((p, i) => (
            <div key={p.t} className={`course ${i % 2 ? "lg:ml-16" : "lg:mr-16"}`}>
              <div className="mortar h-1.5 bg-gold/50" />
              <div className="brick border border-navy/10 border-l-4 border-l-gold bg-white p-7 shadow-md md:p-9">
                <p className="font-sub text-xs font-semibold uppercase tracking-[0.3em] text-gold">Course 0{i + 1}</p>
                <h3 className="mt-2 font-sub text-xl font-semibold text-navy">{p.t}</h3>
                <p className="mt-2 text-slate">{p.d}</p>
              </div>
            </div>
          ))}
          <div className="foundation mt-1 h-4 hazard" />
        </div>
      </div>
    </section>
  );
}
