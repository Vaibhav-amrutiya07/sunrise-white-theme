"use client";

import Link from "next/link";
import { useRef } from "react";
import { useMagnetic } from "@/lib/useMagnetic";

type Dir = "right" | "up" | "diag" | "down";
const paths: Record<Dir, string> = {
  right: "M4 12h15M13 6l6 6-6 6",
  up: "M12 20V5M6 11l6-6 6 6",
  down: "M12 4v15M6 13l6 6 6-6",
  diag: "M6 18 18 6M8 6h10v10",
};

export function ArrowIcon({ dir = "right", className = "h-4 w-4" }: { dir?: Dir; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={paths[dir]} />
    </svg>
  );
}

/** Arrow that slides out and a twin slides in on parent .group hover. */
export function SwapArrow({ dir = "right", className = "h-4 w-4" }: { dir?: Dir; className?: string }) {
  const mode = dir === "right" ? "" : dir;
  return (
    <span className={`arrow-swap ${mode}`} aria-hidden>
      <ArrowIcon dir={dir} className={className} />
      <ArrowIcon dir={dir} className={className} />
    </span>
  );
}

/** Label that rolls up to a second copy on parent .group hover. */
export function RollText({ children, hoverClass = "" }: { children: string; hoverClass?: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden className={hoverClass}>{children}</span>
    </span>
  );
}

type Tone = "gold" | "navy" | "light";
const tones: Record<Tone, { shell: string; chip: string; label: string; icon: string }> = {
  gold: { shell: "bg-gold text-navy", chip: "bg-navy", label: "group-hover:text-offwhite", icon: "text-gold" },
  navy: { shell: "bg-navy text-offwhite", chip: "bg-gold", label: "group-hover:text-navy", icon: "text-navy" },
  light: { shell: "bg-offwhite text-navy", chip: "bg-gold", label: "group-hover:text-navy", icon: "text-navy" },
};

const shellBase =
  "group relative isolate inline-flex select-none items-center gap-4 overflow-hidden rounded-full py-1.5 pl-6 pr-1.5 font-heading text-sm font-semibold tracking-wide disabled:cursor-not-allowed disabled:opacity-60";

function Inner({ tone, children, size }: { tone: Tone; children: string; size: "md" | "sm" }) {
  const t = tones[tone];
  const chip = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  return (
    <>
      {/* chip grows to fill the button on hover */}
      <span
        aria-hidden
        className={`absolute inset-y-1.5 right-1.5 -z-10 rounded-full transition-[width] duration-[650ms] ease-[cubic-bezier(.7,0,.2,1)] group-hover:w-[calc(100%-0.75rem)] ${chip} ${t.chip}`}
      />
      <span className={`transition-colors duration-500 ${t.label}`}>
        <RollText>{children}</RollText>
      </span>
      <span className={`grid shrink-0 place-items-center ${chip} ${t.icon}`}>
        <SwapArrow />
      </span>
    </>
  );
}

type LinkProps = {
  href: string;
  children: string;
  tone?: Tone;
  size?: "md" | "sm";
  className?: string;
  external?: boolean; // opens in a new tab with a plain <a>
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

/** Premium pill CTA: rolling label, expanding arrow chip and a magnetic pull. */
export function ArrowLink({ href, children, tone = "gold", size = "md", className = "", external = false, onClick }: LinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref, 0.22);
  if (external) {
    return (
      <a ref={ref} href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={`${shellBase} ${tones[tone].shell} ${className}`}>
        <Inner tone={tone} size={size}>{children}</Inner>
      </a>
    );
  }
  return (
    <Link ref={ref} href={href} onClick={onClick} className={`${shellBase} ${tones[tone].shell} ${className}`}>
      <Inner tone={tone} size={size}>{children}</Inner>
    </Link>
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { children: string; tone?: Tone; size?: "md" | "sm" };

export function ArrowButton({ children, tone = "gold", size = "md", className = "", ...rest }: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  useMagnetic(ref, 0.22);
  return (
    <button ref={ref} {...rest} className={`${shellBase} ${tones[tone].shell} ${className}`}>
      <Inner tone={tone} size={size}>{children}</Inner>
    </button>
  );
}
