"use client"

import * as React from "react"

import dynamic from "next/dynamic"
import Link from "next/link"

import {
  ArrowRightIcon,
  BlocksIcon,
  CheckIcon,
  CodeIcon,
  ExternalLinkIcon,
  LayersIcon,
  MenuIcon,
  MoonIcon,
  PaletteIcon,
  RefreshCwIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  SparklesIcon,
  WandSparklesIcon,
  XIcon,
  ZapIcon,
} from "lucide-react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { HeroLiveDemo } from "@/components/marketing/hero-live-demo"
import { MarketingSectionSkeleton } from "@/components/marketing/marketing-section-skeleton"
import { QualityTrustStrip } from "@/components/marketing/quality-trust-strip"
import { ThemeCycleBackground } from "@/components/marketing/theme-cycle-background"
import { MotionCard } from "@/components/motion/motion-card"
import { Reveal } from "@/components/motion/reveal"
import { HeroAutoCycleToggle } from "@/components/showcase/theme-switcher-dock"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

const ThemeSwitchMedia = dynamic(
  () =>
    import("@/components/marketing/theme-switch-media").then((m) => ({
      default: m.ThemeSwitchMedia,
    })),
  { loading: () => <MarketingSectionSkeleton /> }
)

const ThemeGallerySection = dynamic(
  () =>
    import("@/components/marketing/theme-gallery-section").then((m) => ({
      default: m.ThemeGallerySection,
    })),
  { loading: () => <MarketingSectionSkeleton /> }
)

const WhoItsForSection = dynamic(
  () =>
    import("@/components/marketing/who-its-for-section").then((m) => ({
      default: m.WhoItsForSection,
    })),
  { loading: () => <MarketingSectionSkeleton /> }
)

const LazyNewsletterInline = dynamic(
  () =>
    import("@/components/blocks/block-exports").then((m) => ({
      default: m.NewsletterInline,
    })),
  { loading: () => <MarketingSectionSkeleton /> }
)

const PURCHASE_URL = siteConfig.purchaseUrl

const features = [
  {
    icon: LayersIcon,
    title: "50+ components",
    description: "Every shadcn/ui primitive, pre-themed and gallery-documented.",
  },
  {
    icon: PaletteIcon,
    title: "10 themes",
    description:
      "Distinct visual identities — one attribute swaps your entire product.",
  },
  {
    icon: MoonIcon,
    title: "Dark mode",
    description: "Per-theme light and dark token sets with system preference support.",
  },
  {
    icon: SmartphoneIcon,
    title: "Fully responsive",
    description: "Mobile-first layouts across demos, blocks, and component gallery.",
  },
  {
    icon: CodeIcon,
    title: "TypeScript",
    description: "Strict types, App Router patterns, and copy-paste friendly source.",
  },
  {
    icon: BlocksIcon,
    title: "Copy-paste blocks",
    description:
      "62 production sections — marketing, auth, dashboard, commerce, content.",
  },
  {
    icon: SparklesIcon,
    title: "Figma-free",
    description: "Ship directly from code. No design handoff bottleneck required.",
  },
  {
    icon: RefreshCwIcon,
    title: "Lifetime updates",
    description: "Future themes, components, and Next.js compatibility included.",
  },
  {
    icon: WandSparklesIcon,
    title: "Theme Builder",
    description: "Generate and download custom tokens.css with live OKLCH controls.",
  },
]

const included = [
  "10 production-ready themes with full CSS token sets",
  "50+ shadcn/ui components (new-york style)",
  "62 copy-paste page blocks with live previews",
  "Theme Builder — generate & download custom tokens.css",
  "RTL layout toggle with Radix direction support",
  "9 demo templates including CRM, analytics, and AI chat UI",
  "Live preview hub with viewport switcher",
  "Theme engine with radius & font tweaks",
  "Recharts dashboards, data tables, forms",
  "Documentation-ready project structure",
  "MIT-friendly component licensing (shadcn/ui)",
  "Lifetime updates via CodeCanyon",
]

const comparisonRows = [
  {
    label: "Time to first polished UI",
    diy: "2–4 weeks",
    generic: "3–7 days",
    decathemes: "Same day",
  },
  {
    label: "Distinct brand directions",
    diy: "1 (eventually)",
    generic: "1–2",
    decathemes: "10 built-in",
  },
  {
    label: "Full page demos included",
    diy: false,
    generic: false,
    decathemes: true,
  },
  {
    label: "Dark mode per theme",
    diy: "Manual",
    generic: "Partial",
    decathemes: true,
  },
  {
    label: "Next.js 16 + React 19 ready",
    diy: true,
    generic: "Varies",
    decathemes: true,
  },
  {
    label: "Copy-paste blocks",
    diy: false,
    generic: "Limited",
    decathemes: "62 blocks",
  },
]

