"use client"

import { RouteErrorFallback } from "@/components/layout/route-error"

export default function DemoPageError({
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
      title="Demo page failed"
      description="This embedded demo could not render. Try another page from the preview shell."
    />
  )
}
