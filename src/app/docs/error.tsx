"use client"

import { RouteErrorFallback } from "@/components/layout/route-error"

export default function DocsError({
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
      title="Docs could not load"
      description="Documentation failed to render. Your project files are unaffected — reload this page."
    />
  )
}
