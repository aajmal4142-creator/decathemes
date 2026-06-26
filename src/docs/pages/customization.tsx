import {
  DocCallout,
  DocH1,
  DocH2,
  DocH3,
  DocInlineCode,
  DocP,
  DocPre,
  DocUl,
} from "@/components/docs/doc-elements"
import { Badge } from "@/components/ui/badge"
import type { DocTocItem } from "@/docs/types"

export const customizationToc: DocTocItem[] = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "colors", title: "Changing colors", level: 2 },
  { id: "fonts", title: "Changing fonts", level: 2 },
  { id: "radius", title: "Border radius", level: 2 },
  { id: "runtime-tweaks", title: "Runtime tweaks", level: 2 },
  { id: "dark-mode", title: "Dark mode", level: 2 },
  { id: "transitions", title: "Theme transitions", level: 2 },
]

const darkModeProviderCode =
  '<NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>'

export function CustomizationPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <Badge variant="outline">Customization</Badge>
        <DocH1>Customization</DocH1>
        <DocP>
          Decathemes separates <em>theme identity</em> (colors, shadows, spacing per
          theme) from <em>runtime tweaks</em> (global radius and font overrides). Both
          layers are optional — use as much or as little as your product needs.
        </DocP>
      </header>

      <section className="space-y-4">
        <DocH2 id="overview">Overview</DocH2>
        <DocUl>
          <li>
            Theme tokens →{" "}
            <DocInlineCode>src/themes/&lt;id&gt;/tokens.css</DocInlineCode>
          </li>
          <li>
            Google fonts → <DocInlineCode>src/lib/fonts-core.ts</DocInlineCode> +{" "}
            <DocInlineCode>fonts-extended.ts</DocInlineCode>
          </li>
          <li>
            Runtime tweaks → <DocInlineCode>src/lib/theme-tweaks.ts</DocInlineCode>
          </li>
          <li>
            Theme + color mode → <DocInlineCode>ThemeProvider</DocInlineCode>
          </li>
        </DocUl>
      </section>

      <section className="space-y-4">
        <DocH2 id="colors">Changing colors</DocH2>
        <DocP>
          Edit OKLCH values in your theme&apos;s{" "}
          <DocInlineCode>tokens.css</DocInlineCode>. Components use semantic names, so
          changing <DocInlineCode>--primary</DocInlineCode> updates buttons, links, and
          focus rings everywhere.
        </DocP>
        <DocPre title="Example: warmer primary">{`--primary: oklch(0.55 0.18 45);
--primary-foreground: oklch(0.99 0 0);`}</DocPre>
        <DocP>
          Always update both light and dark blocks. Test contrast with the component
          gallery open in split view across themes.
        </DocP>
      </section>

      <section className="space-y-4">
        <DocH2 id="fonts">Changing fonts</DocH2>
        <DocP>
          Fonts load via <DocInlineCode>next/font/google</DocInlineCode> in{" "}
          <DocInlineCode>src/lib/fonts-core.ts</DocInlineCode> (critical path) and{" "}
          <DocInlineCode>fonts-extended.ts</DocInlineCode> (deferred theme fonts). Core
          variables are applied to <DocInlineCode>&lt;html&gt;</DocInlineCode> in
          layout.tsx.
        </DocP>
        <DocH3 id="per-theme-fonts">Per-theme fonts</DocH3>
        <DocP>Each theme sets font stacks in tokens.css:</DocP>
        <DocPre>{`--font-sans-family: var(--font-dm-sans), ui-sans-serif, sans-serif;
--font-heading-family: var(--font-outfit), var(--font-sans-family);
--font-serif-family: var(--font-source-serif), ui-serif, Georgia, serif;
--font-mono-family: var(--font-jetbrains-mono), ui-monospace, monospace;`}</DocPre>
        <DocP>
          To add a new font: import it in{" "}
          <DocInlineCode>fonts-extended.ts</DocInlineCode>, add the variable class to{" "}
          <DocInlineCode>themeFontVariableClasses</DocInlineCode>, then reference{" "}
          <DocInlineCode>var(--font-your-font)</DocInlineCode> in your theme tokens.
        </DocP>
      </section>

      <section className="space-y-4">
        <DocH2 id="radius">Border radius</DocH2>
        <DocP>
          Base radius is <DocInlineCode>--radius</DocInlineCode> per theme. Tailwind
          maps <DocInlineCode>rounded-lg</DocInlineCode> to scaled values (
          <DocInlineCode>--radius-lg</DocInlineCode>, etc.) in{" "}
          <DocInlineCode>globals.css</DocInlineCode>.
        </DocP>
        <DocUl>
          <li>
            <DocInlineCode>brutalist</DocInlineCode> uses{" "}
            <DocInlineCode>0</DocInlineCode> for sharp corners
          </li>
          <li>
            <DocInlineCode>playful</DocInlineCode> uses larger radius for soft UI
          </li>
          <li>
            Edit <DocInlineCode>--radius</DocInlineCode> in tokens.css to shift one
            theme
          </li>
        </DocUl>
      </section>

      <section className="space-y-4">
        <DocH2 id="runtime-tweaks">Runtime tweaks</DocH2>
        <DocP>The theme switcher exposes quick tweaks persisted in localStorage:</DocP>
        <DocUl>
          <li>
            <strong>Radius scale</strong> — default, compact (0.72×), round (1.45×)
          </li>
          <li>
            <strong>Font preference</strong> — default, sans, serif, mono
          </li>
        </DocUl>
        <DocP>
          Implementation: <DocInlineCode>applyThemeTweaks()</DocInlineCode> in{" "}
          <DocInlineCode>src/lib/theme-tweaks.ts</DocInlineCode> sets{" "}
          <DocInlineCode>data-radius-scale</DocInlineCode> and overrides{" "}
          <DocInlineCode>--radius</DocInlineCode> / font families on the fly.
        </DocP>
        <DocPre>{`import { useThemeTweaks } from "@/components/showcase/theme-provider"

const { tweaks, setTweaks } = useThemeTweaks()
setTweaks({ ...tweaks, radiusScale: "round" })`}</DocPre>
      </section>

      <section className="space-y-4">
        <DocH2 id="dark-mode">Dark mode</DocH2>
        <DocP>Set default color mode in ThemeProvider:</DocP>
        <DocPre>{darkModeProviderCode}</DocPre>
        <DocP>
          Force dark on marketing pages with{" "}
          <DocInlineCode>className=&quot;dark&quot;</DocInlineCode> on a wrapper (not
          recommended globally — prefer user choice). Every theme includes a complete{" "}
          <DocInlineCode>.dark</DocInlineCode> token block.
        </DocP>
      </section>

      <section className="space-y-4">
        <DocH2 id="transitions">Theme transitions</DocH2>
        <DocP>
          Add <DocInlineCode>transition-theme</DocInlineCode> to{" "}
          <DocInlineCode>&lt;html&gt;</DocInlineCode> for smooth color and radius
          changes when switching themes. Defined in{" "}
          <DocInlineCode>globals.css</DocInlineCode>:
        </DocP>
        <DocPre>{`html.transition-theme,
html.transition-theme * {
  transition-property: color, background-color, border-color, box-shadow, border-radius;
  transition-duration: 280ms;
}`}</DocPre>
        <DocCallout variant="tip">
          Toggle the class when the user picks a new theme in your UI for a polished
          demo effect. Remove it if you prefer instant switches in production.
        </DocCallout>
      </section>
    </article>
  )
}
