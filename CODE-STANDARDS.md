# Code standards — Decathemes

Conventions enforced by tooling and expected in all contributions.

---

## TypeScript

| Setting                      | Value  |
| ---------------------------- | ------ |
| `strict`                     | `true` |
| `noUncheckedIndexedAccess`   | `true` |
| `noImplicitOverride`         | `true` |
| `exactOptionalPropertyTypes` | `true` |

### Rules

- **No `any`.** Use proper types or `unknown` with narrowing.
- **Optional props:** never pass `prop={undefined}` — omit the key or use `pickDefined()` from `@/lib/optional-props`.
- **Array access:** guard with `atOr()`, `firstOrThrow()`, or explicit checks.
- **Generics:** only when they carry information (e.g. `DataTable<TData, TValue>`), not as unused placeholders.

```ts
// Good
getTransition(preset, { reducedMotion, ...(slow ? { slow: true } : {}) })

// Bad (exactOptionalPropertyTypes)
<Component themeId={theme} />  // when theme is string | undefined
```

---

## Imports

Use **path aliases** only — no deep relatives:

| Alias            | Maps to            |
| ---------------- | ------------------ |
| `@/*`            | `src/*`            |
| `@/components/*` | `src/components/*` |
| `@/lib/*`        | `src/lib/*`        |
| `@/hooks/*`      | `src/hooks/*`      |
| `@/themes/*`     | `src/themes/*`     |
| `@/docs/*`       | `src/docs/*`       |
| `@/styles/*`     | `src/styles/*`     |
| `@/app/*`        | `src/app/*`        |

ESLint `import/order` groups: builtin → external → internal (`@/`) → relative (same-folder only).

```ts
// Good
import { Button } from "@/components/ui/button"

// Bad — blocked by no-restricted-imports
import { Button } from "../../../components/ui/button"
```

---

## React & Next.js

### Server vs client

| Use                            | When                                                                  |
| ------------------------------ | --------------------------------------------------------------------- |
| **Server Component** (default) | Static content, metadata, data fetch, no hooks/browser APIs           |
| **`"use client"`**             | `useState`, `useEffect`, event handlers, Framer Motion, theme context |

**Push `"use client"` to the smallest leaf that needs interactivity.**

- **Pages and layouts** stay Server Components. Import client islands with `next/dynamic` when the route shell is heavy.
- **Static sections** (copy, grids, footers without hooks) belong in Server Components or in client parents only as children passed from the server.
- **Never** put `"use client"` on a file just to import a hook used in one button — extract that button into its own client file.
- **Providers** (`ThemeProvider`, tooltips) are an intentional client boundary at the root; defer non-critical chrome with `requestIdleCallback` (see `app-providers.tsx`).

```tsx
// app/components/page.tsx — server route, lazy showcase
const ComponentGalleryPage = dynamic(
  () =>
    import("@/components/showcase/component-gallery-page").then((m) => ({
      default: m.ComponentGalleryPage,
    })),
  { loading: () => <ShowcaseRouteSkeleton /> }
)
```

### Lazy loading (`next/dynamic`)

Use for heavy, below-the-fold, or rarely-opened UI. Always provide a skeleton fallback.

| Asset                          | Pattern                                           |
| ------------------------------ | ------------------------------------------------- |
| Recharts                       | `dynamic(..., { ssr: false, loading: skeleton })` |
| Theme Builder route            | dynamic from server `page.tsx`                    |
| Preview shell / demo pages     | dynamic per route; demos via `demo-page-loader`   |
| Command palette / cmdk         | load on first open (`open ? <Palette /> : null`)  |
| Carousel, calendar, data-table | separate chunk (`gallery-demos-heavy.tsx`)        |

```tsx
// cmdk — not in initial bundle until opened
{
  paletteOpen ? (
    <ThemeCommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
  ) : null
}
```

### Tree-shaking

- **Lucide:** named imports only — `import { CheckIcon } from "lucide-react"`. Never `import * as Icons`.
- **UI primitives:** import from `@/components/ui/button`, not the `@/components/ui` barrel, in files that ship to the client. The barrel re-exports every primitive and defeats splitting.
- **Defer non-critical scripts:** analytics after idle/interaction (`scheduleWhenReady` in `@/lib/defer-idle`); hero auto-cycle gated the same way.

Put `"use client"` at the **top** of the file. Keep client boundaries small — wrap interactive islands, not entire pages, when possible.

### File structure

```
src/
  app/              # Routes (App Router)
  components/
    ui/             # shadcn primitives — minimal edits
    blocks/         # Copy-paste page sections
    showcase/       # Gallery, preview, theme engine
    demo/           # Full demo pages
    marketing/      # Homepage & conversion
  lib/              # Utilities, demo data, motion, optional-props
  hooks/
  themes/           # Per-theme tokens.css + registry
  docs/             # In-app documentation content
```

### Naming

