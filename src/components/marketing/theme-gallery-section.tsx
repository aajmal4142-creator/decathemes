"use client"

import * as React from "react"

import Link from "next/link"

import { ArrowRightIcon } from "lucide-react"

import { Section } from "@/components/layout/section"
import { HeroMiniApp } from "@/components/marketing/hero-mini-app"
import { MotionCard } from "@/components/motion/motion-card"
import { Reveal } from "@/components/motion/reveal"
import { ScopedTheme } from "@/components/showcase/scoped-theme"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { firstOrThrow } from "@/lib/optional-props"
import { getPreviewUrl } from "@/lib/preview-url"
import { getThemePersonality } from "@/lib/theme-personality"
import { cn } from "@/lib/utils"
import { themes, type ThemeDefinition } from "@/themes/_registry"

function ThemePickerCard({
  theme,
  active,
  onHover,
  onFocus,
}: {
  theme: ThemeDefinition
  active: boolean
  onHover: () => void
  onFocus: () => void
}) {
  const personality = getThemePersonality(theme.id)

  return (
    <Link
      href={getPreviewUrl({ themeId: theme.id })}
      className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onMouseEnter={onHover}
      onFocus={onFocus}
    >
      <MotionCard
        as="article"
        className={cn(
          "overflow-hidden rounded-xl border bg-card transition-shadow",
          active && "border-primary/50 shadow-md ring-1 ring-primary/20"
        )}
      >
        <div className="flex items-start gap-3 p-3 sm:p-4">
          <span
            className="mt-0.5 size-8 shrink-0 rounded-md border shadow-sm"
            style={{ background: theme.previewGradient }}
            aria-hidden
          />
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <p className="font-heading text-sm font-semibold">{theme.name}</p>
              {active ? (
                <Badge variant="secondary" className="text-[9px]">
                  Previewing
                </Badge>
              ) : null}
            </div>
            <p className="text-[11px] leading-snug text-muted-foreground line-clamp-2">
              {theme.description}
            </p>
            <div className="flex flex-wrap gap-1 pt-1">
              <Badge variant="outline" className="font-mono text-[9px]">
                {personality.headingFont}
              </Badge>
              <Badge variant="outline" className="font-mono text-[9px]">
                r={personality.radius}
              </Badge>
            </div>
          </div>
        </div>
      </MotionCard>
    </Link>
  )
}

export function ThemeGallerySection() {
  const [activeId, setActiveId] = React.useState(
    firstOrThrow(themes, "themes required").id
  )
  const activeTheme =
    themes.find((t) => t.id === activeId) ?? firstOrThrow(themes, "themes required")
  const personality = getThemePersonality(activeId)

  return (
    <Section id="themes" border="top" background="muted" containerSize="marketing">
      <Reveal className="mx-auto max-w-2xl text-center">
        <Badge variant="outline" className="mb-4">
          10 Themes
        </Badge>
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Personality — not just palettes
        </h2>
        <p className="mt-4 text-muted-foreground">
          Hover a theme to preview fonts, border radius, and component shapes in a live
          mini-app. Click to open the full preview with that theme locked in.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:items-start">
        <div className="grid gap-2 sm:grid-cols-2">
          {themes.map((theme, index) => (
            <Reveal key={theme.id} delay={index * 0.03}>
              <ThemePickerCard
                theme={theme}
                active={theme.id === activeId}
                onHover={() => setActiveId(theme.id)}
                onFocus={() => setActiveId(theme.id)}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-2xl border bg-card shadow-xl ring-1 ring-border/50">
            <div className="flex items-center justify-between gap-2 border-b bg-muted/40 px-4 py-2.5">
              <p className="text-xs font-medium">Live mini-app</p>
              <Badge variant="secondary" className="font-mono text-[10px]">
                {activeTheme.name}
              </Badge>
            </div>
            <ScopedTheme themeId={activeId} className="bg-background">
              <HeroMiniApp />
            </ScopedTheme>
            <div className="space-y-2 border-t bg-muted/25 px-4 py-3">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  {personality.headingFont}
                </span>{" "}
                headings ·{" "}
                <span className="font-medium text-foreground">
                  {personality.radius}
                </span>{" "}
                radius
              </p>
              <p className="text-[11px] text-muted-foreground">
                {personality.shapeNote}
              </p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href={getPreviewUrl({ themeId: activeId })}>
                  Open in live preview
                  <ArrowRightIcon className="size-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
