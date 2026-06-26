"use client"

import * as React from "react"

import {
  BlogListFeatured,
  BlogPostWithSidebar,
  DocsLayoutToc,
} from "@/components/blocks/block-exports"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const contentViews = [
  { id: "blog-list", label: "Blog index" },
  { id: "blog-post", label: "Blog article" },
  { id: "docs", label: "Documentation" },
] as const

type ContentView = (typeof contentViews)[number]["id"]

export function BlogDemoPage() {
  const [view, setView] = React.useState<ContentView>("blog-list")

  return (
    <div className="min-h-[640px] bg-background">
      <div className="border-b bg-muted/30 px-4 py-3">
        <nav
          className="mx-auto flex max-w-4xl flex-wrap gap-2"
          aria-label="Content pages"
        >
          {contentViews.map((item) => (
            <Button
              key={item.id}
              size="sm"
              variant={view === item.id ? "default" : "outline"}
              onClick={() => setView(item.id)}
              className={cn(view === item.id && "shadow-sm")}
            >
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
      <main>
        {view === "blog-list" ? <BlogListFeatured /> : null}
        {view === "blog-post" ? <BlogPostWithSidebar /> : null}
        {view === "docs" ? <DocsLayoutToc /> : null}
      </main>
    </div>
  )
}
