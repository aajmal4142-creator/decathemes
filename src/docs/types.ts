export interface DocTocItem {
  id: string
  title: string
  level: 2 | 3
}

export interface DocPageMeta {
  slug: string
  title: string
  description: string
  section: string
  keywords?: string[]
  toc: DocTocItem[]
}
