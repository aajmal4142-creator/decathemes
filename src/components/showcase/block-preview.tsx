"use client"

import { BlockThemeCycler } from "@/components/showcase/block-theme-cycler"
import { CopyCodeButton } from "@/components/showcase/copy-code-button"
import { cn } from "@/lib/utils"

export function BlockPreview({
  id,
  name,
  description,
  code,
  children,
  className,
  fullWidth,
}: {
  id: string
  name: string
  description: string
  code: string
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
}) {
  return (
    <article
      id={id}
      className={cn(
        "scroll-mt-40 overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-md ring-1 ring-border/50",
        className
      )}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b bg-gradient-to-r from-muted/40 to-transparent px-4 py-4 sm:px-6">
        <div className="min-w-0 max-w-2xl space-y-1">
          <h3 className="font-heading text-lg font-semibold tracking-tight">{name}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
        <CopyCodeButton code={code} label="Copy block" />
      </header>

      <div
        className={cn(
          "relative bg-background",
          fullWidth
            ? "mx-[calc(-1*var(--block-bleed,0px))] w-[calc(100%+2*var(--block-bleed,0px))] max-w-none"
            : ""
        )}
      >
        <BlockThemeCycler>
          <div
            className={cn(
              "block-preview-canvas min-h-[200px] w-full",
              fullWidth ? "py-0" : "p-1"
            )}
          >
            {children}
          </div>
        </BlockThemeCycler>
      </div>
    </article>
  )
}
