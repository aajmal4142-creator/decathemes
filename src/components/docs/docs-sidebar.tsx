"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { SearchIcon } from "lucide-react"

import { docNavGroups } from "@/docs/registry"
import { cn } from "@/lib/utils"

export function DocsSidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav className={cn("space-y-6", className)} aria-label="Documentation">
      {docNavGroups.map((group) => (
        <div key={group.title}>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {group.title}
          </p>
          <ul className="space-y-1">
            {group.items.map((item) => {
              const href = `/docs/${item.slug}`
              const active = pathname === href

              return (
                <li key={item.slug}>
                  <Link
                    href={href}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export function DocsMobileNav({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        aria-label="Close navigation"
        onClick={() => onOpenChange(false)}
      />
      <div className="absolute inset-y-0 left-0 w-[min(100vw-3rem,18rem)] border-r bg-background p-4 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-semibold">Documentation</span>
          <SearchIcon className="size-4 text-muted-foreground" />
        </div>
        <DocsSidebar />
      </div>
    </div>
  )
}
