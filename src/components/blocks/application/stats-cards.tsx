"use client"

import {
  ArrowDownIcon,
  ArrowUpIcon,
  ClockIcon,
  CreditCardIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react"

import { AnimatedNumber } from "@/components/motion/animated-number"
import { MotionCard } from "@/components/motion/motion-card"
import { RevealStagger, RevealItem } from "@/components/motion/reveal"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { pulseStats } from "@/lib/demo/data"

const stats = [
  {
    title: "Annual recurring revenue",
    value: "$578k",
    description: "Across 1,284 active workspaces",
    icon: TrendingUpIcon,
  },
  {
    title: "Weekly active users",
    value: "41,860",
    description: "+3,240 vs prior week",
    icon: UsersIcon,
  },
  {
    title: "Paid subscriptions",
    value: "1,296",
    description: "42 renewals due this week",
    icon: CreditCardIcon,
  },
]

const trendIcons = [TrendingUpIcon, UsersIcon, TrendingUpIcon, ClockIcon]

function StatsCardsRow() {
  return (
    <RevealStagger>
      <div className="grid gap-theme-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <RevealItem key={stat.title}>
            <MotionCard>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardDescription>{stat.title}</CardDescription>
                  <stat.icon className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold tracking-tight">
                    <AnimatedNumber value={stat.value} />
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </MotionCard>
          </RevealItem>
        ))}
      </div>
    </RevealStagger>
  )
}

function StatsCardsWithTrend() {
  return (
    <RevealStagger>
      <div className="grid gap-theme-4 sm:grid-cols-2 xl:grid-cols-4">
        {pulseStats.map((stat, index) => {
          const isPositive = stat.change > 0
          const Icon = trendIcons[index] ?? TrendingUpIcon

          return (
            <RevealItem key={stat.title}>
              <MotionCard>
                <Card>
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div className="space-y-1">
                      <CardDescription>{stat.title}</CardDescription>
                      <CardTitle className="text-2xl">
                        <AnimatedNumber value={stat.value} />
                      </CardTitle>
                    </div>
                    <Icon className="size-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={isPositive ? "default" : "secondary"}
                        className="gap-1 font-normal"
                      >
                        {isPositive ? (
                          <ArrowUpIcon className="size-3" />
                        ) : (
                          <ArrowDownIcon className="size-3" />
                        )}
                        {Math.abs(stat.change)}%
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {stat.period}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </MotionCard>
            </RevealItem>
          )
        })}
      </div>
    </RevealStagger>
  )
}

export { StatsCardsRow, StatsCardsWithTrend }
