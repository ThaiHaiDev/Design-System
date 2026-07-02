# Verity Design System

A from-scratch design system built from a generic token spec (colors, type, spacing, radius, shadow, component specs) supplied as a template — no existing codebase, Figma file, or brand assets were attached. No real product name, logo, or copy samples were given either, so this system uses **"Verity"** as a placeholder brand name and invents component/UI-kit content to demonstrate the tokens in use.

**Sources:** none attached (no codebase, no Figma link, no slide deck). Everything here is derived from the pasted token template. If you have a real codebase, Figma file, or brand guide, attach it and this system should be rebuilt against it — invented names, copy, and layout choices below are not to be treated as real brand decisions.

---

## Content fundamentals

No real copywriting samples were supplied, so no genuine tone-of-voice can be documented. Placeholder copy in the UI kit ("Sign in to your account", "Overview", stat labels) is generic SaaS-dashboard language: short, plain, sentence case, no jargon, no emoji. Treat this as a scaffold, not a voice guide — replace with real product copy as soon as it's available.

---

## Visual foundations

- **Color:** neutral gray scale (Zinc-like, `gray-50`→`gray-950`) for surfaces/text, a single blue accent (`blue-600` light / `blue-500` dark) for CTAs and focus states, plus red/green/amber semantic triads for error/success/warning. Light mode is white cards on a near-white page background; dark mode swaps to near-black surfaces and lightens the accent one step for contrast.
- **Type:** Inter for UI and display, JetBrains Mono for code/data (see Fonts below). A 9-step scale from 12px to 48px; headings are 600–800 weight, body is 400. No uppercase for long copy.
- **Spacing:** 4px base unit scale (2px–96px). Card interiors use 16–24px padding; sections separate by 48–64px.
- **Radius:** small controls 4px, buttons/inputs/cards 8px, modals 12px, large dialogs 16px, avatars/pills fully round. Nothing exceeds 16px except pills.
- **Shadow:** five-step elevation (xs–xl), used sparingly — flat by default, xs/sm for cards, md for popovers, lg for modals, xl for toasts. Dark mode should lean on borders over shadow (shadows barely read on near-black).
- **Borders:** 1px default, 2px for emphasis; border color is the primary separator in dark mode.
- **Motion:** three durations (100/200/300ms) with a default ease, plus an `easing-bounce` reserved for playful micro-interactions (toggle chips, not core UI chrome). Respects `prefers-reduced-motion`.
- **Imagery/backgrounds:** none supplied — no photography, illustration, or texture system exists yet. No gradients, no full-bleed imagery, no patterns are used anywhere in this system; keep it that way until real art direction is provided.
- **Hover/press states:** hover darkens accent (600→700) or tints neutral surfaces (transparent→gray-100); no lightening. Press states are not yet specified in the source template — components here use only default/hover/disabled; add active-state styling once real interaction specs exist.
- **Transparency/blur:** only the modal overlay uses transparency (50% black, 70% dark mode). No backdrop-blur is used anywhere.
- **Layout:** 1280px max container, 12-column grid, mobile-first breakpoints at 640/768/1024/1280.

---

## Iconography

No icon set, icon font, or SVG sprite was supplied. Components that need an icon (Sidebar nav items, Toast status glyphs) currently use plain Unicode glyphs (⌂ ◎ ⚙ ✓ ✕) as lightweight stand-ins — **not a real icon system**. Before shipping, replace these with a real icon library (e.g. Lucide, which the original token template referenced by name) or the product's own icon assets. No emoji are used as UI icons.

---

## Fonts — flagged substitution

The token spec named "Inter" (UI) and "JetBrains Mono" (code) as placeholders for real brand fonts ("Thay Inter bằng font brand của bạn"). No font files were attached, so both are loaded live from Google Fonts via `tokens/fonts.css`. **If you have real brand font files, attach them** and this file should be swapped for local `@font-face` rules.

---

## What's intentionally added (no source defined a component inventory)

No codebase or Figma component library was attached, so there's no existing inventory to match — this system authors a standard baseline set instead: Button, Input, Checkbox, Switch (forms); Badge, Toast, Tooltip (feedback); Card, Modal (surfaces); Sidebar, Tabs (navigation). This is a minimal starting set, not exhaustive — expand it once real product screens define what's actually needed (e.g. Select, Radio, Table, Avatar, Dialog-vs-Toast distinctions).

---

## Index

- `styles.css` — root stylesheet, imports everything below.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css` (radius/shadow/motion/z-index), `fonts.css`, `base.css`.
- `components/forms/` — Button, Input, Checkbox, Switch.
- `components/feedback/` — Badge, Toast, Tooltip.
- `components/surfaces/` — Card, Modal.
- `components/navigation/` — Sidebar, Tabs.
- `guidelines/` — foundation specimen cards (colors, type, spacing, radius, shadow, motion, wordmark).
- `ui_kits/dashboard/` — click-through Login → Dashboard home recreation (basic login flow, per request).
- `SKILL.md` — portable skill definition for Claude Code / other agent environments.

---

## Caveats — please help me iterate

1. **No real brand attached.** Everything above (name "Verity", copy, layout choices) is invented to fill in the template. Attach a codebase, Figma file, or brand guide and I'll rebuild this against real ground truth.
2. **No logo.** None was supplied — the wordmark card is plain type, not a mark. Do not treat it as final branding.
3. **No icon system.** Unicode glyphs are placeholders only.
4. **Fonts are a Google Fonts substitution**, not real brand type.
5. **Component inventory is a guess** (a standard 10-primitive baseline) since no source defined what components this product actually needs.

**Ask:** tell me the real product, attach any existing code/Figma/brand assets you have, and I'll redo the tokens, components, and UI kit against the real thing.
