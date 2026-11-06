"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { introDelay, useMotion } from "@/lib/motion";

type WordsProps = {
  text: string; // use "\n" for line breaks
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  immediate?: boolean; // animate on load instead of on scroll
  delay?: number;
  accentFrom?: number; // lines from this index are gold
  accentClass?: string; // colour class for the accent lines (default brand gold)
};

/** Masked word-by-word reveal. */
export function Words({
  text,
  as = "h2",
  className = "",
  immediate = false,
  delay = 0,
  accentFrom,
  accentClass = "text-gold",
}: WordsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = as;

  useMotion(ref, () => {
    gsap.from(ref.current!.querySelectorAll(".w"), {
      yPercent: 115,
      rotate: 4,
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.07,
      delay: delay + (immediate ? introDelay() - 0.1 : 0),
      scrollTrigger: immediate
        ? undefined
        : { trigger: ref.current, start: "top 88%" },
    });
  });

  return (
    <div ref={ref}>
      <Tag className={className}>
        {text.split("\n").map((line, li) => {
          const words = line.split(" ");
          return (
            <span key={li} className="block">
              {words.map((w, wi) => (
                <span key={wi}>
                  <span className="inline-block overflow-hidden pb-[0.15em] -mb-[0.15em] align-bottom">
                    <span
                      className={`w inline-block ${
                        accentFrom !== undefined && li >= accentFrom ? accentClass : ""
                      }`}
                    >
                      {w}
                    </span>
                  </span>
                  {wi < words.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
          );
        })}
      </Tag>
    </div>
  );
}

/** Paragraph whose words light up as you scroll past. */
export function ScrubText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useMotion(ref, () => {
    gsap.fromTo(
      ref.current!.querySelectorAll(".sw"),
      { opacity: 0.16 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 85%", end: "bottom 60%", scrub: true },
      },
    );
  });

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="sw">
          {w}{" "}
        </span>
      ))}
    </p>
  );
}

export function Eyebrow({ children, className = "", tone = "gold" }: { children: React.ReactNode; className?: string; tone?: "gold" | "ink" }) {
  return (
    <p className={`mb-5 flex items-center gap-3 font-sub text-xs font-semibold uppercase tracking-[0.3em] ${tone === "ink" ? "text-gold-ink" : "text-gold"} ${className}`}>
      <span className="h-px w-8 bg-gold" />
      {children}
    </p>
  );
}
