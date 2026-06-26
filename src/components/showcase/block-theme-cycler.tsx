"use client"

import * as React from "react"

import { PauseIcon, PlayIcon, RefreshCwIcon } from "lucide-react"

import { ScopedTheme } from "@/components/showcase/scoped-theme"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { atOr, firstOrThrow } from "@/lib/optional-props"
import { cn } from "@/lib/utils"
import { getThemeById, themes } from "@/themes/_registry"

export function BlockThemeCycler({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [index, setIndex] = React.useState(0)
  const [autoPlay, setAutoPlay] = React.useState(false)
  const theme = atOr(
    themes,
    index % themes.length,
    firstOrThrow(themes, "themes required")
  )

  React.useEffect(() => {
    if (!autoPlay) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % themes.length)
    }, 2200)
    return () => window.clearInterval(id)
  }, [autoPlay])

  const cycle = () => setIndex((i) => (i + 1) % themes.length)

  return (
    <div className={cn("space-y-0", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-muted/30 px-4 py-2 sm:px-5">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1 font-mono text-[10px]">
            <span
              className="size-2 rounded-full"
              style={{ background: theme.previewColor }}
              aria-hidden
            />
            {theme.name}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {index + 1} / {themes.length} themes
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1 text-xs"
            onClick={cycle}
          >
            <RefreshCwIcon className="size-3" />
            Next
          </Button>
          <Button
            variant={autoPlay ? "secondary" : "ghost"}
            size="sm"
            className="h-7 gap-1 text-xs"
            onClick={() => setAutoPlay((p) => !p)}
            aria-pressed={autoPlay}
          >
            {autoPlay ? (
              <PauseIcon className="size-3" />
            ) : (
              <PlayIcon className="size-3" />
            )}
            {autoPlay ? "Pause" : "Auto-cycle"}
          </Button>
        </div>
      </div>
      <ScopedTheme themeId={theme.id} className="block w-full">
        {children}
      </ScopedTheme>
    </div>
  )
}

export function BlockThemeCyclerLabel({ themeId }: { themeId: string }) {
  const theme = getThemeById(themeId)
  return theme?.name ?? themeId
}
