import { Container } from "@/components/layout/container"
import { Skeleton } from "@/components/ui/skeleton"

export function MarketingSectionSkeleton() {
  return (
    <Container className="space-y-6 py-20" aria-busy>
      <Skeleton className="mx-auto h-10 w-64" />
      <Skeleton className="mx-auto h-5 w-full max-w-xl" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-40 rounded-2xl" />
      </div>
    </Container>
  )
}
