"use client"

import { MonitorPlayIcon } from "lucide-react"

import { Section } from "@/components/layout/section"
import { Reveal } from "@/components/motion/reveal"
import { Badge } from "@/components/ui/badge"

/**
 * Placeholder for a ~20s looping screen capture of the theme-switch moment.
 * TODO: Drop in `/public/marketing/theme-switch-demo.mp4` (and optional poster).
 */
export function ThemeSwitchMedia() {
  return (
    <Section
      spacing="compact"
      border="y"
      className="bg-muted/15"
      containerSize="marketing"
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <Badge variant="outline" className="mb-4">
          Theme switch
        </Badge>
        <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          Watch the entire product restyle in one click
        </h2>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          One{" "}
          <code className="rounded bg-muted px-1 font-mono text-xs">data-theme</code>{" "}
          attribute — fonts, radius, shadows, and color tokens update together.
        </p>
      </Reveal>

      <Reveal delay={0.08} className="relative mx-auto mt-10 max-w-4xl">
        <div className="relative aspect-video overflow-hidden rounded-2xl border bg-card shadow-xl ring-1 ring-border/50">
          {/*
            TODO: Replace placeholder with looping capture:
            <video
              className="size-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              poster="/marketing/theme-switch-poster.jpg"
            >
              <source src="/marketing/theme-switch-demo.mp4" type="video/mp4" />
            </video>
          */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-muted/50 via-background to-muted/30 p-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl border bg-background shadow-sm">
              <MonitorPlayIcon className="size-7 text-primary" />
            </div>
            <p className="max-w-sm text-sm font-medium">
              TODO: Drop 20s theme-switch screen capture here
            </p>
            <p className="max-w-md text-xs text-muted-foreground">
              Add{" "}
              <code className="font-mono">/public/marketing/theme-switch-demo.mp4</code>{" "}
              — auto-play, loop, muted. Record the circular wipe from the live preview
              or hero auto-cycle.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
