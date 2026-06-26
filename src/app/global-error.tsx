"use client"

import { RouteErrorFallback } from "@/components/layout/route-error"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <RouteErrorFallback
          error={error}
          reset={reset}
          title="Application error"
          description="Decathemes could not render this view. Reload to recover."
        />
      </body>
    </html>
  )
}
