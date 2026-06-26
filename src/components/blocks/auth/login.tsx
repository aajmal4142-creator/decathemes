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

export function LoginSimple({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="login-simple-heading"
      className={cn("mx-auto w-full max-w-sm px-4 py-8 sm:px-0", className)}
    >
      <div className="space-y-2 text-center sm:text-left">
        <h1
          id="login-simple-heading"
          className="font-heading text-2xl font-semibold tracking-tight text-foreground"
        >
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your account to continue where you left off.
        </p>
      </div>

      <form className="mt-8 space-y-4" onSubmit={(event) => event.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="login-simple-email">Email</Label>
          <Input
            id="login-simple-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="login-simple-password">Password</Label>
            <AuthLink href="#" className="text-xs font-normal">
              Forgot password?
            </AuthLink>
          </div>
          <Input
            id="login-simple-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account? <AuthLink href="#">Create one</AuthLink>
      </p>
    </section>
  )
}

export function LoginWithSocial({ className }: { className?: string }) {
  return (
    <Card className={cn("mx-auto w-full max-w-md", className)}>
      <CardHeader className="text-center">
        <CardTitle id="login-social-heading">Sign in</CardTitle>
        <CardDescription>
          Use your work email or continue with a connected provider.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-2 sm:grid-cols-2">
          <Button type="button" variant="outline" className="w-full">
            Continue with Google
          </Button>
          <Button type="button" variant="outline" className="w-full">
            Continue with GitHub
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>

        <form
          className="space-y-4"
          onSubmit={(event) => event.preventDefault()}
          aria-labelledby="login-social-heading"
        >
          <div className="space-y-2">
            <Label htmlFor="login-social-email">Email</Label>
            <Input
              id="login-social-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-social-password">Password</Label>
            <Input
              id="login-social-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Sign in with email
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t">
        <p className="text-sm text-muted-foreground">
          New here? <AuthLink href="#">Sign up for free</AuthLink>
        </p>
      </CardFooter>
    </Card>
  )
}
