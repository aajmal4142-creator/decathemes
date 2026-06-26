"use client"

/**
 * Interactive theme token editor at `/theme-builder` — live preview + CSS export.
 *
 * @example Export generated tokens
 * ```tsx
 * import { generateThemeTokensCss, downloadThemeTokens } from "@/lib/theme-builder/generate-tokens"
 * import { defaultThemeBuilderConfig } from "@/lib/theme-builder/types"
 *
 * const css = generateThemeTokensCss(defaultThemeBuilderConfig)
 * downloadThemeTokens(css, "my-theme")
 * ```
 */
import * as React from "react"

import { DownloadIcon } from "lucide-react"

import { CopyCodeButton } from "@/components/showcase/copy-code-button"
import { ShowcaseTopBar } from "@/components/showcase/showcase-top-bar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  applyBuilderPreview,
  downloadThemeTokens,
  generateThemeTokensCss,
} from "@/lib/theme-builder/generate-tokens"
import {
  defaultThemeBuilderConfig,
  type ThemeBuilderConfig,
  type ThemeBuilderFont,
  type ThemeBuilderShadow,
} from "@/lib/theme-builder/types"

export function ThemeBuilderPage() {
  const [config, setConfig] = React.useState<ThemeBuilderConfig>(
    defaultThemeBuilderConfig
  )
  const [previewOnPage, setPreviewOnPage] = React.useState(true)

  const css = React.useMemo(() => generateThemeTokensCss(config), [config])

  React.useEffect(() => {
    if (!previewOnPage) return
    return applyBuilderPreview(css, config.themeId)
  }, [css, config.themeId, previewOnPage])

  const update = <K extends keyof ThemeBuilderConfig>(
    key: K,
    value: ThemeBuilderConfig[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="showcase-page min-h-screen bg-background [--showcase-bar-height:3.25rem]">
      <ShowcaseTopBar
        active="theme-builder"
        badge="Theme Builder"
        trailing={
          <>
            <CopyCodeButton code={css} label="Copy tokens" />
            <Button
              variant="default"
              size="sm"
              className="gap-1.5"
              onClick={() => downloadThemeTokens(css, config.themeId)}
            >
              <DownloadIcon className="size-3.5" />
              <span className="hidden sm:inline">Download tokens.css</span>
              <span className="sm:hidden">Download</span>
            </Button>
          </>
        }
      />

      <div className="mx-auto grid max-w-[100rem] gap-8 px-4 py-8 lg:grid-cols-[320px_1fr] lg:px-8">
        <aside className="space-y-6 lg:sticky lg:top-[calc(var(--showcase-bar-height)+1.5rem)] lg:self-start">
          <div>
            <h1 className="font-heading text-2xl font-semibold">Theme Builder</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Tune colors, radius, fonts, and shadows — export a complete{" "}
              <code className="rounded bg-muted px-1 font-mono text-xs">
                tokens.css
              </code>{" "}
              ready to drop into your project.
            </p>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <Label htmlFor="live-preview" className="text-sm">
              Live preview on page
            </Label>
            <Switch
              id="live-preview"
              checked={previewOnPage}
              onCheckedChange={setPreviewOnPage}
            />
          </div>

          <div className="space-y-5 rounded-xl border bg-card p-4">
            <div className="space-y-2">
              <Label htmlFor="theme-id">Theme ID</Label>
              <Input
                id="theme-id"
                value={config.themeId}
                onChange={(e) => update("themeId", e.target.value)}
                placeholder="my-brand"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="theme-name">Display name</Label>
              <Input
                id="theme-name"
                value={config.themeName}
                onChange={(e) => update("themeName", e.target.value)}
              />
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>Primary hue ({config.primaryHue}°)</Label>
              <Slider
                value={[config.primaryHue]}
                min={0}
                max={360}
                step={1}
                onValueChange={([v]) => {
                  if (v !== undefined) update("primaryHue", v)
                }}
              />
            </div>
            <div className="space-y-3">
              <Label>Primary chroma ({config.primaryChroma.toFixed(2)})</Label>
              <Slider
                value={[config.primaryChroma * 100]}
                min={0}
                max={30}
                step={1}
                onValueChange={([v]) => {
                  if (v !== undefined) update("primaryChroma", v / 100)
                }}
              />
            </div>
            <div className="space-y-3">
              <Label>Primary lightness ({config.primaryLightness.toFixed(2)})</Label>
              <Slider
                value={[config.primaryLightness * 100]}
                min={25}
                max={75}
                step={1}
                onValueChange={([v]) => {
                  if (v !== undefined) update("primaryLightness", v / 100)
                }}
              />
            </div>
            <div className="space-y-3">
              <Label>Radius ({config.radiusRem}rem)</Label>
              <Slider
                value={[config.radiusRem * 100]}
                min={0}
                max={150}
                step={1}
                onValueChange={([v]) => {
                  if (v !== undefined) update("radiusRem", v / 100)
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Font</Label>
              <Select
                value={config.font}
                onValueChange={(v) => update("font", v as ThemeBuilderFont)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sans">Sans (Inter)</SelectItem>
                  <SelectItem value="serif">Serif (Source Serif)</SelectItem>
                  <SelectItem value="mono">Mono (JetBrains)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Shadow intensity</Label>
              <Select
                value={config.shadow}
                onValueChange={(v) => update("shadow", v as ThemeBuilderShadow)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="soft">Soft</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="strong">Strong</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </aside>

        <main className="min-w-0 space-y-8">
          <section className="space-y-4">
            <h2 className="font-heading text-lg font-semibold">Preview</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                  <CardDescription>Primary, secondary, outline</CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-wrap gap-2">
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="destructive">Destructive</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Form</CardTitle>
                  <CardDescription>Inputs and labels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input placeholder="Email address" />
                  <Input placeholder="Disabled" disabled />
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Surface & typography</CardTitle>
                <CardDescription>
                  Card, muted text, badges — your generated theme at work
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <p className="w-full text-sm text-muted-foreground">
                  Muted foreground sample. Primary actions use your OKLCH hue{" "}
                  {config.primaryHue}°.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-lg font-semibold">Generated tokens.css</h2>
            <Tabs defaultValue="css">
              <TabsList>
                <TabsTrigger value="css">CSS</TabsTrigger>
                <TabsTrigger value="steps">Install steps</TabsTrigger>
              </TabsList>
              <TabsContent value="css" className="mt-4">
                <pre className="max-h-[28rem] overflow-auto rounded-xl border bg-muted/30 p-4 font-mono text-xs leading-relaxed">
                  <code>{css}</code>
                </pre>
              </TabsContent>
              <TabsContent value="steps" className="mt-4">
                <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                  <li>
                    Download or copy the CSS into{" "}
                    <code className="text-foreground">
                      src/themes/{config.themeId}/tokens.css
                    </code>
                  </li>
                  <li>Add an entry to `src/themes/_registry.ts`</li>
                  <li>Import in `src/styles/globals.css`</li>
                  <li>
                    Set{" "}
                    <code className="text-foreground">
                      data-theme=&quot;{config.themeId}&quot;
                    </code>
                  </li>
                </ol>
              </TabsContent>
            </Tabs>
          </section>
        </main>
      </div>
    </div>
  )
}
