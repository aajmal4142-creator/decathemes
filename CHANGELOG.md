# Changelog

All notable changes to Decathemes are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).  
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

---

## [2.0.0] — 2026-06-26

### Added

- **Premium showcase** — `/components` and `/blocks` with sticky nav, gallery stages, theme compare mode, per-block theme cycler, copy toasts
- **Showcase top bar** — persistent theme switcher, dark mode, and Buy CTA across preview, docs, theme builder, and accessibility routes
- **Marketing homepage v2** — auto-cycling hero mini-app, 10-theme hover gallery, who-it’s-for, theme-switch media slot
- **Identity grid capture page** — `/capture/theme-identity-grid` for CodeCanyon “same page, 10 themes” screenshot
- **Realistic demo data** — shared brand/copy layer across dashboards, CRM, store, blog, and AI chat demos
- **Accessibility audit page** — live WCAG contrast results from `npm run audit:contrast`
- **Lighthouse audit script** — `npm run audit:lighthouse` with generated report on `/accessibility`
- **Quality trust strip** — verified WCAG / responsive claims on homepage (Lighthouse badge when ≥95)

### Changed

- **Themes redesigned** — token and signature CSS pass for distinct personalities (fonts, radius, shadows — not palette-only)
- **Theme switch** — View Transitions API circular wipe (POLISH 2) with reduced-motion fallback
- **Motion system** — per-theme motion presets (POLISH 3): reveal, stagger, card/button hover via `useMotionPreset`
- **Performance** — split font loading, lazy demo pages, deferred charts, optimized package imports
- **CodeCanyon listing assets** — item description, identity grid brief, preview video script, first-comment FAQ (`marketing/`)

### Fixed

- WCAG 2.1 AA contrast across all 10 themes (light + dark)
- ⌘K shortcut conflict on `/docs` (docs search vs theme palette)
- Minimal theme focus rings and theme signature focus styles

## [1.1.0] — 2026-06-26

### Added

- **Theme Builder** (`/theme-builder`) — live OKLCH controls, copy & download `tokens.css`
- **RTL toggle** — persisted direction switch with Radix DirectionProvider
- **3 niche demo templates** — CRM, Analytics, AI Chat UI in live preview
- **`npm run add-block`** — CLI helper for block import snippets
- **Accessibility statement** (`/accessibility`) — WCAG targets + keyboard verification table

## [1.0.0] — 2026-06-26

### Added

- **10 production themes** with full light/dark token sets: minimal, brutalist, glass, neon, corporate, editorial, playful, luxury, retro, organic
- **Theme engine** — `data-theme` switching, localStorage persistence, anti-flash script, radius & font runtime tweaks
- **50+ shadcn/ui components** (new-york style) with component gallery at `/components`
- **62 copy-paste page blocks** across marketing, auth, application, commerce, and content
- **9 full demo pages** — landing, dashboard, auth, settings, store, blog, CRM, analytics, AI chat
- **Live preview hub** at `/preview` with theme switcher, page selector, and viewport toggle
- **Marketing homepage** with animated theme-cycling hero and CodeCanyon-ready CTAs
- **In-app documentation** at `/docs` (8 guides, search, sidebar, TOC)
- **Buyer documentation bundle** in `docs-buyer/`
- **CodeCanyon listing assets** in `marketing/`
- SEO: metadata, OpenGraph, `sitemap.xml`, `robots.txt`, favicon set
- Configurable purchase URL via `NEXT_PUBLIC_PURCHASE_URL`
- Analytics placeholder via `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Newsletter blocks wired to `submitNewsletter()` stub with provider TODO

### Stack

- Next.js 16.2.9, React 19, TypeScript 5, Tailwind CSS v4
- next-themes, framer-motion, recharts, TanStack Table, react-hook-form, zod

[2.0.0]: https://codecanyon.net/item/decathemes/v2.0.0
[1.1.0]: https://codecanyon.net/item/decathemes/v1.1.0
