# Page blocks (`src/components/blocks/`)

62 copy-paste **page sections** — marketing heroes, auth forms, dashboard widgets, commerce grids. Composed from `ui/` primitives.

## Layout

```
blocks/
├── _registry.ts           # Block metadata for /blocks browser
├── marketing/             # Heroes, pricing, testimonials, …
├── auth/                  # Sign-in, sign-up, OTP
├── application/           # Dashboard panels, charts, tables
├── commerce/              # Product grids, carts
└── content/               # Blog lists, article layouts
```

## Registry entry

Each block exports a component and is listed in `_registry.ts`:

```ts
{
  id: "stats-row",
  name: "Stats row",
  category: "marketing",
  description: "Animated KPI row",
  component: StatsRow,
}
```

## Adding a block

1. Create `src/components/blocks/<category>/<name>.tsx`.
2. Add metadata to `_registry.ts` (extends `CatalogEntry` from `@/types/catalog`).
3. Use `Section` + `Container` from `@/components/layout/` for consistent spacing.
4. Run `npm run add-block` for scaffold (optional).
5. Verify at `/blocks` — copy code button should export a self-contained snippet.

Blocks are **demos**, not a runtime framework — buyers copy the JSX into their own routes.
