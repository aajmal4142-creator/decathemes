"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { chartPerformanceMixed, chartRevenueMonthly } from "@/lib/demo/data"

const barChartConfig = {
  revenue: { label: "MRR", color: "var(--chart-1)" },
  orders: { label: "Paid seats", color: "var(--chart-2)" },
}

const mixedChartConfig = {
  revenue: { label: "MRR", color: "var(--chart-1)" },
  visitors: { label: "Active users", color: "var(--chart-2)" },
  signups: { label: "Trial signups", color: "var(--chart-3)" },
}

function ChartsPanelBar() {
  const data = chartRevenueMonthly.slice(-6)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue overview</CardTitle>
        <CardDescription>
          Monthly recurring revenue and paid seat growth
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={barChartConfig} className="h-[280px] w-full">
          <BarChart data={data} accessibilityLayer>
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="orders" fill="var(--color-orders)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function ChartsPanelMixed() {
  const data = chartPerformanceMixed.slice(-6)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workspace performance</CardTitle>
        <CardDescription>
          MRR, active users, and trial signups — last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={mixedChartConfig} className="h-[280px] w-full">
          <ComposedChart data={data} accessibilityLayer>
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              yAxisId="left"
              dataKey="revenue"
              fill="var(--color-revenue)"
              radius={[4, 4, 0, 0]}
            />
            <Line
              yAxisId="right"
              dataKey="visitors"
              type="monotone"
              stroke="var(--color-visitors)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              yAxisId="right"
              dataKey="signups"
              type="monotone"
              stroke="var(--color-signups)"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export { ChartsPanelBar, ChartsPanelMixed }
