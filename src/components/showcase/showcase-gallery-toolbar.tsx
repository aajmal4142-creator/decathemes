"use client"

import { Columns2Icon, ShuffleIcon } from "lucide-react"

import { useShowcaseCompare } from "@/components/showcase/showcase-compare-context"
import { RandomizeThemeButton } from "@/components/showcase/showcase-theme-controls"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { themes } from "@/themes/_registry"

export function ShowcaseGalleryToolbar({ className }: { className?: string }) {
  const {
    compareMode,
    setCompareMode,
    compareThemeA,
    compareThemeB,
    setCompareThemeA,
    setCompareThemeB,
  } = useShowcaseCompare()

  return (
    <div
      className={cn(
        "sticky top-[var(--showcase-bar-height,3.25rem)] z-40 border-b bg-muted/20 px-4 py-2.5 backdrop-blur-md supports-[backdrop-filter]:bg-muted/80 sm:px-6 lg:px-8",
        className
      )}
    >
      <div className="mx-auto flex max-w-[100rem] min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
          <RandomizeThemeButton />
          <div className="flex min-h-11 min-w-0 items-center gap-2 rounded-lg border bg-background/80 px-3 py-1.5">
            <Columns2Icon className="size-3.5 shrink-0 text-muted-foreground" />
            <Label htmlFor="compare-mode" className="text-xs font-medium">
              <span className="hidden min-[400px]:inline">Compare themes</span>
              <span className="min-[400px]:hidden">Compare</span>
            </Label>
            <Switch
              id="compare-mode"
              checked={compareMode}
              onCheckedChange={setCompareMode}
              aria-label="Toggle side-by-side theme comparison"
            />
          </div>
          {compareMode ? (
            <Badge variant="secondary" className="font-mono text-[10px]">
              A vs B
            </Badge>
          ) : null}
        </div>

        {compareMode ? (
          <div className="grid w-full min-w-0 grid-cols-1 gap-2 sm:flex sm:w-auto sm:items-center sm:gap-2">
            <Select value={compareThemeA} onValueChange={setCompareThemeA}>
              <SelectTrigger className="min-h-11 w-full sm:w-[140px]" aria-label="Theme A">
                <SelectValue placeholder="Theme A" />
              </SelectTrigger>
              <SelectContent>
                {themes.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="hidden text-center text-xs text-muted-foreground sm:inline">
              vs
            </span>
            <Select value={compareThemeB} onValueChange={setCompareThemeB}>
              <SelectTrigger className="min-h-11 w-full sm:w-[140px]" aria-label="Theme B">
                <SelectValue placeholder="Theme B" />
              </SelectTrigger>
              <SelectContent>
                {themes.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <p className="hidden text-xs text-muted-foreground sm:block">
            <ShuffleIcon className="mr-1 inline size-3" />
            Switch themes globally or compare two side-by-side
          </p>
        )}
      </div>
    </div>
  )
}
