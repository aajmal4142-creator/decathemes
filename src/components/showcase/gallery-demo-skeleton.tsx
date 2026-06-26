import { Skeleton } from "@/components/ui/skeleton"

export function GalleryDemoSkeleton({ tall }: { tall?: boolean }) {
  return (
    <div className="space-y-3" aria-busy aria-label="Loading demo">
      <Skeleton className="h-4 w-32" />
      <Skeleton className={tall ? "h-48 w-full max-w-md" : "h-28 w-full max-w-md"} />
    </div>
  )
}
