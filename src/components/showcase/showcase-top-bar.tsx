"use client"

import * as React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  BlocksIcon,
  BookOpenIcon,
  LayersIcon,
  MonitorPlayIcon,
  PaletteIcon,
  ShoppingBagIcon,
  SparklesIcon,
} from "lucide-react"

import { useThemeId } from "@/components/showcase/theme-provider"
import { ThemeSwatchButton } from "@/components/showcase/theme-swatch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"
import { getTransitionOriginFromEvent } from "@/lib/view-transition"

import { ShowcaseMobileNav } from "./showcase-mobile-nav"
import { ColorModeToggleCompact } from "./showcase-theme-controls"

export type ShowcaseRoute =
  | "components"
  | "blocks"
  | "preview"
  | "docs"
  | "theme-builder"
  | "accessibility"

const navItems: {
  id: ShowcaseRoute
  label: string
  href: string
  icon: typeof LayersIcon
}[] = [
  { id: "components", label: "Components", href: "/components", icon: SparklesIcon },
  { id: "blocks", label: "Blocks", href: "/blocks", icon: BlocksIcon },
  { id: "preview", label: "Preview", href: "/preview", icon: MonitorPlayIcon },
  { id: "docs", label: "Docs", href: "/docs/getting-started", icon: BookOpenIcon },
  {
    id: "theme-builder",
    label: "Theme Builder",
    href: "/theme-builder",
    icon: PaletteIcon,
  },
]

function resolveActiveRoute(pathname: string): ShowcaseRoute | undefined {
  if (pathname.startsWith("/components")) return "components"
  if (pathname.startsWith("/blocks")) return "blocks"
  if (pathname.startsWith("/preview")) return "preview"
  if (pathname.startsWith("/docs")) return "docs"
  if (pathname.startsWith("/theme-builder")) return "theme-builder"
  if (pathname.startsWith("/accessibility")) return "accessibility"
  return undefined
}

export function ShowcaseTopBar({
  active,
  badge,
  trailing,
  className,
}: {
  active?: ShowcaseRoute
  badge?: string
  trailing?: React.ReactNode
  className?: string
}) {
  const pathname = usePathname()
  const resolvedActive = active ?? resolveActiveRoute(pathname ?? "")
  const { themeId, setThemeId, themes } = useThemeId()

  return (
    <header
      className={cn(
        "showcase-top-bar sticky-bar border-b bg-background/90 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 safe-area-x",
        className
      )}
    >
      <div className="mx-auto flex max-w-[100rem] flex-col gap-2 py-2.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <ShowcaseMobileNav
              items={navItems.map((item) => ({
                ...item,
                active: resolvedActive === item.id,
              }))}
            />
            <Link
              href="/"
              aria-label={siteConfig.name}
              className="flex shrink-0 items-center gap-2 font-heading text-sm font-semibold tracking-tight hover:text-primary"
            >
              <LayersIcon className="size-4 text-primary" aria-hidden />
              <span className="hidden sm:inline">{siteConfig.name}</span>
            </Link>
            {badge ? (
              <Badge
                variant="secondary"
                className="hidden font-mono text-[10px] sm:inline-flex"
              >
                {badge}
              </Badge>
            ) : null}
            <nav className="hidden items-center gap-0.5 md:flex" aria-label="Showcase">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-md px-2.5 py-2 text-xs font-medium transition-colors",
                    resolvedActive === item.id
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="size-3.5" aria-hidden />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <ColorModeToggleCompact />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  aria-label={`Theme: ${themes.find((t) => t.id === themeId)?.name ?? "Select theme"}`}
                >
                  <span
                    className="size-4 rounded-sm border shadow-sm"
                    style={{
                      background:
                        themes.find((t) => t.id === themeId)?.previewGradient ??
                        "var(--primary)",
                    }}
                    aria-hidden
                  />
                  <span className="hidden max-w-[5rem] truncate sm:inline">
                    {themes.find((t) => t.id === themeId)?.name ?? "Theme"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>Switch theme</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="grid grid-cols-2 gap-1.5 p-2">
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
              </DropdownMenuContent>
            </DropdownMenu>
            {trailing}
            <Button size="sm" asChild className="shadow-sm">
              <a
                href={siteConfig.purchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ShoppingBagIcon className="size-3.5" />
                <span className="hidden sm:inline">Buy now</span>
                <span className="sm:hidden">Buy</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
