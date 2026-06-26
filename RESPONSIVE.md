# Responsive system — Decathemes

Intentional mobile-first layout rules for buyers and contributors. All patterns live in `src/styles/responsive-system.css` and ship with every theme.

---

## Philosophy

1. **Mobile-first** — base styles target small screens; `sm` / `md` / `lg` / `xl` / `2xl` scale up.
2. **Fluid, not stepped** — headings and section rhythm use `clamp()` between 320px and 1920px so type never jumps abruptly.
3. **Container-aware** — cards, gallery items, and fields respond to **parent width** via Tailwind v4 container queries, not only the viewport.
4. **Zero horizontal scroll** — `overflow-x: clip` on `html` / `body`; `.showcase-page` guards showcase routes.
5. **Touch-safe** — 44×44px minimum targets on coarse pointers (`pointer: coarse`).
6. **Notch-safe** — `env(safe-area-inset-*)` on sticky bars, sheets, and bottom drawers.

---

## Breakpoints (viewport)

| Token  | Min width | Typical devices             |
| ------ | --------- | --------------------------- |
| (base) | 0         | Phones portrait             |
| `sm`   | 640px     | Large phones, small tablets |
| `md`   | 768px     | Tablets, small laptops      |
| `lg`   | 1024px    | Laptops                     |
| `xl`   | 1280px    | Desktops                    |
| `2xl`  | 1536px    | Wide monitors               |

JS hook: `useIsMobile()` — `true` below 768px (`src/hooks/use-mobile.ts`, `src/lib/responsive.ts`).

### Regression widths

Test every release at: **320, 360, 375, 390, 414, 768, 834, 1024, 1280, 1440, 1920** — plus **landscape phone** (e.g. 667×375, 844×390).

Run automated guard check (viewport meta + overflow classes):

```bash
npm run build && npm run start
node scripts/responsive-audit.mjs
```

---

## Fluid typography

CSS variables in `responsive-system.css`, mapped to theme heading fonts:

| Class                 | Variable         | Use              |
| --------------------- | ---------------- | ---------------- |
| `.text-display`       | `--text-display` | Hero display     |
| `.text-fluid-h1`      | `--text-h1`      | Page titles      |
| `.text-fluid-h2`      | `--text-h2`      | Section headings |
| `.text-fluid-h3`      | `--text-h3`      | Subsections      |
| `.text-fluid-body-lg` | `--text-body-lg` | Lead copy        |
| `.text-fluid-body`    | `--text-body`    | Body             |

All fluid headings use `var(--font-heading-family)` so **each of the 10 themes** scales personality without breaking layout.

---

## Fluid spacing

| Token / class            | Purpose                          |
| ------------------------ | -------------------------------- |
| `--section-py`           | Default section vertical padding |
| `--section-py-sm`        | Compact sections                 |
| `--section-px`           | Horizontal page inset            |
| `--grid-gap`             | Card/grid gaps                   |
| `.section-py`            | Apply section padding            |
| `.page-shell`            | `max-width: 72rem` + fluid px    |
| `.page-shell-wide`       | `max-width: 100rem` + fluid px   |
| `.grid-responsive-cards` | 1 → 2 → 3 → 4 column grid        |

---

## Container queries

Custom variants (component width, not viewport):

| Variant         | Min container width |
| --------------- | ------------------- |
| `@container-sm` | 20rem (320px)       |
| `@container-md` | 28rem (448px)       |
| `@container-lg` | 36rem (576px)       |

Named containers in use:

- `@container/card` — `Card` root
- `@container/card-header` — `CardHeader` layout
- `@container/field-group` — responsive form fields (`orientation="responsive"`)
- `@container/gallery-item` — component gallery cards

Example: `@container-md/card:grid-cols-2`

---

## Safe areas & touch

| Utility                    | Behavior                                             |
| -------------------------- | ---------------------------------------------------- |
| `.safe-area-top`           | `padding-top: max(0.5rem, env(safe-area-inset-top))` |
| `.safe-area-bottom`        | Bottom inset padding                                 |
| `.safe-area-x`             | Left/right insets + fluid page padding               |
| `.safe-area-inset-bottom`  | Drawer/sheet bottom padding                          |
| `.sticky-bar`              | Sticky top chrome with safe-area-top                 |
| `@media (pointer: coarse)` | Buttons, tabs, selects ≥ 44px                        |

