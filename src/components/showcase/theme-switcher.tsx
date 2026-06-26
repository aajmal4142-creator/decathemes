"use client"

import * as React from "react"

import dynamic from "next/dynamic"

import { LanguagesIcon, MonitorIcon, PaletteIcon, TypeIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { ColorModeToggle } from "@/components/showcase/color-mode-toggle"
import { useRtl } from "@/components/showcase/rtl-provider"
import { useThemeId, useThemeTweaks } from "@/components/showcase/theme-provider"
import { ThemeSwatchButton } from "@/components/showcase/theme-swatch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMounted } from "@/hooks/use-mounted"
import { useTransitionThemeClass } from "@/hooks/use-transition-theme"
import type { FontPreference, RadiusScale } from "@/lib/theme-tweaks"
import { cn } from "@/lib/utils"
import { getTransitionOriginFromEvent } from "@/lib/view-transition"

const ThemeCommandPalette = dynamic(
  () =>
    import("@/components/showcase/theme-command-palette").then((m) => ({
      default: m.ThemeCommandPalette,
    })),
  { ssr: false }
)

function RtlToggle({ compact }: { compact?: boolean }) {
  const { rtl, toggleRtl } = useRtl()
  const mounted = useMounted()

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon-sm" disabled aria-label="RTL">
        <LanguagesIcon className="size-4" />
      </Button>
    )
  }

  return (
    <Button
      variant={rtl ? "secondary" : "ghost"}
      size={compact ? "icon-sm" : "sm"}
      onClick={toggleRtl}
      aria-label={rtl ? "Switch to LTR" : "Switch to RTL"}
      title={rtl ? "RTL on" : "RTL off"}
      className={cn(compact && "shrink-0")}
    >
      <LanguagesIcon className="size-4" />
      {!compact ? <span className="ms-1.5">{rtl ? "RTL" : "LTR"}</span> : null}
    </Button>
  )
}

function TweakControls({ compact }: { compact?: boolean }) {
  const mounted = useMounted()
  const { tweaks, setTweaks } = useThemeTweaks()

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="gap-1.5" disabled>
        <TypeIcon className="size-3.5" />
        Tweaks
      </Button>
    )
  }

  if (compact) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1.5">
            <TypeIcon className="size-3.5" />
            Tweaks
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel>Radius</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={tweaks.radiusScale}
            onValueChange={(value) =>
              setTweaks({ ...tweaks, radiusScale: value as RadiusScale })
            }
          >
            <DropdownMenuRadioItem value="default">Theme default</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="round">Extra round</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Font</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={tweaks.fontPreference}
            onValueChange={(value) =>
              setTweaks({ ...tweaks, fontPreference: value as FontPreference })
            }
          >
            <DropdownMenuRadioItem value="default">Theme default</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="sans">Sans</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="serif">Serif</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="mono">Mono</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className="grid gap-theme-4 sm:grid-cols-2">
      <div className="space-y-theme-2">
        <p className="text-sm font-medium text-muted-foreground">Radius tweak</p>
        <Select
          value={tweaks.radiusScale}
          onValueChange={(value) =>
            setTweaks({ ...tweaks, radiusScale: value as RadiusScale })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Theme default</SelectItem>
            <SelectItem value="compact">Compact (−28%)</SelectItem>
            <SelectItem value="round">Extra round (+45%)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-theme-2">
        <p className="text-sm font-medium text-muted-foreground">Font tweak</p>
        <Select
          value={tweaks.fontPreference}
          onValueChange={(value) =>
            setTweaks({ ...tweaks, fontPreference: value as FontPreference })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Theme default</SelectItem>
            <SelectItem value="sans">Sans stack</SelectItem>
            <SelectItem value="serif">Serif stack</SelectItem>
            <SelectItem value="mono">Mono stack</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export function ThemeSwitcher({
  variant = "full",
  className,
  paletteShortcut = true,
}: {
  variant?: "full" | "compact"
  className?: string
  /** Set false on /docs where ⌘K is reserved for documentation search */
  paletteShortcut?: boolean
}) {
  const { themeId, setThemeId, themes } = useThemeId()
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const [paletteOpen, setPaletteOpen] = React.useState(false)

  useTransitionThemeClass()

  React.useEffect(() => {
    if (!paletteShortcut) return
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setPaletteOpen((value) => !value)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [paletteShortcut])

  if (variant === "compact") {
    return (
      <>
        <div className={cn("flex flex-wrap items-center gap-2", className)}>
          <ColorModeToggle variant="compact" />
          <RtlToggle compact />
          <TweakControls compact />
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => setPaletteOpen(true)}
          >
            <PaletteIcon className="size-3.5" />
            ⌘K palette
          </Button>
          <Badge
            variant="outline"
            className="hidden font-mono text-[10px] sm:inline-flex"
          >
            Theme dock ↘
          </Badge>
        </div>
        {paletteOpen ? (
          <ThemeCommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
        ) : null}
      </>
    )
  }

  return (
    <div className={cn("flex w-full flex-col gap-theme-6", className)}>
      <div className="flex flex-wrap items-center justify-between gap-theme-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Color mode</p>
          <p className="text-xs text-muted-foreground">
            {mounted
              ? resolvedTheme === "dark"
                ? "Dark"
                : resolvedTheme === "light"
                  ? "Light"
                  : "System"
              : "…"}
          </p>
        </div>
        <ColorModeToggle variant="plain" />
      </div>

      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-muted-foreground">
          Theme ({themes.length})
        </p>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => setPaletteOpen(true)}
        >
          <PaletteIcon className="size-3.5" />
          Command palette
          <Badge variant="secondary" className="font-mono text-[10px]">
            ⌘K
          </Badge>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-theme-2 sm:grid-cols-3 md:grid-cols-5">
        {themes.map((theme) => (
          <ThemeSwatchButton
            key={theme.id}
            theme={theme}
            active={theme.id === themeId}
            onSelect={(event) =>
              setThemeId(theme.id, getTransitionOriginFromEvent(event))
            }
          />
        ))}
      </div>

      <TweakControls />

      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-muted-foreground">Text direction</p>
        <RtlToggle />
      </div>

      {paletteOpen ? (
        <ThemeCommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      ) : null}
    </div>
  )
}

export function ThemeSwitcherBar({
  className,
  paletteShortcut = true,
}: {
  className?: string
  paletteShortcut?: boolean
}) {
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-3", className)}>
      <div className="flex items-center gap-2">
        <MonitorIcon className="size-4 text-primary" />
        <div>
          <p className="text-sm font-semibold leading-none">Live preview</p>
          <p className="text-[11px] text-muted-foreground">
            Circular wipe reveal · use the theme dock ↘
          </p>
        </div>
      </div>
      <ThemeSwitcher variant="compact" paletteShortcut={paletteShortcut} />
    </div>
  )
}
