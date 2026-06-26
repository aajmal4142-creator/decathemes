"use client"

import { useState, type FormEvent } from "react"

import { Mail, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { submitNewsletter } from "@/lib/newsletter"

function NewsletterInline() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const form = e.currentTarget
    const email = new FormData(form).get("email")

    try {
      await submitNewsletter(String(email))
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="border-y border-border bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="max-w-md text-center lg:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Stay in the loop
            </h2>
            <p className="mt-2 text-muted-foreground">
              Get theme releases, component updates, and design tips delivered to your
              inbox.
            </p>
          </div>
          {submitted ? (
            <p
              className="text-sm font-medium text-primary"
              role="status"
              aria-live="polite"
            >
              Thanks for subscribing! Check your inbox to confirm.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
              aria-label="Newsletter signup"
            >
              <div className="sr-only">
                <Label htmlFor="newsletter-inline-email">Email address</Label>
              </div>
              <Input
                id="newsletter-inline-email"
                name="email"
                type="email"
                placeholder="you@company.com"
                required
                autoComplete="email"
                aria-label="Email address"
                className="flex-1"
                disabled={loading}
              />
              <Button type="submit" className="shrink-0" disabled={loading}>
                {loading ? "Sending…" : "Subscribe"}
                <Send className="size-4" aria-hidden="true" />
              </Button>
              {error ? (
                <p className="text-sm text-destructive sm:col-span-2" role="alert">
                  {error}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function NewsletterCard() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const form = e.currentTarget
    const email = new FormData(form).get("email")

    try {
      await submitNewsletter(String(email))
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
        <Card className="border-border">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10">
              <Mail className="size-6 text-primary" aria-hidden="true" />
            </div>
            <CardTitle className="text-2xl">Join our newsletter</CardTitle>
            <CardDescription>
              Weekly insights on design systems, new theme drops, and best practices
              from the DecaThemes team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <p
                className="text-center text-sm font-medium text-primary"
                role="status"
                aria-live="polite"
              >
                You&apos;re on the list! We&apos;ll be in touch soon.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                aria-label="Newsletter signup"
              >
                <div className="space-y-2">
                  <Label htmlFor="newsletter-card-email">Email address</Label>
                  <Input
                    id="newsletter-card-email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Subscribing…" : "Subscribe to updates"}
                </Button>
                {error ? (
                  <p className="text-center text-sm text-destructive" role="alert">
                    {error}
                  </p>
                ) : null}
                <p className="text-center text-xs text-muted-foreground">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export { NewsletterInline, NewsletterCard }
