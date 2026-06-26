# Decathemes — Buyer Documentation

**Version 1.0.0** · Next.js 16 · React 19 · TypeScript · Tailwind CSS v4

Thank you for purchasing Decathemes. This document explains installation, configuration, theming, and deployment. For the interactive version, run the project and open `/docs`.

---

## Table of contents

1. [Introduction](#1-introduction)
2. [Requirements](#2-requirements)
3. [Installation](#3-installation)
4. [Project structure](#4-project-structure)
5. [Running the project](#5-running-the-project)
6. [Configuration](#6-configuration)
7. [Theming system](#7-theming-system)
8. [Using components](#8-using-components)
9. [Using blocks](#9-using-blocks)
10. [Customization](#10-customization)
11. [Deployment](#11-deployment)
12. [License](#12-license)
13. [Support](#13-support)
14. [Changelog](#14-changelog)

---

## 1. Introduction

Decathemes is a production-ready UI kit containing:

- **10 themes** with light/dark token sets
- **50+ shadcn/ui components**
- **62 page blocks** (marketing, auth, dashboard, commerce, content)
- **9 demo pages** with live preview at `/preview`
- Marketing homepage, component gallery, block browser, documentation site

Themes are activated with `data-theme="<id>"` on the `<html>` element. Components use semantic Tailwind classes (`bg-primary`, `text-muted-foreground`) that map to CSS variables.

---

## 2. Requirements

| Software           | Version              |
| ------------------ | -------------------- |
| **Node.js**        | **20 or later**      |
| **Next.js**        | **16.2+** (included) |
| **React**          | **19** (included)    |
| npm, pnpm, or yarn | Latest stable        |

No database or external API is required for the stock demo.

---

## 3. Installation

1. Extract the ZIP to a folder (e.g. `decathemes`)
2. Open a terminal in the project root
3. Run:

```bash
npm install
cp .env.example .env.local
```

4. Edit `.env.local` (see Configuration)
5. Start development:

```bash
npm run dev
```

6. Open http://localhost:3000

### Production build

```bash
npm run build
npm run start
```

### Available scripts

| Script            | Command             |
| ----------------- | ------------------- |
| Development       | `npm run dev`       |
| Production build  | `npm run build`     |
| Production server | `npm run start`     |
| Lint              | `npm run lint`      |
| Type check        | `npm run typecheck` |
| Format            | `npm run format`    |

---

## 4. Project structure

```
src/
├── app/                 # Next.js routes
│   ├── page.tsx         # Marketing homepage
│   ├── preview/         # Live demo hub
│   ├── components/      # Component gallery
│   ├── blocks/          # Block browser
│   └── docs/            # Documentation site
├── components/
│   ├── ui/              # shadcn/ui primitives
│   ├── blocks/          # Page sections
│   ├── showcase/        # Theme provider, switcher, galleries
│   ├── demo/            # Composed preview pages
│   └── marketing/       # Homepage sections
├── themes/
│   ├── _registry.ts     # Theme metadata
│   └── <theme-id>/tokens.css
├── lib/                 # Utilities, theme, fonts, config
└── styles/globals.css   # Tailwind + theme imports
```

---

## 5. Running the project

### Key URLs (local)

| URL           | Purpose                                    |
| ------------- | ------------------------------------------ |
| `/`           | Product marketing homepage                 |
| `/preview`    | Interactive demo — 6 pages, theme switcher |
| `/components` | UI component gallery                       |
| `/blocks`     | Block library with copy code               |
| `/docs`       | In-app documentation                       |

### Theme switching

Use the theme switcher in the UI (⌘K on preview/gallery pages) or programmatically:

```tsx
import { useDecathemes } from "@/components/showcase/theme-provider"

function Example() {
  const { setThemeId } = useDecathemes()
  return <button onClick={() => setThemeId("neon")}>Neon theme</button>
}
```

Theme IDs: `minimal`, `brutalist`, `glass`, `neon`, `corporate`, `editorial`, `playful`, `luxury`, `retro`, `organic`.

---

## 6. Configuration

Create `.env.local` from `.env.example`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_PURCHASE_URL=https://codecanyon.net/item/your-item
# NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

| Variable                        | Description                       |
| ------------------------------- | --------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Canonical URL for SEO and sitemap |
| `NEXT_PUBLIC_PURCHASE_URL`      | Destination for "Buy now" buttons |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional Google Analytics 4       |

---

## 7. Theming system

### How it works

1. Each theme is defined in `src/themes/<id>/tokens.css`
2. Light tokens: `[data-theme="<id>"] { --primary: ... }`
3. Dark tokens: `[data-theme="<id>"].dark { ... }`
4. `globals.css` imports all theme files and maps variables to Tailwind
5. `ThemeProvider` persists theme id and color mode to localStorage

### Editing a theme

Edit `src/themes/<id>/tokens.css`. Preview at `/preview?theme=<id>`.

### Adding a new theme

1. Copy `src/docs/templates/new-theme.tokens.css` to `src/themes/mytheme/tokens.css`
2. Register in `src/themes/_registry.ts`
3. Add `@import "../themes/mytheme/tokens.css";` to `globals.css`

### Token reference (essential)

| Variable                                      | Purpose              |
| --------------------------------------------- | -------------------- |
| `--background`, `--foreground`                | Page colors          |
| `--primary`, `--primary-foreground`           | Brand actions        |
| `--muted`, `--muted-foreground`               | Subtle UI            |
| `--border`, `--ring`                          | Borders and focus    |
| `--radius`                                    | Border radius scale  |
| `--font-sans-family`, `--font-heading-family` | Typography           |
| `--chart-1` … `--chart-5`                     | Chart colors         |
| `--sidebar-*`                                 | Sidebar shell colors |

Full table in `/docs/theming` when running the app.

---

## 8. Using components

Import from the UI barrel:

```tsx
import { Button, Card, CardHeader, CardTitle } from "@/components/ui"
```

Browse all components at `/components`. Add new shadcn components:

```bash
npx shadcn@latest add dialog
```

Always use semantic token classes — never hardcode hex colors in components.

---

## 9. Using blocks

Blocks live in `src/components/blocks/`. Browse at `/blocks` and use **Copy code**.

Example:

```tsx
import { HeroCentered } from "@/components/blocks/marketing/hero"
import { PricingThreeTier } from "@/components/blocks/marketing/pricing"

export default function Page() {
  return (
    <>
      <HeroCentered />
      <PricingThreeTier />
    </>
  )
}
```

Customize by editing block files or copying into your own `components/` folder.

### Newsletter / email capture

Blocks use `submitNewsletter()` from `src/lib/newsletter.ts`. **TODO:** Wire to your provider (Mailchimp, ConvertKit, Resend, etc.) via an API route.

---

## 10. Customization

- **Colors:** Edit theme `tokens.css` files
- **Fonts:** `src/lib/fonts.ts` + theme font family variables
- **Radius:** `--radius` per theme, or runtime tweaks in theme switcher
- **Dark mode:** `next-themes` via `ThemeProvider`
- **Remove demos:** Delete `src/app/preview`, `components`, `blocks` routes if unused

---

## 11. Deployment

### Vercel (recommended)

1. Push to GitHub
2. Import on vercel.com
3. Set environment variables
4. Deploy

### Netlify

Use Next.js runtime, `npm run build`, Node 20.

### Self-hosted

```bash
npm ci && npm run build && npm run start
```

Set `NEXT_PUBLIC_SITE_URL` to your production domain.

Use the deployed URL as your CodeCanyon **live preview** link.

---

## 12. License

Purchased under Envato Market **Regular** or **Extended** license.

- **Regular:** One end product, end users not charged
- **Extended:** One end product, end users can be charged

See `LICENSE-NOTES.md` in the project root. Do not redistribute as a competing UI kit.

Third-party open-source licenses: `THIRD-PARTY-NOTICES.md`.

---

## 13. Support

1. Read this documentation and `/docs` on the live demo
2. Check `CHECKLIST.md` and FAQ at `/docs/faq`
3. Contact the author via **CodeCanyon item comments**

Include: Node version, browser, steps to reproduce, license type.

---

## 14. Changelog

### v1.0.0 (2026-06-26)

- Initial release
- 10 themes, 50+ components, 62 blocks, 9 demo pages
- Live preview, galleries, marketing site, documentation
- SEO, configurable purchase URL, analytics placeholder

See `CHANGELOG.md` for future updates.

---

_Decathemes — Envato CodeCanyon item. © Author. All rights reserved._
