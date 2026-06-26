"use client"

import { RouteErrorFallback } from "@/components/layout/route-error"

export default function DocSlugError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <RouteErrorFallback
      error={error}
      reset={reset}
      title="Doc page failed"
      description="This documentation page could not load. Return to getting started or try again."
    />
  )
}
