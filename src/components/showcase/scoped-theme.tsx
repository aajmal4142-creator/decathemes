"use client"

import * as React from "react"

import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

/**
 * Renders children under a scoped data-theme (and optional .dark) so previews
 * can differ from the global document theme.
 */
export function ScopedTheme({
  themeId,
  forceDark,
  className,
  children,
}: {
  themeId: string
  forceDark?: boolean
  className?: string
  children: React.ReactNode
}) {
  const { resolvedTheme } = useTheme()
  const isDark = forceDark ?? resolvedTheme === "dark"

  return (
    <div
      data-theme={themeId}
      className={cn(
        "scoped-theme-preview text-foreground",
        isDark && "dark",
        className
      )}
    >
      {children}
    </div>
  )
}
