import * as React from "react"

import { SHOWCASE_JUMP_SHORTCUT_KEY, SHOWCASE_SCROLL_OFFSET_MS } from "@/lib/constants"
import type { CatalogEntry, CategoryMeta, NavItem } from "@/types/catalog"

/**
 * Filter, category nav, and jump-to-section logic for `/components` and `/blocks`.
 *
 * @example
 * ```tsx
 * const catalog = useShowcaseCatalog({
 *   entries: galleryEntries,
 *   categoryIds: galleryCategoryIds,
 *   categoryMeta: galleryCategoryMeta,
 * })
 * // catalog.filtered, catalog.scrollTo, catalog.setQuery, …
 * ```
 */
export function useShowcaseCatalog<
  TCategory extends string,
  TEntry extends CatalogEntry<TCategory>,
>({
  entries,
  categoryIds,
  categoryMeta,
}: {
  entries: readonly TEntry[]
  categoryIds: readonly TCategory[]
  categoryMeta: Record<TCategory, CategoryMeta>
}) {
  const categories = React.useMemo(
    () => categoryIds.map((id) => ({ id, ...categoryMeta[id] })),
    [categoryIds, categoryMeta]
  )

  const [query, setQuery] = React.useState("")
  const [activeCategory, setActiveCategory] = React.useState<TCategory | "all">("all")
  const [jumpOpen, setJumpOpen] = React.useState(false)

  const filtered = React.useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return entries.filter((entry) => {
      const matchesCategory =
        activeCategory === "all" || entry.category === activeCategory
      const matchesQuery =
        !normalized ||
        entry.name.toLowerCase().includes(normalized) ||
        entry.id.toLowerCase().includes(normalized) ||
        entry.description.toLowerCase().includes(normalized)
      return matchesCategory && matchesQuery
    })
  }, [entries, query, activeCategory])

  const counts = React.useMemo(() => {
    const map = Object.fromEntries(categoryIds.map((id) => [id, 0])) as Record<
      TCategory,
      number
    >
    for (const entry of entries) {
      map[entry.category] += 1
    }
    return map
  }, [entries, categoryIds])

  const miniNavItems: NavItem[] = React.useMemo(
    () => [
      { id: "all", label: "All", count: entries.length },
      ...categories.map((c) => ({
        id: c.id,
        label: c.label,
        count: counts[c.id],
      })),
    ],
    [categories, counts, entries.length]
  )

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === SHOWCASE_JUMP_SHORTCUT_KEY
      ) {
        event.preventDefault()
        setJumpOpen(true)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const scrollTo = React.useCallback(
    (id: string) => {
      if (id === "all") {
        window.scrollTo({ top: 0, behavior: "smooth" })
        setActiveCategory("all")
        setJumpOpen(false)
        return
      }
      if (categoryIds.some((c) => c === id)) {
        setActiveCategory(id as TCategory)
        window.setTimeout(() => {
          document.getElementById(`section-${id}`)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }, SHOWCASE_SCROLL_OFFSET_MS)
        setJumpOpen(false)
        return
      }
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
      setJumpOpen(false)
    },
    [categoryIds]
  )

  const visibleCategories =
    activeCategory === "all"
      ? categories
      : categories.filter((c) => c.id === activeCategory)

  return {
    query,
    setQuery,
    activeCategory,
    setActiveCategory,
    jumpOpen,
    setJumpOpen,
    filtered,
    counts,
    miniNavItems,
    scrollTo,
    visibleCategories,
    categories,
  }
}
