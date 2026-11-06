import type Lenis from "lenis";

// Shared handle so buttons / links can trigger smooth scrolling.
export const lenisRef: { current: Lenis | null } = { current: null };
