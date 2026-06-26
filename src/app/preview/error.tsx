"use client"

import { RouteErrorFallback } from "@/components/layout/route-error"

export default function PreviewError({
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
      title="Preview unavailable"
      description="The live preview could not load. Pick another demo page or reset the theme from the bar."
    />
  )
}
