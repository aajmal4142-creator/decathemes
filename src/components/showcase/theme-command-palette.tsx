"use client"

import * as React from "react"

import { CheckIcon } from "lucide-react"

import { useThemeId } from "@/components/showcase/theme-provider"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent } from "@/components/ui/popover"
import { getTransitionOriginFromEvent } from "@/lib/view-transition"

export function ThemeCommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { themeId, setThemeId, themes } = useThemeId()

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverContent
        className="w-[min(100vw-2rem,28rem)] p-0"
        align="end"
        sideOffset={8}
      >
        <Command>
          <CommandInput placeholder="Search themes…" />
          <CommandList>
            <CommandEmpty>No theme found.</CommandEmpty>
            <CommandGroup heading="Themes">
              {themes.map((theme) => (
                <CommandItem
                  key={theme.id}
                  value={`${theme.name} ${theme.id} ${theme.tags.join(" ")} ${theme.vibes.join(" ")}`}
                  onSelect={() => {
                    setThemeId(theme.id, getTransitionOriginFromEvent())
                    onOpenChange(false)
                  }}
                  className="gap-3"
                >
                  <span
                    className="size-8 shrink-0 rounded-md border shadow-sm"
                    style={{ background: theme.previewGradient }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{theme.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {theme.description}
                    </p>
                  </div>
                  {themeId === theme.id ? (
                    <CheckIcon className="size-4 shrink-0 text-primary" />
                  ) : null}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Quick vibes">
              {themes.slice(0, 4).map((theme) => (
                <CommandItem
                  key={`vibe-${theme.id}`}
                  value={`quick ${theme.vibes[0]}`}
                  onSelect={() => {
                    setThemeId(theme.id, getTransitionOriginFromEvent())
                    onOpenChange(false)
                  }}
                >
                  <span className="capitalize">{theme.vibes[0]}</span>
                  <span className="text-muted-foreground">→ {theme.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
