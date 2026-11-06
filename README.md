# Michalis Anastasopoulos — Website

Bilingual (Greek/English) marketing site for a criminal-defence attorney in Athens. Next.js 14 App Router, server-rendered content, with a client-side "editorial" scene controller on desktop and a plain stacked scroll page on mobile.

Live: `https://www.anastasopoulos-law.gr` (Vercel).

---

## 1. Quick start

```bash
npm install
npm run dev        # http://localhost:3000  (redirects to /el)
npm run build       # production build
npm run start        # serve the production build locally
npm run lint          # ESLint
npm run dev:clean   # wipe .next, then dev
```

There are no environment variables — the whole site is static content + client-side interaction, nothing calls an external API or database.

---

## 2. Mental model — read this first

The site has **six content sections**, each with a real Next.js route: Hero (`/`), About (`/about`), Practice (`/practice`), Academic (`/academic`), European (`/european`), Contact (`/contact`), all under a `/[locale]` prefix (`el` or `en`).

Every section is written **once**, as plain server-rendered React, in `src/sections/<Name>/`. Each section has two independent implementations — `desktop/` and `mobile/` — because the two experiences are structurally different (see below), not just CSS breakpoints of the same markup.

**Both experiences are always mounted in the DOM at once.** `app/[locale]/layout.tsx` renders `<EditorialExperience>` (desktop) and `<MobileExperience>` (mobile) side by side. CSS (`display: none` at the 860px breakpoint, in each component's own `.module.css`) shows exactly one. This means:
- Editing desktop behavior never touches mobile, and vice versa.
- If you add a new section, you must add it to *both* trees (see §6).
- The hidden tree is fully removed from the accessibility tree (`display:none`, not `opacity`), so screen readers only ever see one copy.

### Desktop — `EditorialExperience`
A fixed-viewport "one screen at a time" controller. Scrolling (wheel/touch/arrow keys) doesn't scroll the page — it triggers a full route change (`router.push`) to the next/previous scene, and GSAP crossfades the outgoing scene out while the incoming one fades/slides in. It is not scroll-scrubbed: one gesture = one complete transition, and a transition can't be interrupted mid-flight.

### Mobile — `MobileExperience`
All six sections rendered in normal document order inside one `<main>`, and the user just scrolls the page. No GSAP, no gesture interception — it's a conventional single-page-with-anchors layout. `MobileNav` is a slide-out panel with plain `#anchor` links.

---

## 3. Project structure

```
app/
  [locale]/
    layout.tsx        → mounts both experiences, JSON-LD, metadataBase
    page.tsx           → Hero route, "/"
    about/page.tsx      → each route file: generateMetadata + render one section
    practice/page.tsx
    academic/page.tsx
    european/page.tsx
    contact/page.tsx
  globals.css          → resets, imports theme.css, reduced-motion-gated smooth scroll
  robots.ts / sitemap.ts

middleware.ts           → redirects "/" → "/el" (default locale)

src/
  i18n/
    locales.ts           → ['el', 'en'], defaultLocale = 'el'
    types.ts              → SiteDictionary type (the shape of ALL site copy)
    dictionaries/el.ts, en.ts → the actual copy, one object per language
    getDictionary.ts       → locale → dictionary lookup

  seo/
    siteConfig.ts          → name, email, phone, address, baseUrl (single source of truth)
    pageMetadata.ts         → buildPageMetadata() — canonical/hreflang/OG/Twitter for every page
    jsonLd.ts                → Attorney structured data (schema.org)

  appTheme/
    fonts.ts                → next/font loads: Cormorant Garamond (display), Archivo (body/UI)
    theme.css                 → design tokens: color, spacing, font-size, radius (see §5)

  components/
    layout/Header/            → top bar: logo, language switcher, CTA, MobileNav trigger
    layout/LanguageSwitcher/
    layout/MobileNav/
    ui/Button/                → shared button/link component (variant, small)
    ui/SectionLabel/            → the small "eyebrow" label above section titles

  features/
    EditorialExperience/
      EditorialExperience/EditorialExperience.tsx   → the desktop scene controller (see §4)
      hooks/useSceneGestures.ts                        → wheel/touch/keyboard → navigate()
      routeOrder.ts                                       → SCENE_ROUTES, the ordered list of routes
    MobileExperience/
      MobileExperience.tsx    → stacks all six mobile sections in one <main>

  sections/
    Hero/  About/  Practice/  Academic/  European/  Contact/
      desktop/<Name>.tsx + .module.css
      mobile/<Name>.tsx + .module.css

  hooks/
    useMobileNav.ts           → open/close state for the mobile nav panel

public/
  images/                     → served images (referenced as /images/... in code)
  logo/logo.svg                 → header logo

docs/
  editorialExperience.md       → design notes for the desktop scene system
  spyrosFeConventions.md         → house engineering conventions (SOLID, no useEffect for derived state, etc.) — the ESLint config in .eslintrc.json enforces parts of this
  bookspine/                     → SVG mockups for the desktop side-rail "spine" visual (reference only, not imported by code)
```

---

## 4. How the desktop transition actually works

File: `src/features/EditorialExperience/EditorialExperience/EditorialExperience.tsx`

1. `SCENE_ROUTES` (`routeOrder.ts`) is the ordered list `["", "about", "practice", "academic", "european", "contact"]`. The current scene's index is derived from the URL pathname (`getSceneIndex`).
2. A gesture (wheel/touch/arrow key, from `useSceneGestures`) or a nav-rail/header click calls `beginTransition(targetIndex, targetRoute)`.
3. `beginTransition` **clones the current scene's DOM node** before calling `router.push()` — this "outgoing" snapshot is attached imperatively to a hidden slot (`previousSlotRef`), not held as React state, because React Router's `children` always reflects the *current* route, not a frozen "previous page" (this is explained in a comment in the file — don't try to hold outgoing content in state, it was tried and doesn't work).
4. Once the route change lands, a `useLayoutEffect` runs a GSAP timeline that crossfades the outgoing DOM snapshot out while the new scene (already server-rendered, already in the DOM) animates in — background/media first, heading second, body text last (staggered, not simultaneous).
5. `isNavigatingRef` + `outgoingActive` together act as a lock: a second gesture can't start a new transition while one is in flight.
6. `prefers-reduced-motion: reduce` short-circuits the whole timeline to an instant swap (checked at the top of the transition effect).
7. Each section component marks its animatable layers with `data-motion-layer="primary" | "secondary" | "media"` — that's how the GSAP timeline finds what to stagger. If you add a new section, tag its heading `primary`, supporting text/CTA `secondary`, and any image `media`, or it just won't animate (harmless, but inconsistent with the rest of the site).

The **transition duration is 900ms** (`TRANSITION_DURATION` constant, top of the file) — main-transition durations across the timeline range roughly 500–740ms layered on top of that. Small UI interactions (hover, nav dot) use `var(--transition-fast)` = 180ms, defined once in `theme.css`.

---

## 5. Design tokens — `src/appTheme/theme.css`

All spacing, font sizes, colors, and radii are CSS custom properties on `:root`, with three responsive overrides at `1180px`, `860px`, and `520px` (they redefine the same variable names with smaller values — components never need their own media queries for font-size/spacing if they use the tokens).

```
--color-*        cream text, gold accent, near-black background scale
--font-size-display-xl/lg, --font-size-heading-lg/md/sm,
--font-size-body-lg/md/sm, --font-size-label-lg/md/sm
--space-xs … --space-5xl        (8px → 96px scale)
--radius-xs … --radius-pill
--transition-fast                 (180ms — all small hover/focus interactions)
```

Fonts (`src/appTheme/fonts.ts`, loaded via `next/font/google`):
- **Cormorant Garamond** (`--font-cormorant`) — display/editorial headings and emphasis. Weights 400/500 + italic.
- **Archivo** (`--font-archivo`) — everything else: body copy, nav, labels, buttons. Weights 400/500/600.

Only load additional weights if you're actually going to use them — two previously-loaded families (Oswald, Anton) were removed because nothing referenced them; each unused weight is pure download cost.

**Known inconsistency, not yet fixed:** some sections use `--font-size-display-xl` for their main heading and others use `--font-size-display-lg` for what's visually the same "section title" role — pick one and it's a one-line change per section's `.module.css`. Similarly, `letter-spacing` on uppercase labels varies across ~10 different values site-wide (should collapse to 1–2). Mobile heading sizes are hardcoded per-section rather than using a shared token. These are cosmetic and require a visual check before touching, since they change how things actually look.

---

## 6. Common changes — a cookbook

**Change copy (any text on the site).** Edit `src/i18n/dictionaries/el.ts` and/or `en.ts`. The shape is enforced by `src/i18n/types.ts` (`SiteDictionary`) — TypeScript will error if the two dictionaries drift out of shape. Don't hand-insert spacing into strings (e.g. don't write `"ΤΟΜΕΙΣΔΡΑΣΤΗΡΙΟΤΗΤΑΣ"` or letter-by-letter spaced text) — write the real words with normal spaces and let CSS `letter-spacing`/`text-transform: uppercase` handle the visual styling.

