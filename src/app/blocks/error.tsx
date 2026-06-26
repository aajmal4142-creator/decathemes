"use client"

import { RouteErrorFallback } from "@/components/layout/route-error"

export default function BlocksError({
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
      title="Blocks catalog error"
      description="The blocks browser failed to load. Copy-paste blocks in your download are unaffected."
    />
  )
}
