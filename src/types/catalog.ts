/** Shared catalog shapes for blocks, gallery, docs nav, etc. */

export interface CategoryMeta {
  label: string
  description: string
}

export interface CatalogEntry<TCategory extends string = string> {
  id: string
  name: string
  category: TCategory
  description: string
}

export interface NavItem {
  id: string
  label: string
  count?: number
}

export interface RouteNavItem extends NavItem {
  href: string
  active?: boolean
}
