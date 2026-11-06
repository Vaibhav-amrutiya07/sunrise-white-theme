"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useMotion } from "@/lib/motion";
import { lenisRef } from "@/lib/lenis";
import { ArrowLink, SwapArrow } from "@/components/ui/Arrow";
import { site } from "@/config/site";

/** A simple post-submission destination, styled to match the architecture-inspired site. */
export default function ThankYouPage() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    // Avoid inheriting the contact form's scroll position after client-side navigation.
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useMotion(root, () => {
    gsap.fromTo(
      root.current?.querySelectorAll(".ty-reveal") ?? [],
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.11, ease: "power3.out", delay: 0.2 },
    );
    const icon = root.current?.querySelector(".ty-icon");
    if (icon) {
      gsap.fromTo(
        icon,
        { opacity: 0, scale: 0.65, rotate: -12 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: "back.out(1.6)", delay: 0.15 },
      );
    }
  });

  return (
    <section ref={root} className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden bg-white pb-44 pt-40 text-navy md:pb-52 md:pt-48">
      {/* Quiet architectural grid, radial sunrise glow, and measured gold accents. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(to right, #18324a 1px, transparent 1px),linear-gradient(to bottom, #18324a 1px, transparent 1px)", backgroundSize: "85px 85px" }} />
      <div aria-hidden className="pointer-events-none absolute -right-52 top-8 aspect-square w-[min(95vw,960px)] rounded-full border border-gold/15" />
      <div aria-hidden className="pointer-events-none absolute -right-28 top-28 aspect-square w-[min(80vw,760px)] rounded-full border border-dashed border-gold/20" />
      <div aria-hidden className="pointer-events-none absolute right-10 top-44 aspect-square w-[min(65vw,570px)] rounded-full border border-gold/10" />
      <div aria-hidden className="pointer-events-none absolute -right-36 -top-40 h-[700px] w-[700px] rounded-full opacity-50" style={{ background: "radial-gradient(circle, rgba(217,164,65,.2), transparent 65%)" }} />
      <span aria-hidden className="pointer-events-none absolute -bottom-10 -left-8 font-heading text-[clamp(9rem,35vw,33rem)] font-extrabold leading-none tracking-tighter text-navy/[.04]">✓</span>

      <div className="wrap relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="ty-reveal mb-8 flex items-center justify-center gap-3 font-sub text-xs font-semibold uppercase tracking-[0.25em] text-gold-ink">
            <span className="h-px w-8 bg-gold" /> Sunrise Builders <span className="h-px w-8 bg-gold" />
          </div>

          <div className="ty-icon relative mx-auto mb-9 grid h-24 w-24 place-items-center rounded-full border border-gold/35 bg-gold/10 sm:h-28 sm:w-28">
            <span aria-hidden className="absolute inset-2 rounded-full border border-dashed border-gold/25" />
            <svg viewBox="0 0 52 52" fill="none" className="relative h-12 w-12 text-gold-ink" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M11 27l10 10 20-23" />
            </svg>
          </div>

          <p className="ty-reveal mb-5 font-sub text-xs font-semibold uppercase tracking-[0.3em] text-gold-ink">Enquiry submitted successfully</p>
          <h1 className="ty-reveal font-heading text-[clamp(3.1rem,8vw,6.2rem)] font-extrabold leading-[1.02] tracking-tight">
            Thank <span className="text-gold-ink">You.</span>
          </h1>
          <p className="ty-reveal mx-auto mt-7 max-w-xl font-sub text-base leading-[1.9] text-navy/70 sm:text-lg">
            We&apos;ve received your project enquiry. Our team will review your details and get in touch with you shortly.
          </p>

          <div className="ty-reveal mx-auto mt-11 h-px max-w-lg bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

          <div className="ty-reveal mt-10 flex flex-wrap items-center justify-center gap-5">
            <ArrowLink href="/" tone="gold">Back to Home</ArrowLink>
            <Link href="/services" className="group inline-flex items-center gap-3 rounded-full border border-navy/20 px-6 py-4 font-heading text-sm font-semibold text-navy transition-colors hover:border-gold hover:text-gold-ink">
              Explore Our Services <SwapArrow className="h-4 w-4" />
            </Link>
          </div>

          <p className="ty-reveal mt-12 font-sub text-sm text-navy/55">
            Have a question? <a href={site.phoneHref} className="font-semibold text-navy underline decoration-gold underline-offset-4 transition-colors hover:text-gold-ink">Call our team</a>
          </p>
        </div>
      </div>
    </section>
  );
}