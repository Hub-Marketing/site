# Hub Marketing — Design System

An editorial, high-contrast brand system for **Hub Marketing**, a marketing/creative studio. It pairs a deep navy foundation with a bold magenta accent and a warm gold secondary, an italic Fraunces display face for editorial headlines, and Poppins for everything functional. The signature move is the navy→plum→magenta gradient used on hero surfaces and banners.

## Sources
This system was built from a **brand color + typography specification only** — no codebase, Figma file, or asset package was provided. Everything below (components, UI kit, slides) is an original interpretation of that spec, not a recreation of an existing product. Values that came directly from the brief:

- **Colors** — Navy `#272B4C`, Navy deep `#20233F`, Magenta `#CC1074`, Gold `#D9A84E`, plus magenta/gold variations and the two signature gradients.
- **Type** — Fraunces (display, always italic, 500–600) and Poppins (UI/body, 400–700).
- **Note on fonts:** the original spec calls for **Gotham**, which is not licensed here. **Poppins** is used as the closest available substitute. Both Fraunces and Poppins are loaded from **Google Fonts**. → *If you have the Gotham files, send them and I'll swap Poppins out.*

## Files & index
- `styles.css` — single entry point; `@import`s all tokens. **Consumers link this one file.**
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css` (CSS custom properties).
- `components/` — reusable React primitives (below).
- `ui_kits/marketing/` — full-screen product surface recreation (`index.html` + JSX screens).
- `slides/` — sample 16:9 slide layouts.
- `guidelines/` — foundation specimen cards (colors, type, spacing, gradients, radius/shadow).
- `thumbnail.html` — homepage tile. `SKILL.md` — Agent-Skills manifest.

### Components
Grouped under `components/`. Public API is `window.<Namespace>.<Name>` (run `check_design_system` for the namespace).
- **core/** — `Button`, `Badge`, `Card`
- **forms/** — `Input`, `Switch`
- **navigation/** — `Tabs`

## Content fundamentals
Hub Marketing is a Brazilian-Portuguese brand; copy is written in **pt-BR**.
- **Voice:** confident, warm, and direct — a studio that speaks as a partner, not a vendor. Uses **você** (informal-professional), never overly corporate.
- **Headlines** are short, editorial, and often end in a period for a declarative beat — e.g. *"Marketing que vira marca."* Set in italic Fraunces.
- **UI & body copy** is plain and functional in Poppins: *"Começar agora", "Ver planos", "Saiba mais", "Nunca compartilhamos."*
- **Casing:** sentence case for headlines and buttons (not Title Case, not ALL CAPS). The one exception is **overlines/eyebrows** — short kickers set in uppercase Poppins 600 with wide `0.14em` tracking and magenta color.
- **Numbers/labels** use tabular figures where aligned.
- **Emoji:** not used. Iconography carries visual accents instead.
- **Vibe:** premium editorial meets modern SaaS — the italic serif adds a magazine feel, the magenta keeps it energetic and current.

## Visual foundations
- **Color usage:** navy is the anchor (dark surfaces, ink, hero backgrounds); magenta is the single primary accent (CTAs, links, active states, focus); gold is a sparing secondary for editorial highlights and "premium" moments. Keep to **1–2 background fields** per composition. On light surfaces prefer `--gold-ink #C9973A` for gold text (AA-legible); the brighter golds are for dark backgrounds.
- **Gradients (signature):** `--grad-brand` (125°, navy→plum→magenta) for hero/feature surfaces; `--grad-banner` (100°, navy→plum→magenta, wider magenta) for banners and section breaks. These are the brand's most recognizable device — use full-bleed, never as small fills.
- **Type:** Fraunces **italic** 500–600 for display/headlines only; Poppins 400–700 for titles, body, and UI. Display headlines run tight (`line-height 1.05`, `letter-spacing -0.02em`). Body is `1.5–1.65` line-height.
- **Spacing:** 4px base scale (`--space-1..24`). Generous whitespace; sections breathe at 64–96px vertical rhythm.
- **Corner radii:** functional and moderate — inputs/buttons 8–12px, cards 16px, pills 999px. Nothing sharp, nothing overly bubbly.
- **Cards:** white surface, 1px `--border-subtle` hairline, soft **navy-tinted** shadow (`--shadow-md`), 16px radius. Dark and gradient card variants exist for emphasis. No colored-left-border cards.
- **Shadows:** cool navy-tinted, low-opacity, diffuse (`rgba(32,35,63,·)`). A special `--shadow-magenta` glow sits under primary buttons. No harsh black drop shadows.
- **Borders:** hairline neutrals (`--border-subtle/default/strong`). Focus uses a 4px magenta ring (`--focus-ring`) plus magenta border.
- **Motion:** quick and refined. `--dur-fast 120ms` for hovers/presses, `--dur-base 200ms` for toggles/cards, `--ease-out` for entrances. Buttons nudge down 1px on press; cards lift 3px on hover. No bounces, no spinning, no long animations.
- **Hover states:** primary darkens toward `--magenta-banner`/`--magenta-deep`; ghost/outline get a faint magenta tint wash; cards lift + deepen shadow.
- **Press states:** darker fill + 1px downward translate (no scale-shrink).
- **Transparency/blur:** used sparingly — muted white text on dark (`--text-on-dark-muted`), faint tint washes on hover. No heavy glassmorphism.
- **Imagery vibe:** when photography is used, favor warm, saturated, human-centered images that sit comfortably beside magenta/gold. (No stock images ship with this system.)

## Iconography
No icon set was provided with the spec, so this system standardizes on **Lucide** (`https://unpkg.com/lucide-static`) as the default — a clean, modern **outline** set (≈2px stroke, rounded joins) that matches Poppins' geometry and the brand's refined feel. Substitution flagged: swap for the brand's real icons if/when provided.
- **Style:** line/outline icons only; keep stroke ~1.75–2px; color them `currentColor` so they inherit magenta/navy from context.
- **Emoji:** never used as icons or accents.
- **Unicode:** avoid using bare unicode glyphs as UI icons; use Lucide.
- **No hand-drawn SVG brand marks.** There is **no logo asset** in this system — the brand name is rendered in italic Fraunces wherever a mark would go (see `thumbnail.html`). *Send a logo file and I'll wire it in.*

## Intentional additions
Because the brief defined no component inventory, a standard small set was authored: `Button`, `Badge`, `Card`, `Input`, `Switch`, `Tabs`. Extend as real product needs emerge.
