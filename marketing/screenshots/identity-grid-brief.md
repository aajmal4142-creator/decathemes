# Identity grid — the image that sells Decathemes

This is the **#1 CodeCanyon screenshot**. One glance must prove: _same codebase, ten completely different products_ — fonts, radius, shadows, and color, not a palette swap.

---

## What to capture

| Property        | Value                                   |
| --------------- | --------------------------------------- |
| **Layout**      | 2 columns × 5 rows (all 10 themes)      |
| **Same page**   | `/preview/dashboard` in every cell      |
| **Mode**        | Light (dark optional as a second asset) |
| **Labels**      | Theme name + `data-theme` id per cell   |
| **Export name** | `00-identity-grid-dashboard-light.png`  |
| **Min width**   | 1280px (recommend 1320–1440px capture)  |

---

## Fastest path — built-in capture page

1. `npm run build && npm run start` (production — fonts and layout stable)
2. Open **`/capture/theme-identity-grid`** in Chrome at **1440×900** (or wider)
3. Wait ~5s for all 10 iframes to load (dashboard demo)
4. Screenshot the **grid only** (crop out the dark header bar) OR full frame and crop in Figma
5. Export PNG at **2×** if possible, downscale to **1320px wide** for sharp text
6. Save to `marketing/screenshots/export/00-identity-grid-dashboard-light.png`

The capture page uses embedded iframes:

`/preview/dashboard?embedded=1&theme=<id>`

Each iframe is the **identical** dashboard page with a scoped `data-theme`.

---

## Manual composite (Figma / Photoshop)

If iframes are slow locally, capture individually:

| Cell | Theme ID    | URL                                  |
| ---- | ----------- | ------------------------------------ |
| 1    | `minimal`   | `/preview/dashboard?theme=minimal`   |
| 2    | `brutalist` | `/preview/dashboard?theme=brutalist` |
| 3    | `glass`     | `/preview/dashboard?theme=glass`     |
| 4    | `neon`      | `/preview/dashboard?theme=neon`      |
| 5    | `corporate` | `/preview/dashboard?theme=corporate` |
| 6    | `editorial` | `/preview/dashboard?theme=editorial` |
| 7    | `playful`   | `/preview/dashboard?theme=playful`   |
| 8    | `luxury`    | `/preview/dashboard?theme=luxury`    |
| 9    | `retro`     | `/preview/dashboard?theme=retro`     |
| 10   | `organic`   | `/preview/dashboard?theme=organic`   |

**Per capture:**

- Viewport **1440×900**, Chrome **100%** zoom, no DevTools
- Theme switcher: pick theme, wait for view-transition to finish
- Scroll to **top** of dashboard (stats + chart row visible)
- Crop to **640×400** per panel (consistent chrome)
- Arrange **2×5** with **12px** gutter on `#0a0a0a` or white background
- Add small caption under each: theme name + font/radius callout (see `src/lib/theme-personality.ts`)

---

## Why dashboard (not landing)

Dashboard shows **personality** better than a hero gradient:

- **Fonts** — heading vs body (Inter vs Fraunces vs Orbitron vs Space Grotesk)
- **Radius** — 0px brutalist vs 22px playful pills
- **Shadows** — offset brutalist vs soft glass vs neon glow
- **Charts & cards** — `--chart-*` tokens and card borders differ per theme
- **Sidebar & table** — density and border weight change

Landing pages can look like “color swaps” to skeptical buyers. Dashboard does not.

---

## Optional variants (after the hero grid)

| File                                   | Purpose                                               |
| -------------------------------------- | ----------------------------------------------------- |
| `00b-identity-grid-dashboard-dark.png` | Same grid, document dark + neon/minimal dark          |
| `00c-identity-grid-landing-light.png`  | Same 2×5 layout on `/preview/landing`                 |
| `cover-590x300.png`                    | Crop center 2×2 from identity grid + wordmark overlay |

---

## Cover image (590×300) from this asset

1. Take the identity grid export
2. Crop to **four panels** (minimal, brutalist, glass, neon) in a row
3. Overlay left third: **Decathemes** + “10 identities · one `data-theme`”
4. Export 590×300 JPG — this becomes the listing banner

---

## Quality checklist

- [ ] All 10 cells show the **same** dashboard layout (misaligned scroll = reject)
- [ ] **Brutalist** shows 0 radius and offset shadow — obvious vs **Playful**
- [ ] **Editorial** / **Luxury** show serif headings
- [ ] **Neon** reads cyberpunk without looking like a different product
- [ ] No browser UI, no URL bar, no hydration errors
- [ ] Filename uploaded to CodeCanyon as **first screenshot** in gallery

---

## Listing copy tie-in

Use this image to answer: **“Are these just color swaps?”** — point to brutalist vs playful vs editorial in one frame.

Paste-ready reply: see `marketing/first-comment-faq.md`.
