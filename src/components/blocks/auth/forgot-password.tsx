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

export function ForgotPasswordSimple({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="forgot-simple-heading"
      className={cn("mx-auto w-full max-w-sm px-4 py-8 sm:px-0", className)}
    >
      <div className="space-y-2 text-center sm:text-left">
        <h1
          id="forgot-simple-heading"
          className="font-heading text-2xl font-semibold tracking-tight text-foreground"
        >
          Reset your password
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter the email associated with your account and we&apos;ll send a reset link.
        </p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={(event) => event.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="forgot-simple-email">Email</Label>
          <Input
            id="forgot-simple-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Send reset link
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Remember your password? <AuthLink href="#">Back to sign in</AuthLink>
      </p>
    </section>
  )
}

export function ForgotPasswordCard({ className }: { className?: string }) {
  return (
    <Card className={cn("mx-auto w-full max-w-md", className)}>
      <CardHeader className="text-center">
        <CardTitle id="forgot-card-heading">Forgot password?</CardTitle>
        <CardDescription>
          No worries — we&apos;ll email you instructions to choose a new password. The
          link expires in 30 minutes.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(event) => event.preventDefault()}
          aria-labelledby="forgot-card-heading"
        >
          <div className="space-y-2">
            <Label htmlFor="forgot-card-email">Account email</Label>
            <Input
              id="forgot-card-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Email reset instructions
          </Button>
        </form>

        <div
          className="mt-6 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground"
          role="note"
        >
          Check your spam folder if nothing arrives within a few minutes.
        </div>
      </CardContent>

      <CardFooter className="justify-center border-t">
        <AuthLink href="#" className="text-sm">
          Return to login
        </AuthLink>
      </CardFooter>
    </Card>
  )
}
