"use client"

import * as React from "react"

import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import type { ThemeDefinition } from "@/themes/_registry"

export const ThemeSwatchMiniPreview = React.memo(function ThemeSwatchMiniPreview({
  theme,
  className,
}: {
  theme: ThemeDefinition
  className?: string
}) {
  return (
    <div
      data-theme={theme.id}
      className={cn(
        "flex flex-col gap-1 rounded-md border border-border/60 bg-background p-1.5 text-foreground shadow-xs",
        className
      )}
    >
      <div className="flex items-center justify-between gap-1">
        <span className="font-heading text-[11px] font-semibold leading-none tracking-tight">
          Aa
        </span>
        <span className="rounded-[calc(var(--radius)*0.5)] bg-primary px-1 py-0.5 text-[6px] font-medium leading-none text-primary-foreground">
          Go
        </span>
      </div>
      <div className="rounded-[calc(var(--radius)*0.6)] border border-border bg-card p-1 shadow-xs">
        <div className="mb-0.5 h-0.5 w-4/5 rounded-full bg-muted" />
        <div className="h-0.5 w-3/5 rounded-full bg-muted" />
      </div>
    </div>
  )
})

export const ThemeSwatchButton = React.memo(function ThemeSwatchButton({
  theme,
  active,
  onSelect,
  tabIndex = -1,
  onFocus,
  buttonRef,
}: {
  theme: ThemeDefinition
  active: boolean
  onSelect: (event: React.MouseEvent<HTMLButtonElement>) => void
  tabIndex?: number
  onFocus?: () => void
  buttonRef?: React.Ref<HTMLButtonElement>
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      role="option"
      aria-selected={active}
      aria-label={`${theme.name} theme`}
      tabIndex={tabIndex}
      onFocus={onFocus}
      onClick={onSelect}
      className={cn(
        "group relative flex flex-col gap-2 rounded-xl border p-2 text-left outline-none transition-[transform,box-shadow,border-color]",
        "hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring",
        active
          ? "border-primary shadow-md ring-2 ring-ring/40"
          : "border-border/80 bg-card/50 hover:border-primary/40"
      )}
    >
      <div
        className="relative overflow-hidden rounded-lg border border-white/20 shadow-sm"
        style={{ background: theme.previewGradient }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        <div className="relative p-2 pt-6">
          <ThemeSwatchMiniPreview theme={theme} />
        </div>
      </div>
      <div className="px-0.5">
        <p className="truncate text-xs font-semibold">{theme.name}</p>
        <p className="truncate text-[10px] text-muted-foreground">
          {theme.vibes.slice(0, 2).join(" · ")}
        </p>
      </div>
      {active ? (
        <span className="absolute top-2 right-2 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
          <CheckIcon className="size-3" />
        </span>
      ) : null}
    </button>
  )
})
