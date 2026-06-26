# Library (`src/lib/`)

Framework-agnostic utilities, theme engine, and site configuration. No React imports in most modules.

## Theme & design

| Module                 | Role                                                    |
| ---------------------- | ------------------------------------------------------- |
| `theme.ts`             | `data-theme` persistence (`localStorage` + DOM)         |
| `theme-tweaks.ts`      | Runtime radius/font overrides                           |
| `theme-engine.ts`      | Token resolution helpers                                |
| `theme-personality.ts` | Display metadata per theme (fonts, radius label)        |
| `theme-builder/`       | Theme Builder tool — generate `tokens.css` from sliders |
| `fonts-core.ts`        | Preloaded Inter + JetBrains Mono (`next/font`)          |
| `fonts-extended.ts`    | Deferred per-theme Google fonts                         |
| `motion.ts`            | Per-theme Framer Motion presets                         |

## App config & URLs

| Module           | Role                                                   |
| ---------------- | ------------------------------------------------------ |
| `site-config.ts` | Product name, URL, author — single source for metadata |
| `preview-url.ts` | Build `/preview` links with theme query params         |
| `constants.ts`   | Named magic numbers (scroll offsets, shortcut keys)    |

## UX utilities

| Module               | Role                                                   |
| -------------------- | ------------------------------------------------------ |
| `view-transition.ts` | Circular wipe via View Transitions API                 |
| `defer-idle.ts`      | `requestIdleCallback` scheduling for non-critical work |
| `utils.ts`           | `cn()` — `clsx` + `tailwind-merge`                     |
| `optional-props.ts`  | `pickDefined`, `firstOrThrow` for exact optional props |
| `responsive.ts`      | Breakpoint constants for audits                        |

## Generated (do not edit)

- `lighthouse-audit.generated.ts`
- `accessibility-audit.generated.ts`

## Adding a utility

1. Prefer pure functions in `lib/`; React hooks belong in `src/hooks/`.
2. Export with JSDoc (purpose + example for non-trivial APIs).
3. Use `UPPER_SNAKE` for constants in `constants.ts`.
4. Never import heavy UI from `lib/` — keeps tree-shaking clean.
