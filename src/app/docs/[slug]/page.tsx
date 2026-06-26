import dynamic from "next/dynamic"
import { notFound } from "next/navigation"

import { ShowcaseRouteSkeleton } from "@/components/showcase/showcase-route-skeleton"
import { getDocPage, getAllDocPages } from "@/docs/registry"
import { pageMetadata } from "@/lib/page-metadata"

import type { Metadata } from "next"

const DocsShell = dynamic(
  () =>
    import("@/components/docs/docs-shell").then((m) => ({
      default: m.DocsShell,
    })),
  { loading: () => <ShowcaseRouteSkeleton /> }
)

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllDocPages().map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = getDocPage(slug)

  if (!page) {
    return { title: "Docs — Decathemes" }
  }

  return pageMetadata({
    path: `/docs/${slug}`,
    title: `${page.title} — Decathemes Docs`,
    description: page.description,
  })
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params
  const page = getDocPage(slug)

  if (!page) {
    notFound()
  }

  const Content = page.Content

  return (
    <DocsShell toc={page.toc}>
      <Content />
    </DocsShell>
  )
}
