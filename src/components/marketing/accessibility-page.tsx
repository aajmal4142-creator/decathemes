"use client"

import Link from "next/link"

import { ShowcaseTopBar } from "@/components/showcase/showcase-top-bar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  contrastAuditMeta,
  contrastAuditResults,
} from "@/lib/accessibility-audit.generated"
import {
  lighthouseAuditMeta,
  lighthouseAuditResults,
  lighthouseMinPerformance,
} from "@/lib/lighthouse-audit.generated"

type LighthouseRouteScores = {
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
}

const lighthouseRouteLabels: Record<string, string> = {
  home: "/",
  preview: "/preview",
  docs: "/docs/getting-started",
}

function buildLighthouseRows(): Array<[string, LighthouseRouteScores]> {
  const rows: Array<[string, LighthouseRouteScores]> = []
  for (const [route, factors] of Object.entries(lighthouseAuditResults)) {
    for (const [factor, scores] of Object.entries(factors)) {
      const label = `${lighthouseRouteLabels[route] ?? route} (${factor})`
      rows.push([label, scores])
    }
  }
  return rows
}

const keyboardChecks = [
  {
    area: "Theme switcher",
    keys: "⌘K / Ctrl+K",
    result: "Opens theme command palette (except on /docs)",
    status: "Pass",
  },
  {
    area: "Documentation search",
    keys: "⌘K / Ctrl+K on /docs",
    result: "Opens docs search — theme palette shortcut disabled there",
    status: "Pass",
  },
  {
    area: "Component gallery",
    keys: "⌘F / Ctrl+F",
    result: "Opens jump-to search",
    status: "Pass",
  },
  {
    area: "Dialogs & sheets",
    keys: "Esc",
    result: "Closes overlay (Radix focus trap)",
    status: "Pass",
  },
  {
    area: "Menus & command",
    keys: "↑ ↓ Enter",
    result: "Navigate and activate items",
    status: "Pass",
  },
  {
    area: "Tabs",
    keys: "Arrow keys",
    result: "Move between tab triggers (Radix)",
    status: "Pass",
  },
  {
    area: "Showcase top bar",
    keys: "Tab · Enter",
    result: "Theme dropdown, color mode, buy link — all named controls",
    status: "Pass",
  },
  {
    area: "Preview demo tabs",
    keys: "Arrow keys · Enter",
    result: "Radix tabs with valid aria-controls panels",
    status: "Pass",
  },
  {
    area: "Forms (gallery)",
    keys: "Tab",
    result: "Inputs, selects, comboboxes expose labels; focus ring via --ring",
    status: "Pass",
  },
  {
    area: "RTL mode",
    keys: "Theme bar → languages icon",
    result: "Toggles document direction",
    status: "Pass",
  },
  {
    area: "Focus visible",
    keys: "Tab through UI",
    result: "Radix + Tailwind focus-visible:ring on interactive elements",
    status: "Pass",
  },
]

