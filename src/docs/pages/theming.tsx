import {
  DocCallout,
  DocH1,
  DocH2,
  DocH3,
  DocInlineCode,
  DocLink,
  DocOl,
  DocP,
  DocPre,
  DocRouteLink,
  DocTable,
  DocUl,
} from "@/components/docs/doc-elements"
import { Badge } from "@/components/ui/badge"
import type { DocTocItem } from "@/docs/types"
import { themes } from "@/themes/_registry"

export const themingToc: DocTocItem[] = [
  { id: "how-it-works", title: "How data-theme works", level: 2 },
  { id: "theme-ids", title: "Built-in theme IDs", level: 2 },
  { id: "light-and-dark", title: "Light and dark mode", level: 2 },
  { id: "tailwind-mapping", title: "Tailwind mapping", level: 2 },
  { id: "editing-a-theme", title: "Editing an existing theme", level: 2 },
  { id: "token-reference", title: "Token reference", level: 2 },
  { id: "color-tokens", title: "Color tokens", level: 3 },
  { id: "layout-tokens", title: "Layout tokens", level: 3 },
]

const colorTokenRows = [
  ["--background", "Page background", "bg-background"],
  ["--foreground", "Default text", "text-foreground"],
  ["--card", "Card surfaces", "bg-card"],
  ["--card-foreground", "Card text", "text-card-foreground"],
  ["--popover", "Popover/dropdown bg", "bg-popover"],
  ["--popover-foreground", "Popover text", "text-popover-foreground"],
  ["--primary", "Primary actions", "bg-primary"],
  ["--primary-foreground", "Text on primary", "text-primary-foreground"],
  ["--secondary", "Secondary surfaces", "bg-secondary"],
  ["--secondary-foreground", "Secondary text", "text-secondary-foreground"],
  ["--muted", "Muted backgrounds", "bg-muted"],
  ["--muted-foreground", "Subdued text", "text-muted-foreground"],
  ["--accent", "Hover/accent fills", "bg-accent"],
  ["--accent-foreground", "Accent text", "text-accent-foreground"],
  ["--destructive", "Errors/destructive", "bg-destructive"],
  ["--destructive-foreground", "On destructive", "text-destructive-foreground"],
  ["--border", "Borders", "border-border"],
  ["--input", "Input borders", "border-input"],
  ["--ring", "Focus rings", "ring-ring"],
  ["--chart-1 … --chart-5", "Recharts series", "var(--chart-1)"],
  ["--sidebar", "Sidebar background", "bg-sidebar"],
  ["--sidebar-foreground", "Sidebar text", "text-sidebar-foreground"],
  ["--sidebar-primary", "Sidebar active item", "bg-sidebar-primary"],
  ["--sidebar-border", "Sidebar dividers", "border-sidebar-border"],
]

const layoutTokenRows = [
  ["--radius", "Base border radius", "rounded-lg uses --radius-lg"],
  ["--font-sans-family", "Body font stack", "font-sans"],
  ["--font-heading-family", "Headings", "font-heading"],
  ["--font-mono-family", "Code blocks", "font-mono"],
  ["--font-serif-family", "Serif override", "font-serif"],
  ["--shadow-xs … --shadow-xl", "Elevation scale", "shadow-md"],
  ["--spacing-unit", "Base spacing multiplier", "p-theme-4, gap-theme-6"],
  ["--spacing-1 … --spacing-16", "Named spacing steps", "theme-relative padding"],
]

const providerStructureCode = [
  '<NextThemesProvider attribute="class" defaultTheme="system" enableSystem>',
  "  <ThemeIdManager>{/* three split contexts */}{children}</ThemeIdManager>",
  "</NextThemesProvider>",
].join("\n")

