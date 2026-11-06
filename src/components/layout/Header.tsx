"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { lenisRef } from "@/lib/lenis";
import { ArrowLink, RollText, SwapArrow } from "@/components/ui/Arrow";
import Logo from "./Logo";

/** Same header on every page: dark text over the white banners, compact navy glass pill on scroll. */
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const rail = useRef<HTMLElement>(null);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });

  const activeIndex = site.nav.findIndex((l) => l.href === pathname);
  const compact = scrolled && !open;

  /* ---- scroll state ---- */
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  /* ---- sliding indicator ---- */
  const moveTo = useCallback((i: number) => {
    const el = links.current[i];
    if (!el) return setPill((p) => ({ ...p, visible: false }));
    setPill({ left: el.offsetLeft, width: el.offsetWidth, visible: true });
  }, []);
  const reset = useCallback(() => moveTo(activeIndex), [moveTo, activeIndex]);

  useEffect(() => {
    reset();
    const r = () => reset();
    window.addEventListener("resize", r);
    document.fonts?.ready.then(r).catch(() => {});
    return () => window.removeEventListener("resize", r);
  }, [reset, compact]);

  /* ---- mobile menu ---- */
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const html = document.documentElement;
    if (open) {
      html.style.overflow = "hidden";
      lenisRef.current?.stop();
    } else {
      html.style.overflow = "";
      lenisRef.current?.start();
    }
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 px-3 transition-[padding] duration-700 sm:px-5 ${compact ? "pt-3" : "pt-4 md:pt-6"}`}>
        <div
          className={`mx-auto flex items-center justify-between border transition-all duration-700 ease-[cubic-bezier(.7,0,.2,1)] ${
            compact
              ? "max-w-[66rem] rounded-full border-offwhite/10 bg-navy-deep/75 py-2 pl-4 pr-2 shadow-[0_24px_60px_-24px_rgba(0,0,0,.55)] backdrop-blur-xl sm:pl-6"
              : "max-w-[80rem] rounded-none border-transparent bg-transparent px-3 py-2 sm:px-4"
          }`}
        >
          <Link href="/" aria-label="Sunrise Builders – Home" onClick={() => setOpen(false)} className="shrink-0">
            <Logo tone="light" compact={compact} />
          </Link>

          {/* desktop rail */}
          <nav
            ref={rail}
            aria-label="Main"
            onMouseLeave={reset}
            className={`relative hidden items-center rounded-full border p-1 transition-colors duration-500 lg:flex ${
              compact ? "border-transparent" : "border-navy/10 bg-white/60 backdrop-blur"
            }`}
          >
            <span
              aria-hidden
              className={`absolute bottom-1 top-1 rounded-full ${compact ? "bg-offwhite/[0.09]" : "bg-navy/[0.06]"} transition-[left,width,opacity] duration-500 ease-[cubic-bezier(.7,0,.2,1)]`}
              style={{ left: pill.left, width: pill.width, opacity: pill.visible ? 1 : 0 }}
            >
              {/* active marker travels with the lozenge */}
              <span className="absolute -bottom-[3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 bg-gold" />
            </span>
            {site.nav.map((l, i) => {
              const active = i === activeIndex;
              return (
                <Link
                  key={l.href}
                  ref={(el) => { links.current[i] = el; }}
                  href={l.href}
                  onMouseEnter={() => moveTo(i)}
                  onFocus={() => moveTo(i)}
                  onBlur={reset}
                  aria-current={active ? "page" : undefined}
                  className={`group relative z-10 flex items-center gap-2 rounded-full px-5 py-2.5 font-sub text-[13px] font-medium transition-colors duration-300 ${
                    active
                      ? compact ? "text-offwhite" : "text-navy"
                      : compact ? "text-offwhite/65 hover:text-offwhite" : "text-navy/65 hover:text-navy"
                  }`}
                >
                  <RollText hoverClass="text-gold">{l.label}</RollText>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:block">
              <ArrowLink href="/contact-us" size="sm">Get a Quote</ArrowLink>
            </span>

            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`group flex h-11 items-center gap-3 rounded-full border px-1.5 transition-colors duration-500 lg:hidden ${compact || open ? "border-offwhite/15 text-offwhite" : "border-navy/15 text-navy"}`}
            >
              <span className="relative grid h-8 w-8 place-items-center rounded-full bg-gold">
                <span
                  className={`absolute h-[1.5px] w-4 bg-navy transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] ${open ? "rotate-45" : "-translate-y-[3.5px]"}`}
                />
                <span
                  className={`absolute h-[1.5px] bg-navy transition-all duration-500 ease-[cubic-bezier(.7,0,.2,1)] ${
                    open ? "w-4 -rotate-45" : "w-2.5 translate-x-[3px] translate-y-[3.5px] group-hover:w-4 group-hover:translate-x-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} pathname={pathname} close={() => setOpen(false)} />
    </>
  );
}

