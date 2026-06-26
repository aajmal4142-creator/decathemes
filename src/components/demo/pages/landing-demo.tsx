"use client"

import {
  CtaCentered,
  FaqAccordion,
  FeatureGridBento,
  FooterColumns,
  HeroGradient,
  LogoCloudWithHeading,
  NavbarWithCta,
  PricingThreeTier,
  TestimonialCards,
} from "@/components/blocks/block-exports"
import { Reveal } from "@/components/motion/reveal"

export function LandingDemoPage() {
  return (
    <div className="min-h-full bg-background">
      <NavbarWithCta />
      <main>
        <Reveal>
          <HeroGradient />
        </Reveal>
        <Reveal delay={0.05}>
          <LogoCloudWithHeading />
        </Reveal>
        <Reveal delay={0.08}>
          <div id="features">
            <FeatureGridBento />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div id="pricing">
            <PricingThreeTier />
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <TestimonialCards />
        </Reveal>
        <Reveal delay={0.14}>
          <FaqAccordion />
        </Reveal>
        <Reveal delay={0.16}>
          <CtaCentered />
        </Reveal>
      </main>
      <Reveal delay={0.18}>
        <FooterColumns />
      </Reveal>
    </div>
  )
}
