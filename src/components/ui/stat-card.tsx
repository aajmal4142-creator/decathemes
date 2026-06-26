import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

const statCardVariants = cva("", {
  variants: {
    trend: {
      none: "",
      up: "text-primary",
      down: "text-destructive",
      neutral: "text-muted-foreground",
    },
  },
  defaultVariants: {
    trend: "none",
  },
})

export interface StatCardProps
  extends React.ComponentProps<typeof Card>, VariantProps<typeof statCardVariants> {
  label: string
  value: React.ReactNode
  description?: string
  trendLabel?: string
}

export function StatCard({
  label,
  value,
  description,
  trendLabel,
  trend,
  className,
  ...props
}: StatCardProps) {
  return (
    <Card className={cn(className)} {...props}>
      <CardHeader className="pb-2">
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-3xl font-semibold tabular-nums">{value}</CardTitle>
      </CardHeader>
      {description || trendLabel ? (
        <CardContent className="text-sm">
          {trendLabel ? (
            <p className={cn(statCardVariants({ trend }))}>{trendLabel}</p>
          ) : null}
          {description ? <p className="text-muted-foreground">{description}</p> : null}
        </CardContent>
      ) : null}
    </Card>
  )
}

export { statCardVariants }