function MobileMenu({ open, pathname, close }: { open: boolean; pathname: string; close: () => void }) {
  const origin = "calc(100% - 2.6rem) 2.6rem";
  return (
    <div
      id="mobile-menu"
      inert={!open}
      aria-hidden={!open}
      className="fixed inset-0 z-[45] overflow-hidden bg-navy-deep text-offwhite transition-[clip-path] duration-[900ms] ease-[cubic-bezier(.76,0,.24,1)] lg:hidden"
      style={{ clipPath: open ? `circle(150% at ${origin})` : `circle(0% at ${origin})` }}
    >
      {/* decorative surface */}
      <svg aria-hidden viewBox="0 0 400 400" className={`absolute -bottom-40 -right-40 h-[34rem] w-[34rem] text-gold/25 transition-transform duration-[1400ms] ${open ? "rotate-0" : "rotate-45"}`} fill="none" stroke="currentColor">
        <circle cx="200" cy="200" r="198" />
        <circle cx="200" cy="200" r="150" strokeDasharray="2 6" />
        <circle cx="200" cy="200" r="100" />
        <path d="M200 0v400M0 200h400M58 58l284 284M342 58 58 342" strokeOpacity=".5" />
      </svg>
      <span aria-hidden className="outline-text absolute -left-4 top-24 select-none font-heading text-[42vw] font-extrabold leading-none opacity-[0.05]">SB</span>

      <div className="relative flex h-full flex-col overflow-y-auto px-6 pb-8 pt-28 sm:px-10">
        <nav aria-label="Mobile" className="flex flex-col">
          {site.nav.map((l, i) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={close}
                aria-current={active ? "page" : undefined}
                className="group relative flex items-center gap-4 border-b border-offwhite/10 py-4 sm:py-5"
              >
                <span
                  className={`absolute bottom-0 left-0 h-px w-full origin-left bg-gold transition-transform duration-700 ${open ? "scale-x-100" : "scale-x-0"} ${active ? "" : "opacity-0"}`}
                  style={{ transitionDelay: open ? `${450 + i * 90}ms` : "0ms" }}
                />
                <span className="w-7 font-sub text-xs font-semibold tabular-nums text-gold">0{i + 1}</span>
                <span className="flex-1 overflow-hidden">
                  <span
                    className={`block font-heading text-[clamp(2.1rem,10vw,3.75rem)] font-extrabold leading-[1.05] transition-transform duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)] ${
                      active ? "text-gold" : "text-offwhite"
                    }`}
                    style={{ transform: open ? "translateY(0)" : "translateY(110%)", transitionDelay: open ? `${300 + i * 90}ms` : "0ms" }}
                  >
                    {l.label}
                  </span>
                </span>
                <span className={`grid h-10 w-10 place-items-center rounded-full border border-offwhite/15 text-gold transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: open ? `${500 + i * 90}ms` : "0ms" }}>
                  <SwapArrow dir="diag" />
                </span>
              </Link>
            );
          })}
        </nav>

        <div
          className={`mt-auto grid gap-6 pt-10 transition-all duration-700 sm:grid-cols-2 sm:items-end ${open ? "translate-y-0 opacity-100 delay-700" : "translate-y-6 opacity-0"}`}
        >
          <div className="space-y-2 font-sub text-sm">
            <a href={site.phoneHref} className="block text-lg text-offwhite">{site.phone}</a>
            <a href={`mailto:${site.email}`} className="block break-all text-offwhite/70">{site.email}</a>
          </div>
          <ArrowLink href="/contact-us" className="justify-self-start sm:justify-self-end" onClick={close}>Get a Quote</ArrowLink>
        </div>
      </div>
    </div>
  );
}