"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import type { NavItem } from "@/types/catalog"

export type MiniNavItem = NavItem

export function ShowcaseMiniNav({
  items,
  activeId,
  onSelect,
  className,
}: {
  items: MiniNavItem[]
  activeId: string
  onSelect: (id: string) => void
  className?: string
}) {
  const navRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    const el = navRef.current?.querySelector(`[data-nav-id="${activeId}"]`)
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
  }, [activeId])

  return (
    <nav
      ref={navRef}
      className={cn(
        "showcase-mini-nav sticky top-[var(--showcase-bar-height,4rem)] z-[45] -mx-4 border-b bg-background/95 px-4 py-2 backdrop-blur-md supports-[backdrop-filter]:bg-background/90 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8",
        className
      )}
      aria-label="Section navigation"
    >
      <div className="mx-auto flex max-w-[100rem] min-w-0 gap-1 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const active = item.id === activeId
          return (
            <button
              key={item.id}
              type="button"
              data-nav-id={item.id}
              onClick={() => onSelect(item.id)}
              className={cn(
                "min-h-11 shrink-0 cursor-pointer rounded-full px-3.5 py-2 text-xs font-medium transition-all",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {item.label}
              {item.count !== undefined ? (
                <span
                  className={cn(
                    "ml-1.5 tabular-nums",
                    active ? "opacity-80" : "opacity-60"
                  )}
                >
                  {item.count}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
