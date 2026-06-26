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
    <div className={cn("border-b bg-muted/20 px-4 py-2.5 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto flex max-w-[100rem] flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <RandomizeThemeButton />
          <div className="flex items-center gap-2 rounded-lg border bg-background/80 px-3 py-1.5">
            <Columns2Icon className="size-3.5 text-muted-foreground" />
            <Label htmlFor="compare-mode" className="text-xs font-medium">
              Compare themes
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
          <div className="flex flex-wrap items-center gap-2">
            <Select value={compareThemeA} onValueChange={setCompareThemeA}>
              <SelectTrigger className="h-8 w-[130px]" aria-label="Theme A">
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
            <span className="text-xs text-muted-foreground">vs</span>
            <Select value={compareThemeB} onValueChange={setCompareThemeB}>
              <SelectTrigger className="h-8 w-[130px]" aria-label="Theme B">
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
          <p className="text-xs text-muted-foreground">
            <ShuffleIcon className="mr-1 inline size-3" />
            Switch themes globally or compare two side-by-side
          </p>
        )}
      </div>
    </div>
  )
}
