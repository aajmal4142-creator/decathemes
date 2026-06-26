# Preview image capture guide

Envato CodeCanyon image requirements and shot list for **Decathemes v2.0**.

**Start here:** [`identity-grid-brief.md`](identity-grid-brief.md) — the 2×5 “same page, 10 themes” image is your #1 sales asset.

**Video:** [`../preview-video-script.md`](../preview-video-script.md) — 15–30s recording script.

Save exports to `marketing/screenshots/export/` (create when capturing).

---

## Required dimensions

| Asset             | Size                | Format  | Notes                                               |
| ----------------- | ------------------- | ------- | --------------------------------------------------- |
| **Cover image**   | **590 × 300 px**    | JPG/PNG | Derive from identity grid — see identity-grid-brief |
| **Thumbnail**     | **80 × 80 px**      | JPG/PNG | `public/favicon.svg` → 80×80 PNG                    |
| **Screenshots**   | min **1280px** wide | PNG     | First slot = identity grid                          |
| **Preview video** | 15–30s              | MP4     | Optional but high conversion                        |

---

## Shot list (priority order)

### 1. Hero differentiator (required)

| #      | File                                   | Capture                                                     |
| ------ | -------------------------------------- | ----------------------------------------------------------- |
| **00** | `00-identity-grid-dashboard-light.png` | `/capture/theme-identity-grid` — crop grid, 2×5, light mode |
| 00b    | `00b-identity-grid-dashboard-dark.png` | Same page, dark mode (optional)                             |

### 2. Theme-switch proof (required)

| #   | File                             | Capture                                             |
| --- | -------------------------------- | --------------------------------------------------- |
| 01  | `01-homepage-hero-autocycle.png` | `/` — hero mini-app + headline                      |
| 02  | `02-theme-switch-wipe.png`       | Mid–view-transition screenshot (record video frame) |

### 3. Product breadth (required)

| #   | File                        | Capture                                         |
| --- | --------------------------- | ----------------------------------------------- |
| 03  | `03-preview-hub.png`        | `/preview` — dashboard + theme bar              |
| 04  | `04-components-gallery.png` | `/components` — staged component + compare mode |
| 05  | `05-blocks-library.png`     | `/blocks` — full-width block + copy toast       |
| 06  | `06-docs.png`               | `/docs/theming`                                 |

### 4. Theme highlights (recommended — or rely on grid)

Individual shots if you need carousel variety:

| Theme ID    | Suggested page                         |
| ----------- | -------------------------------------- |
| `minimal`   | `/preview/dashboard?theme=minimal`     |
| `brutalist` | `/preview/dashboard?theme=brutalist`   |
| `glass`     | `/preview/landing?theme=glass`         |
| `neon`      | `/preview/dashboard?theme=neon` (dark) |
| `corporate` | `/preview/crm?theme=corporate`         |
| `editorial` | `/preview/blog?theme=editorial`        |
| `playful`   | `/preview/store?theme=playful`         |
| `luxury`    | `/preview/store?theme=luxury`          |
| `retro`     | `/preview/landing?theme=retro`         |
| `organic`   | `/preview/store?theme=organic`         |

### 5. Polish proof (v2.0)

| #   | File                         | Capture                           |
| --- | ---------------------------- | --------------------------------- |
| 07  | `07-accessibility-audit.png` | `/accessibility` — contrast table |
| 08  | `08-theme-builder.png`       | `/theme-builder`                  |

---

## Capture settings

- **Build:** `npm run build && npm run start` before capture
- **Browser:** Chrome, 100% zoom, DevTools closed
- **Viewport:** 1440×900 (identity grid) or 1920×1080 (full-page shots)
- **Filename:** zero-padded order + descriptive slug

---

## Built-in tools

| Route                          | Purpose                                    |
| ------------------------------ | ------------------------------------------ |
| `/capture/theme-identity-grid` | 2×5 iframe grid for screenshot #00         |
| `/`                            | Hero auto-cycle for video + screenshot #01 |

---

## Quality checklist

- [ ] Screenshot **#00 identity grid** uploaded first in gallery
- [ ] Grid shows **same layout** in all 10 cells
- [ ] Cover 590×300 matches actual product (Envato rejects misleading previews)
- [ ] Preview video shows circular wipe + Buy now (see preview-video-script.md)
- [ ] No console, no broken images, sharp text (capture at 2× if needed)

---

## Listing copy

- Description: `marketing/item-description.md`
- First comment / FAQ: `marketing/first-comment-faq.md`
