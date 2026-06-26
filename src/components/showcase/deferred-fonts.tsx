"use client"

/**
 * Side-effect import: registers extended theme font @font-face rules in a
 * separate chunk so the homepage critical path only loads Inter + JetBrains.
 */
import "@/lib/fonts-extended"

import { ThemeFontEffect } from "@/components/showcase/theme-font-effect"

export function DeferredFontFaces() {
  return <ThemeFontEffect />
}
