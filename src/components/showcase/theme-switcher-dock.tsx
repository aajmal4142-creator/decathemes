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
import { ScrollArea } from "@/components/ui/scroll-area"
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
  const fabRef = React.useRef<HTMLDivElement>(null)
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

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (panelRef.current?.contains(target)) return
      if (fabRef.current?.contains(target)) return
      setOpen(false)
    }

    window.addEventListener("pointerdown", onPointerDown)
    return () => window.removeEventListener("pointerdown", onPointerDown)
  }, [open])

  if (!mounted) return null

  const panelBounds = {
    top: "max(calc(var(--showcase-bar-height, 4rem) + 0.5rem), var(--safe-top))",
    bottom: "var(--showcase-chrome-bottom, calc(5.5rem + env(safe-area-inset-bottom, 0px)))",
  } as const

  return (
    <>
      {open ? (
        <div
          ref={panelRef}
          role="listbox"
          aria-label="Choose theme"
          data-theme-picker
          data-theme-dock
          style={panelBounds}
          className={cn(
            "fixed isolate grid w-[min(100vw-2rem,24rem)] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-2xl border border-border/80 bg-popover shadow-2xl ring-1 ring-border/50",
            "inset-x-4 sm:inset-x-auto sm:right-[max(1.25rem,env(safe-area-inset-right,0px))] sm:w-[min(calc(100vw-2.5rem),24rem)]",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-200"
          )}
        >
          <div className="relative z-10 flex shrink-0 items-start justify-between gap-3 border-b border-border/60 bg-popover px-3.5 pb-3 pt-3.5">
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 font-heading text-sm font-semibold tracking-tight text-foreground">
                <PaletteIcon className="size-4 shrink-0 text-primary" aria-hidden />
                Theme studio
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                Pick a theme · arrow keys · circular wipe
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              className="shrink-0"
              onClick={() => setOpen(false)}
              aria-label="Close theme picker"
            >
              <ChevronDownIcon className="size-4" />
            </Button>
          </div>

          <ScrollArea
            className="theme-picker-scroll min-h-0 h-full overflow-hidden"
            tabIndex={0}
            aria-label="Theme list"
            data-theme-picker-scroll
          >
            <div className="grid grid-cols-2 gap-2 px-3.5 py-3 min-[420px]:grid-cols-3">
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
          </ScrollArea>

          <div className="shrink-0 space-y-2 border-t border-border/60 bg-popover px-3.5 py-3">
            <div className="flex items-center justify-between gap-2 rounded-xl border border-border/60 bg-muted/40 p-2.5">
              <div className="flex min-w-0 items-center gap-2">
                <WandSparklesIcon className="size-4 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="text-xs font-medium">Surprise me</p>
                  <p className="truncate text-[10px] text-muted-foreground">
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

            <div className="flex flex-wrap items-center justify-between gap-2">
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

      <div
        ref={fabRef}
        data-theme-dock
        className={cn(
          "fixed bottom-[max(1.25rem,var(--safe-bottom))] right-[max(1.25rem,var(--safe-right))]",
          className
        )}
      >
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
    </>
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
