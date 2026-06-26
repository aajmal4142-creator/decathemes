"use client"

import * as React from "react"

import { ContentReveal, useSimulatedLoading } from "@/components/motion/content-reveal"
import { CodePeek } from "@/components/showcase/code-peek"
import { GalleryStage } from "@/components/showcase/gallery-stage"
import { ScopedTheme } from "@/components/showcase/scoped-theme"
import { useShowcaseCompareOptional } from "@/components/showcase/showcase-compare-context"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { getThemeById } from "@/themes/_registry"

export interface GalleryItemProps {
  id: string
  name: string
  description: string
  code: string
  children: React.ReactNode
  className?: string
}

/**
 * Memoized: gallery renders 50+ items; parent filter/toolbar updates should not
 * re-render unchanged rows. Compare-mode layout still updates via context.
 */
export const GalleryItem = React.memo(function GalleryItem({
  id,
  name,
  description,
  code,
  children,
  className,
}: GalleryItemProps) {
  const loading = useSimulatedLoading(380)
  const compare = useShowcaseCompareOptional()
  const compareMode = compare?.compareMode ?? false

  return (
    <article
      id={id}
      className={cn(
        "@container/gallery-item scroll-mt-36 overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm ring-1 ring-border/40",
        compareMode && "xl:col-span-2",
        className
      )}
    >
      <header className="flex items-start justify-between gap-3 border-b bg-gradient-to-r from-muted/50 to-transparent px-4 py-3.5 sm:px-5">
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-heading text-base font-semibold tracking-tight">
              {name}
            </h3>
            <Badge variant="outline" className="font-mono text-[10px]">
              {id}
            </Badge>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
        </div>
        <CodePeek title={name} description={description} code={code} />
      </header>

      <div className="p-4 sm:p-5">
        <ContentReveal
          loading={loading}
          skeleton={
            <div className="space-y-3">
              <Skeleton className="h-28 w-full rounded-xl" />
            </div>
          }
        >
          {compareMode && compare ? (
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  {getThemeById(compare.compareThemeA)?.name ?? "Theme A"}
                </p>
                <ScopedTheme themeId={compare.compareThemeA}>
                  <GalleryStage label="Preview">{children}</GalleryStage>
                </ScopedTheme>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  {getThemeById(compare.compareThemeB)?.name ?? "Theme B"}
                </p>
                <ScopedTheme themeId={compare.compareThemeB}>
                  <GalleryStage label="Preview">{children}</GalleryStage>
                </ScopedTheme>
              </div>
            </div>
          ) : (
            <GalleryStage label="Live preview">{children}</GalleryStage>
          )}
        </ContentReveal>
      </div>
    </article>
  )
})
