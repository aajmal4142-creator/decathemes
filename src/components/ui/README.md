# UI primitives (`src/components/ui/`)

shadcn/ui components (new-york style). **Theme-agnostic** — they read CSS variables from `data-theme`, never hardcoded colors.

## Conventions

- One component per file, PascalCase filename (`button.tsx` → `Button`).
- Variants via `class-variance-authority` where applicable.
- `data-slot` attributes for styling hooks.
- Import icons from `lucide-react` by name (tree-shake friendly).

## Importing

```tsx
// Preferred in app code — explicit paths in client bundles
import { Button } from "@/components/ui/button"

// Barrel OK in server components or stories
import { Button, Card } from "@/components/ui"
```

## Complex components

| File             | Notes                                                             |
| ---------------- | ----------------------------------------------------------------- |
| `data-table.tsx` | TanStack Table + mobile card layout — see usage block at file top |
| `combobox.tsx`   | Base UI combobox compound API — see usage block at file top       |
| `chart.tsx`      | Recharts wrapper — lazy-load in demos                             |
| `sidebar.tsx`    | App shell sidebar with mobile sheet                               |

## Adding a component

```bash
npx shadcn@latest add <component>
```

Then verify in `/components` gallery: add entry to `gallery-registry.ts` and a demo in `gallery-demos.tsx` (lazy-load heavy deps).

Do not edit generated Radix primitives heavily — wrap in `src/components/showcase/` if you need product-specific chrome.
