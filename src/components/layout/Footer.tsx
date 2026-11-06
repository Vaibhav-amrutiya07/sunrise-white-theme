import Link from "next/link";
import { site } from "@/config/site";
import { services } from "@/config/services";
import Logo from "./Logo";

const h = "mb-4 font-sub text-[11px] font-semibold uppercase tracking-[0.3em] text-gold";
const a = "group inline-flex items-center gap-2 text-offwhite/70 transition-colors duration-300 hover:text-offwhite";
const dash = <span aria-hidden className="h-px w-0 bg-gold transition-all duration-500 group-hover:w-3" />;

/**
 * Compact footer. Its rounded top slides over the bottom of the last section on every page
 * (each pre-footer section reserves extra bottom padding for this overlap).
 */
export default function Footer() {
  return (
    <footer className="relative z-10 -mt-10 overflow-hidden rounded-t-[1.75rem] bg-navy-deep text-sm text-offwhite/70 md:-mt-12 md:rounded-t-[2.5rem]">
      <div aria-hidden className="absolute left-1/2 top-0 h-px w-[min(56rem,80%)] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="wrap grid grid-cols-2 gap-x-6 gap-y-10 pb-10 pt-14 lg:grid-cols-12 lg:gap-8">
        <div className="col-span-2 lg:col-span-4">
          <Logo />
          <p className="mt-4 max-w-xs font-sub text-offwhite/75">{site.tagline}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {site.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-offwhite/15 px-3.5 py-1.5 text-xs text-offwhite/75 transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className={h}>Quick Links</h3>
          <ul className="space-y-2">
            {site.nav.map((l) => (
              <li key={l.href}><Link href={l.href} className={a}>{dash}{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className={h}>Our Services</h3>
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s.slug}><Link href={`/services#${s.slug}`} className={a}>{dash}{s.title}</Link></li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 lg:col-span-3">
          <h3 className={h}>Contact Information</h3>
          <ul className="space-y-2">
            <li className="leading-relaxed">{site.address}</li>
            <li><a href={site.phoneHref} className={`${a} font-semibold text-offwhite`}>{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className={`${a} break-all`}>{site.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-offwhite/10">
        <p className="wrap py-5 text-center text-xs sm:text-left">Copyright © 2026 Sunrise Builders. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
