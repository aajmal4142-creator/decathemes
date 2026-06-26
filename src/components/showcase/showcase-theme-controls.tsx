"use client"

import { ShuffleIcon } from "lucide-react"

import { ColorModeToggle } from "@/components/showcase/color-mode-toggle"
import { useShowcaseCompareOptional } from "@/components/showcase/showcase-compare-context"
import { useThemeId } from "@/components/showcase/theme-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ColorModeToggleCompact({ className }: { className?: string }) {
  return <ColorModeToggle variant="compact" className={className} />
}

export function RandomizeThemeButton({ className }: { className?: string }) {
  const compare = useShowcaseCompareOptional()
  const { themes, setThemeId } = useThemeId()

  const randomize = () => {
    if (compare?.randomizeTheme) {
      compare.randomizeTheme()
      return
    }
    const pick = themes[Math.floor(Math.random() * themes.length)]
    if (pick !== undefined) {
      setThemeId(pick.id)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn("gap-1.5", className)}
      onClick={randomize}
    >
      <ShuffleIcon className="size-3.5" />
      <span className="hidden sm:inline">Random theme</span>
    </Button>
  )
}
