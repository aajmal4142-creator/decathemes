"use client"

import * as React from "react"

import Link from "next/link"

import {
  ExternalLinkIcon,
  LaptopIcon,
  MonitorIcon,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react"

import { LazyDemoPage } from "@/components/demo/demo-page-loader"
import {
  demoPages,
  getDemoPage,
  type DemoPageId,
} from "@/components/demo/preview-registry"
import { ShowcaseTopBar } from "@/components/showcase/showcase-top-bar"
import { ThemePresetEffect } from "@/components/showcase/theme-preset-effect"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

/** Matches standard responsive breakpoints used across the design system. */
type ViewportSize = "mobile" | "tablet" | "laptop" | "wide"

const viewportConfig: Record<
  ViewportSize,
  { width: string; label: string; icon: typeof SmartphoneIcon }
> = {
  mobile: { width: "375px", label: "375px", icon: SmartphoneIcon },
  tablet: { width: "768px", label: "768px", icon: TabletIcon },
  laptop: { width: "1024px", label: "1024px", icon: LaptopIcon },
  wide: { width: "1440px", label: "1440px", icon: MonitorIcon },
}

export function PreviewShell({
  initialPage = "landing",
  initialTheme,
}: {
  initialPage?: DemoPageId
  initialTheme?: string
}) {
  const [pageId, setPageId] = React.useState<DemoPageId>(initialPage)
  const [viewport, setViewport] = React.useState<ViewportSize>("wide")
  const [useIframe, setUseIframe] = React.useState(false)

  const page = getDemoPage(pageId)
  const iframeSrc = `${page.path}?embedded=1`
  const frameWidth = viewportConfig[viewport].width
  const isConstrained = viewport !== "wide"

  return (
    <div className="showcase-page flex min-h-screen flex-col [--showcase-bar-height:3.25rem]">
      <ThemePresetEffect
        {...(initialTheme !== undefined ? { themeId: initialTheme } : {})}
      />
      <ShowcaseTopBar
        active="preview"
        badge="Live preview"
        trailing={
          <div className="flex flex-wrap items-center gap-2">
            <ToggleGroup
              type="single"
              value={viewport}
              onValueChange={(value) => {
                if (value) setViewport(value as ViewportSize)
              }}
              variant="outline"
              size="sm"
            >
              {(Object.keys(viewportConfig) as ViewportSize[]).map((key) => {
                const { label, icon: Icon } = viewportConfig[key]
                return (
                  <ToggleGroupItem
                    key={key}
                    value={key}
                    aria-label={`${label} viewport`}
                    title={label}
                  >
                    <Icon className="size-4" />
                    <span className="sr-only">{label}</span>
                  </ToggleGroupItem>
                )
              })}
            </ToggleGroup>
            <Button
              variant={useIframe ? "default" : "outline"}
              size="sm"
              onClick={() => setUseIframe((prev) => !prev)}
            >
              {useIframe ? "Inline" : "Iframe"}
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={page.path} target="_blank" aria-label="Open page in new tab">
                <ExternalLinkIcon className="size-4" />
                <span className="hidden sm:inline">Open page</span>
              </Link>
            </Button>
          </div>
        }
      />

      <div className="border-b bg-muted/30">
        <div className="mx-auto flex max-w-[100rem] flex-col gap-3 px-4 py-2.5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <Tabs
            value={pageId}
            onValueChange={(value) => setPageId(value as DemoPageId)}
            className="min-w-0"
          >
            <TabsList className="h-auto max-w-full flex-wrap justify-start gap-1 overflow-x-auto bg-transparent p-0">
              {demoPages.map((item) => (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <item.icon className="mr-1.5 size-3.5" />
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {/* Hidden panels so tab triggers have valid aria-controls targets */}
            {demoPages.map((item) => (
              <TabsContent
                key={item.id}
                value={item.id}
                className="sr-only"
                tabIndex={-1}
              >
                {item.label}
              </TabsContent>
            ))}
          </Tabs>

          <div className="hidden w-64 shrink-0 lg:block">
            <Select
              value={pageId}
              onValueChange={(value) => setPageId(value as DemoPageId)}
            >
              <SelectTrigger aria-label="Select demo page">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {demoPages.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center bg-muted/40 p-4 sm:p-6">
        <div className="mb-4 w-full max-w-[100rem] text-center sm:text-left">
          <h1 className="font-heading text-lg font-semibold">{page.label}</h1>
          <p className="text-sm text-muted-foreground">{page.description}</p>
        </div>

        <div
          className={cn(
            "relative w-full transition-[max-width] duration-300 ease-out",
            isConstrained && "mx-auto"
          )}
          style={{ maxWidth: frameWidth }}
        >
          <div
            className={cn(
              "overflow-hidden rounded-xl border bg-background shadow-2xl ring-1 ring-border/50",
              viewport === "mobile" && "rounded-[2rem]",
              viewport === "tablet" && "rounded-2xl"
            )}
          >
            {isConstrained ? (
              <div className="flex items-center justify-center gap-1 border-b bg-muted/50 py-2">
                <div className="size-2 rounded-full bg-muted-foreground/30" />
                <div className="size-2 rounded-full bg-muted-foreground/30" />
                <div className="size-2 rounded-full bg-muted-foreground/30" />
                <span className="sr-only">
                  {viewportConfig[viewport].label} preview frame
                </span>
              </div>
            ) : null}

            <div
              className={cn(
                "relative bg-background",
                useIframe
                  ? "h-[min(80vh,720px)]"
                  : "max-h-[80vh] overflow-x-hidden overflow-y-auto"
              )}
            >
              {useIframe ? (
                <iframe
                  title={`${page.label} preview`}
                  src={iframeSrc}
                  className="size-full border-0"
                />
              ) : (
                <LazyDemoPage pageId={pageId} />
              )}
            </div>
          </div>

          {isConstrained ? (
            <p className="mt-3 text-center text-xs text-muted-foreground">
              {viewportConfig[viewport].label} preview width · theme applies instantly
              in inline mode
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
