import { useEffect, type RefObject } from "react";
import { gsap } from "./gsap";

/**
 * Runs GSAP setup inside gsap.matchMedia so that:
 *  - nothing animates when the user prefers reduced motion (content stays visible)
 *  - `desktop` tells you if the viewport is >= 768px
 *  - everything is reverted automatically on unmount / breakpoint change
 */
export function useMotion(
  scope: RefObject<HTMLElement | null>,
  setup: (desktop: boolean) => void,
) {
  useEffect(() => {
    const mm = gsap.matchMedia(scope.current ?? undefined);
    mm.add(
      {
        ok: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 768px)",
      },
      (ctx) => {
        const c = ctx.conditions as { ok?: boolean; desktop?: boolean };
        if (!c.ok) return;
        setup(!!c.desktop);
      },
    );
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** Delay (s) before page content animates: waits for the construction loader on first visit. */
export const introDelay = () =>
  typeof document !== "undefined" && document.documentElement.dataset.pre === "first" ? 3.8 : 0.1;