**Change contact details (email/phone/address).** `src/seo/siteConfig.ts` — this is the single source of truth, used by the Contact section, the header CTA, JSON-LD structured data, and OG metadata. The office `mapsUrl` is derived from the address fields here.

**Add a new section/route** (e.g. a "Testimonials" page):
1. Add the route slug to `SCENE_ROUTES` in `src/features/EditorialExperience/routeOrder.ts` — sitemap and desktop scene navigation both derive from this list automatically.
2. Create `app/[locale]/testimonials/page.tsx` — copy the pattern from an existing one (e.g. `app/[locale]/practice/page.tsx`): `generateMetadata` calling `buildPageMetadata({ locale, path: "testimonials", title, description })`, plus the page component rendering your new section.
3. Add `src/sections/Testimonials/desktop/Testimonials.tsx` and `mobile/Testimonials.tsx` (+ `.module.css` each), tagging animatable elements with `data-motion-layer` on the desktop version.
4. Register it in both trees: add it to `sceneNavigationLinks` in `app/[locale]/layout.tsx` (desktop rail + header), and add `<Testimonials .../>` to the stack in `src/features/MobileExperience/MobileExperience.tsx`.
5. Add the section's content shape to `SiteDictionary` in `src/i18n/types.ts`, and fill it in both `el.ts`/`en.ts`.

