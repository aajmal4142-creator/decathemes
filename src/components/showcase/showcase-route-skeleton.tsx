import { Container } from "@/components/layout/container"
import { Skeleton } from "@/components/ui/skeleton"

export function ShowcaseRouteSkeleton() {
  return (
    <div className="showcase-page min-h-screen [--showcase-bar-height:3.25rem]">
      <div className="flex h-[3.25rem] items-center border-b px-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="ms-auto h-8 w-56" />
      </div>
      <Container className="space-y-6 p-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-5 w-full max-w-2xl" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
      </Container>
    </div>
  )
}
