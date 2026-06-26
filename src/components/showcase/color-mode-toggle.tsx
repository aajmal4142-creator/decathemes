"use client"

import * as React from "react"
import { useCallback } from "react"

import { cva, type VariantProps } from "class-variance-authority"
import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { useMounted } from "@/hooks/use-mounted"
import { cn } from "@/lib/utils"
import {
  getTransitionOriginFromEvent,
  runThemeViewTransition,
} from "@/lib/view-transition"

const colorModeToggleVariants = cva("flex items-center gap-0.5", {
  variants: {
    variant: {
      compact: "rounded-lg border bg-muted/40 p-0.5",
      inline: "rounded-lg border bg-muted/40 p-0.5",
      dock: "",
      plain: "",
    },
    iconSize: {
      sm: "[&_svg]:size-3.5",
      md: "[&_svg]:size-4",
    },
  },
  defaultVariants: {
    variant: "compact",
    iconSize: "sm",
  },
})

const COLOR_MODES = [
  { value: "light", icon: SunIcon, label: "Light" },
  { value: "dark", icon: MoonIcon, label: "Dark" },
  { value: "system", icon: LaptopIcon, label: "System" },
] as const

export interface ColorModeToggleProps
  extends React.ComponentProps<"div">, VariantProps<typeof colorModeToggleVariants> {
  skeletonClassName?: string
}

export function ColorModeToggle({
  className,
  variant,
  iconSize,
  skeletonClassName,
  ...props
}: ColorModeToggleProps) {
  const { theme: colorMode, setTheme } = useTheme()
  const mounted = useMounted()

  const setColorMode = useCallback(
    (mode: string, origin?: Parameters<typeof runThemeViewTransition>[1]) => {
      runThemeViewTransition(() => {
        setTheme(mode)
      }, origin)
    },
    [setTheme]
  )

  if (!mounted) {
    if (variant === "dock") return null
    return (
      <div
        className={cn(
          "h-8 w-[88px] rounded-lg border bg-muted/40",
          skeletonClassName,
          className
        )}
        aria-hidden
      />
    )
  }

  return (
    <div
      role="group"
      aria-label="Color mode"
      className={cn(colorModeToggleVariants({ variant, iconSize }), className)}
      {...props}
    >
      {COLOR_MODES.map(({ value, icon: Icon, label }) => (
        <Button
          key={value}
          variant={colorMode === value ? "secondary" : "ghost"}
          size="icon-sm"
          onClick={(event) => setColorMode(value, getTransitionOriginFromEvent(event))}
          aria-label={label}
          title={label}
        >
          <Icon className="size-4" />
        </Button>
      ))}
    </div>
  )
}

export { colorModeToggleVariants }
