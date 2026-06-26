"use client"

import { RouteErrorFallback } from "@/components/layout/route-error"

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <RouteErrorFallback error={error} reset={reset} />
}
