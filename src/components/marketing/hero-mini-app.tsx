"use client"

import { TrendingUpIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const chartBars = [38, 52, 44, 68, 58, 82, 64, 90, 72, 78]

/** Compact UI slice — card, button, chart, input — for theme previews. */
export function HeroMiniApp({
  className,
  compact,
}: {
  className?: string
  compact?: boolean
}) {
  return (
    <div
      className={cn(
        "hero-mini-app space-y-3 p-4 sm:space-y-4 sm:p-5",
        compact && "p-3 sm:p-4",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="font-heading text-sm font-semibold tracking-tight sm:text-base">
            Pulse Analytics
          </p>
          <p className="text-[11px] text-muted-foreground sm:text-xs">
            Weekly performance
          </p>
        </div>
        <Badge variant="secondary" className="shrink-0 font-mono text-[10px]">
          +24%
        </Badge>
      </div>

      <Card className="overflow-hidden shadow-sm">
        <CardHeader className={cn("pb-2", compact && "px-3 pt-3")}>
          <CardTitle className={cn("text-sm", compact && "text-xs")}>Revenue</CardTitle>
          <CardDescription className="text-[11px]">
            Last 7 days · live tokens
          </CardDescription>
        </CardHeader>
        <CardContent className={cn("space-y-3 pb-4", compact && "px-3 pb-3")}>
          <div
            className="flex h-14 items-end gap-1 sm:h-16"
            aria-hidden
            role="presentation"
          >
            {chartBars.map((height, index) => (
              <div
                key={index}
                className="flex-1 rounded-sm bg-chart-1 transition-[height,opacity] duration-500"
                style={{
                  height: `${height}%`,
                  opacity: 0.35 + index * 0.065,
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <TrendingUpIcon className="size-3 text-primary" />
            <span>$48.2k MRR</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          placeholder="you@company.com"
          className={cn("h-8 text-xs sm:h-9 sm:flex-1", compact && "h-8")}
          readOnly
          aria-label="Email input demo"
        />
        <Button size={compact ? "sm" : "default"} className="shrink-0">
          Get started
        </Button>
      </div>
    </div>
  )
}
