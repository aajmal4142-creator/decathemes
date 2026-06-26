"use client"

import * as React from "react"
import { Suspense } from "react"

import dynamic from "next/dynamic"

import { RtlProvider } from "@/components/showcase/rtl-provider"
import { ThemePresetEffect } from "@/components/showcase/theme-preset-effect"
import { ThemeProvider } from "@/components/showcase/theme-provider"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { Toaster as RadixToaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"

const DeferredFontFaces = dynamic(
  () =>
    import("@/components/showcase/deferred-fonts").then((m) => ({
      default: m.DeferredFontFaces,
    })),
  { ssr: false }
)

const ThemeDecorations = dynamic(
  () =>
    import("@/components/showcase/theme-decorations").then((m) => ({
      default: m.ThemeDecorations,
    })),
  { ssr: false }
)

const ThemeSwitcherDock = dynamic(
  () =>
    import("@/components/showcase/theme-switcher-dock").then((m) => ({
      default: m.ThemeSwitcherDock,
    })),
  { ssr: false }
)

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [showChrome, setShowChrome] = React.useState(false)

  React.useEffect(() => {
    const idle =
      typeof requestIdleCallback !== "undefined"
        ? requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 1)
    const id = idle(() => setShowChrome(true))
    return () => {
      if (typeof cancelIdleCallback !== "undefined" && typeof id === "number") {
        cancelIdleCallback(id)
      }
    }
  }, [])

  return (
    <ThemeProvider>
      <RtlProvider>
        <TooltipProvider>
          <ThemePresetEffect />
          <Suspense fallback={null}>
            <DeferredFontFaces />
          </Suspense>
          {showChrome ? (
            <Suspense fallback={null}>
              <ThemeDecorations />
            </Suspense>
          ) : null}
          {children}
          {showChrome ? (
            <Suspense fallback={null}>
              <ThemeSwitcherDock />
            </Suspense>
          ) : null}
          <SonnerToaster richColors closeButton />
          <RadixToaster />
        </TooltipProvider>
      </RtlProvider>
    </ThemeProvider>
  )
}
