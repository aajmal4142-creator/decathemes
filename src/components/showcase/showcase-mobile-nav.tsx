"use client"

import * as React from "react"

import Link from "next/link"

import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export type ShowcaseNavItem = {
  id: string
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  active?: boolean
}

export function ShowcaseMobileNav({
  items,
  className,
}: {
  items: ShowcaseNavItem[]
  className?: string
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon-sm"
          className={cn("md:hidden", className)}
          aria-label="Open navigation menu"
        >
          <MenuIcon className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[min(100vw-2rem,20rem)] safe-area-top safe-area-inset-bottom"
      >
        <SheetHeader>
          <SheetTitle>Navigate</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-1" aria-label="Showcase mobile">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                item.active
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="size-4 shrink-0" aria-hidden />
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
