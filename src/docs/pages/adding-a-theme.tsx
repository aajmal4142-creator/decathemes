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
  DocUl,
} from "@/components/docs/doc-elements"
import { Badge } from "@/components/ui/badge"
import type { DocTocItem } from "@/docs/types"

export const addingThemeToc: DocTocItem[] = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "step-by-step", title: "Step-by-step", level: 2 },
  { id: "step-1", title: "1. Create tokens.css", level: 3 },
  { id: "step-2", title: "2. Register the theme", level: 3 },
  { id: "step-3", title: "3. Import in globals", level: 3 },
  { id: "step-4", title: "4. Verify", level: 3 },
  { id: "template", title: "Copy-paste template", level: 2 },
  { id: "checklist", title: "Quality checklist", level: 2 },
]

const templateContent = `[data-theme="mytheme"] {
  --background: oklch(0.99 0 0);
  --foreground: oklch(0.2 0 0);
  /* … full light token set — see src/docs/templates/new-theme.tokens.css */
}

[data-theme="mytheme"].dark {
  --background: oklch(0.14 0.01 250);
  --foreground: oklch(0.96 0 0);
  /* … full dark token set */
}`

const registrySnippet = `{
  id: "mytheme",
  name: "My Theme",
  description: "Short description for switcher and docs.",
  tags: ["saas", "startup"],
  vibes: ["modern", "clean"],
  previewColor: "#6366f1",
  previewGradient: "linear-gradient(135deg, #c4b5fd 0%, #6366f1 50%, #1e1b4b 100%)",
}`

export function AddingThemePage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <Badge variant="outline">Theming</Badge>
        <DocH1>Adding a new theme</DocH1>
        <DocP>
          Adding an eleventh theme takes about 30 minutes if you start from the
          template. No JavaScript changes are required — only CSS and a registry entry.
        </DocP>
      </header>

      <section className="space-y-4">
        <DocH2 id="overview">Overview</DocH2>
        <DocP>
          A theme is three artifacts: a token file, a registry entry, and an import in{" "}
          <DocInlineCode>globals.css</DocInlineCode>. The theme switcher, preview hub,
          and marketing grid read from <DocInlineCode>_registry.ts</DocInlineCode>{" "}
          automatically.
        </DocP>
      </section>

      <section className="space-y-4">
        <DocH2 id="step-by-step">Step-by-step</DocH2>

        <DocH3 id="step-1">1. Create tokens.css</DocH3>
        <DocP>
          Create a folder <DocInlineCode>src/themes/mytheme/</DocInlineCode> and add{" "}
          <DocInlineCode>tokens.css</DocInlineCode>. Copy the full template from{" "}
          <DocInlineCode>src/docs/templates/new-theme.tokens.css</DocInlineCode> in the
          package — it includes every required variable with comments.
        </DocP>
        <DocPre title="src/themes/mytheme/tokens.css">{templateContent}</DocPre>
        <DocCallout variant="warning" title="Theme id rules">
          Use lowercase letters, numbers, and hyphens only. The id must match exactly in
          CSS selectors, registry, and <DocInlineCode>data-theme</DocInlineCode>.
        </DocCallout>

        <DocH3 id="step-2">2. Register the theme</DocH3>
        <DocP>
          Add an entry to the <DocInlineCode>themes</DocInlineCode> array in{" "}
          <DocInlineCode>src/themes/_registry.ts</DocInlineCode>:
        </DocP>
        <DocPre title="src/themes/_registry.ts">{registrySnippet}</DocPre>
        <DocP>
          <DocInlineCode>previewGradient</DocInlineCode> powers marketing cards and the
          homepage theme grid. <DocInlineCode>previewColor</DocInlineCode> is used for
          accent glows.
        </DocP>

        <DocH3 id="step-3">3. Import in globals</DocH3>
        <DocP>
          Add one line to <DocInlineCode>src/styles/globals.css</DocInlineCode>{" "}
          alongside the other theme imports:
        </DocP>
        <DocPre title="globals.css">{`@import "../themes/mytheme/tokens.css";`}</DocPre>

        <DocH3 id="step-4">4. Verify</DocH3>
        <DocOl>
          <li>
            Run <DocInlineCode>npm run dev</DocInlineCode>
          </li>
          <li>
            Open the <DocRouteLink href="/preview" label="live preview hub" /> and select
            your theme from the switcher (⌘K)
          </li>
          <li>Toggle light and dark — both blocks must look intentional</li>
          <li>Check sidebar blocks, charts, and forms for contrast issues</li>
          <li>
            Run <DocInlineCode>npm run build</DocInlineCode> to confirm no errors
          </li>
        </DocOl>
      </section>

      <section className="space-y-4">
        <DocH2 id="template">Copy-paste template</DocH2>
        <DocP>
          The complete starter file lives at{" "}
          <DocInlineCode>src/docs/templates/new-theme.tokens.css</DocInlineCode>. It
          mirrors the structure of the built-in <DocInlineCode>minimal</DocInlineCode>{" "}
          theme with placeholder OKLCH values you can customize.
        </DocP>
        <DocPre title="Full file path">{`src/docs/templates/new-theme.tokens.css`}</DocPre>
        <DocP>
          Duplicate it, rename <DocInlineCode>mytheme</DocInlineCode> to your id in both
          selectors, and move to{" "}
          <DocInlineCode>src/themes/&lt;your-id&gt;/tokens.css</DocInlineCode>.
        </DocP>
      </section>

      <section className="space-y-4">
        <DocH2 id="checklist">Quality checklist</DocH2>
        <DocUl>
          <li>All 40+ color tokens defined in light and dark</li>
          <li>Primary/foreground pairs pass WCAG AA on buttons</li>
          <li>Sidebar tokens differ subtly from main background</li>
          <li>Chart colors are distinguishable in both modes</li>
          <li>Border uses transparency in dark mode (e.g. oklch(1 0 0 / 12%))</li>
          <li>Shadows deepen in dark mode</li>
          <li>Font families reference loaded next/font variables</li>
        </DocUl>
      </section>
    </article>
  )
}
