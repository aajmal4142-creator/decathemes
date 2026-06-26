"use client"

import * as React from "react"

import { useActiveThemeId } from "@/components/showcase/theme-provider"
import { themeFontVariableClasses } from "@/lib/fonts-extended"

/**
 * Applies theme-specific font CSS variables to <html> after extended fonts load.
 */
export function ThemeFontEffect() {
  const themeId = useActiveThemeId()

  React.useEffect(() => {
    const root = document.documentElement
    const extra = themeFontVariableClasses[themeId] ?? ""
    const tokens = extra.split(/\s+/).filter(Boolean)
    const previous = root.dataset.themeFontVars?.split(/\s+/).filter(Boolean) ?? []

    for (const cls of previous) {
      root.classList.remove(cls)
    }
    for (const cls of tokens) {
      root.classList.add(cls)
    }
    root.dataset.themeFontVars = tokens.join(" ")
  }, [themeId])

  return null
}
