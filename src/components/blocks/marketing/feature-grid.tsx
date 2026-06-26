import {
  Palette,
  Code2,
  Zap,
  Shield,
  Layers,
  Smartphone,
  Globe,
  BarChart3,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const features = [
  {
    icon: Palette,
    title: "Theme tokens",
    description:
      "Customize colors, typography, and spacing with CSS variables that propagate everywhere instantly.",
  },
  {
    icon: Code2,
    title: "Copy-paste components",
    description:
      "Shadcn-compatible blocks you own. No vendor lock-in, full source access included.",
  },
  {
    icon: Zap,
    title: "Instant preview",
    description:
      "See changes in real time across light, dark, and high-contrast modes before you ship.",
  },
]

function FeatureGridThree() {
  return (
    <section className="bg-background py-24 sm:py-32" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            Features
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to build faster
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A complete toolkit for designers and developers who want to move quickly
            without sacrificing quality.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border">
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="size-5 text-primary" aria-hidden="true" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const bentoItems = [
  {
    icon: Shield,
    title: "Enterprise security",
    description: "SOC 2 compliant with SSO, audit logs, and role-based access.",
    className: "sm:col-span-2",
  },
  {
    icon: Smartphone,
    title: "Mobile first",
    description: "Every block is responsive and touch-friendly out of the box.",
    className: "sm:col-span-1",
  },
  {
    icon: Globe,
    title: "i18n ready",
    description: "RTL support and locale-aware formatting built in.",
    className: "sm:col-span-1",
  },
  {
    icon: Layers,
    title: "Multi-theme",
    description: "Switch between 10+ curated themes or create your own.",
    className: "sm:col-span-1",
  },
  {
    icon: BarChart3,
    title: "Analytics dashboard",
    description:
      "Track component usage, theme adoption, and team activity from one place.",
    className: "sm:col-span-2",
  },
]

function FeatureGridBento() {
  return (
    <section className="bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Badge variant="outline" className="mb-4">
            Platform
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built for teams at every scale
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From solo founders to global enterprises, DecaThemes adapts to your
            workflow.
          </p>
        </div>
        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {bentoItems.map((item) => (
            <Card
              key={item.title}
              className={`border-border bg-card ${item.className}`}
            >
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-secondary">
                  <item.icon
                    className="size-5 text-secondary-foreground"
                    aria-hidden="true"
                  />
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="-mt-4">
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export { FeatureGridThree, FeatureGridBento }
