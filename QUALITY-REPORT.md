# Decathemes — Quality Report

**Audited:** 2026-06-26 · Production build (`npm run build`) · Node 20 · Next.js 16.2.9

This document summarizes verified quality metrics for the CodeCanyon listing. Re-run the commands below before each release.

---

## 1. CI checks (zero errors)

```text
> npm run typecheck
> tsc --noEmit

> npm run lint
> eslint .

> npm run build
✓ Compiled successfully
✓ Generating static pages (31/31)

> npm run format:check
All matched files use Prettier code style!
```

---

## 2. Bundle size (first-load JavaScript, gzip)

Measured with `node scripts/measure-first-load.mjs --serve` after `npm run build && npm run start`.

| Route                   | HTML-linked (first paint) | Manifest upper bound |
| ----------------------- | ------------------------- | -------------------- |
| `/`                     | **218 KB** (31 scripts)   | 543 KB               |
| `/components`           | **190 KB** (23 scripts)   | 251 KB               |
| `/preview`              | **106 KB** (16 scripts)   | 344 KB               |
| `/docs/getting-started` | **106 KB** (17 scripts)   | 238 KB               |

**Shared Next.js framework:** ~168 KB gzip (all routes).

### Largest chunks (gzip)

| Size  | Chunk                          |
| ----- | ------------------------------ |
| 85 KB | Framework / shared vendor      |
| 84 KB | Framework / shared vendor      |
| 71 KB | Framer Motion + motion presets |
| 69 KB | React DOM / client runtime     |
| 45 KB | UI primitives bundle           |
| 39 KB | Lucide / icons subset          |

Heavy libraries (Recharts, cmdk, TanStack Table, carousel) are **lazy-loaded** via `dynamic()` — not in first-load for marketing or docs routes.

**Analyze:** `npm run analyze` opens the webpack bundle analyzer (requires `--webpack` build).

---

## 3. Lighthouse (production server)

Command: `npm run build && npm run start` then `npm run audit:lighthouse`

Scores from `src/lib/lighthouse-audit.generated.ts`:

| Route                   | Form factor | Performance | Accessibility | Best practices | SEO     |
| ----------------------- | ----------- | ----------- | ------------- | -------------- | ------- |
| `/`                     | Mobile      | 73–96\*     | **94**        | **100**        | **100** |
| `/`                     | Desktop     | **97–100**  | **100**       | **100**        | **100** |
| `/preview`              | Mobile      | 71–99\*     | **95**        | **100**        | **100** |
| `/preview`              | Desktop     | **93–100**  | **100**       | **100**        | **100** |
| `/docs/getting-started` | Mobile      | 81–99\*     | **94**        | **100**        | **100** |
| `/docs/getting-started` | Desktop     | **99–100**  | **100**       | **100**        | **100** |

\*Mobile **Performance** varies with LCP on the code-split marketing hero (`dynamic()` import). Desktop consistently ≥ 93. CLS = 0; TBT &lt; 200 ms.

### Accessibility fixes applied (this audit)

- Preview tabs: hidden `TabsContent` panels for valid `aria-controls`
- Theme dropdown: `aria-label` on mobile (icon-only trigger)
- Showcase logo link: `aria-label` when text hidden
- Comparison table: `scope`, caption, row headers
- Testimonial stars: `role="img"` instead of prohibited `aria-label` on `<div>`
- Nav contrast and 44px touch targets on marketing + showcase chrome

**Token contrast:** all 10 themes pass WCAG 2.1 AA (light + dark) — `npm run audit:contrast` on every build.

---

## 4. Responsive verification

### Supported breakpoints

`320 · 360 · 375 · 390 · 414 · 768 · 834 · 1024 · 1280 · 1440 · 1920` px

### Automated guard (`node scripts/responsive-audit.mjs`)

15/15 checks **PASS** — `/`, `/components`, `/preview`, `/docs/getting-started`, `/blocks` at 375 / 768 / 1440 px:

- `overflow-x-clip` on root layout
- Viewport meta present
- Showcase pages use `.showcase-page` containment

### Manual sweep (all 10 themes)

Verified on `/`, `/components`, `/preview` at 375 / 768 / 1440 px with theme cycling:

- No horizontal page scroll (tables use contained `overflow-x-auto`)
- Mobile nav → Sheet; data tables → card layout below `md`
- Pricing cards reorder (popular first on mobile)
- Preview viewport switcher constrains iframe width correctly

**Fixes in this pass:** comparison table semantics; showcase nav contrast/touch targets; preview tab ARIA panels.

---

## 5. Accessibility (keyboard & ARIA)

Manual keyboard verification — full results at **`/accessibility`**.

| Area                                      | Status |
| ----------------------------------------- | ------ |
| Theme command palette (⌘K)                | Pass   |
| Docs search (⌘K on /docs)                 | Pass   |
| Gallery jump (⌘F)                         | Pass   |
| Dialogs / sheets (Esc, focus trap)        | Pass   |
| Menus & command (↑↓ Enter)                | Pass   |
| Radix tabs (arrow keys)                   | Pass   |
| Color mode toggle (`aria-label` per mode) | Pass   |
| RTL toggle                                | Pass   |
| `focus-visible` rings                     | Pass   |

Hydration: `useMounted` on theme UI; anti-flash `data-theme` script in `<head>`.

---

## 6. Engineering practices

| Practice                   | Implementation                                                                    |
| -------------------------- | --------------------------------------------------------------------------------- |
| **Code-splitting**         | `next/dynamic` for marketing, gallery, demos, Recharts, cmdk; deferred theme dock |
| **Typed generics**         | `DataTable<TData>`, `useShowcaseCatalog<TEntry>`, `CatalogEntry` types            |
| **Reusable primitives**    | `Section`, `Container`, `PageHeader`, `Reveal`, CVA variants                      |
| **Split theme context**    | `useThemeId`, `useThemeTweaks`, `useActiveThemeId` — limits re-renders            |
| **Container queries**      | `@container` on gallery cards, field groups, pricing                              |
| **Responsive system**      | Fluid type/space tokens (`responsive-system.css`), safe-area utilities            |
| **Resilience**             | `error.tsx` + `loading.tsx` per route segment; branded `RouteErrorFallback`       |
| **Memoization**            | `React.memo` on `GalleryItem`, `ThemeSwatchButton`; `useMemo` in catalog hook     |
| **Single source of truth** | `site-config.ts`, `themes/_registry.ts`, `constants.ts`, folder READMEs           |
| **Documentation**          | In-app `/docs` + `docs-buyer/` + JSDoc on hooks and utilities                     |

---

## 7. Re-run checklist

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
npm run start          # terminal 1
npm run audit:lighthouse   # terminal 2
node scripts/measure-first-load.mjs --serve
node scripts/responsive-audit.mjs --port 3000
```

---

_Decathemes — production-ready themes for Next.js 16, React 19, and shadcn/ui._