export function ThemingPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <Badge variant="outline">Theming</Badge>
        <DocH1>Theming guide</DocH1>
        <DocP>
          Decathemes uses CSS custom properties scoped under{" "}
          <DocInlineCode>data-theme</DocInlineCode>. Components never hardcode colors —
          they consume Tailwind utilities that resolve to theme tokens. Change the
          tokens, change the product.
        </DocP>
      </header>

      <section className="space-y-4">
        <DocH2 id="how-it-works">How data-theme works</DocH2>
        <DocP>
          Each theme is a <DocInlineCode>tokens.css</DocInlineCode> file with two
          selectors: a light set under{" "}
          <DocInlineCode>[data-theme=&quot;minimal&quot;]</DocInlineCode> and a dark set
          under <DocInlineCode>[data-theme=&quot;minimal&quot;].dark</DocInlineCode>.
          When the <DocInlineCode>data-theme</DocInlineCode> attribute on{" "}
          <DocInlineCode>&lt;html&gt;</DocInlineCode> matches, those variables become
          active.
        </DocP>
        <DocPre title="Activation flow">{`1. layout.tsx sets data-theme on <html> (with localStorage anti-flash script)
2. ThemeProvider calls applyThemeId() on change → updates data-theme
3. next-themes toggles .dark class for color mode
4. globals.css @theme inline maps --primary → Tailwind bg-primary
5. Components use bg-primary, text-muted-foreground, etc.`}</DocPre>
        <DocCallout variant="note" title="No runtime CSS-in-JS">
          Themes are plain CSS. No JavaScript bundle cost per theme, no
          styled-components layer. This keeps builds fast and makes customization
          predictable.
        </DocCallout>
      </section>

      <section className="space-y-4">
        <DocH2 id="theme-ids">Built-in theme IDs</DocH2>
        <DocP>
          Valid values for <DocInlineCode>data-theme</DocInlineCode>:
        </DocP>
        <DocUl>
          {themes.map((theme) => (
            <li key={theme.id}>
              <DocInlineCode>{theme.id}</DocInlineCode> — {theme.name}:{" "}
              {theme.description}
            </li>
          ))}
        </DocUl>
      </section>

      <section className="space-y-4">
        <DocH2 id="light-and-dark">Light and dark mode</DocH2>
        <DocP>
          Color mode is handled by <DocInlineCode>next-themes</DocInlineCode>, which
          adds or removes the <DocInlineCode>.dark</DocInlineCode> class on{" "}
          <DocInlineCode>&lt;html&gt;</DocInlineCode>. Dark tokens are defined as{" "}
          <DocInlineCode>[data-theme=&quot;…&quot;].dark</DocInlineCode> — both
          selectors must match for dark variables to apply.
        </DocP>
        <DocPre title="Theme hooks">{`import {
  useThemeId,        // { themeId, setThemeId, themes }
  useActiveThemeId,  // string only — decorative effects
  useThemeTweaks,    // radius / font overrides
  useThemeAutoCycle, // hero auto-cycle toggle
} from "@/components/showcase/theme-provider"`}</DocPre>
        <DocPre title="Provider structure (simplified)">{providerStructureCode}</DocPre>
        <DocP>
          Users can pick light, dark, or system via the theme switcher. The active theme
          id and color mode are persisted separately in{" "}
          <DocInlineCode>localStorage</DocInlineCode>.
        </DocP>
      </section>

      <section className="space-y-4">
        <DocH2 id="tailwind-mapping">Tailwind mapping</DocH2>
        <DocP>
          <DocInlineCode>src/styles/globals.css</DocInlineCode> uses Tailwind v4{" "}
          <DocInlineCode>@theme inline</DocInlineCode> to expose tokens as utilities:
        </DocP>
        <DocPre title="globals.css (excerpt)">{`@theme inline {
  --color-primary: var(--primary);
  --color-background: var(--background);
  --radius-lg: var(--radius);
  --font-heading: var(--font-heading-family);
  --spacing-theme-4: var(--spacing-4);
}`}</DocPre>
        <DocP>
          Use semantic classes in components:{" "}
          <DocInlineCode>bg-background</DocInlineCode>,{" "}
          <DocInlineCode>text-muted-foreground</DocInlineCode>,{" "}
          <DocInlineCode>border-border</DocInlineCode>. Avoid raw hex values in JSX so
          themes can restyle everything.
        </DocP>
      </section>

      <section className="space-y-4">
        <DocH2 id="editing-a-theme">Editing an existing theme</DocH2>
        <DocOl>
          <li>
            Open <DocInlineCode>src/themes/&lt;id&gt;/tokens.css</DocInlineCode>
          </li>
          <li>Adjust OKLCH values in the light block first</li>
          <li>
            Mirror changes in the <DocInlineCode>.dark</DocInlineCode> block
          </li>
          <li>
            Tweak <DocInlineCode>--radius</DocInlineCode>, font families, shadows, and{" "}
            <DocInlineCode>--spacing-unit</DocInlineCode> for personality
          </li>
          <li>
            Preview at <DocRouteLink href="/preview" label="Live preview hub" /> with the
            theme switcher or <DocInlineCode>?theme=&lt;id&gt;</DocInlineCode>
          </li>
        </DocOl>
        <DocCallout variant="tip">
          OKLCH is used throughout for perceptually uniform lightness. Tools like{" "}
          <DocLink href="https://oklch.com">oklch.com</DocLink> help you pick accessible
          pairs. Aim for 4.5:1 contrast on body text.
        </DocCallout>
      </section>

      <section className="space-y-6">
        <DocH2 id="token-reference">Token reference</DocH2>
        <DocP>
          Every theme must define all tokens below. Missing variables fall back
          unpredictably across browsers.
        </DocP>

        <DocH3 id="color-tokens">Color tokens</DocH3>
        <DocTable
          headers={["CSS variable", "Purpose", "Tailwind usage"]}
          rows={colorTokenRows}
        />

        <DocH3 id="layout-tokens">Layout tokens</DocH3>
        <DocTable
          headers={["CSS variable", "Purpose", "Tailwind usage"]}
          rows={layoutTokenRows}
        />
      </section>
    </article>
  )
}
