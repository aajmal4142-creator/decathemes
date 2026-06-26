import { AspectRatio } from "@/components/ui/aspect-ratio"
import { getMeshAccent } from "@/lib/demo/images"
import { cn } from "@/lib/utils"

function MeshPattern({ seed }: { seed: string }) {
  const hue = seed.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360

  return (
    <svg
      className="absolute inset-0 size-full opacity-[0.35]"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={`mesh-${seed}`}
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(12)"
        >
          <circle cx="4" cy="4" r="1.5" fill={`oklch(0.65 0.08 ${hue})`} />
          <circle cx="20" cy="16" r="2" fill={`oklch(0.55 0.1 ${(hue + 40) % 360})`} />
        </pattern>
        <linearGradient id={`fade-${seed}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="oklch(0.2 0.02 0 / 0.15)" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#mesh-${seed})`} />
      <rect width="100%" height="100%" fill={`url(#fade-${seed})`} />
    </svg>
  )
}

export function DemoMeshImage({
  id,
  label,
  ratio = 4 / 5,
  className,
}: {
  id: string
  label: string
  ratio?: number
  className?: string
}) {
  const accent = getMeshAccent(id)

  return (
    <AspectRatio
      ratio={ratio}
      className={cn("overflow-hidden rounded-lg bg-muted", className)}
    >
      <div className="relative size-full">
        <MeshPattern seed={id} />
        <div
          className={cn(
            "absolute inset-0 flex items-end bg-gradient-to-br p-theme-4",
            accent
          )}
        >
          <span className="relative text-xs font-medium text-muted-foreground/90">
            {label}
          </span>
        </div>
      </div>
    </AspectRatio>
  )
}
