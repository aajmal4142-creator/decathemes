"use client"

import * as React from "react"

import { StatsCardsWithTrend } from "@/components/blocks/application/stats-cards"
import { DemoAppShell } from "@/components/demo/demo-app-shell"
import { ChartsPanelBar } from "@/components/demo/demo-lazy"
import {
  DemoEmptyState,
  DemoErrorState,
  DemoInlineLoading,
  DemoStateTabs,
  type DemoViewState,
} from "@/components/demo/demo-states"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { analyticsChannels, analyticsCopy } from "@/lib/demo/data"

export function AnalyticsDemoPage() {
  const [range, setRange] = React.useState("30d")
  const [channelState, setChannelState] = React.useState<DemoViewState>("data")

  return (
    <DemoAppShell
      title="Analytics"
      description={analyticsCopy.description}
      activeNav="Analytics"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Badge variant="outline">Real-time · synced 2 min ago</Badge>
        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <StatsCardsWithTrend />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartsPanelBar />
        </div>
        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-2">
            <div>
              <CardTitle className="text-base">Top channels</CardTitle>
              <CardDescription>Session volume by acquisition source</CardDescription>
            </div>
            <DemoStateTabs
              value={channelState}
              onChange={setChannelState}
              className="shrink-0"
            />
          </CardHeader>
          <CardContent>
            {channelState === "loading" ? (
              <DemoInlineLoading label="Refreshing channels…" />
            ) : channelState === "error" ? (
              <DemoErrorState
                title="Channel data unavailable"
                description="Segment export timed out. Try again or switch date range."
                onRetry={() => setChannelState("data")}
              />
            ) : channelState === "empty" ? (
              <DemoEmptyState
                title="No channel data"
                description="Connect Google Analytics or your ad platforms to see acquisition breakdown."
                actionLabel="Add data source"
                onAction={() => setChannelState("data")}
              />
            ) : (
              <div className="space-y-4">
                {analyticsChannels.map((ch) => (
                  <div
                    key={ch.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <span>{ch.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium tabular-nums">{ch.sessions}</span>
                      <Badge
                        variant={ch.change.startsWith("-") ? "secondary" : "default"}
                        className="font-normal"
                      >
                        {ch.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DemoAppShell>
  )
}
