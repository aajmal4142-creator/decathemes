# Decathemes — Project build history

**Master reference for everything built in this repository from the start.**  
Current version: **1.1.0** · Package: `decathemes` · Stack: Next.js 16.2.9, React 19, TypeScript, Tailwind v4, shadcn/ui (new-york).

Use this file when you want the full picture of what was implemented, in what order, and where it lives in the codebase.

---

## Related documentation (by purpose)

| File                                                           | Use when you need…                                    |
| -------------------------------------------------------------- | ----------------------------------------------------- |
| **[PROJECT-HISTORY.md](PROJECT-HISTORY.md)** (this file)       | Chronological build log and feature inventory         |
| **[CHANGELOG.md](CHANGELOG.md)**                               | Version-by-version release notes (1.0.0 → 1.1.0)      |
| **[README.md](README.md)**                                     | Buyer-facing overview, quick start, project structure |
| **[ARCHITECTURE.md](ARCHITECTURE.md)**                         | How the theme system and folders fit together         |
| **[CHECKLIST.md](CHECKLIST.md)**                               | Pre-submission checklist for CodeCanyon               |
| **[prepare-release.md](prepare-release.md)**                   | How to zip and upload the release                     |
| **[docs-buyer/Documentation.md](docs-buyer/Documentation.md)** | Offline buyer setup guide (also `Documentation.html`) |
| **[marketing/](marketing/)**                                   | Listing title, description, tags, screenshot brief    |

---

## Product summary

**Decathemes** is a commercial CodeCanyon UI kit: **10 themes**, **50+ shadcn/ui components**, **62 page blocks**, **9 demo pages**, a marketing homepage, in-app docs, and a Theme Builder.

Buyers swap `data-theme` on `<html>` to restyle the entire app. Light/dark mode works per theme via `next-themes`.

---

## Build timeline (what was done, in order)

### Phase 1 — Theme engine

- **10 production themes** in `src/themes/<id>/tokens.css`: minimal, brutalist, glass, neon, corporate, editorial, playful, luxury, retro, organic
- Theme registry: `src/themes/_registry.ts`
- **ThemeProvider** + persistence (`localStorage`), anti-flash script in `src/app/layout.tsx`
- Runtime tweaks (radius, fonts): `src/lib/theme-tweaks.ts`
- Global styles + `@theme inline` token mapping: `src/styles/globals.css`
- `data-theme` + `next-themes` dark mode on `<html>`

### Phase 2 — Component gallery

- **50+ shadcn/ui components** in `src/components/ui/` (new-york style)
- Interactive gallery at **`/components`**: theme switcher, search, code peek
- Showcase shell: `src/components/showcase/`

### Phase 3 — Blocks library

- **62 copy-paste blocks** in `src/components/blocks/` (marketing, auth, application, commerce, content)
- Registry: `src/components/blocks/_registry.ts`
- Gallery at **`/blocks`** with copy-code buttons

### Phase 4 — Live preview hub

- Shared demo shell + composed page components in `src/components/demo/`
- Preview registry: `src/components/demo/preview-registry.ts`
- **`/preview`**: theme switcher, page selector, viewport toggle (desktop / tablet / mobile)
- **9 demo pages**: landing, dashboard, auth, settings, store, blog, CRM, analytics, AI chat

### Phase 5 — Marketing homepage

- Route **`/`** — animated theme-cycling hero, 10-theme grid, pricing, FAQ, newsletter CTA
- Site config: `src/lib/site-config.ts` (`NEXT_PUBLIC_PURCHASE_URL`, etc.)
- Newsletter stub: `src/lib/newsletter.ts` (provider integration left as TODO for buyers)

### Phase 6 — In-app documentation

- Route **`/docs`** — sidebar, table of contents, search (⌘K)
- **8 guides** in `src/docs/pages/`: getting started, theming, adding a theme, components, blocks, customization, deployment, FAQ

### Phase 7 — CodeCanyon listing assets (v1.0.0)