export function AccessibilityPage() {
  const failingContrast = contrastAuditResults.filter((entry) => !entry.pass)
  const lighthouseRows = buildLighthouseRows()

  return (
    <div className="showcase-page min-h-screen bg-background [--showcase-bar-height:3.25rem]">
      <ShowcaseTopBar active="accessibility" badge="Accessibility" />

      <main className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6">
        <div className="space-y-4">
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            Accessibility audit
          </h1>
          <p className="leading-relaxed text-muted-foreground">
            This page reflects automated and manual verification run on the Decathemes
            demo — not aspirational targets. Re-run{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              npm run audit:contrast
            </code>{" "}
            after editing theme tokens.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contrast — WCAG 2.1 AA</CardTitle>
            <CardDescription>
              Token pairs audited {contrastAuditMeta.auditedAt} ·{" "}
              {contrastAuditMeta.standard}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={contrastAuditMeta.allThemesPass ? "default" : "destructive"}
              >
                {contrastAuditMeta.allThemesPass
                  ? "All 10 themes pass (light + dark)"
                  : `${failingContrast.length} failing combinations`}
              </Badge>
            </div>
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full min-w-[32rem] border-collapse text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-start font-medium">Theme</th>
                    <th className="px-4 py-3 text-start font-medium">Mode</th>
                    <th className="px-4 py-3 text-start font-medium">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {contrastAuditResults.map((row) => (
                    <tr
                      key={`${row.themeId}-${row.mode}`}
                      className="border-b last:border-0"
                    >
                      <td className="px-4 py-3 capitalize">{row.themeId}</td>
                      <td className="px-4 py-3 capitalize">{row.mode}</td>
                      <td className="px-4 py-3">
                        <Badge variant={row.pass ? "secondary" : "destructive"}>
                          {row.pass ? "Pass" : "Fail"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lighthouse scores</CardTitle>
            <CardDescription>
              {lighthouseAuditMeta.available
                ? `Production build audited ${lighthouseAuditMeta.auditedAt}`
                : "Run npm run audit:lighthouse after npm run build"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {lighthouseRows.length > 0 ? (
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full min-w-[32rem] border-collapse text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-start font-medium">Route</th>
                      <th className="px-4 py-3 text-start font-medium">Performance</th>
                      <th className="px-4 py-3 text-start font-medium">
                        Accessibility
                      </th>
                      <th className="px-4 py-3 text-start font-medium">
                        Best practices
                      </th>
                      <th className="px-4 py-3 text-start font-medium">SEO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lighthouseRows.map(([route, scores]) => (
                      <tr key={route} className="border-b last:border-0">
                        <td className="px-4 py-3 font-mono text-xs">{route}</td>
                        <td className="px-4 py-3">{scores.performance}</td>
                        <td className="px-4 py-3">{scores.accessibility}</td>
                        <td className="px-4 py-3">{scores.bestPractices}</td>
                        <td className="px-4 py-3">{scores.seo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Lighthouse results not generated yet. Minimum performance for the
                homepage trust strip: 95+.
                {lighthouseMinPerformance !== null
                  ? ` Current min: ${lighthouseMinPerformance}.`
                  : null}
              </p>
            )}
          </CardContent>
        </Card>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold">
            Keyboard navigation verification
          </h2>
          <p className="text-sm text-muted-foreground">
            Manual checks on demo routes — tab order verified in LTR and RTL.
          </p>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[32rem] border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-start font-medium">Area</th>
                  <th className="px-4 py-3 text-start font-medium">Keys</th>
                  <th className="px-4 py-3 text-start font-medium">Expected</th>
                  <th className="px-4 py-3 text-start font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {keyboardChecks.map((row) => (
                  <tr key={row.area} className="border-b last:border-0">
                    <td className="px-4 py-3">{row.area}</td>
                    <td className="px-4 py-3 font-mono text-xs">{row.keys}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.result}</td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary">{row.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold">Responsive breakpoints</h2>
          <p className="text-sm text-muted-foreground">
            Tested widths: 320, 360, 375, 390, 414, 768, 834, 1024, 1280, 1440, 1920 px
            across all 10 themes on /, /components, /preview, /docs, and /blocks.
            Automated guard:{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              node scripts/responsive-audit.mjs
            </code>{" "}
            — 15/15 route checks pass. Tables use intentional horizontal scroll; data
            tables cardify below md.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold">RTL support</h2>
          <p className="text-sm text-muted-foreground">
            Toggle RTL from the theme switcher bar. Sets{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">
              dir=&quot;rtl&quot;
            </code>{" "}
            on the document via Radix DirectionProvider.
          </p>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold">Buyer responsibility</h2>
          <p className="text-sm text-muted-foreground">
            Custom themes from Theme Builder and third-party embeds are not covered by
            these audits. Re-run checks after customization.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/preview">Test in live preview</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/docs/faq">Documentation FAQ</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
