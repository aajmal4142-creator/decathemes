import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

function HeroCentered() {
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6">
            <Sparkles className="size-3" aria-hidden="true" />
            Now in public beta
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Ship beautiful themes in hours, not weeks
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            DecaThemes gives you production-ready design systems, components, and
            layouts so your team can focus on building products customers love.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#get-started">
                Get started free
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#demo">Watch demo</a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required · 14-day free trial
          </p>
        </div>
      </div>
    </section>
  )
}

function HeroSplit() {
  const highlights = ["50+ theme presets", "Dark mode built in", "Figma & code sync"]

  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Badge variant="outline" className="mb-6">
              Design system platform
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              The fastest way to launch a polished product
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              From startup landing pages to enterprise dashboards — pick a theme,
              customize tokens, and deploy with confidence.
            </p>
            <ul className="mt-8 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2
                    className="size-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <a href="#get-started">Start building</a>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <a href="#themes">Browse themes</a>
              </Button>
            </div>
          </div>
          <div
            className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted lg:aspect-auto lg:h-[480px]"
            aria-hidden="true"
          >
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/20">
              <div className="grid grid-cols-2 gap-4 p-8">
                {["Minimal", "Corporate", "Neon", "Glass"].map((theme) => (
                  <div
                    key={theme}
                    className="flex h-28 w-36 items-end rounded-xl border border-border bg-card p-4 shadow-sm"
                  >
                    <span className="text-sm font-medium text-card-foreground">
                      {theme}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroGradient() {
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="mb-6">
            <Sparkles className="size-3" aria-hidden="true" />
            Trusted by 2,000+ teams
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Design once.
            <span className="block text-primary">Ship everywhere.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            One source of truth for your brand. Export to React, Next.js, and Figma with
            a single click.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#signup">Create free account</a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="#pricing">View pricing</a>
            </Button>
          </div>
        </div>
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-8 border-t border-border pt-12 text-center">
          {[
            { value: "10x", label: "Faster launches" },
            { value: "99.9%", label: "Uptime SLA" },
            { value: "24/7", label: "Support" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { HeroCentered, HeroSplit, HeroGradient }
