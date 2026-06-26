import fs from "node:fs"
import path from "node:path"

import { Section } from "@/components/layout/section"
import { Reveal } from "@/components/motion/reveal"
import {
  ThemeSwitchDemoFrame,
  ThemeSwitchVideo,
} from "@/components/marketing/theme-switch-video"
import { Badge } from "@/components/ui/badge"

function hasThemeSwitchDemoVideo(): boolean {
  try {
    return fs.existsSync(
      path.join(process.cwd(), "public/marketing/theme-switch-demo.mp4")
    )
  } catch {
    return false
  }
}

export function ThemeSwitchMedia() {
  const hasVideo = hasThemeSwitchDemoVideo()

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
        <ThemeSwitchDemoFrame hasVideo={hasVideo}>
          {hasVideo ? <ThemeSwitchVideo /> : null}
        </ThemeSwitchDemoFrame>
      </Reveal>
    </Section>
  )
}
