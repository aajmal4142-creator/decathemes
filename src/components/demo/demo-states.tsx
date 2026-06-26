"use client"

import * as React from "react"

import {
  AlertCircleIcon,
  InboxIcon,
  Loader2Icon,
  PlusIcon,
  RefreshCwIcon,
  SearchXIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export type DemoViewState = "data" | "loading" | "empty" | "error"

export function DemoStateTabs({
  value,
  onChange,
  className,
}: {
  value: DemoViewState
  onChange: (state: DemoViewState) => void
  className?: string
}) {
  const options: { id: DemoViewState; label: string }[] = [
    { id: "data", label: "Data" },
    { id: "loading", label: "Loading" },
    { id: "empty", label: "Empty" },
    { id: "error", label: "Error" },
  ]

  return (
    <div
      className={cn(
        "inline-flex flex-wrap gap-1 rounded-lg border bg-muted/40 p-0.5",
        className
      )}
      role="tablist"
      aria-label="Preview data view state"
    >
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          role="tab"
          aria-selected={value === opt.id}
          onClick={() => onChange(opt.id)}
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
            value === opt.id
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export function DemoLoadingRows({
  rows = 5,
  cols = 4,
}: {
  rows?: number
  cols?: number
}) {
  return (
    <div className="space-y-3" aria-busy aria-label="Loading data">
      {Array.from({ length: rows }).map((_, row) => (
        <div
          key={row}
          className="grid gap-3"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {Array.from({ length: cols }).map((__, col) => (
            <Skeleton key={col} className="h-8 w-full" />
          ))}
        </div>
      ))}
    </div>
  )
}

export function DemoEmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon = InboxIcon,
}: {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  icon?: React.ComponentType<{ className?: string }>
}) {
  return (
    <Empty className="border border-dashed bg-muted/20">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {actionLabel ? (
        <EmptyContent>
          <Button size="sm" onClick={onAction}>
            <PlusIcon className="size-4" />
            {actionLabel}
          </Button>
        </EmptyContent>
      ) : null}
    </Empty>
  )
}

export function DemoErrorState({
  title = "Could not load data",
  description = "Check your connection and try again.",
  onRetry,
}: {
  title?: string
  description?: string
  onRetry?: () => void
}) {
  return (
    <Empty className="border border-destructive/30 bg-destructive/5">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <AlertCircleIcon className="text-destructive" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {onRetry ? (
        <EmptyContent>
          <Button size="sm" variant="outline" onClick={onRetry}>
            <RefreshCwIcon className="size-4" />
            Retry
          </Button>
        </EmptyContent>
      ) : null}
    </Empty>
  )
}

export function DemoNoResults({
  query,
  onClear,
}: {
  query?: string
  onClear?: () => void
}) {
  return (
    <Empty className="border-0 bg-transparent py-8">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchXIcon />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          {query
            ? `Nothing matches "${query}". Try a different search term.`
            : "Adjust your filters to see more results."}
        </EmptyDescription>
      </EmptyHeader>
      {onClear ? (
        <EmptyContent>
          <Button size="sm" variant="outline" onClick={onClear}>
            Clear search
          </Button>
        </EmptyContent>
      ) : null}
    </Empty>
  )
}

export function DemoInlineLoading({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
      <Loader2Icon className="size-4 animate-spin" aria-hidden />
      <span>{label}</span>
    </div>
  )
}
