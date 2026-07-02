# Handoff: Login Page

## Overview
A single login screen for the "Verity" product (placeholder brand — no real product name/logo was supplied). Card-centered login form with social sign-in buttons, email/password fields, remember-me + forgot-password row, and a sign-up link.

## About the Design Files
The file in this bundle (`Login.dc.html`) is a **design reference built in HTML** — a prototype showing the intended look and behavior, not production code to copy directly. It's authored as a "Design Component" (a proprietary streaming-HTML format from the design tool used to build it) — the surrounding `<x-dc>`/template plumbing is tooling-specific and should be ignored. Recreate the visual design and behavior in the target codebase's existing environment (React, Vue, SwiftUI, native, etc.), using its established patterns and component libraries. If no environment exists yet, pick the framework best suited to the project.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and component states below are final — implement pixel-close using the codebase's own component library/design tokens (or the token values listed here if none exist yet).

## Screens / Views

### Login
**Purpose:** User signs in with email/password or a social provider (Google/GitHub).

**Layout:**
- Full-viewport container, `min-height: 100vh`, flex, centered both axes (`align-items: center; justify-content: center`), background = page background token, vertical padding so a tall card can scroll on short viewports.
- Centered card: fixed width **360px**, background = surface/secondary token, 1px border (default border token), border-radius = `xl` token, shadow = `sm` token, padding = `space-8` (32px) on all sides.
- Card content stacks vertically in document flow (no explicit gap container at the top level; spacing comes from margins listed per element below).

**Components (top to bottom):**
1. **Wordmark** — text "Verity", font-size `text-2xl`, font-weight `bold`, color = primary text token, margin-bottom 4px.
2. **Subtitle** — text "Sign in to your account", font-size `text-sm`, color = secondary text token, margin-bottom `space-6` (24px).
3. **Social buttons** (stacked, gap `space-3`/12px between them, `space-6` margin-bottom below the group):
   - "Continue with Google" — secondary button variant, size lg (44px height), full width.
   - "Continue with GitHub" — same styling.
   - Secondary variant styling: transparent background, 1px border (default border token), text = primary text color. Hover: tint neutral surface (per design system — hover state not implemented in this static mock).
4. **Divider** — flex row: 1px horizontal line (border token) — "OR" label (`text-xs`, tertiary text color) — 1px horizontal line. `space-3` gap between line/label. `space-6` margin-bottom.
5. **Form:**
   - **Email input** — labeled "Email", type email, placeholder "you@company.com", size lg.
   - **Password input** — labeled "Password", type password, placeholder shown as dots, size lg.
   - Inputs use `space-4` (16px) vertical gap between form rows.
   - **Remember me / Forgot password row** — flex row, `justify-content: space-between`, `align-items: center`:
     - Checkbox labeled "Remember me", checked by default.
     - Link "Forgot password?" — `text-sm`, accent color, no underline.
   - **Sign in button** — primary variant, size lg (44px height), **full width of the card's content area**. Background = accent color, text = inverse (white) text color, no visible border. This is the primary CTA — make sure it stretches edge-to-edge; it must NOT shrink to fit its text.
6. **Sign-up row** — centered text, `text-sm`, secondary text color: "Don't have an account? " + link "Sign up" (accent color, medium weight), `space-6` margin-top.

## Interactions & Behavior
- All three buttons and the form itself currently just prevent default / no-op (`onLogin` stub) — wire up real auth actions.
- Email/password inputs are controlled (local component state), remember-me checkbox is controlled + defaults to checked.
- Form submits on Enter (native `<form onSubmit>`) or clicking "Sign in".
- No loading/error states are implemented in the mock — design and add:
  - Inline validation for email/password.
  - A loading state on the Sign in button while the auth request is in flight.
  - An error state (e.g. inline banner or field-level error) for failed login.
- No responsive breakpoints beyond natural scroll — card is a fixed 360px; on narrow viewports it should still be legible (add horizontal padding on very small screens if the target app supports < 360px viewports).

## State Management
- `email: string`
- `password: string`
- `remember: boolean` (default `true`)
- On submit: call auth flow (not implemented in mock).

## Design Tokens
Values below come from the bound "Verity Design System" (a generic placeholder token set — swap for the target app's real design tokens if one exists; do not treat "Verity" as a real brand).

**Color**
- Background (page): `--bg-primary` — near-white (light mode) / near-black (dark mode)
- Card surface: `--bg-secondary`
- Border (default): `--border-default`, 1px
- Text primary: `--text-primary`
- Text secondary: `--text-secondary`
- Text tertiary: `--text-tertiary`
- Text inverse (on accent bg): `--text-inverse`
- Accent (links, primary button, focus): `--accent-primary` — blue-600 (light) / blue-500 (dark)

**Typography** (Inter, placeholder font — see Fonts caveat below)
- 2xl (wordmark): `--text-2xl`, weight `--weight-bold`
- sm (subtitle, inputs label context, links, sign-up row): `--text-sm`
- xs (OR divider label): `--text-xs`
- base (button label): `--text-base`
- Weights used: `--weight-regular` (400), `--weight-medium` (500), `--weight-bold` (700/800)

**Spacing** (4px base scale)
- `--space-3` = 12px (gap between stacked social buttons, divider line/label gap)
- `--space-4` = 16px (gap between form rows)
- `--space-6` = 24px (major section spacing: subtitle→buttons, buttons→divider, divider→form, form→sign-up row)
- `--space-8` = 32px (card padding)

**Radius**
- Card: `--radius-xl` (16px)
- Buttons/inputs: `--radius-md` (8px)

**Shadow**
- Card: `--shadow-sm`

**Motion**
- Not used in this static mock beyond default button hover transitions (100–200ms, default ease) — see design system for durations/easing if adding interactive states.

## Assets
No images, icons, or logos. The "Verity" wordmark is plain text (no logo mark exists — do not treat it as final branding). No icon system was supplied; if the real product needs icons on this screen (e.g. Google/GitHub logos on the social buttons), source real icon assets — do not invent icon glyphs.

## Files
- `Login.dc.html` — the full design reference (single-file). Ignore the `<x-dc>`/`<script data-dc-script>` wrapper (tooling-specific); the meaningful content is the inline-styled markup and the state described above.
