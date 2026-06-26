# Decathemes

**10 production-ready UI themes for Next.js 16, React 19, and shadcn/ui.**

Decathemes is a complete design system product: swap one `data-theme` attribute and your entire app restyles — marketing site, SaaS dashboard, auth flows, storefront, and docs included.

See [`marketing/screenshots/identity-grid-brief.md`](marketing/screenshots/identity-grid-brief.md) for the **#1 sales screenshot** (2×5 theme grid) and [`marketing/screenshots/README.md`](marketing/screenshots/README.md) for the full shot list.

> **Live demo:** Deploy and set `NEXT_PUBLIC_SITE_URL` — reviewers use `/` (marketing), `/preview` (interactive demo), `/components`, `/blocks`, and `/docs`.

---

## Features

- **10 distinct themes** — Minimal, Brutalist, Glass, Neon, Corporate, Editorial, Playful, Luxury, Retro, Organic
- **Light + dark mode** per theme via `next-themes`
- **50+ shadcn/ui components** (new-york style, CSS variables)
- **62 copy-paste page blocks** — marketing, auth, dashboard, commerce, content
- **9 full demo pages** with live preview hub and viewport switcher
- **Theme engine** — `data-theme`, localStorage persistence, radius & font tweaks
- **TypeScript** throughout, App Router, Tailwind CSS v4
- **Documentation** — in-app `/docs` + buyer bundle in `docs-buyer/`
- **No Figma required** — code-first, copy-paste workflow

---

## Requirements

| Requirement | Version                   |
| ----------- | ------------------------- |
| Node.js     | **20+** (LTS recommended) |
| Next.js     | **16.2+**                 |
| React       | **19**                    |
| TypeScript  | 5+                        |

---

## Quick start

```bash
# 1. Extract the archive and install
npm install

# 2. Copy environment template
cp .env.example .env.local

# 3. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm run start
```

### Scripts

| Command                | Description                                 |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Start dev server (Turbopack)                |
| `npm run build`        | Production build + type check               |
| `npm run start`        | Run production server                       |
| `npm run lint`         | ESLint (import order, a11y, unused imports) |
| `npm run lint:fix`     | ESLint with auto-fix                        |
| `npm run typecheck`    | TypeScript strict (`tsc --noEmit`)          |
| `npm run format`       | Prettier write                              |
| `npm run format:check` | Prettier check                              |
| `npm run analyze`      | Production build + bundle analyzer          |

Code conventions: [CODE-STANDARDS.md](./CODE-STANDARDS.md) · [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## Project structure

```
src/
├── app/              # Routes (marketing, preview, gallery, blocks, docs)
├── components/
│   ├── ui/           # shadcn/ui primitives
│   ├── blocks/       # 62 page sections
│   ├── showcase/     # Theme switcher, providers, galleries
│   ├── demo/         # Composed preview pages
│   └── marketing/    # Product homepage
├── themes/           # Token CSS + registry
├── lib/              # Theme, fonts, site config, utilities
└── styles/           # globals.css + Tailwind @theme mapping
docs-buyer/           # Offline documentation for Envato download
marketing/            # CodeCanyon listing copy & screenshot brief
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for architecture notes.

---

## Configuration

Edit `.env.local` (see `.env.example`):

| Variable                        | Purpose                                         |
| ------------------------------- | ----------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Canonical URL for SEO, sitemap, OpenGraph       |
| `NEXT_PUBLIC_PURCHASE_URL`      | "Buy now" CTA destination (CodeCanyon item URL) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional Google Analytics 4                     |

---

## Switching themes

```tsx
import { useDecathemes } from "@/components/showcase/theme-provider"

const { themeId, setThemeId } = useDecathemes()
setThemeId("glass")
```

Or set statically on `<html data-theme="corporate">`.

Full guide: [/docs/theming](http://localhost:3000/docs/theming) (when running locally).

---

## Screenshots

Capture guides in [`marketing/screenshots/`](marketing/screenshots/).

**#1 screenshot:** open `/capture/theme-identity-grid` — same dashboard × 10 themes (see `identity-grid-brief.md`).

Also capture:

1. Homepage hero (auto-cycling mini-app)
2. Preview video per `marketing/preview-video-script.md`
3. Component gallery + block library
4. Cover 590×300 derived from identity grid
5. Documentation site

---

## License

This item is sold under **Envato Market licenses** (Regular and Extended). See [LICENSE-NOTES.md](LICENSE-NOTES.md) for plain-English usage rules.

Third-party open-source components (shadcn/ui, Radix, Lucide, etc.) retain their original licenses — see [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).

**You may not** redistribute the source as a competing theme/UI kit. One license per end product.

---

## Support

After purchase on CodeCanyon:

1. Read `docs-buyer/Documentation.md` and in-app `/docs`
2. Check [FAQ & troubleshooting](http://localhost:3000/docs/faq)
3. Comment on the item page with Node version, browser, and steps to reproduce

Include your license type (Regular/Extended) when asking about commercial use.

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md). Current release: **v1.0.0**.

---

## Credits

Built with [Next.js](https://nextjs.org), [shadcn/ui](https://ui.shadcn.com), [Tailwind CSS](https://tailwindcss.com), [Radix UI](https://radix-ui.com), [Lucide](https://lucide.dev), and [Recharts](https://recharts.org).

Fonts via [Google Fonts](https://fonts.google.com) (SIL Open Font License).
