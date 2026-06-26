# Themes (`src/themes/`)

Each theme is a **CSS token file** — no runtime JS per theme.

## Layout

```
themes/
├── _registry.ts          # Theme metadata (id, name, description, preview gradient)
├── minimal/tokens.css    # Light + .dark token blocks
├── brutalist/tokens.css
└── … (10 themes total)
```

## How switching works

1. `layout.tsx` inline script reads `localStorage` and sets `data-theme` before paint (anti-flash).
2. `applyThemeId()` updates `document.documentElement.dataset.theme`.
3. `next-themes` toggles `.dark` for color mode.
4. `globals.css` `@theme inline` maps `--primary` etc. to Tailwind utilities.

## Adding a theme

1. Create `src/themes/<id>/tokens.css` with light and `[data-theme="<id>"].dark` blocks.
2. Register in `_registry.ts` (`themes` array + `isValidThemeId`).
3. Import the CSS in `src/styles/globals.css`.
4. (Optional) Add a Google font in `src/lib/fonts-extended.ts` and reference `var(--font-…)` in tokens.
5. Run `npm run build` and verify in `/components` gallery across light/dark.

See in-app guide: `/docs/adding-a-theme`.