const testimonials = [
  {
    quote:
      "We swapped our entire marketing site and dashboard shell in an afternoon. Buyers kept asking which agency we hired.",
    name: "Jordan Lee",
    role: "Founder, Stackline",
  },
  {
    quote:
      "The theme switcher alone sold our stakeholders. Ten directions, one codebase — exactly what we needed for the pitch deck.",
    name: "Priya Nair",
    role: "Product Lead, Meridian SaaS",
  },
  {
    quote:
      "Finally a CodeCanyon UI kit that doesn't feel like CodeCanyon. Clean TypeScript, real demos, no Figma dependency.",
    name: "Marcus Webb",
    role: "Independent developer",
  },
]

const faqs = [
  {
    q: "What stack does Decathemes use?",
    a: "Next.js 16 App Router, React 19, Tailwind CSS v4, shadcn/ui (new-york), Radix primitives, and TypeScript throughout.",
  },
  {
    q: "How do I switch themes?",
    a: "Set data-theme on the html element to any of the 10 theme IDs (minimal, brutalist, glass, etc.). The included ThemeProvider handles persistence and dark mode.",
  },
  {
    q: "Can I use this for client projects?",
    a: "Yes. The Regular License covers one end product for you or a client where end users are not charged. The Extended License is required if end users pay to access the product.",
  },
  {
    q: "Do I need Figma files?",
    a: "No. Decathemes is code-first. All components and blocks are copy-paste ready with live previews — no design handoff required.",
  },
  {
    q: "Will I get updates?",
    a: "Yes. Lifetime updates are included with your CodeCanyon purchase — new themes, components, and compatibility fixes as the stack evolves.",
  },
  {
    q: "Is this the live preview link for CodeCanyon?",
    a: "Yes. This homepage and /preview are the official demo environment. Use Live Preview to explore all themes and demo pages before you buy.",
  },
]

const licenses = [
  {
    name: "Regular License",
    price: "$49",
    description:
      "For a single end product where end users are not charged (e.g. internal tools, free SaaS, client sites).",
    features: [
      "One end product",
      "Free to end users",
      "Lifetime updates",
      "9 demo pages + 62 blocks",
      "Standard support",
    ],
    cta: "Buy Regular License",
    highlighted: false,
  },
  {
    name: "Extended License",
    price: "$249",
    description:
      "For a single end product that end users can be charged for (e.g. paid SaaS, marketplace, subscription app).",
    features: [
      "Everything in Regular",
      "Charge end users",
      "Commercial SaaS use",
      "Lifetime updates",
      "Priority support channel",
    ],
    cta: "Buy Extended License",
    highlighted: true,
  },
]

function MarketingNav() {
  const [scrolled, setScrolled] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)

  const navLinks = [
    { href: "#themes", label: "Themes" },
    { href: "#audience", label: "Who it's for" },
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "/docs", label: "Docs" },
    { href: "/theme-builder", label: "Theme Builder" },
    { href: "/preview", label: "Live preview" },
  ]

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky-bar z-50 transition-all duration-300 safe-area-x",
        scrolled
          ? "border-b bg-background/85 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 items-center gap-2 font-semibold">
          <LayersIcon className="size-6 shrink-0 text-primary" aria-hidden="true" />
          <span className="truncate">Decathemes</span>
        </Link>
        <nav
          className="hidden items-center gap-6 text-sm text-muted-foreground md:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                className="md:hidden"
                aria-label="Open menu"
              >
                <MenuIcon className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[min(100vw-2rem,20rem)] safe-area-top safe-area-inset-bottom"
            >
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-11 items-center rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                  <Button variant="outline" asChild>
                    <Link href="/preview" onClick={() => setMenuOpen(false)}>
                      Live preview
                    </Link>
                  </Button>
                  <Button asChild>
                    <a href="#pricing" onClick={() => setMenuOpen(false)}>
                      Buy now
                    </a>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="hidden min-h-11 sm:inline-flex"
          >
            <Link href="/preview">Preview</Link>
          </Button>
          <Button size="sm" asChild className="min-h-11">
            <a href="#pricing">Buy now</a>
          </Button>
        </div>
      </Container>
    </header>
  )
}

