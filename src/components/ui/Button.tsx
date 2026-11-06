"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Variant = "gold" | "outline" | "outlineDark" | "navy" | "solidNavy" | "outlineNavy";

const base =
  "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-heading font-medium tracking-wide";
const sizes = { md: "px-8 py-4 text-sm", sm: "px-6 py-3 text-sm" };
const variants: Record<Variant, string> = {
  gold: "bg-gold text-navy ring-1 ring-gold",
  outline: "border border-offwhite/40 text-offwhite",
  outlineDark: "border border-navy/30 text-navy", // for white backgrounds
  navy: "bg-navy text-offwhite",
  solidNavy: "bg-navy text-offwhite ring-1 ring-navy", // for gold backgrounds
  outlineNavy: "border border-navy/50 text-navy", // for gold backgrounds
};
const fills: Record<Variant, string> = {
  gold: "bg-offwhite",
  outline: "bg-gold",
  outlineDark: "bg-gold",
  navy: "bg-gold",
  solidNavy: "bg-offwhite",
  outlineNavy: "bg-navy",
};
const labelHover: Record<Variant, string> = {
  gold: "",
  outline: "group-hover:text-navy",
  outlineDark: "group-hover:text-navy",
  navy: "group-hover:text-navy",
  solidNavy: "group-hover:text-navy",
  outlineNavy: "group-hover:text-offwhite",
};

export function buttonClasses(variant: Variant = "gold", size: "md" | "sm" = "md") {
  return `${base} ${sizes[size]} ${variants[variant]}`;
}

export function ButtonInner({ variant = "gold", children }: { variant?: Variant; children: React.ReactNode }) {
  return (
    <>
      <span className={`relative z-10 transition-colors duration-300 ${labelHover[variant]}`}>{children}</span>
      <span
        aria-hidden
        className={`absolute inset-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 ${fills[variant]}`}
      />
    </>
  );
}

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  className?: string;
};

/** Gold-on-navy CTA with a magnetic hover. */
export default function Button({ href, children, variant = "gold", size = "md", className = "" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * 0.25);
      y((e.clientY - r.top - r.height / 2) * 0.35);
    };
    const leave = () => { x(0); y(0); };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <Link ref={ref} href={href} className={`${buttonClasses(variant, size)} ${className}`}>
      <ButtonInner variant={variant}>{children}</ButtonInner>
    </Link>
  );
}