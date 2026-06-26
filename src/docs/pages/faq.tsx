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
import { codecanyonLicenses } from "@/lib/pricing"
import type { DocTocItem } from "@/docs/types"

export const faqToc: DocTocItem[] = [
  { id: "general", title: "General", level: 2 },
  { id: "theming-issues", title: "Theming issues", level: 2 },
  { id: "build-errors", title: "Build errors", level: 2 },
  { id: "runtime-issues", title: "Runtime issues", level: 2 },
  { id: "licensing", title: "Licensing", level: 2 },
]

export function FaqPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <Badge variant="outline">Support</Badge>
        <DocH1>FAQ & troubleshooting</DocH1>
        <DocP>
          Common questions from buyers and CodeCanyon reviewers, plus fixes for issues
          you might hit during setup or customization.
        </DocP>
      </header>

      <section className="space-y-6">
        <DocH2 id="general">General</DocH2>

        <div className="space-y-2">
          <DocH3 id="what-is-included">What is included in the purchase?</DocH3>
          <DocP>
            Full Next.js source, 10 themes, 50+ components, 62 blocks, 9 demo pages,
            component gallery, block browser, marketing homepage, and this
            documentation. Lifetime updates via CodeCanyon downloads.
          </DocP>
        </div>

        <div className="space-y-2">
          <DocH3 id="can-i-use-multiple-themes">
            Can I use multiple themes in one app?
          </DocH3>
          <DocP>
            Yes. One <DocInlineCode>data-theme</DocInlineCode> is active at a time
            globally. Let users pick a theme, or assign themes per tenant/workspace by
            switching the attribute when context changes.
          </DocP>
        </div>

        <div className="space-y-2">
          <DocH3 id="remove-demo-routes">Can I remove demo routes?</DocH3>
          <DocP>
            Yes. Delete <DocInlineCode>src/app/preview</DocInlineCode>,{" "}
            <DocInlineCode>src/app/components</DocInlineCode>,{" "}
            <DocInlineCode>src/app/blocks</DocInlineCode>, and related showcase folders
            if you only need the theme engine and components. Keep{" "}
            <DocInlineCode>themes/</DocInlineCode>,{" "}
            <DocInlineCode>components/ui/</DocInlineCode>, and{" "}
            <DocInlineCode>styles/globals.css</DocInlineCode>.
          </DocP>
        </div>
      </section>

      <section className="space-y-6">
        <DocH2 id="theming-issues">Theming issues</DocH2>

        <div className="space-y-2">
          <DocH3 id="theme-not-applying">Theme not applying</DocH3>
          <DocUl>
            <li>
              Confirm <DocInlineCode>data-theme</DocInlineCode> on{" "}
              <DocInlineCode>&lt;html&gt;</DocInlineCode> matches a registered id
            </li>
            <li>
              Check the theme&apos;s <DocInlineCode>tokens.css</DocInlineCode> is
              imported in <DocInlineCode>globals.css</DocInlineCode>
            </li>
            <li>
              Ensure components use semantic classes (
              <DocInlineCode>bg-primary</DocInlineCode>), not hardcoded hex
            </li>
            <li>
              Clear localStorage key <DocInlineCode>decathemes-theme-id</DocInlineCode>{" "}
              if stuck on an invalid value
            </li>
          </DocUl>
        </div>

        <div className="space-y-2">
          <DocH3 id="dark-mode-wrong">Dark mode looks wrong</DocH3>
          <DocP>
            Dark tokens require <strong>both</strong>{" "}
            <DocInlineCode>.dark</DocInlineCode> on html and a valid{" "}
            <DocInlineCode>data-theme</DocInlineCode>. Verify your theme file has a{" "}
            <DocInlineCode>[data-theme=&quot;…&quot;].dark</DocInlineCode> block with
            all variables defined — not just colors copied from light mode.
          </DocP>
        </div>

        <div className="space-y-2">
          <DocH3 id="flash-wrong-theme">Flash of wrong theme on load</DocH3>
          <DocP>
            The inline script in <DocInlineCode>layout.tsx</DocInlineCode> reads
            localStorage before paint. Ensure{" "}
            <DocInlineCode>suppressHydrationWarning</DocInlineCode> is on{" "}
            <DocInlineCode>&lt;html&gt;</DocInlineCode> and the script runs in{" "}
            <DocInlineCode>&lt;head&gt;</DocInlineCode>.
          </DocP>
        </div>
      </section>

      <section className="space-y-6">
        <DocH2 id="build-errors">Build errors</DocH2>

        <div className="space-y-2">
          <DocH3 id="module-not-found">Module not found (@/…)</DocH3>
          <DocP>
            Check <DocInlineCode>tsconfig.json</DocInlineCode> paths map{" "}
            <DocInlineCode>@/*</DocInlineCode> to <DocInlineCode>./src/*</DocInlineCode>
            . Restart the dev server after changing paths.
          </DocP>
        </div>

        <div className="space-y-2">
          <DocH3 id="shadcn-style-mismatch">shadcn component looks unstyled</DocH3>
          <DocP>
            New components must use CSS variables. Confirm{" "}
            <DocInlineCode>components.json</DocInlineCode> has{" "}
            <DocInlineCode>&quot;cssVariables&quot;: true</DocInlineCode> and style{" "}
            <DocInlineCode>new-york</DocInlineCode>. Re-add with:{" "}
            <DocInlineCode>npx shadcn@latest add button -o</DocInlineCode>
          </DocP>
        </div>

        <div className="space-y-2">
          <DocH3 id="recharts-ssr">Recharts / window is not defined</DocH3>
          <DocP>
            Chart blocks use <DocInlineCode>&quot;use client&quot;</DocInlineCode>.
            Import chart components only in client components or dynamic import with{" "}
            <DocInlineCode>ssr: false</DocInlineCode>.
          </DocP>
        </div>
      </section>

      <section className="space-y-6">
        <DocH2 id="runtime-issues">Runtime issues</DocH2>

        <div className="space-y-2">
          <DocH3 id="hydration-mismatch">Hydration mismatch warnings</DocH3>
          <DocP>
            Usually caused by theme/color mode differing between server and client. The
            root layout uses <DocInlineCode>suppressHydrationWarning</DocInlineCode> on
            html for this reason. Avoid rendering theme-dependent text on the server
            without matching client defaults.
          </DocP>
        </div>

        <div className="space-y-2">
          <DocH3 id="fonts-not-loading">Fonts not loading</DocH3>
          <DocP>
            Verify <DocInlineCode>fontVariables</DocInlineCode> from{" "}
            <DocInlineCode>src/lib/fonts.ts</DocInlineCode> is on the html className in
            layout.tsx. Theme tokens must reference{" "}
            <DocInlineCode>var(--font-inter)</DocInlineCode> etc., not raw font names.
          </DocP>
        </div>

        <div className="space-y-2">
          <DocH3 id="sidebar-layout">Sidebar layout broken on mobile</DocH3>
          <DocP>
            App shell blocks use shadcn Sidebar with{" "}
            <DocInlineCode>SidebarProvider</DocInlineCode>. Wrap once at layout level;
            use <DocInlineCode>SidebarTrigger</DocInlineCode> for the mobile sheet. See{" "}
            <DocInlineCode>demo-app-shell.tsx</DocInlineCode>.
          </DocP>
        </div>
      </section>

      <section className="space-y-6">
        <DocH2 id="licensing">Licensing</DocH2>
        <DocP>
          Decathemes is sold under Envato Market licenses. shadcn/ui components are MIT
          licensed. Use Regular License ({codecanyonLicenses.regular.price}) for free end
          products; Extended ({codecanyonLicenses.extended.price}) when charging end
          users. One license per end product. See{" "}
          <DocLink href="/#pricing">pricing on the homepage</DocLink> and Envato&apos;s
          license FAQ for details.
        </DocP>
        <DocCallout variant="note">
          For item support after purchase, use the CodeCanyon comments tab or your
          author support channel. Include Node version, error messages, and steps to
          reproduce.
        </DocCallout>
      </section>
    </article>
  )
}
