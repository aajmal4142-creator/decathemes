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
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
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

export function OtpVerifySimple({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="otp-simple-heading"
      className={cn("mx-auto w-full max-w-sm px-4 py-8 sm:px-0", className)}
    >
      <div className="space-y-2 text-center">
        <h1
          id="otp-simple-heading"
          className="font-heading text-2xl font-semibold tracking-tight text-foreground"
        >
          Check your inbox
        </h1>
        <p className="text-sm text-muted-foreground">
          We sent a 6-digit code to{" "}
          <span className="font-medium text-foreground">you@company.com</span>. Enter it
          below to verify your sign-in.
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={(event) => event.preventDefault()}>
        <div className="flex flex-col items-center gap-3">
          <label htmlFor="otp-simple-code" className="sr-only">
            One-time verification code
          </label>
          <InputOTP id="otp-simple-code" maxLength={6} autoFocus>
            <InputOTPGroup aria-label="6-digit verification code">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button type="submit" className="w-full">
          Verify and continue
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Didn&apos;t get a code? <AuthLink href="#">Resend email</AuthLink>
      </p>
    </section>
  )
}

export function OtpVerifyCard({ className }: { className?: string }) {
  return (
    <Card className={cn("mx-auto w-full max-w-md", className)}>
      <CardHeader className="text-center">
        <CardTitle id="otp-card-heading">Enter verification code</CardTitle>
        <CardDescription>
          For your security, confirm the code we sent to your device before accessing
          your dashboard.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form
          className="space-y-6"
          onSubmit={(event) => event.preventDefault()}
          aria-labelledby="otp-card-heading"
        >
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="otp-card-code" className="sr-only">
              One-time verification code
            </label>
            <InputOTP id="otp-card-code" maxLength={6}>
              <InputOTPGroup aria-label="6-digit verification code">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <p className="text-xs text-muted-foreground">Code expires in 10 minutes</p>
          </div>

          <Button type="submit" className="w-full">
            Confirm code
          </Button>
        </form>

        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground sm:flex-row sm:justify-center">
          <span>Wrong email?</span>
          <AuthLink href="#">Use a different address</AuthLink>
        </div>
      </CardContent>

      <CardFooter className="justify-center border-t">
        <Button type="button" variant="ghost" size="sm">
          Resend code
        </Button>
      </CardFooter>
    </Card>
  )
}
