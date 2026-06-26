# CodeCanyon pre-submission checklist

Use this before uploading to Envato / submitting for review.

---

## Build & code quality

- [ ] `npm install` completes without errors
- [ ] `npm run typecheck` — zero TypeScript errors
- [ ] `npm run lint` — zero ESLint errors (or documented exceptions)
- [ ] `npm run build` — production build succeeds
- [ ] `npm run start` — production server runs locally
- [ ] No `console.error` in browser on main routes (/, /preview, /components, /blocks, /docs)
- [ ] No broken links on marketing page and docs
- [ ] Code is formatted (`npm run format:check`)

---

## Demo & live preview

- [ ] Deployed to HTTPS URL (Vercel/Netlify recommended)
- [ ] `NEXT_PUBLIC_SITE_URL` set to production URL
- [ ] `NEXT_PUBLIC_PURCHASE_URL` set to CodeCanyon item URL (after publish)
- [ ] Live preview link in item description points to **`/`** or **`/preview`**
- [ ] All 10 themes switch correctly in preview hub
- [ ] Light and dark mode work per theme
- [ ] Mobile responsive: /, /preview, /docs

---

## Documentation (Envato requirement)

- [ ] `docs-buyer/Documentation.md` included in ZIP
- [ ] `docs-buyer/Documentation.html` included in ZIP (offline-readable)
- [ ] `README.md` at project root
- [ ] `LICENSE-NOTES.md` and `THIRD-PARTY-NOTICES.md` included
- [ ] In-app `/docs` accessible on live demo

---

## Item description (copy from `marketing/`)

- [ ] Title uses primary keyword (see `marketing/item-title.txt`)
- [ ] Description includes **Requirements: Node.js 20+, Next.js 16, React 19**
- [ ] Feature bullets, what's included, changelog section present
- [ ] 5–10 tags added (see `marketing/tags.txt`)
- [ ] Regular vs Extended license mentioned in description or FAQ

---

## Preview images

- [ ] **Cover** 590×300 px (see `marketing/screenshots/README.md`)
- [ ] **Thumbnail** 80×80 px
- [ ] **Screenshots** — homepage, preview hub, all 10 themes, gallery, blocks, docs
- [ ] No misleading imagery — shots match actual product
- [ ] No Envato/logo trademark violations in graphics

---

## Licensing & assets

- [ ] All fonts are Google Fonts (SIL OFL) — documented in THIRD-PARTY-NOTICES
- [ ] shadcn/ui MIT components — documented
- [ ] No paid stock photos bundled without license
- [ ] No copyrighted logos in demo content (replace "Decathemes" client names if needed)
- [ ] Item is not a repackaged GPL theme violating other authors' rights

---

## Unique value (reviewer expectations)

- [ ] **10 distinct themes** — not just color swaps (different radius, shadows, fonts, spacing)
- [ ] **62 blocks** + **9 demo pages** — exceeds basic UI kit
- [ ] **Theme switcher** + live preview — clear differentiator
- [ ] **TypeScript + Next.js 16 + React 19** — modern stack stated clearly
- [ ] Not a duplicate of existing popular item (verify search on CodeCanyon)

---

## ZIP contents (see `prepare-release.md`)

- [ ] No `node_modules/` in ZIP
- [ ] No `.next/` in ZIP
- [ ] No `.env.local` or secrets
- [ ] `.env.example` included
- [ ] Version in `package.json` matches `CHANGELOG.md` (v1.0.0)

---

## Post-publish

- [ ] Update `NEXT_PUBLIC_PURCHASE_URL` on live demo
- [ ] Monitor CodeCanyon comments for first 48h
- [ ] Tag release in changelog for v1.0.1+ fixes

---

## Quick verification commands

```bash
npm ci
npm run typecheck
npm run lint
npm run build
```
