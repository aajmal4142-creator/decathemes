# Decathemes Architecture

<!--
src/app/ — Demo and documentation site (App Router). Marketing pages, theme previews, component gallery routes, and product docs live here. This is what buyers explore before integrating themes into their own projects.

src/components/ui/ — All shadcn/ui primitives (Button, Card, Dialog, etc.). These are theme-agnostic: they consume Tailwind tokens mapped from CSS variables, so they restyle automatically when data-theme or light/dark mode changes.

src/components/blocks/ — Pre-built page sections grouped by category (hero, pricing, auth, dashboard, etc.). Blocks compose ui/ primitives into copy-paste-ready sections that showcase each theme.

src/components/showcase/ — Product-specific UI: theme switcher, component gallery, preview frame, and providers (ThemeProvider). This layer wires the demo experience together without polluting reusable ui/ or blocks/.

src/themes/ — The 10 distinct theme definitions. Each theme folder contains a tokens.css file with a complete design token set (colors, radius, fonts, shadows, spacing) scoped under [data-theme="<id>"]. _registry.ts is the single source of truth for theme metadata (id, name, description, tags, preview color).

src/lib/ — Shared utilities: cn() helper, theme persistence helpers, and other framework glue used across the app.

src/styles/globals.css — Global Tailwind v4 entry point. Imports shadcn base styles, all theme token files, and the @theme inline block that maps CSS variables to Tailwind theme keys (colors, borderRadius, fontFamily, boxShadow, spacing).
-->

## Theme system

1. Set `data-theme="<id>"` on `<html>` to activate a theme's token set.
2. Use `next-themes` (`.dark` class on `<html>`) for light/dark mode within any theme.
3. `ThemeProvider` persists the active theme id to `localStorage` (default: `minimal`).
4. Tailwind reads every visual token from CSS variables via `@theme inline` in `globals.css`.

## Adding a new theme

1. Create `src/themes/<theme-id>/tokens.css` with full light + dark tokens under `[data-theme="<theme-id>"]`.
2. Register the theme in `src/themes/_registry.ts`.
3. Import the new `tokens.css` in `src/styles/globals.css`.
