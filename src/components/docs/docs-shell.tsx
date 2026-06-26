"use client"

import * as React from "react"

import Link from "next/link"

import { MenuIcon } from "lucide-react"

import { DocsSearch } from "@/components/docs/docs-search"
import { DocsMobileNav, DocsSidebar } from "@/components/docs/docs-sidebar"
import { DocsToc } from "@/components/docs/docs-toc"
import { ShowcaseTopBar } from "@/components/showcase/showcase-top-bar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import type { DocTocItem } from "@/docs/types"

export function DocsShell({
  toc,
  children,
}: {
  toc: DocTocItem[]
  children: React.ReactNode
}) {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false)

  return (
    <div className="showcase-page min-h-screen bg-background [--showcase-bar-height:3.25rem]">
      <ShowcaseTopBar
        active="docs"
        badge="Docs"
        trailing={
          <>
            <Button
              variant="outline"
              size="icon-sm"
              className="lg:hidden"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open documentation menu"
            >
              <MenuIcon className="size-4" />
            </Button>
            <div className="hidden sm:block">
              <DocsSearch />
            </div>
          </>
        }
      />

      <div className="border-b px-4 py-2 sm:hidden">
        <DocsSearch />
      </div>

      <DocsMobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />

      <div className="mx-auto grid max-w-[90rem] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)_200px] lg:px-8">
        <aside className="hidden lg:block">
          <div className="sticky top-[calc(var(--showcase-bar-height)+1.5rem)]">
            <ScrollArea className="h-[calc(100vh-var(--showcase-bar-height)-4rem)] pr-4">
              <DocsSidebar />
            </ScrollArea>
          </div>
        </aside>

        <main className="min-w-0">
          {children}
          <Separator className="my-12" />
          <footer className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <Link href="/docs/getting-started" className="hover:text-foreground">
              Getting started
            </Link>
            <Link href="/preview" className="hover:text-foreground">
              Live preview
            </Link>
            <Link href="/blocks" className="hover:text-foreground">
              Blocks
            </Link>
            <Link href="/accessibility" className="hover:text-foreground">
              Accessibility
            </Link>
          </footer>
        </main>

        <aside className="hidden lg:block">
          <div className="sticky top-[calc(var(--showcase-bar-height)+1.5rem)]">
            <DocsToc items={toc} />
          </div>
        </aside>
      </div>
    </div>
  )
}
