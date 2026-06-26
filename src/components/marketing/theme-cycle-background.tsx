"use client"

import * as React from "react"

import { useActiveThemeId } from "@/components/showcase/theme-provider"
import { firstOrThrow } from "@/lib/optional-props"
import { getThemeById, themes } from "@/themes/_registry"

export function ThemeCycleBackground() {
  const themeId = useActiveThemeId()
  const theme = getThemeById(themeId) ?? firstOrThrow(themes, "themes required")

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        key={theme.id}
        className="theme-cycle-bg absolute inset-0 scale-105"
        style={{ background: theme.previewGradient }}
      />
      <div className="theme-cycle-overlay absolute inset-0 bg-background/75 backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,var(--background)_72%)]" />
      <div
        className="theme-cycle-glow absolute -top-24 left-1/2 size-[36rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: theme.previewColor }}
      />
    </div>
  )
}