- Root docs: `README.md`, `CHANGELOG.md`, `LICENSE-NOTES.md`, `THIRD-PARTY-NOTICES.md`, `CHECKLIST.md`, `prepare-release.md`, `ARCHITECTURE.md`
- Buyer bundle: `docs-buyer/Documentation.md` + `docs-buyer/Documentation.html`
- Marketing copy: `marketing/` (title, description, tags, screenshot brief)

### Phase 8 — SEO and growth

- `src/app/sitemap.ts`, `src/app/robots.ts`
- Favicon set in `public/`
- Analytics component (GA4 via `NEXT_PUBLIC_GA_MEASUREMENT_ID`)
- `.env.example` for required public env vars

### Phase 9 — Premium extras (v1.1.0)

- **Theme Builder** at **`/theme-builder`** — OKLCH controls, copy + download `tokens.css`  
  (`src/components/tools/theme-builder-page.tsx`, `src/lib/theme-builder/generate-tokens.ts`)
- **RTL toggle** — `src/lib/rtl.ts`, `RtlProvider`, languages icon in theme switcher
- **3 niche demos** — CRM, Analytics, AI Chat (added to preview registry)
- **CLI** — `npm run add-block` → `scripts/add-block.mjs`
- **Accessibility statement** at **`/accessibility`** — WCAG targets + keyboard verification table

---

## Routes reference

| Route            | Purpose                             |
| ---------------- | ----------------------------------- |
| `/`              | Marketing homepage                  |
| `/preview`       | Demo hub (9 pages, viewport toggle) |
| `/components`    | Component gallery                   |
| `/blocks`        | Blocks gallery                      |
| `/docs`          | In-app documentation                |
| `/theme-builder` | Custom theme generator              |
| `/accessibility` | Accessibility statement             |

---

## Key source locations

```
src/
├── app/                    # App Router routes
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   ├── blocks/             # 62 page blocks + _registry.ts
│   ├── showcase/           # Theme switcher, galleries, providers
│   ├── demo/               # Preview demos + preview-registry.ts
│   └── tools/              # Theme Builder
├── themes/                 # 10 themes + _registry.ts
├── docs/pages/             # 8 in-app doc guides
├── lib/                    # site-config, newsletter, rtl, theme-builder, utils
└── styles/globals.css      # Tailwind + theme imports
```

**Entry points for customization**

- New theme: `src/themes/<id>/tokens.css` + register in `_registry.ts` + import in `globals.css`
- New block: add under `src/components/blocks/` + register in `_registry.ts`
- New demo page: component in `src/components/demo/` + entry in `preview-registry.ts`

---

## npm scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Dev server (Turbopack)               |
| `npm run build`     | Production build                     |
| `npm run start`     | Production server                    |
| `npm run lint`      | ESLint                               |
| `npm run typecheck` | TypeScript check                     |
| `npm run format`    | Prettier write                       |
| `npm run add-block` | CLI helper for block import snippets |

---

## Build status (as of v1.1.0)

- `npm run build` — passes
- `npm run typecheck` — passes
- `npm run lint` — exits 0 (warnings only)

---

## Not done yet (buyer / listing tasks)

These are documented in `CHECKLIST.md` and `prepare-release.md` but are **not code** in the repo:

- [ ] Deploy live demo (HTTPS)
- [ ] Set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_PURCHASE_URL` in production
- [ ] Capture screenshots per `marketing/screenshots/README.md`
- [ ] Create release ZIP (exclude `node_modules`, `.next`)
- [ ] Wire newsletter provider in `src/lib/newsletter.ts`
- [ ] Optional: `og-image.png`, PNG favicons, automated a11y audit

---

## Notes from development

- **shadcn re-init** was attempted in a non-interactive environment and aborted; the project already uses **new-york** style via `components.json` — re-init is not required; build passes.
- **Next.js dev server**: only one `npm run dev` per project directory. If port 3000 is busy, stop the existing process before starting again (`taskkill` on Windows — use `cmd.exe //c "taskkill /PID <pid> /F"` from Git Bash).

---

_Last updated: 2026-06-26 (v1.1.0)_
