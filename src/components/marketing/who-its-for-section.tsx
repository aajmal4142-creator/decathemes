"use client"

import { Building2Icon, Code2Icon, RocketIcon } from "lucide-react"

import { Section } from "@/components/layout/section"
import { MotionCard } from "@/components/motion/motion-card"
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/reveal"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const audiences = [
  {
    icon: Code2Icon,
    title: "Developers",
    description:
      "Ship polished dashboards and marketing pages without rebuilding shadcn from scratch. Copy blocks, swap themes, stay in TypeScript.",
    highlights: ["50+ components", "Strict types", "App Router ready"],
  },
  {
    icon: Building2Icon,
    title: "Agencies",
    description:
      "Pitch ten distinct brand directions from one codebase. Win clients with live previews — brutalist agency site Monday, corporate SaaS Tuesday.",
    highlights: ["10 brand directions", "Client-ready demos", "Fast handoff"],
  },
  {
    icon: RocketIcon,
    title: "Startups",
    description:
      "Launch your MVP with a premium look on day one. Dark mode, responsive layouts, and production blocks included — no design bottleneck.",
    highlights: ["Same-day polish", "9 demo pages", "Lifetime updates"],
  },
]

export function WhoItsForSection() {
  return (
    <Section id="audience" border="y" className="bg-muted/15" containerSize="marketing">
      <Reveal className="mx-auto max-w-2xl text-center">
        <Badge variant="secondary" className="mb-4">
          Who it&apos;s for
        </Badge>
        <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Built for teams that ship
        </h2>
        <p className="mt-4 text-muted-foreground">
          Whether you&apos;re solo, scaling a startup, or delivering for clients —
          Decathemes removes the UI bottleneck.
        </p>
      </Reveal>

      <RevealStagger className="mt-12 grid gap-6 md:grid-cols-3">
        {audiences.map((item) => (
          <RevealItem key={item.title}>
            <MotionCard>
              <Card className="h-full border-border/80 bg-card/60">
                <CardHeader>
                  <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="size-5" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-xs text-muted-foreground before:mr-2 before:text-primary before:content-['•']"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </MotionCard>
          </RevealItem>
        ))}
      </RevealStagger>
    </Section>
  )
}
