"use client"

import * as React from "react"

/**
 * Fixed decorative layers that reinforce each theme's visual identity.
 * Pointer-events none — purely atmospheric.
 */
export function ThemeDecorations() {
  const [theme, setTheme] = React.useState("minimal")

  React.useEffect(() => {
    const root = document.documentElement
    const sync = () => setTheme(root.getAttribute("data-theme") ?? "minimal")
    sync()

    const observer = new MutationObserver(sync)
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })
    return () => observer.disconnect()
  }, [])

  if (theme === "playful") {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <svg
          className="absolute -top-16 -right-16 size-64 opacity-40"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M45 120c-20-35 10-70 45-55 30-25 70 5 55 40 35 15 5 55-30 45-25 30-65 5-70-30z"
            fill="oklch(0.88 0.14 90)"
          />
        </svg>
        <svg
          className="absolute -bottom-20 -left-12 size-72 opacity-35"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M150 40c25 0 45 20 40 45 20 10 15 40-10 50-5 30-40 35-60 15-35 5-50-35-30-60 5-35 35-55 60-50z"
            fill="oklch(0.68 0.16 200)"
          />
        </svg>
      </div>
    )
  }

  if (theme === "organic") {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 h-24"
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 96"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 48C360 96 720 0 1080 48s360 48 360 0v48H0z"
            fill="oklch(0.48 0.08 140 / 0.12)"
          />
          <path
            d="M0 64c240-32 480 32 720 0s480-32 720 0v32H0z"
            fill="oklch(0.58 0.09 55 / 0.1)"
          />
        </svg>
      </div>
    )
  }

  if (theme === "glass") {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute top-[12%] left-[8%] size-48 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.16 310 / 0.45), transparent 70%)",
          }}
        />
        <div
          className="absolute right-[10%] bottom-[18%] size-56 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.18 265 / 0.4), transparent 70%)",
          }}
        />
      </div>
    )
  }

  return null
}
