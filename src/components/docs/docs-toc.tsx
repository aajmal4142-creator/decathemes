"use client"

import * as React from "react"

import type { DocTocItem } from "@/docs/types"
import { cn } from "@/lib/utils"

export function DocsToc({
  items,
  className,
}: {
  items: DocTocItem[]
  className?: string
}) {
  const [activeId, setActiveId] = React.useState<string | null>(null)

  React.useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: [0, 0.25, 0.5, 1] }
    )

    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className={cn("space-y-3", className)} aria-label="On this page">
      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        On this page
      </p>
      <ul className="space-y-1 border-l border-border text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block border-l-2 py-1 text-muted-foreground transition-colors hover:text-foreground",
                item.level === 3 ? "pl-5" : "pl-3",
                activeId === item.id
                  ? "border-primary font-medium text-foreground"
                  : "border-transparent"
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
