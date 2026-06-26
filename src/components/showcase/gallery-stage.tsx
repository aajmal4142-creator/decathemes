"use client"

import { cn } from "@/lib/utils"

/** Bordered canvas for live component demos */
export function GalleryStage({
  children,
  className,
  label,
}: {
  children: React.ReactNode
  className?: string
  label?: string
}) {
  return (
    <div
      className={cn(
        "gallery-stage relative overflow-hidden rounded-xl border border-border/70 bg-muted/25 shadow-[inset_0_1px_0_0_oklch(1_0_0/0.04)]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-background/40 via-transparent to-muted/30"
        aria-hidden
      />
      {label ? (
        <div className="absolute top-2 left-2 z-10">
          <span className="rounded-md border bg-background/80 px-2 py-0.5 font-mono text-[10px] text-muted-foreground backdrop-blur-sm">
            {label}
          </span>
        </div>
      ) : null}
      <div className="relative flex min-h-[7rem] min-w-0 max-w-full flex-wrap items-center justify-center gap-3 overflow-x-auto p-5 sm:min-h-[8rem] sm:p-7">
        {children}
      </div>
    </div>
  )
}
