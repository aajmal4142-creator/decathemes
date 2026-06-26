"use client"

import Link from "next/link"

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Label,
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

export function SignupSimple({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="signup-simple-heading"
      className={cn("mx-auto w-full max-w-sm px-4 py-8 sm:px-0", className)}
    >
      <div className="space-y-2 text-center sm:text-left">
        <h1
          id="signup-simple-heading"
          className="font-heading text-2xl font-semibold tracking-tight text-foreground"
        >
          Create your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Start your 14-day trial. No credit card required.
        </p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={(event) => event.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="signup-simple-name">Full name</Label>
          <Input
            id="signup-simple-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Alex Morgan"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-simple-email">Work email</Label>
          <Input
            id="signup-simple-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-simple-password">Password</Label>
          <Input
            id="signup-simple-password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
          />
          <p className="text-xs text-muted-foreground">
            Use at least 8 characters with a mix of letters and numbers.
          </p>
        </div>

        <Button type="submit" className="w-full">
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account? <AuthLink href="#">Sign in</AuthLink>
      </p>
    </section>
  )
}

export function SignupWithTerms({ className }: { className?: string }) {
  return (
    <Card className={cn("mx-auto w-full max-w-md", className)}>
      <CardHeader>
        <CardTitle id="signup-terms-heading">Join the workspace</CardTitle>
        <CardDescription>
          Set up your profile and invite teammates after you verify your email.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(event) => event.preventDefault()}
          aria-labelledby="signup-terms-heading"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="signup-terms-first">First name</Label>
              <Input
                id="signup-terms-first"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-terms-last">Last name</Label>
              <Input
                id="signup-terms-last"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-terms-email">Email</Label>
            <Input
              id="signup-terms-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-terms-password">Password</Label>
            <Input
              id="signup-terms-password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-3">
            <Checkbox
              id="signup-terms-accept"
              name="terms"
              required
              aria-describedby="signup-terms-description"
            />
            <div className="grid gap-1 leading-none">
              <Label
                htmlFor="signup-terms-accept"
                className="text-sm font-normal leading-snug"
              >
                I agree to the Terms of Service and Privacy Policy
              </Label>
              <p
                id="signup-terms-description"
                className="text-xs text-muted-foreground"
              >
                You can update notification preferences anytime in account settings.
              </p>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Get started
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t">
        <p className="text-sm text-muted-foreground">
          Already registered? <AuthLink href="#">Log in</AuthLink>
        </p>
      </CardFooter>
    </Card>
  )
}
