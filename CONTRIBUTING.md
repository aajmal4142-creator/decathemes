# Contributing to Decathemes

Thank you for improving Decathemes. This project targets **CodeCanyon buyers** and **production teams** — every change should keep type safety, accessibility, and bundle size in mind.

## Prerequisites

- **Node.js 20+**
- npm (pnpm/yarn also work)

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Quality gate (required before PR / release)

All of the following must pass:

```bash
npm run typecheck   # TypeScript strict + noUncheckedIndexedAccess + exactOptionalPropertyTypes
npm run lint        # ESLint (import order, a11y, unused imports, react-hooks)
npm run format:check
npm run build
```

Optional:

```bash
npm run analyze     # Bundle analyzer (ANALYZE=true production build)
npm run audit:contrast
```

## Workflow

1. Create a branch from `main`.
2. Make focused changes — one concern per commit when possible.
3. Run the quality gate locally.
4. Update `CHANGELOG.md` for user-visible changes.
5. Open a PR with screenshots for UI changes.

## What we merge

- Bug fixes with clear reproduction steps
- Accessibility improvements (WCAG 2.1 AA)
- Performance wins with measured impact (`npm run analyze`)
- Documentation and demo realism improvements
- Theme token fixes with contrast audit passing

## What we avoid

- New dependencies without justification
- `any` types (use `unknown` + narrowing)
- Deep relative imports (`../../../`) — use `@/` aliases
- Breaking changes to theme IDs or public block APIs without a major version note

## Project layout

See [CODE-STANDARDS.md](./CODE-STANDARDS.md) for naming, server vs client components, and token conventions.

## Questions

Open an issue or contact via CodeCanyon item comments for licensed buyers.
