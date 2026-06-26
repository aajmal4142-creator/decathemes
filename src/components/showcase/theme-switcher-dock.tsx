"use client"

import * as React from "react"

import {
  ChevronDownIcon,
  ChevronUpIcon,
  LanguagesIcon,
  PaletteIcon,
  SparklesIcon,
  WandSparklesIcon,
} from "lucide-react"

import { ColorModeToggle } from "@/components/showcase/color-mode-toggle"
import { useRtl } from "@/components/showcase/rtl-provider"
import { useThemeAutoCycle, useThemeId } from "@/components/showcase/theme-provider"
import { ThemeSwatchButton } from "@/components/showcase/theme-swatch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useMounted } from "@/hooks/use-mounted"
import { useTransitionThemeClass } from "@/hooks/use-transition-theme"
import { cn } from "@/lib/utils"
import { getTransitionOriginFromEvent } from "@/lib/view-transition"
import { getThemeById } from "@/themes/_registry"

export function ThemeSwitcherDock({ className }: { className?: string }) {
  const { themeId, setThemeId, themes } = useThemeId()
  const { autoCycle, setAutoCycle } = useThemeAutoCycle()
  const { rtl, toggleRtl } = useRtl()
  const mounted = useMounted()
  const [open, setOpen] = React.useState(false)
  const [focusIndex, setFocusIndex] = React.useState(0)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const buttonRefs = React.useRef<Array<HTMLButtonElement | null>>([])
  const activeTheme = getThemeById(themeId)

  useTransitionThemeClass()

  React.useEffect(() => {
    const activeIndex = themes.findIndex((theme) => theme.id === themeId)
    if (activeIndex >= 0) setFocusIndex(activeIndex)
  }, [themeId, themes])

  React.useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        return
      }

      const cols = window.innerWidth >= 420 ? 3 : 2
      let next = focusIndex

      switch (event.key) {
        case "ArrowRight":
          next = Math.min(focusIndex + 1, themes.length - 1)
          break
        case "ArrowLeft":
          next = Math.max(focusIndex - 1, 0)
          break
        case "ArrowDown":
          next = Math.min(focusIndex + cols, themes.length - 1)
          break
        case "ArrowUp":
          next = Math.max(focusIndex - cols, 0)
          break
        case "Home":
          next = 0
          break
        case "End":
          next = themes.length - 1
          break
        case "Enter":
        case " ": {
          event.preventDefault()
          const theme = themes[focusIndex]
          if (theme) {
            setThemeId(theme.id, getTransitionOriginFromEvent())
          }
          return
        }
        default:
          return
      }

      event.preventDefault()
      setFocusIndex(next)
      buttonRefs.current[next]?.focus()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, focusIndex, themes, setThemeId])

  React.useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    window.addEventListener("pointerdown", onPointerDown)
    return () => window.removeEventListener("pointerdown", onPointerDown)
  }, [open])

  if (!mounted) return null

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-2",
        className
      )}
    >
      {open ? (
        <div
          ref={panelRef}
          role="listbox"
          aria-label="Choose theme"
          className={cn(
            "w-[min(100vw-2.5rem,22rem)] origin-bottom-right rounded-2xl border bg-popover/95 p-3 shadow-2xl ring-1 ring-border/60 backdrop-blur-xl",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-200"
          )}
        >
          <div className="mb-3 flex items-start justify-between gap-2">
            <div>
              <p className="flex items-center gap-1.5 text-sm font-semibold">
                <PaletteIcon className="size-4 text-primary" />
                Theme studio
              </p>
              <p className="text-[11px] text-muted-foreground">
                Arrow keys · Enter to apply · circular wipe reveal
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setOpen(false)}
              aria-label="Close theme picker"
            >
              <ChevronDownIcon className="size-4" />
            </Button>
          </div>

          <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {themes.map((theme, index) => (
              <ThemeSwatchButton
                key={theme.id}
                theme={theme}
                active={theme.id === themeId}
                tabIndex={open && index === focusIndex ? 0 : -1}
                buttonRef={(node) => {
                  buttonRefs.current[index] = node
                }}
                onFocus={() => setFocusIndex(index)}
                onSelect={(event) => {
                  setThemeId(theme.id, getTransitionOriginFromEvent(event))
                }}
              />
            ))}
          </div>

          <div className="space-y-2 rounded-xl border bg-muted/30 p-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <WandSparklesIcon className="size-4 text-primary" />
                <div>
                  <p className="text-xs font-medium">Surprise me</p>
                  <p className="text-[10px] text-muted-foreground">
                    Auto-cycle all {themes.length} themes
                  </p>
                </div>
              </div>
              <Switch
                checked={autoCycle}
                onCheckedChange={setAutoCycle}
                aria-label="Auto-cycle themes"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-2">
              <ColorModeToggle variant="inline" iconSize="md" />
              <Button
                variant={rtl ? "secondary" : "outline"}
                size="icon-sm"
                onClick={toggleRtl}
                aria-label={rtl ? "Switch to LTR" : "Switch to RTL"}
              >
                <LanguagesIcon className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <Button
        size="lg"
        className={cn(
          "group relative h-14 gap-2 rounded-full border-2 border-background/80 px-4 shadow-2xl",
          "bg-card/90 backdrop-blur-xl hover:shadow-primary/20",
          autoCycle && "ring-2 ring-primary/50 ring-offset-2 ring-offset-background"
        )}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span
          className="absolute inset-0 rounded-full opacity-40"
          style={{ background: activeTheme?.previewGradient }}
          aria-hidden
        />
        <span
          className="relative size-8 shrink-0 rounded-full border-2 border-background shadow-md"
          style={{ background: activeTheme?.previewGradient }}
        />
        <span className="relative hidden min-w-0 text-left sm:block">
          <span className="block truncate text-sm font-semibold leading-none">
            {activeTheme?.name ?? "Theme"}
          </span>
          <span className="mt-0.5 block text-[10px] text-muted-foreground">
            {autoCycle ? "Auto-cycling…" : "Tap to switch"}
          </span>
        </span>
        {autoCycle ? (
          <SparklesIcon className="relative size-4 shrink-0 text-primary animate-pulse" />
        ) : open ? (
          <ChevronDownIcon className="relative size-4 shrink-0" />
        ) : (
          <ChevronUpIcon className="relative size-4 shrink-0" />
        )}
      </Button>
    </div>
  )
}

export function HeroAutoCycleToggle({ className }: { className?: string }) {
  const { autoCycle, setAutoCycle } = useThemeAutoCycle()

  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full border bg-card/80 px-4 py-2 shadow-lg backdrop-blur-sm",
        className
      )}
    >
      <div className="flex items-center gap-2 text-left">
        <WandSparklesIcon className="size-4 shrink-0 text-primary" />
        <div>
          <p className="text-sm font-medium leading-none">Surprise me</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Auto-cycle every 4s — screenshot this
          </p>
        </div>
      </div>
      <Switch
        checked={autoCycle}
        onCheckedChange={setAutoCycle}
        aria-label="Auto-cycle themes on the marketing hero"
      />
      {autoCycle ? (
        <Badge variant="secondary" className="hidden gap-1 sm:inline-flex">
          <SparklesIcon className="size-3" />
          Live
        </Badge>
      ) : null}
    </div>
  )
}
