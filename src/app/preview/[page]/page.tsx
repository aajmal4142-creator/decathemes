import dynamic from "next/dynamic"
import { notFound } from "next/navigation"

import {
  demoPages,
  getDemoPage,
  type DemoPageId,
} from "@/components/demo/preview-registry"
import { ShowcaseRouteSkeleton } from "@/components/showcase/showcase-route-skeleton"

import type { Metadata } from "next"

const EmbeddedDemoPage = dynamic(
  () =>
    import("@/components/demo/embedded-demo-page").then((m) => ({
      default: m.EmbeddedDemoPage,
    })),
  { loading: () => <ShowcaseRouteSkeleton /> }
)

const PreviewShell = dynamic(
  () =>
    import("@/components/demo/preview-shell").then((m) => ({
      default: m.PreviewShell,
    })),
  { loading: () => <ShowcaseRouteSkeleton /> }
)

const validIds = new Set<string>(demoPages.map((page) => page.id))

function isDemoPageId(value: string): value is DemoPageId {
  return validIds.has(value)
}

interface PageProps {
  params: Promise<{ page: string }>
  searchParams: Promise<{ embedded?: string; theme?: string }>
}

export function generateStaticParams() {
  return demoPages.map((page) => ({ page: page.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page: pageId } = await params

  if (!isDemoPageId(pageId)) {
    return { title: "Preview — Decathemes" }
  }

  const page = getDemoPage(pageId)

  return {
    title: `${page.label} — Live Preview — Decathemes`,
    description: page.description,
  }
}

export default async function DemoPageRoute({ params, searchParams }: PageProps) {
  const { page: pageId } = await params
  const { embedded, theme } = await searchParams

  if (!isDemoPageId(pageId)) {
    notFound()
  }

  if (embedded === "1") {
    return (
      <EmbeddedDemoPage
        pageId={pageId}
        {...(theme !== undefined ? { themeId: theme } : {})}
      />
    )
  }

  return (
    <PreviewShell
      initialPage={pageId}
      {...(theme !== undefined ? { initialTheme: theme } : {})}
    />
  )
}
