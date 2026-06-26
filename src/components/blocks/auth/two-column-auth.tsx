"use client"

import Link from "next/link"

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Separator,
} from "@/components/ui"
import { cn } from "@/lib/utils"

function AuthLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "text-primary underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className
      )}
    >
      {children}
    </Link>
  )
}

export function TwoColumnAuthImage({ className }: { className?: string }) {
  return (
    <div className={cn("grid min-h-svh w-full lg:grid-cols-2", className)}>
      <div
        className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex"
        aria-hidden="true"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-foreground/10 via-transparent to-primary-foreground/5"
          aria-hidden="true"
        />
        <div className="relative z-10">
          <p className="font-heading text-lg font-semibold tracking-tight">
            Decathemes
          </p>
        </div>
        <blockquote className="relative z-10 max-w-md space-y-4">
          <p className="text-lg leading-relaxed text-primary-foreground/90">
            &ldquo;Switching themes took minutes, not weeks. Our team ships polished UI
            without fighting design tokens.&rdquo;
          </p>
          <footer className="text-sm text-primary-foreground/70">
            — Jordan Lee, Product Lead
          </footer>
        </blockquote>
        <p className="relative z-10 text-xs text-primary-foreground/60">
          Trusted by 2,000+ product teams worldwide
        </p>
      </div>

      <div className="flex items-center justify-center bg-background px-4 py-10 sm:px-8">
        <section aria-labelledby="two-col-image-heading" className="w-full max-w-sm">
          <div className="mb-8 space-y-2 lg:hidden">
            <p className="font-heading text-sm font-semibold text-primary">
              Decathemes
            </p>
          </div>

          <div className="space-y-2">
            <h1
              id="two-col-image-heading"
              className="font-heading text-2xl font-semibold tracking-tight text-foreground"
            >
              Sign in to your workspace
            </h1>
            <p className="text-sm text-muted-foreground">
              Access projects, billing, and team settings from one place.
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={(event) => event.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="two-col-image-email">Email</Label>
              <Input
                id="two-col-image-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="two-col-image-password">Password</Label>
                <AuthLink href="#" className="text-xs font-normal">
                  Forgot password?
                </AuthLink>
              </div>
              <Input
                id="two-col-image-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Need an account? <AuthLink href="#">Request access</AuthLink>
          </p>
        </section>
      </div>
    </div>
  )
}

export function TwoColumnAuthSplit({ className }: { className?: string }) {
  return (
    <div className={cn("grid min-h-svh w-full bg-muted/30 lg:grid-cols-2", className)}>
      <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-primary">New here?</p>
            <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Build faster with a design system that adapts to your brand.
            </h1>
            <p className="text-muted-foreground">
              Ten production-ready themes, accessible components, and blocks you can
              drop into any Next.js app.
            </p>
          </div>

          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span
                className="mt-1 size-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden="true"
              />
              Theme tokens for color, radius, and typography
            </li>
            <li className="flex gap-2">
              <span
                className="mt-1 size-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden="true"
              />
              Light and dark mode on every theme
            </li>
            <li className="flex gap-2">
              <span
                className="mt-1 size-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden="true"
              />
              Copy-paste blocks for auth, marketing, and dashboards
            </li>
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-10 sm:px-8">
        <Card className="w-full max-w-md border-border bg-card shadow-md">
          <CardHeader>
            <CardTitle id="two-col-split-heading">Create an account</CardTitle>
            <CardDescription>
              Join with your work email to start a free trial today.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form
              className="space-y-4"
              onSubmit={(event) => event.preventDefault()}
              aria-labelledby="two-col-split-heading"
            >
              <div className="space-y-2">
                <Label htmlFor="two-col-split-name">Full name</Label>
                <Input
                  id="two-col-split-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="two-col-split-email">Email</Label>
                <Input
                  id="two-col-split-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="two-col-split-password">Password</Label>
                <Input
                  id="two-col-split-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Start free trial
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account? <AuthLink href="#">Sign in instead</AuthLink>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
