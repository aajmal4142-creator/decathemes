import { Check } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const threeTierPlans = [
  {
    name: "Starter",
    price: "$0",
    period: "/month",
    description: "Perfect for side projects and experiments.",
    features: ["3 theme presets", "Basic components", "Community support", "1 project"],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For growing teams shipping production apps.",
    features: [
      "All 10+ themes",
      "Full component library",
      "Priority support",
      "Unlimited projects",
      "Figma plugin access",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with advanced security needs.",
    features: [
      "Everything in Pro",
      "SSO & SAML",
      "Dedicated success manager",
      "Custom SLA",
      "On-premise option",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
]

function PricingThreeTier() {
  return (
    <section className="bg-background py-24 sm:py-32" id="pricing">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            Pricing
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free and scale as you grow. No hidden fees.
          </p>
        </div>
        <div className="mx-auto mt-16 flex flex-col gap-8 lg:grid lg:max-w-5xl lg:grid-cols-3">
          {[...threeTierPlans]
            .sort((a, b) => {
              if (a.highlighted && !b.highlighted) return -1
              if (!a.highlighted && b.highlighted) return 1
              return 0
            })
            .map((plan) => (
              <Card
                key={plan.name}
                className={
                  plan.highlighted
                    ? "relative order-first border-primary shadow-md lg:order-none"
                    : "border-border"
                }
              >
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? "default" : "outline"}
                    asChild
                  >
                    <a href="#signup">{plan.cta}</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </section>
  )
}

const twoTierPlans = [
  {
    name: "Individual",
    price: "$19",
    period: "/month",
    description: "For freelancers and solo developers.",
    features: [
      "All themes & components",
      "Dark mode support",
      "Email support",
      "Commercial license",
    ],
    cta: "Subscribe now",
  },
  {
    name: "Team",
    price: "$49",
    period: "/month per seat",
    description: "For teams collaborating on design systems.",
    features: [
      "Everything in Individual",
      "Shared workspaces",
      "Version history",
      "Team analytics",
      "Slack integration",
    ],
    cta: "Start team trial",
  },
]

function PricingTwoTier() {
  return (
    <section className="bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Choose your plan
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Both plans include a 14-day free trial. Cancel anytime.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
          {twoTierPlans.map((plan) => (
            <Card key={plan.name} className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 border-t border-border pt-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check
                        className="size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" asChild>
                  <a href="#signup">{plan.cta}</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export { PricingThreeTier, PricingTwoTier }
