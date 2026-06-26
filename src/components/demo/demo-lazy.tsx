"use client"

import dynamic from "next/dynamic"

import { DemoInlineLoading } from "@/components/demo/demo-states"
import { Skeleton } from "@/components/ui/skeleton"

const chartFallback = (
  <div className="space-y-3 p-6" aria-busy aria-label="Loading chart">
    <Skeleton className="h-4 w-40" />
    <Skeleton className="h-[240px] w-full" />
  </div>
)

/** Lazy-load Recharts — keeps dashboard/analytics routes lighter on first paint. */
export const ChartsPanelBar = dynamic(
  () =>
    import("@/components/blocks/application/charts-panel").then((m) => ({
      default: m.ChartsPanelBar,
    })),
  { loading: () => chartFallback, ssr: false }
)

export const ChartsPanelMixed = dynamic(
  () =>
    import("@/components/blocks/application/charts-panel").then((m) => ({
      default: m.ChartsPanelMixed,
    })),
  { loading: () => chartFallback, ssr: false }
)

export const DemoPageFallback = () => <DemoInlineLoading label="Loading demo…" />