function ComparisonCell({
  value,
  positive,
}: {
  value: boolean | string
  positive?: boolean
}) {
  if (typeof value === "boolean") {
    return value ? (
      <CheckIcon className="mx-auto size-5 text-primary" aria-label="Yes" />
    ) : (
      <XIcon className="mx-auto size-5 text-muted-foreground/50" aria-label="No" />
    )
  }

  return <span className={cn(positive && "font-medium text-foreground")}>{value}</span>
}

export function MarketingHome() {
  return (
    <div className="relative flex flex-1 flex-col">
      <MarketingNav />

      {/* Hero — demo first on mobile for instant proof */}
      <section className="relative overflow-hidden">
        <ThemeCycleBackground />
        <Container size="marketing" className="relative py-12 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <HeroLiveDemo className="order-1 lg:order-2" />

            <div className="order-2 text-center lg:order-1 lg:text-left">
              <div className="marketing-hero-in">
                <Badge variant="secondary" className="mb-5 gap-1.5">
                  <ZapIcon className="size-3" />
                  CodeCanyon live preview · Next.js 16 + shadcn/ui
                </Badge>
                <h1 className="text-fluid-h1 font-semibold tracking-tight">
                  One attribute.
                  <span className="block text-primary">Ten distinct products.</span>
                </h1>
                <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground lg:mx-0 sm:text-xl">
                  Change{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                    data-theme
                  </code>{" "}
                  and your fonts, radius, shadows, and colors transform together — ship
                  polished SaaS, storefronts, and dashboards the same day.
                </p>
              </div>

              <div className="marketing-hero-in-delay mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <Button size="lg" asChild className="min-w-[168px] shadow-lg">
                  <Link href="/preview">
                    Live Preview
                    <ArrowRightIcon className="size-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="min-w-[168px]">
                  <a href="#pricing">Buy now</a>
                </Button>
              </div>

              <div className="marketing-hero-in-delay-2 mt-6 flex flex-col items-center gap-4 lg:items-start">
                <HeroAutoCycleToggle />
              </div>
              <div className="marketing-hero-in-delay-3 mt-5">
                <QualityTrustStrip className="justify-center lg:justify-start" />
              </div>
              <p className="marketing-hero-in-delay-3 mt-4 text-sm text-muted-foreground">
                10 themes · 9 demo pages · 62 blocks · Dark mode · TypeScript
              </p>
            </div>
          </div>
        </Container>
      </section>

      <ThemeSwitchMedia />
      <ThemeGallerySection />
      <WhoItsForSection />

      {/* Features */}
      <Section id="features" containerSize="marketing">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need to ship
          </h2>
          <p className="mt-4 text-muted-foreground">
            Not another icon pack. A complete design system, component library, and page
            block collection — ready for production.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.05}>
              <MotionCard>
                <Card className="h-full border-border/80 bg-card/50 transition-colors hover:border-primary/30 hover:bg-card">
                  <CardHeader>
                    <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <feature.icon className="size-5" />
                    </div>
                    <CardTitle className="text-base">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </MotionCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What's included */}
      <Section
        border="y"
        background="muted"
        containerSize="marketing"
        containerClassName="grid gap-12 lg:grid-cols-2 lg:items-center"
      >
        <Reveal>
          <Badge variant="secondary" className="mb-4">
            What&apos;s included
          </Badge>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Open the zip. Start shipping.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every purchase includes the full source, live demos, and documentation
            structure — no upsells, no Figma subscription required.
          </p>
          <Button className="mt-8" asChild>
            <Link href="/preview">
              Explore live preview
              <ExternalLinkIcon className="size-4" />
            </Link>
          </Button>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="grid gap-3 sm:grid-cols-1">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <ShieldCheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Comparison */}
      <Section containerSize="marketing">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Why teams choose Decathemes
          </h2>
          <p className="mt-4 text-muted-foreground">
            Stop rebuilding the same dashboard shell. Compare the real cost of
            alternatives.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <caption className="sr-only">
              Feature comparison: DIY, generic UI kit, and Decathemes
            </caption>
            <thead>
              <tr className="border-b">
                <th scope="col" className="pb-4 text-left font-medium text-foreground">
                  Feature
                </th>
                <th scope="col" className="pb-4 text-center font-medium">
                  DIY from scratch
                </th>
                <th scope="col" className="pb-4 text-center font-medium">
                  Generic UI kit
                </th>
                <th scope="col" className="pb-4 text-center font-medium text-primary">
                  Decathemes
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label} className="border-b border-border/60">
                  <th scope="row" className="py-4 pr-4 text-left font-medium">
                    {row.label}
                  </th>
                  <td className="py-4 text-center text-muted-foreground">
                    <ComparisonCell value={row.diy} />
                  </td>
                  <td className="py-4 text-center text-muted-foreground">
                    <ComparisonCell value={row.generic} />
                  </td>
                  <td className="py-4 text-center">
                    <ComparisonCell value={row.decathemes} positive />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Section>

      {/* Testimonials */}
      <Section
        id="social-proof"
        border="top"
        background="muted"
        containerSize="marketing"
      >
        <Reveal className="text-center">
          <Badge variant="outline" className="mb-4">
            Social proof
          </Badge>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Loved by builders
          </h2>
          <p className="mt-4 text-muted-foreground">
            Placeholder testimonials — replace with real CodeCanyon reviews after
            launch.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.08}>
              <MotionCard>
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <p className="text-sm leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <div className="mt-6 border-t pt-4">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </MotionCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" containerSize="content">
        <Reveal className="text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.q} value={faq.q}>
                <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Section>

      {/* Pricing */}
      <Section id="pricing" border="top" background="muted" containerSize="marketing">
        <div id="buy">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">
              CodeCanyon licenses
            </Badge>
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Simple licensing
            </h2>
            <p className="mt-4 text-muted-foreground">
              Regular and Extended licenses match CodeCanyon tiers. One purchase,
              lifetime updates.
            </p>
          </Reveal>
          <div className="mx-auto mt-12 flex max-w-4xl flex-col gap-8 lg:grid lg:grid-cols-2">
            {[...licenses]
              .sort((a, b) => {
                if (a.highlighted && !b.highlighted) return -1
                if (!a.highlighted && b.highlighted) return 1
                return 0
              })
              .map((license, index) => (
                <Reveal key={license.name} delay={index * 0.1}>
                  <Card
                    className={cn(
                      "relative h-full",
                      license.highlighted &&
                        "order-first border-primary shadow-lg ring-1 ring-primary/20 lg:order-none"
                    )}
                  >
                    {license.highlighted ? (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                        Most popular
                      </Badge>
                    ) : null}
                    <CardHeader>
                      <CardTitle>{license.name}</CardTitle>
                      <CardDescription>{license.description}</CardDescription>
                      <p className="pt-2 text-4xl font-semibold tracking-tight">
                        {license.price}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {license.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <CheckIcon className="size-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={license.highlighted ? "default" : "outline"}
                        asChild
                      >
                        <a
                          href={PURCHASE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {license.cta}
                          <ExternalLinkIcon className="size-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </Reveal>
              ))}
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section containerSize="marketing">
        <Reveal className="relative overflow-hidden rounded-2xl border bg-card px-6 py-16 text-center shadow-xl sm:px-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "linear-gradient(135deg, var(--primary) 0%, transparent 50%, var(--accent) 100%)",
            }}
          />
          <div className="relative">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to ship your next product?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Explore the live preview, pick a theme, and download the full source —
              lifetime updates included with your CodeCanyon license.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild className="min-w-[180px] shadow-lg">
                <a href={PURCHASE_URL} target="_blank" rel="noopener noreferrer">
                  Buy now
                  <ExternalLinkIcon className="size-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="min-w-[180px]">
                <Link href="/preview">Live Preview</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>

      <LazyNewsletterInline />

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <Container className="py-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <LayersIcon className="size-5 text-primary" />
                Decathemes
              </Link>
              <p className="max-w-sm text-sm text-muted-foreground">
                Premium UI themes for Next.js and shadcn/ui. Built for CodeCanyon buyers
                who ship fast.
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Product</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/preview" className="hover:text-foreground">
                    Live preview
                  </Link>
                </li>
                <li>
                  <Link href="/components" className="hover:text-foreground">
                    Components
                  </Link>
                </li>
                <li>
                  <Link href="/blocks" className="hover:text-foreground">
                    Blocks
                  </Link>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-foreground">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium">Resources</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/docs" className="hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/accessibility" className="hover:text-foreground">
                    Accessibility audit
                  </Link>
                </li>
                <li>
                  <Link href="/docs/faq" className="hover:text-foreground">
                    Support
                  </Link>
                </li>
                <li>
                  <a
                    href={PURCHASE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground"
                  >
                    CodeCanyon item
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
            <p>© {new Date().getFullYear()} Decathemes. All rights reserved.</p>
            <p>Regular & Extended licenses via Envato Market.</p>
          </div>
        </Container>
      </footer>
    </div>
  )
}