---

## Component responsive behavior

| Component                        | Mobile (< md)                                                                      | Desktop (≥ md)                                                             |
| -------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Showcase top bar**             | Hamburger → `Sheet` nav (`ShowcaseMobileNav`); theme + buy CTA remain visible      | Inline nav links                                                           |
| **Marketing nav**                | Hamburger → `Sheet` with anchors + CTAs                                            | Full horizontal nav                                                        |
| **Dialog / Command**             | Bottom **Drawer** (vaul) via `ResponsiveModal`                                     | Centered dialog                                                            |
| **Data table**                   | Stacked **card rows** per record                                                   | Table + horizontal scroll; **sticky first column** (`.table-sticky-first`) |
| **Tabs**                         | Horizontally **scrollable** list (`.tabs-scroll`), never clipped                   | Inline tab bar                                                             |
| **Sidebar**                      | Off-canvas `Sheet` + overlay (`useIsMobile`)                                       | Persistent collapsible sidebar                                             |
| **Forms**                        | Single column; `Field` `orientation="responsive"` stacks at narrow container width | Multi-column at `@md/field-group`                                          |
| **Cards / grids**                | 1 column; `.grid-responsive-cards` scales to 4 cols                                | Consistent `--grid-gap`                                                    |
| **Carousel**                     | 1 slide (`basis-full`); swipe via Embla                                            | 2 slides `sm`, 3 slides `lg`                                               |
| **Charts**                       | Rotated/shorter axis labels; `ResponsiveContainer`                                 | Full labels                                                                |
| **Command / popover / dropdown** | `min(100vw - 2rem - safe-area)` width; Radix collision detection                   | Fixed max widths                                                           |
| **Pricing**                      | **Popular plan first** (`order-first` + sort); stacked cards                       | Multi-column grid                                                          |
| **Footer**                       | Single column → `sm`/`lg` grids; no orphaned half-columns                          | Multi-column link groups                                                   |

---

## Global guarantees

- **No horizontal scroll** at any tested width.
- **No clipped interactive content** — tabs scroll, tables cardify, popovers reposition.
- **Meaningful text** — avoid `truncate` on body copy; labels use `break-words` where needed.
- **Images** — use `next/image` with `sizes` when adding photos; demos use `AspectRatio` placeholders to prevent CLS.
- **All 10 themes** — fluid type uses theme font tokens; verify mobile + desktop when changing `tokens.css` or signatures.

---

## Files

| Path                                              | Role                                           |
| ------------------------------------------------- | ---------------------------------------------- |
| `src/styles/responsive-system.css`                | Tokens, utilities, overflow guard, touch rules |
| `src/lib/responsive.ts`                           | Breakpoint constants + test viewport list      |
| `src/components/ui/responsive-dialog.tsx`         | Dialog ↔ Drawer switch                         |
| `src/components/showcase/showcase-mobile-nav.tsx` | Showcase hamburger nav                         |
| `scripts/responsive-audit.mjs`                    | Automated HTML guard checks                    |

---

## Adding new UI

1. Start mobile — one column, full-width tap targets.
2. Add `sm:` / `md:` / `lg:` only when layout needs more columns or inline chrome.
3. Prefer `.text-fluid-*` and `.section-py` over hard-coded `text-4xl py-24`.
4. Wrap layout-sensitive components in `@container/name` when behavior should follow card width.
5. Overlays on mobile → `ResponsiveModal` or `Drawer` bottom sheet.
6. Re-run the viewport matrix and `node scripts/responsive-audit.mjs` before shipping.

---

## Performance (mobile + desktop)

Performance is part of the responsive bar — buyers test Lighthouse before purchase.

| Check                  | Target                                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------------------------- |
| Lighthouse Performance | ≥ **95** on `/`, `/preview`, `/docs/getting-started` (mobile and desktop)                                 |
| Horizontal overflow    | None at any viewport (see audit script)                                                                   |
| Touch targets          | ≥ 44×44 px on primary actions                                                                             |
| Font loading           | Core fonts preloaded (`fonts-core.ts`); theme fonts deferred; `preconnect` to Google Fonts in root layout |

```bash
npm run build && npm run start   # terminal 1
npm run audit:lighthouse         # terminal 2 — writes src/lib/lighthouse-audit.generated.ts
```

Set `PERF_BUDGET=95` (default) to fail CI when scores drop below budget.

---
