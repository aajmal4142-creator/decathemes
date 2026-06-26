"use client"

import * as React from "react"

import { SparklesIcon } from "lucide-react"

import { HeroMiniApp } from "@/components/marketing/hero-mini-app"
import {
  useActiveThemeId,
  useThemeAutoCycle,
} from "@/components/showcase/theme-provider"
import { Badge } from "@/components/ui/badge"
import { useTransitionThemeClass } from "@/hooks/use-transition-theme"
import { scheduleWhenReady } from "@/lib/defer-idle"
import { getThemePersonality } from "@/lib/theme-personality"
import { cn } from "@/lib/utils"
import { getThemeById } from "@/themes/_registry"

/** Hero frame with auto-cycling themes and POLISH 2 view-transition wipes. */
export function HeroLiveDemo({ className }: { className?: string }) {
  const themeId = useActiveThemeId()
  const { setAutoCycle } = useThemeAutoCycle()
  const theme = getThemeById(themeId)
  const personality = getThemePersonality(themeId)

  useTransitionThemeClass()

  React.useEffect(() => {
    const stop = scheduleWhenReady(() => setAutoCycle(true))
    return () => {
      stop()
      setAutoCycle(false)
    }
  }, [setAutoCycle])

  return (
    <div
      className={cn(
        "marketing-hero-in-delay-4 relative mx-auto w-full max-w-lg lg:max-w-none",
        className
      )}
    >
      <div className="overflow-hidden rounded-2xl border bg-card/90 shadow-2xl ring-1 ring-border/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2.5">
          <div className="size-2.5 rounded-full bg-destructive/70" />
          <div className="size-2.5 rounded-full bg-muted-foreground/30" />
          <div className="size-2.5 rounded-full bg-primary/50" />
          <span className="ml-1 truncate font-mono text-[10px] text-muted-foreground sm:text-xs">
            decathemes.app — live theme demo
          </span>
          <Badge
            variant="secondary"
            className="ml-auto hidden gap-1 font-mono text-[10px] sm:inline-flex"
          >
            <SparklesIcon className="size-3 text-primary" />
            Auto-cycle
          </Badge>
        </div>

        <div className="relative min-h-[280px] bg-background sm:min-h-[320px]">
          <HeroMiniApp />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t bg-muted/30 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span
              className="size-3 rounded-sm border shadow-sm"
              style={{
                background: theme?.previewGradient ?? "var(--primary)",
              }}
              aria-hidden
            />
            <p className="text-xs font-medium">{theme?.name ?? "Theme"}</p>
          </div>
          <p className="text-[10px] text-muted-foreground sm:text-xs">
            {personality.headingFont} · r={personality.radius} · {personality.shapeNote}
          </p>
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] text-muted-foreground sm:text-xs">
        Themes cycle every 4s with a circular view-transition wipe
      </p>
    </div>
  )
}
