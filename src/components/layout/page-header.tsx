import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const pageHeaderVariants = cva("", {
  variants: {
    variant: {
      default: "space-y-2",
      showcase:
        "flex flex-col gap-3 border-b border-border/60 pb-5 sm:flex-row sm:items-end sm:justify-between",
      hero: "space-y-4",
    },
    align: {
      left: "text-left",
      center: "mx-auto max-w-2xl text-center",
    },
  },
  defaultVariants: {
    variant: "default",
    align: "left",
  },
})

export interface PageHeaderProps
  extends
    Omit<React.ComponentProps<"div">, "title">,
    VariantProps<typeof pageHeaderVariants> {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  count?: number
  countLabel?: string
  icon?: React.ReactNode
}

/** Page title block with optional eyebrow, description, and item count (showcase/gallery). */
export function PageHeader({
  className,
  variant,
  align,
  eyebrow,
  title,
  description,
  count,
  countLabel = "items",
  icon,
  ...props
}: PageHeaderProps) {
  const isShowcase = variant === "showcase"

  return (
    <div
      data-slot="page-header"
      className={cn(pageHeaderVariants({ variant, align }), className)}
      {...props}
    >
      <div className={cn(isShowcase && "space-y-2")}>
        {eyebrow ? (
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <div className="flex items-center gap-2">
          {icon}
          {typeof title === "string" ? (
            <h2
              className={cn(
                "font-heading font-semibold tracking-tight",
                variant === "hero"
                  ? "text-fluid-h1"
                  : "text-2xl sm:text-[1.65rem] lg:text-3xl lg:text-4xl"
              )}
            >
              {title}
            </h2>
          ) : (
            title
          )}
        </div>
        {description ? (
          <p
            className={cn(
              "text-muted-foreground",
              variant === "hero"
                ? "text-fluid-body-lg max-w-3xl"
                : "max-w-2xl text-sm leading-relaxed"
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {count !== undefined ? (
        <Badge variant="outline" className="w-fit shrink-0 font-mono text-[10px]">
          {count} {countLabel}
        </Badge>
      ) : null}
    </div>
  )
}

export { pageHeaderVariants }
