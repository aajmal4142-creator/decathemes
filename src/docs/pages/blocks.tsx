import {
  DocCallout,
  DocH1,
  DocH2,
  DocInlineCode,
  DocLink,
  DocOl,
  DocP,
  DocPre,
  DocUl,
} from "@/components/docs/doc-elements"
import { Badge } from "@/components/ui/badge"
import type { DocTocItem } from "@/docs/types"

export const blocksToc: DocTocItem[] = [
  { id: "overview", title: "What blocks are", level: 2 },
  { id: "browse", title: "Browse the library", level: 2 },
  { id: "copy-a-block", title: "Copy a block", level: 2 },
  { id: "customize", title: "Customize a block", level: 2 },
  { id: "categories", title: "Block categories", level: 2 },
  { id: "compose-pages", title: "Compose full pages", level: 2 },
]

export function BlocksPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <Badge variant="outline">Blocks</Badge>
        <DocH1>Using blocks</DocH1>
        <DocP>
          Blocks are pre-built page sections in{" "}
          <DocInlineCode>src/components/blocks/</DocInlineCode> — heroes, pricing
          tables, auth forms, dashboard shells, product grids, and more. They compose{" "}
          <DocInlineCode>ui/</DocInlineCode> primitives into copy-paste-ready layouts
          that respect the active theme.
        </DocP>
      </header>

      <section className="space-y-4">
        <DocH2 id="overview">What blocks are</DocH2>
        <DocP>
          Each block is a standard React component exported from a category file (e.g.{" "}
          <DocInlineCode>marketing/hero.tsx</DocInlineCode>). Blocks are not a separate
          framework — they are source files you own and can edit freely. There are 62
          variants across five categories.
        </DocP>
        <DocCallout variant="note">
          Blocks use only <DocInlineCode>components/ui</DocInlineCode> and theme tokens.
          No block-specific CSS files. Switch themes and blocks restyle with everything
          else.
        </DocCallout>
      </section>

      <section className="space-y-4">
        <DocH2 id="browse">Browse the library</DocH2>
        <DocP>
          Open <DocLink href="/blocks">/blocks</DocLink> to preview every block with the
          live theme switcher. Filter by category, search by name, or press ⌘F to jump.
          Each card has a <strong>Copy code</strong> button that copies an import
          snippet.
        </DocP>
      </section>

      <section className="space-y-4">
        <DocH2 id="copy-a-block">Copy a block</DocH2>
        <DocP>Typical workflow:</DocP>
        <DocOl>
          <li>Find a block in the library (e.g. Hero — Centered)</li>
          <li>
            Click <strong>Copy code</strong>
          </li>
          <li>Paste into your page file</li>
          <li>Adjust copy, links, and images</li>
        </DocOl>
        <DocPre title="Copied snippet">{`import { HeroCentered } from "@/components/blocks/marketing/hero"

export default function Page() {
  return <HeroCentered />
}`}</DocPre>
        <DocP>
          For multiple blocks on one page, import each and stack them — see{" "}
          <DocInlineCode>src/components/demo/pages/landing-demo.tsx</DocInlineCode> for
          a full marketing page composition.
        </DocP>
      </section>

      <section className="space-y-4">
        <DocH2 id="customize">Customize a block</DocH2>
        <DocP>Recommended approaches, in order of invasiveness:</DocP>
        <DocUl>
          <li>
            <strong>Edit in place</strong> — Open the block file and change text, icons,
            or layout. Fastest for one-off projects.
          </li>
          <li>
            <strong>Fork to your app</strong> — Copy the component into{" "}
            <DocInlineCode>src/components/</DocInlineCode> and rename. Keeps blocks/
            pristine for updates.
          </li>
          <li>
            <strong>Extract props</strong> — Add optional props for headline, CTA href,
            etc. Best when reusing the same block with different content.
          </li>
        </DocUl>
        <DocPre title="Adding props (example)">{`export function HeroCentered({
  title = "Ship beautiful themes in hours, not weeks",
  ctaHref = "#get-started",
}: {
  title?: string
  ctaHref?: string
}) {
  // use title and ctaHref in JSX
}`}</DocPre>
      </section>

      <section className="space-y-4">
        <DocH2 id="categories">Block categories</DocH2>
        <DocUl>
          <li>
            <DocInlineCode>marketing/</DocInlineCode> — Navbar, hero, features, pricing,
            FAQ, footer (24 variants)
          </li>
          <li>
            <DocInlineCode>auth/</DocInlineCode> — Login, signup, OTP, two-column auth
            (10 variants)
          </li>
          <li>
            <DocInlineCode>application/</DocInlineCode> — App shell, charts, data table,
            settings (15 variants)
          </li>
          <li>
            <DocInlineCode>commerce/</DocInlineCode> — Product grid, detail, cart,
            checkout (7 variants)
          </li>
          <li>
            <DocInlineCode>content/</DocInlineCode> — Blog list, post, docs layout (6
            variants)
          </li>
        </DocUl>
        <DocP>
          Registry metadata lives in{" "}
          <DocInlineCode>src/components/blocks/_registry.ts</DocInlineCode> for the
          blocks browser. Add entries when you create new blocks.
        </DocP>
      </section>

      <section className="space-y-4">
        <DocH2 id="compose-pages">Compose full pages</DocH2>
        <DocP>
          Demo pages in <DocInlineCode>src/components/demo/pages/</DocInlineCode> show
          how blocks stitch into real products. The landing demo combines:
        </DocP>
        <DocPre>{`NavbarWithCta → HeroGradient → LogoCloud → FeatureGridBento
→ PricingThreeTier → TestimonialCards → FaqAccordion → CtaCentered → FooterColumns`}</DocPre>
        <DocP>
          View the result at <DocLink href="/preview/landing">/preview/landing</DocLink>{" "}
          or read the source to replicate in your own routes.
        </DocP>
      </section>
    </article>
  )
}
