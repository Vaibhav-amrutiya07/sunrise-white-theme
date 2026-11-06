import Link from "next/link";

/** Breadcrumb: Home ◆ Current page. */
export default function Breadcrumb({ crumb, tone = "dark", className = "" }: { crumb: string; tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-x-3 gap-y-2 whitespace-nowrap font-sub text-[11px] font-semibold uppercase tracking-[0.28em] ${light ? "text-navy/60" : "text-offwhite/60"} ${className}`}
    >
      <span aria-hidden className="h-px w-8 bg-gold" />
      <Link href="/" className="transition-colors hover:text-gold">Home</Link>
      <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
      <span aria-current="page" className={light ? "text-navy" : "text-offwhite"}>{crumb}</span>
    </nav>
  );
}
