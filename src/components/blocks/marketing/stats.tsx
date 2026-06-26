"use client"

import { Section } from "@/components/layout/section"
import { AnimatedNumber } from "@/components/motion/animated-number"
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/reveal"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/ui/stat-card"

const stats = [
  { label: "Active teams", animate: "2000", suffix: "+" },
  { label: "Theme presets", animate: "50", suffix: "+" },
  { label: "Uptime", animate: "99.9", suffix: "%" },
  { label: "User rating", animate: "4.9", suffix: "/5" },
]

function StatsRow() {
  return (
    <Section
      spacing="compact"
      background="none"
      className="bg-background"
      aria-label="Statistics"
      containerSize="block"
    >
      <RevealStagger>
        <dl className="grid grid-cols-2 gap-8 divide-x-0 lg:grid-cols-4 lg:divide-x lg:divide-border">
          {stats.map((stat) => (
            <RevealItem key={stat.label}>
              <div className="text-center lg:px-4">
                <dt className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  <AnimatedNumber value={stat.animate} />
                  {stat.suffix}
                </dd>
              </div>
            </RevealItem>
          ))}
        </dl>
      </RevealStagger>
    </Section>
  )
}

function StatsWithDescription() {
  return (
    <Section
      spacing="default"
      className="bg-muted/30 py-24 sm:py-32"
      containerSize="block"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Badge variant="outline" className="mb-4">
            By the numbers
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Proven results at scale
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Teams using DecaThemes ship products faster, maintain consistent branding,
            and reduce design debt across their entire organization.
          </p>
        </Reveal>
        <RevealStagger>
          <dl className="grid grid-cols-2 gap-6 sm:gap-8">
            {stats.map((stat) => (
              <RevealItem key={stat.label}>
                <StatCard
                  label={stat.label}
                  value={
                    <>
                      <AnimatedNumber value={stat.animate} />
                      {stat.suffix}
                    </>
                  }
                  className="shadow-sm"
                />
              </RevealItem>
            ))}
          </dl>
        </RevealStagger>
      </div>
    </Section>
  )
}

export { StatsRow, StatsWithDescription }
