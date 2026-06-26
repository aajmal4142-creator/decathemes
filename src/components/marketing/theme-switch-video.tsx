"use client"

import * as React from "react"

import { HeroLiveDemo } from "@/components/marketing/hero-live-demo"
import { cn } from "@/lib/utils"

export function ThemeSwitchVideo({
  poster = "/marketing/theme-switch-poster.jpg",
}: {
  poster?: string
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [reduceMotion, setReduceMotion] = React.useState(false)

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  React.useEffect(() => {
    if (reduceMotion) return
    const video = videoRef.current
    if (!video) return
    void video.play().catch(() => {
      /* autoplay blocked — poster remains visible */
    })
  }, [reduceMotion])

  if (reduceMotion) {
    return <HeroLiveDemo className="mx-auto max-w-4xl" />
  }

  return (
    <video
      ref={videoRef}
      className="size-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      poster={poster}
      aria-label="Screen recording of Decathemes switching between visual themes"
    >
      <source src="/marketing/theme-switch-demo.mp4" type="video/mp4" />
    </video>
  )
}

export function ThemeSwitchDemoFrame({
  hasVideo,
  className,
  children,
}: {
  hasVideo: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-2xl border bg-card shadow-xl ring-1 ring-border/50",
        className
      )}
    >
      {hasVideo ? children : <HeroLiveDemo className="size-full rounded-none border-0 shadow-none ring-0" />}
    </div>
  )
}