**Add a new locale** (e.g. French): add `'fr'` to `locales` in `src/i18n/locales.ts`, create `src/i18n/dictionaries/fr.ts` satisfying `SiteDictionary`, register it in `getDictionary.ts`. Sitemap, hreflang alternates, and `generateStaticParams` all pick it up automatically — nothing else to touch.

**Change theme colors/spacing/fonts.** Edit the custom properties in `src/appTheme/theme.css` directly — every component reads from these tokens, so a color change here is site-wide. Don't hardcode a new color/spacing value in a component's CSS module unless it's genuinely one-off.

**Swap/update an image.** Drop the file in `public/images/`, reference it as `/images/filename.ext` in the section's `.tsx` via `next/image`. Only the Hero image should carry `priority` (it's the LCP element); everything else should lazy-load normally. Prefer supplying pre-optimized WebP/AVIF source files — Next's built-in image optimizer re-encodes on the fly, but starting from an already-bloated original (there's a 1.9MB PNG hero image in `public/images/hero/main_hero.png` as of this writing) still costs more at build/serve time than starting clean.

**Update SEO for one page.** Each `app/[locale]/<route>/page.tsx` has its own `generateMetadata` calling `buildPageMetadata()` (`src/seo/pageMetadata.ts`) — edit the `title`/`description` there. Canonical URL, hreflang alternates (`el`/`en`/`x-default`), Open Graph, and Twitter card are all generated from that one call; you never write them by hand per-page.

---

## 7. Known gaps (as of this writing — check before assuming still true)

- **Header CTA never renders.** `Header` only shows its "Contact" button when a `ctaTarget` prop is passed, but `app/[locale]/layout.tsx` never passes one — so the desktop header currently has no visible contact button at all, despite the copy/CSS/ARIA all being wired up for it. Decide whether you want it back (pass `ctaTarget="contact"` to `<Header>` in the layout) or remove the dead prop plumbing.
- **Language switcher and mobile nav lack an active-section indicator on scroll** (mobile only — desktop's side rail already highlights the current scene via `aria-current`). Would need an `IntersectionObserver`-based scroll-spy; not implemented.
- **Language switcher touch target** is under the 44×44px accessibility guideline. Fixing it means visibly enlarging the EL/EN toggle in the header — a deliberate design call, not done automatically.
- Font-size-tier and letter-spacing inconsistencies noted in §5.

## 8. Conventions

See `docs/spyrosFeConventions.md` for the full house style (SOLID-ish component boundaries, `useEffect` reserved for real browser/third-party side effects, no derived state via effects, etc.) — most of it is enforced directly by `.eslintrc.json` (`no-restricted-syntax` flags bare `useEffect`/`useLayoutEffect` unless justified with an inline comment). `docs/editorialExperience.md` has the original design rationale for the desktop scene system.

`app/[locale]/layout.tsx` is the one intentional exception to "no mixed default/named exports" — Next's App Router requires `generateStaticParams`/`generateMetadata` as named exports alongside the default-exported layout component.
