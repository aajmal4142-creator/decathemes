"use client"

import dynamic from "next/dynamic"

import { SearchIcon, SparklesIcon } from "lucide-react"

import { Container } from "@/components/layout/container"
import { EmptyState } from "@/components/layout/empty-state"
import { PageHeader } from "@/components/layout/page-header"
import { Reveal } from "@/components/motion/reveal"
import { galleryDemos } from "@/components/showcase/gallery-demos"
import { GalleryItem } from "@/components/showcase/gallery-item"
import {
  galleryCategoryMeta,
  galleryEntries,
  type GalleryCategory,
} from "@/components/showcase/gallery-registry"
import { ShowcaseCompareProvider } from "@/components/showcase/showcase-compare-context"
import { ShowcaseGalleryToolbar } from "@/components/showcase/showcase-gallery-toolbar"
import { ShowcaseMiniNav } from "@/components/showcase/showcase-mini-nav"
import { ShowcaseSectionHeader } from "@/components/showcase/showcase-section-header"
import { ShowcaseTopBar } from "@/components/showcase/showcase-top-bar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useShowcaseCatalog } from "@/hooks/use-showcase-catalog"

const GalleryJumpPalette = dynamic(
  () =>
    import("@/components/showcase/gallery-jump-palette").then((m) => ({
      default: m.GalleryJumpPalette,
    })),
  { ssr: false }
)

const galleryCategoryIds = Object.keys(galleryCategoryMeta) as GalleryCategory[]

function ComponentGalleryContent() {
  const {
    query,
    setQuery,
    activeCategory,
    setActiveCategory,
    jumpOpen,
    setJumpOpen,
    filtered,
    miniNavItems,
    scrollTo,
    visibleCategories,
  } = useShowcaseCatalog({
    entries: galleryEntries,
    categoryIds: galleryCategoryIds,
    categoryMeta: galleryCategoryMeta,
  })

  return (
    <div className="showcase-page relative min-h-screen [--showcase-bar-height:3.25rem]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-primary/6 via-transparent to-transparent"
      />

      <ShowcaseTopBar
        active="components"
        badge={`${galleryEntries.length} components`}
        trailing={
          <>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => setJumpOpen(true)}
            >
              <SearchIcon className="size-3.5" />
              Jump
              <Badge variant="secondary" className="font-mono text-[10px]">
                ⌘F
              </Badge>
            </Button>
            {jumpOpen ? (
              <GalleryJumpPalette
                open={jumpOpen}
                onOpenChange={setJumpOpen}
                onJump={scrollTo}
              />
            ) : null}
          </>
        }
      />

      <ShowcaseGalleryToolbar />

      <ShowcaseMiniNav
        items={miniNavItems}
        activeId={activeCategory}
        onSelect={(id) => {
          setActiveCategory(id as GalleryCategory | "all")
          scrollTo(id)
        }}
      />

      <Container size="showcase" className="py-8">
        <main className="min-w-0 space-y-14">
          <Reveal as="section" className="space-y-4">
            <PageHeader
              variant="hero"
              icon={<SparklesIcon className="size-5 text-primary" />}
              title="Component gallery"
              description="Every shadcn/ui primitive on a live stage — switch themes from the bar above, randomize for inspiration, or compare two themes side-by-side on any component."
            />
            <div className="relative max-w-md">
              <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter components…"
                className="h-9 pl-9"
              />
            </div>
          </Reveal>

          {visibleCategories.map((category) => {
            const items = filtered.filter((e) => e.category === category.id)
            if (items.length === 0) return null

            return (
              <Reveal
                key={category.id}
                as="section"
                id={`section-${category.id}`}
                className="scroll-mt-44 space-y-6"
              >
                <ShowcaseSectionHeader
                  eyebrow="Category"
                  title={category.label}
                  description={category.description}
                  count={items.length}
                  countLabel="components"
                />
                <div className="grid gap-5 xl:grid-cols-2">
                  {items.map((entry) => {
                    const Demo = galleryDemos[entry.demoKey]
                    return (
                      <GalleryItem
                        key={entry.id}
                        id={entry.id}
                        name={entry.name}
                        description={entry.description}
                        code={entry.code}
                      >
                        <Demo />
                      </GalleryItem>
                    )
                  })}
                </div>
              </Reveal>
            )
          })}

          {filtered.length === 0 ? (
            <EmptyState
              title="No components match your filter."
              description="Try a different search term or category."
            />
          ) : null}
        </main>
      </Container>
    </div>
  )
}

export function ComponentGalleryPage() {
  return (
    <ShowcaseCompareProvider>
      <ComponentGalleryContent />
    </ShowcaseCompareProvider>
  )
}
