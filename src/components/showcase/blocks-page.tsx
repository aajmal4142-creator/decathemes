"use client"

import { LayersIcon, SearchIcon } from "lucide-react"

import {
  blockCategoryMeta,
  blockComponents,
  blockEntries,
  getBlockCode,
  type BlockCategory,
} from "@/components/blocks/_registry"
import { Container } from "@/components/layout/container"
import { EmptyState } from "@/components/layout/empty-state"
import { PageHeader } from "@/components/layout/page-header"
import { Reveal } from "@/components/motion/reveal"
import { BlockPreview } from "@/components/showcase/block-preview"
import { ShowcaseMiniNav } from "@/components/showcase/showcase-mini-nav"
import { ShowcaseSectionHeader } from "@/components/showcase/showcase-section-header"
import { ShowcaseTopBar } from "@/components/showcase/showcase-top-bar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useShowcaseCatalog } from "@/hooks/use-showcase-catalog"

const blockCategoryIds = Object.keys(blockCategoryMeta) as BlockCategory[]

export function BlocksPage() {
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
    categories: blockCategories,
  } = useShowcaseCatalog({
    entries: blockEntries,
    categoryIds: blockCategoryIds,
    categoryMeta: blockCategoryMeta,
  })

  return (
    <div className="showcase-page relative min-h-screen [--block-bleed:0px] [--showcase-bar-height:3.25rem] lg:[--block-bleed:1.5rem]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-accent/8 via-primary/4 to-transparent"
      />

      <ShowcaseTopBar
        active="blocks"
        badge={`${blockEntries.length} blocks`}
        trailing={
          <Popover open={jumpOpen} onOpenChange={setJumpOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="min-h-11 gap-1.5">
                <SearchIcon className="size-3.5" />
                Jump
                <Badge variant="secondary" className="font-mono text-[10px]">
                  ⌘F
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[min(100vw-2rem,26rem)] p-0" align="end">
              <Command>
                <CommandInput placeholder="Jump to block…" />
                <CommandList>
                  <CommandEmpty>No block found.</CommandEmpty>
                  {blockCategories.map((category) => (
                    <CommandGroup key={category.id} heading={category.label}>
                      {blockEntries
                        .filter((e) => e.category === category.id)
                        .map((entry) => (
                          <CommandItem
                            key={entry.id}
                            value={`${entry.name} ${entry.id}`}
                            onSelect={() => scrollTo(entry.id)}
                          >
                            {entry.name}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        }
      />

      <ShowcaseMiniNav
        items={miniNavItems}
        activeId={activeCategory}
        onSelect={(id) => {
          setActiveCategory(id as BlockCategory | "all")
          scrollTo(id)
        }}
      />

      <Container size="showcase" className="py-8">
        <main className="min-w-0 space-y-16">
          <Reveal as="section" className="space-y-4">
            <PageHeader
              variant="hero"
              icon={<LayersIcon className="size-6 text-primary" />}
              title="Block library"
              description={`${blockEntries.length} production-ready sections with full-width previews and per-block theme cycling. Copy any block — toast confirms when it lands on your clipboard.`}
            />
            <div className="relative max-w-md">
              <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter blocks…"
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
                className="scroll-mt-[calc(var(--showcase-bar-height,4rem)+3.5rem)] space-y-8"
              >
                <ShowcaseSectionHeader
                  eyebrow="Collection"
                  title={category.label}
                  description={category.description}
                  count={items.length}
                  countLabel="blocks"
                />
                <div className="grid gap-10">
                  {items.map((entry) => {
                    const Block = blockComponents[entry.componentKey]
                    return (
                      <BlockPreview
                        key={entry.id}
                        id={entry.id}
                        name={entry.name}
                        description={entry.description}
                        code={getBlockCode(entry)}
                        fullWidth={entry.fullWidth ?? true}
                      >
                        <Block />
                      </BlockPreview>
                    )
                  })}
                </div>
              </Reveal>
            )
          })}

          {filtered.length === 0 ? (
            <EmptyState
              title="No blocks match your filter."
              description="Try a different search or category chip above."
            />
          ) : null}
        </main>
      </Container>
    </div>
  )
}
