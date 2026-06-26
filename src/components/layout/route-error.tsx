"use client"

import Link from "next/link"

import { LayersIcon, RefreshCwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

/** Branded Next.js route error UI — used by route segment error.tsx files. */
export function RouteErrorFallback({
  error,
  reset,
  title = "Something went wrong",
  description = "This page hit an unexpected error. Your theme and settings are unchanged — try again or return home.",
}: {
  error: Error & { digest?: string }
  reset: () => void
  title?: string
  description?: string
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center section-px py-16">
      <Card className="w-full max-w-md border-border/80 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <LayersIcon className="size-6" aria-hidden />
          </div>
          <CardTitle className="font-heading text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {process.env.NODE_ENV === "development" && error.message ? (
            <p className="rounded-lg bg-muted px-3 py-2 font-mono text-xs text-muted-foreground break-all">
              {error.message}
            </p>
          ) : error.digest ? (
            <p className="text-xs text-muted-foreground">Reference: {error.digest}</p>
          ) : null}
        </CardContent>
        <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button onClick={reset} className="gap-2">
            <RefreshCwIcon className="size-4" />
            Try again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
