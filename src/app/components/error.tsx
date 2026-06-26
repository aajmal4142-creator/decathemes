"use client"

import { RouteErrorFallback } from "@/components/layout/route-error"

export default function ComponentsError({
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
      title="Gallery error"
      description="The component gallery failed to load. Theme switching and other routes still work."
    />
  )
}
