# Sunrise Builders – Website

Next.js (App Router) · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis

## Run
```bash
npm install
npm run dev
```

## Where to change things
- `src/app/globals.css` – brand colours live ONLY in `:root`; Tailwind reads them via `@theme`.
- `src/config/site.ts` – contact details (currently DUMMY), nav, social links.
- `src/config/images.ts` – every Unsplash photo ID. Swap to client photos here.
- `src/config/services.ts` – all service copy and expertise lists.
- `src/components/layout/Logo.tsx` – temporary SVG logo; replace with client logo.
- `src/app/api/enquiry/route.ts` – enquiry endpoint; email provider to be wired later.

## Design concept – "Built from the ground up"
- Loader & hero: a tower crane builds a building floor by floor (`components/ui/ConstructionArt.tsx`).
- Services: crane mast + descending hook, levels with elevation marks.
- Why Choose Us: brick wall laid course by course (mortar, then brick).
- Motifs (in `globals.css`): `.hazard` stripe, `.tape` measuring tape, `.lattice` mast, `.brick-bg`.

## Redesign (premium creative pass)
- `components/layout/Header.tsx` – floating rail nav (sliding indicator, rolling labels), compact glass pill on scroll, full-screen mobile menu (Lenis stopped while open). `LIGHT_HEROES` lists routes whose hero is light.
- `components/layout/FloatingActions.tsx` – WhatsApp control (pulse rings, hover label) + scroll-progress back-to-top ring.
- `components/heroes/` – one hero per inner page: `AboutHero` (light editorial), `ServicesHero` (four sector panels), `ContactHero` (cursor-reactive connection map). The old shared `PageBanner` and its building illustration were removed.
- `components/about/VisionMission.tsx`, `components/about/ClosingStatement.tsx` – About page sections.
- `components/services/ServicesExplorer.tsx`, `components/services/ProjectCta.tsx` – Services page.
- `components/contact/ContactInfo.tsx`, `components/contact/LocationShowcase.tsx` (light surface, so it separates from the dark footer), `EnquiryForm.tsx` (presentation only; API, fields and validation unchanged).
- `components/ui/Arrow.tsx` – `ArrowLink` / `ArrowButton` pill CTAs, `RollText`, `SwapArrow`. `components/ui/Breadcrumb.tsx`.
- `globals.css` – new motifs: `.ruler`, `.crop-marks`, `.roll`, `.arrow-swap`, plus keyframes (all disabled under `prefers-reduced-motion`). `body` uses `overflow-x: clip` so sticky elements (Services sidebar, About story heading) keep working – don't set overflow on `html`.
- The footer slides over the last section with a rounded top; give any new pre-footer section ~10rem of bottom padding.