- **Components:** `PascalCase` — `HeroLiveDemo.tsx`
- **Hooks:** `use-kebab-case.ts` — `use-motion-preset.ts`
- **Utilities:** `kebab-case.ts` — `optional-props.ts`
- **Theme IDs:** `kebab-case` — `minimal`, `brutalist`, `glass`
- **Blocks:** descriptive kebab folder — `product-grid.tsx` exporting `ProductGrid`

---

## Theming & tokens

- Themes switch via `data-theme="<id>"` on an ancestor (usually `<html>`).
- Each theme ships `src/themes/<id>/tokens.css` with OKLCH CSS variables.
- **Light + dark** sets live in the same file under `[data-theme="x"]` and `.dark`.
- Personality (fonts, radius, shadows) is defined in tokens **and** `theme-signatures.css` — not color alone.
- Runtime tweaks (radius slider, font swap) go through `ThemeProvider` / `theme-tweaks.ts`.

```css
[data-theme="minimal"] {
  --radius: 0.375rem;
  --font-heading-family: var(--font-inter), sans-serif;
}
```

Use semantic tokens in components: `bg-primary`, `text-muted-foreground`, `border-border` — never hard-code theme hex in JSX.

---

## Motion

- Per-theme motion presets: `@/lib/motion` + `useMotionPreset()`.
- Theme switch wipe: View Transitions API via `runThemeViewTransition()` — respect `prefers-reduced-motion`.
- Do not add Framer Motion to server components.

---

## Accessibility

- Radix primitives provide focus traps and ARIA — don’t strip roles.
- ESLint `jsx-a11y` runs on all `src/` files.
- Run `npm run audit:contrast` after token changes.
- Interactive elements need keyboard support (`Enter` / `Space`).

---

## Formatting

Prettier (`.prettierrc`):

- No semicolons
- Double quotes
- Trailing commas ES5
- Print width 88
- LF line endings

```bash
npm run format        # write
npm run format:check  # CI
```

---

## Bundle size

```bash
npm run analyze   # webpack build + interactive bundle report
```

Opens the Next.js bundle analyzer report. Watch:

- `recharts`, `framer-motion`, `cmdk`, `@tanstack/react-table` — lazy `dynamic()` imports with skeletons.
- `lucide-react` — named icon imports only; `optimizePackageImports` in `next.config.ts`.
- Avoid barrel `@/components/ui` imports in client gallery/demo files.
- Avoid importing chart libraries or cmdk in server/layout files.

Target: marketing `/` and `/docs` first-load JS **&lt; 120 KB gzip** where feasible. Run `node scripts/measure-first-load.mjs` after `npm run build` for per-route estimates.

---

## Performance budget

| Metric                 | Target                                               | How to verify                                                                       |
| ---------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Lighthouse Performance | **≥ 95** on `/`, `/preview`, `/docs/getting-started` | `npm run build && npm run start` then `npm run audit:lighthouse` (mobile + desktop) |
| First-load JS          | &lt; 120 KB gzip on `/` and `/docs`                  | `node scripts/measure-first-load.mjs`                                               |
| CLS                    | No layout shift on hero / images                     | `sizes` on `next/image`; `AspectRatio` placeholders                                 |
| Hydration              | No `localStorage` / `window` during SSR render       | `useMounted` for theme UI; anti-flash script stays in `<head>`                      |

### Resilience

- `error.tsx` + `loading.tsx` per showcase route segment (`/preview`, `/docs`, `/components`, `/blocks`).
- `RouteErrorFallback` — branded card with retry + home link.
- `dynamic()` + `Suspense` for deferred chrome (fonts, dock, decorations).

### Memoization (when it helps)

- `React.memo` on **pure list items** rendered 10+ times (`GalleryItem`, `ThemeSwatchButton`) — skips re-renders when parent filter/toolbar state changes but row props are stable.
- `useMemo` in `useShowcaseCatalog` for filtered entries and nav counts — filter runs O(n) on every keystroke.
- **Do not** memoize leaf shadcn primitives or one-off marketing sections — cost outweighs benefit.

### Theme context

Split into `ThemeIdContext`, `ThemeTweaksContext`, `ThemeAutoCycleContext` so tweak/auto-cycle updates do not re-render unrelated trees. Prefer `useThemeId()`, `useThemeTweaks()`, `useActiveThemeId()` over `useDecathemes()` in hot paths.

---

## Commits & changelog

- [Keep a Changelog](https://keepachangelog.com/) format in `CHANGELOG.md`.
- User-visible changes get a version entry; internal refactors may note under `Changed` only.

---

## Buyer-facing quality bar

Decathemes is sold as **production-ready**. Before shipping:

1. `typecheck` + `lint` + `build` clean
2. Contrast audit passes
3. No placeholder lorem in demos (`@/lib/demo/`)
4. Showcase routes work with top bar + theme switcher
