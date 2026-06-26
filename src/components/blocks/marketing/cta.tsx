import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

function CtaCentered() {
  return (
    <section className="bg-primary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to transform your design workflow?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Join thousands of teams building faster with DecaThemes. Start your free
            trial today — no credit card required.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" className="min-w-[160px]" asChild>
              <a href="#signup">
                Get started free
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-w-[160px] border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              asChild
            >
              <a href="#contact">Talk to sales</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function CtaSplit() {
  return (
    <section className="border-y border-border bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-border bg-card p-8 sm:p-12 lg:flex-row">
          <div className="max-w-xl text-center lg:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Start building with DecaThemes today
            </h2>
            <p className="mt-3 text-muted-foreground">
              Download the starter kit and have your first themed page live in under 10
              minutes.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#download">Download starter kit</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#docs">Read the docs</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export { CtaCentered, CtaSplit }
