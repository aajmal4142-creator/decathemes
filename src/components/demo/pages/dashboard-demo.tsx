"use client"

import { StatsCardsWithTrend } from "@/components/blocks/application/stats-cards"
import { DashboardTransactionsTable } from "@/components/demo/dashboard-transactions"
import { DemoAppShell } from "@/components/demo/demo-app-shell"
import { ChartsPanelMixed } from "@/components/demo/demo-lazy"
import { RecentActivityPanel } from "@/components/demo/recent-activity"
import { dashboardCopy } from "@/lib/demo/data"

export function DashboardDemoPage() {
  return (
    <DemoAppShell title={dashboardCopy.title} description={dashboardCopy.description}>
      <StatsCardsWithTrend />
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ChartsPanelMixed />
        </div>
        <div className="lg:col-span-2">
          <RecentActivityPanel />
        </div>
      </div>
      <DashboardTransactionsTable />
    </DemoAppShell>
  )
}
