# Design Brief

## Direction

Garage Night — a dark, high-contrast industrial motorcycle workshop landing page lit by warm amber work-lamp glow, built bilingual Khmer/English.

## Tone

Industrial/utilitarian executed with conviction: deep charcoal steel surfaces, thin amber light, mono technical labels — the feeling of a real repair bay at night, not a SaaS template.

## Differentiation

A continuously animated workshop atmosphere — drifting amber gradient glow, a receding road/grid that scrolls underfoot, and floating dust particles — that sits behind every section without ever stealing legibility from Khmer or Latin text.

## Color Palette

| Token      | OKLCH         | Role                                              |
| ---------- | ------------- | ------------------------------------------------- |
| background | 0.145 0.009 60 | Deep warm charcoal steel (dark mode base)        |
| foreground | 0.95 0.012 78  | Warm off-white text, high contrast                |
| card       | 0.19 0.012 60  | Elevated panel surface, lifted off background     |
| primary    | 0.78 0.17 70   | Amber work-lamp accent — CTAs, active states      |
| accent     | 0.68 0.19 44   | Ember orange — secondary highlights, gradients    |
| muted      | 0.24 0.014 60  | Recessed strips, inactive surfaces                |
| border     | 0.28 0.016 60  | Hairline steel dividers                           |
| destructive| 0.62 0.21 27   | Error / validation state                          |
| success    | 0.70 0.16 152  | Booking confirmation state                        |

## Typography

- Display: Space Grotesk — hero headline, section headings, stat numerals (tight tracking, bold)
- Body: Satoshi — paragraphs, nav, form labels, UI copy
- Khmer: Kantumruy Pro (Google Fonts CDN) — all `:lang(km)` and `.font-khmer` text, line-height 1.85, no negative tracking
- Mono: JetBrains Mono — uppercase technical labels, phone numbers, section eyebrows
- Scale: hero `text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight`, h2 `text-3xl md:text-5xl font-display font-bold tracking-tight`, label `text-xs font-mono font-semibold tracking-[0.2em] uppercase`, body `text-base md:text-lg`

## Elevation & Depth

Flat dark base with layered depth: animated background layers (glow → grid → road lines → particles → noise) farthest, then `bg-card` panels with `shadow-elevated` and 1px `border-border`, with `shadow-glow` reserved for hovered/active cards only.

## Structural Zones

| Zone    | Background                | Border      | Notes                                                        |
| ------- | ------------------------- | ----------- | ------------------------------------------------------------ |
| Header  | `bg-background/80` + blur | `border-b`  | Sticky, translucent; amber CTA + Khmer/EN toggle on right    |
| Hero    | transparent over animated | —           | Drift glow + road grid visible; stat strip on `bg-muted/40`  |
| Content | `bg-background`, alternating `bg-muted/30` | — | Services on card grid; gallery on `bg-muted/30`; booking on card |
| Footer  | `bg-muted/40`             | `border-t`  | Shop name, both phones, Cambodia location, hours, quick links |

## Spacing & Rhythm

Generous vertical rhythm: sections `py-20 md:py-28`, content max-width `container`, card grids `gap-6`, micro-spacing in 4/8/12px steps; hero blocks separated by `space-y-6`.

## Component Patterns

- Buttons: 6px radius, amber `bg-primary` with `text-primary-foreground` for primary CTAs; ghost `border-border` outline for secondary; `hover-lift` + `shadow-glow` on hover
- Cards: 6px radius, `bg-card` + `border-border` + `shadow-elevated`, thin amber top edge accent, `hover-lift` with amber glow
- Badges: full-round pills, `bg-muted` with `text-muted-foreground`, amber variant for active/selected states
- Phone CTAs: mono numerals, tap-to-call `<a href="tel:">`, amber icon chip

## Motion

- Entrance: `animate-fade-up` on scroll-reveal sections, 0.7s cubic-bezier(0.22,1,0.36,1), staggered
- Hover: `hover-lift` (translateY -6px + amber shadow) and `hover-glow` at 0.3s ease
- Decorative: `animate-drift-glow` (22s alternate) on gradient orbs, `animate-grid-scroll` (14s) on grid, `animate-road-run` (3.2s) on road lines, `animate-float-particle` (9s) on dust, `animate-scroll-cue` on hero indicator, `animate-pulse-ring` on accent rings
- Count-up: stat numerals animate on scroll into view (frontend JS, not CSS)
- All decorative motion respects `prefers-reduced-motion`

## Constraints

- Tokens only — no raw hex/rgb in components; no arbitrary Tailwind color classes
- Animated background must be `pointer-events-none` and `aria-hidden`, behind all content
- Khmer text never uses negative letter-spacing and keeps ≥1.7 line-height
- Dark mode is the primary and default experience (`class="dark"` on root)
- `doNotBuild` items (customer login, repair history, admin dashboard) get no nav entries, sections, or visual zones

## Signature Detail

The "road at night" background — a slow amber glow drifting behind a scrolling perspective grid with rising dust particles — turns the whole page into a lit workshop floor, giving the shop a memorable atmosphere no template has.
