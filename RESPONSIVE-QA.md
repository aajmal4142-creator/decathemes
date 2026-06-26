# Responsive QA Report

Audit date: 2025-06-26  
Target: Decathemes showcase — zero horizontal page scroll, touch targets ≥ 44px, all 10 themes stable at 375px and 1440px.

## Viewports tested

| Width | Device class |
|------:|--------------|
| 320 | iPhone SE (legacy) |
| 360 | Android small |
| 375 | iPhone 12/13/14 mini |
| 390 | iPhone 14/15 |
| 414 | iPhone Plus |
| 768 | iPad portrait |
| 834 | iPad Air |
| 1024 | iPad landscape / small laptop |
| 1280 | Laptop |
| 1440 | Desktop / design canvas |

## Routes audited

- `/` — marketing homepage
- `/preview` — live demo iframe shell
- `/components` — component gallery + compare mode
- `/blocks` — block library
- `/docs/getting-started` (representative docs route)
- `/theme-builder`
- `/accessibility`

## Themes verified (375px + 1440px)

`minimal`, `brutalist`, `glass`, `neon`, `retro`, `corporate`, `playful`, `editorial`, `cyber`, `warm` — decorative layers (glass blur, neon glow, brutalist marquee, retro grain) contained via `theme-signatures.css` paint containment; no layout breakage observed.

## Global guards

| File | Fix |
|------|-----|
| `src/styles/responsive-system.css` | `overflow-x: clip` on `html`/`body`; `.showcase-page` guard; coarse-pointer touch targets for buttons, tabs, selects, toggle-group items, switches |
| `src/styles/theme-signatures.css` | `contain: paint` + `max-width: 100vw` on brutalist/neon/retro/glass pseudo-elements |

## Fixes by route / area

### `/` (homepage)

| Issue | Fix |
|-------|-----|
| Comparison table `min-w-[640px]` caused page-level horizontal scroll | Mobile: stacked `Card` rows (`md:hidden`); table only from `md:` up |
| Pricing grid could overflow narrow viewports | `min-w-0 max-w-4xl` on pricing container |
| Page shell overflow | Root wrapper `min-w-0 overflow-x-clip` |

### `/preview`

| Issue | Fix |
|-------|-----|
| Viewport toggle + iframe controls cramped in top bar | Dedicated toolbar row below `ShowcaseTopBar`; full-width toggle group on mobile |
| Fixed frame width exceeded viewport | `width: 100%; maxWidth: frameWidth` on preview frame |
| Page tabs clipped on narrow screens | `sm:hidden` native `<Select>` on mobile; wrapping `TabsList` from `sm:` |
| Viewport defaults to wide on phones | `matchMedia (max-width: 767px)` sets viewport to `mobile` on mount |
| Touch targets | Viewport toggles, iframe/open buttons `min-h-11` |

### `/components`

| Issue | Fix |
|-------|-----|
| Sticky compare toolbar overflow | `ShowcaseGalleryToolbar` stacks vertically; full-width theme selects; abbreviated “Compare” label |
| Category pills too small | `ShowcaseMiniNav` pills `min-h-11` |
| Gallery grid / stages overflow | `min-w-0 max-w-full` on items, stages, category grid; stage inner `overflow-x-auto` |
| Jump / search controls | `min-h-11` buttons and search input |

### `/blocks`, `/theme-builder`, `/accessibility`

| Issue | Fix |
|-------|-----|
| Grid children overflow | Existing `showcase-page` + `min-w-0` on main; theme-builder grid wrapper `min-w-0` |
| Accessibility tables | Contained `overflow-x-auto` wrappers (no page scroll) |

### UI primitives (gallery demos)

| Component | Fix |
|-----------|-----|
| `dialog.tsx` | Bottom-sheet positioning below `md`; centered dialog from `md:` |
| `dropdown-menu.tsx` | `collisionPadding={12}`, `max-w` viewport clamp |
| `select.tsx` | `collisionPadding={12}`, `max-w` viewport clamp |
| `popover.tsx` | `collisionPadding={12}` |
| `table.tsx` | Container `min-w-0 max-w-full overflow-x-auto` |
| `data-table.tsx` | Pagination controls `min-h-11`; mobile card stack (existing) |

## Overflow guard verification

Run after production build:

```bash
npm run build && npm run start
node scripts/responsive-audit.mjs --port 3000
```

Manual visual pass: resize DevTools to each width above; confirm `document.documentElement.scrollWidth === window.innerWidth` on every route.

## Known acceptable inner scroll

- Table / data-table demo stages scroll horizontally inside their container (not page-level).
- Accessibility audit tables scroll inside bordered wrappers.
- Component gallery stage may scroll for wide demo content (contained).

## Build

```bash
npm run build
```

Expected: clean production build with no layout-related errors.
