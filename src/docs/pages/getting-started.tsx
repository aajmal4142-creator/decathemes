import {
  DocCallout,
  DocH1,
  DocH2,
  DocH3,
  DocInlineCode,
  DocLink,
  DocP,
  DocPre,
  DocRouteLink,
  DocUl,
} from "@/components/docs/doc-elements"
import { Badge } from "@/components/ui/badge"
import type { DocTocItem } from "@/docs/types"

export const gettingStartedToc: DocTocItem[] = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "requirements", title: "Requirements", level: 2 },
  { id: "installation", title: "Installation", level: 2 },
  { id: "run-locally", title: "Run locally", level: 3 },
  { id: "production-build", title: "Production build", level: 3 },
  { id: "project-structure", title: "Project structure", level: 2 },
  { id: "key-files", title: "Key files", level: 3 },
  { id: "first-theme-switch", title: "Your first theme switch", level: 2 },
  { id: "explore-the-product", title: "Explore the product", level: 2 },
]

export function GettingStartedPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <Badge variant="outline">Getting started</Badge>
        <DocH1>Getting started</DocH1>
        <DocP>
          Decathemes is a Next.js 16 starter bundled with 10 production-ready UI themes,
          50+ shadcn/ui components, 62 copy-paste page blocks, and nine full demo pages.
          This guide walks you from unzip to your first theme switch in under five
          minutes.
        </DocP>
      </header>

      <section className="space-y-4">
        <DocH2 id="overview">Overview</DocH2>
        <DocP>
          Unlike a Figma kit or a loose component dump, Decathemes is a working
          application. The theme engine maps design tokens to Tailwind via CSS variables
          — set <DocInlineCode>data-theme=&quot;glass&quot;</DocInlineCode> on{" "}
          <DocInlineCode>&lt;html&gt;</DocInlineCode> and every component, block, and
          demo page restyles instantly. Light and dark mode are independent per theme.
        </DocP>
        <DocCallout variant="tip" title="CodeCanyon reviewers">
          Use <DocRouteLink href="/preview" label="Live preview hub" /> as the live demo
          link. The marketing homepage at{" "}
          <DocRouteLink href="/" label="Homepage" /> is the product landing page buyers
          see before purchase.
        </DocCallout>
      </section>

      <section className="space-y-4">
        <DocH2 id="requirements">Requirements</DocH2>
        <DocUl>
          <li>Node.js 20 or later (LTS recommended)</li>
          <li>npm 10+, pnpm 9+, or yarn 1.22+</li>
          <li>Next.js 16.2+ (included in package.json)</li>
          <li>React 19 (included)</li>
          <li>Tailwind CSS v4 (included)</li>
        </DocUl>
      </section>

      <section className="space-y-4">
        <DocH2 id="installation">Installation</DocH2>
        <DocP>
          Extract the archive, open a terminal in the project root, and install
          dependencies:
        </DocP>
        <DocPre title="Terminal">{`cd decathemes
npm install`}</DocPre>
        <DocP>
          If you use pnpm or yarn, run the equivalent install command. All dependencies
          are declared in <DocInlineCode>package.json</DocInlineCode> — no global CLI
          tools are required beyond Node.
        </DocP>

        <DocH3 id="run-locally">Run locally</DocH3>
        <DocPre title="Terminal">{`npm run dev`}</DocPre>
        <DocP>
          Open <DocInlineCode>http://localhost:3000</DocInlineCode>. The dev server uses
          Turbopack by default on Next.js 16. Hot reload applies to components, themes,
          and documentation changes.
        </DocP>

        <DocH3 id="production-build">Production build</DocH3>
        <DocPre title="Terminal">{`npm run build
npm run start`}</DocPre>
        <DocP>
          Run <DocInlineCode>npm run build</DocInlineCode> before deploying or
          submitting for review. The build must complete without TypeScript or ESLint
          errors. See the <DocLink href="/docs/deployment">deployment guide</DocLink>{" "}
          for platform-specific steps.
        </DocP>
      </section>

      <section className="space-y-4">
        <DocH2 id="project-structure">Project structure</DocH2>
        <DocPre title="src/">{`src/
├── app/                    # Next.js App Router routes
│   ├── page.tsx            # Marketing homepage
│   ├── preview/            # Live demo hub (9 full pages)
│   ├── components/         # Component gallery
│   ├── blocks/             # Block library browser
│   └── docs/               # This documentation
├── components/
│   ├── ui/                 # shadcn/ui primitives (theme-agnostic)
│   ├── blocks/             # 62 copy-paste page sections
│   ├── showcase/           # Theme switcher, providers, galleries
│   ├── demo/               # Composed demo pages for /preview
│   └── marketing/          # Product homepage sections
├── themes/
│   ├── _registry.ts        # Theme metadata (id, name, tags)
│   └── &lt;theme-id&gt;/
│       └── tokens.css      # Full light + dark token set
├── hooks/                  # useMounted, useShowcaseCatalog, …
├── lib/
│   ├── theme.ts            # Theme id persistence
│   ├── theme-tweaks.ts     # Radius & font overrides
│   ├── fonts-core.ts       # Preloaded next/font variables
│   └── fonts-extended.ts   # Deferred per-theme fonts
└── styles/
    └── globals.css         # Tailwind entry + @theme inline mapping`}</DocPre>

        <DocH3 id="key-files">Key files</DocH3>
        <DocUl>
          <li>
            <DocInlineCode>src/app/layout.tsx</DocInlineCode> — Root layout with{" "}
            <DocInlineCode>AppProviders</DocInlineCode>, font variables, and anti-flash
            theme script
          </li>
          <li>
            <DocInlineCode>src/components/showcase/theme-provider.tsx</DocInlineCode> —
            Split contexts for theme id, tweaks, and auto-cycle; combines with
            next-themes for light/dark
          </li>
          <li>
            <DocInlineCode>src/hooks/</DocInlineCode> — Shared client hooks (
            <DocInlineCode>useMounted</DocInlineCode>,{" "}
            <DocInlineCode>useShowcaseCatalog</DocInlineCode>, …) — see{" "}
            <DocInlineCode>src/hooks/README.md</DocInlineCode>
          </li>
          <li>
            <DocInlineCode>src/components/layout/</DocInlineCode> —{" "}
            <DocInlineCode>Section</DocInlineCode>,{" "}
            <DocInlineCode>Container</DocInlineCode>,{" "}
            <DocInlineCode>PageHeader</DocInlineCode> layout primitives
          </li>
          <li>
            <DocInlineCode>src/styles/globals.css</DocInlineCode> — Imports all theme
            token files and maps CSS variables to Tailwind utilities
          </li>
          <li>
            <DocInlineCode>components.json</DocInlineCode> — shadcn/ui config (new-york
            style, CSS variables, @/ aliases)
          </li>
        </DocUl>
      </section>

      <section className="space-y-4">
        <DocH2 id="first-theme-switch">Your first theme switch</DocH2>
        <DocP>
          Wrap your app with <DocInlineCode>ThemeProvider</DocInlineCode> (already done
          in <DocInlineCode>AppProviders</DocInlineCode>). Then switch themes
          programmatically or via the built-in switcher:
        </DocP>
        <DocPre title="Example">{`import { useThemeId } from "@/components/showcase/theme-provider"

function ThemeButton() {
  const { themeId, setThemeId } = useThemeId()
  return (
    <button onClick={() => setThemeId("neon")}>
      Current: {themeId}
    </button>
  )
}`}</DocPre>
        <DocP>
          Prefer granular hooks to limit re-renders:{" "}
          <DocInlineCode>useActiveThemeId()</DocInlineCode> for read-only effects,{" "}
          <DocInlineCode>useThemeTweaks()</DocInlineCode> for radius/font overrides,{" "}
          <DocInlineCode>useThemeAutoCycle()</DocInlineCode> for the hero auto-cycle.
          <DocInlineCode>useDecathemes()</DocInlineCode> composes the full API.
        </DocP>
        <DocP>Or set the attribute directly for a static default:</DocP>
        <DocPre title="layout.tsx">{`<html lang="en" data-theme="corporate">`}</DocPre>
        <DocP>
          Read the full <DocLink href="/docs/theming">theming guide</DocLink> for token
          details and dark mode behavior.
        </DocP>
      </section>

      <section className="space-y-4">
        <DocH2 id="explore-the-product">Explore the product</DocH2>
        <DocUl>
          <li>
            <DocRouteLink href="/preview" label="Live preview hub" /> — Nine full demo
            pages with viewport switcher and theme bar
          </li>
          <li>
            <DocRouteLink href="/components" label="Component gallery" /> — Interactive
            gallery of every UI primitive
          </li>
          <li>
            <DocRouteLink href="/blocks" label="Block library" /> — 62 page blocks with
            copy code buttons
          </li>
          <li>
            <DocLink href="/docs/theming">Theming guide</DocLink> — How{" "}
            <DocInlineCode>data-theme</DocInlineCode> works under the hood
          </li>
        </DocUl>
      </section>
    </article>
  )
}
