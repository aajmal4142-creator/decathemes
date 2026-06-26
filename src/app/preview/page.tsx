import dynamic from "next/dynamic"

import { ShowcaseRouteSkeleton } from "@/components/showcase/showcase-route-skeleton"
import { pageMetadata } from "@/lib/page-metadata"

import type { Metadata } from "next"

const PreviewShell = dynamic(
  () =>
    import("@/components/demo/preview-shell").then((m) => ({
      default: m.PreviewShell,
    })),
  { loading: () => <ShowcaseRouteSkeleton /> }
)

export const metadata: Metadata = pageMetadata({
  path: "/preview",
  title: "Live Preview Hub — 9 Demo Pages Across 10 Themes",
  description:
    "Explore nine full demo pages with live theme switching, viewport presets, and dark mode. The official CodeCanyon interactive preview for Decathemes.",
})

interface PageProps {
  searchParams: Promise<{ theme?: string }>
}

export default async function Page({ searchParams }: PageProps) {
  const { theme } = await searchParams
  return <PreviewShell {...(theme !== undefined ? { initialTheme: theme } : {})} />
}
