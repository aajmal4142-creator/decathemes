import dynamic from "next/dynamic"

import { ShowcaseRouteSkeleton } from "@/components/showcase/showcase-route-skeleton"
import { pageMetadata } from "@/lib/page-metadata"

import type { Metadata } from "next"

const BlocksPage = dynamic(
  () =>
    import("@/components/showcase/blocks-page").then((m) => ({
      default: m.BlocksPage,
    })),
  { loading: () => <ShowcaseRouteSkeleton /> }
)

export const metadata: Metadata = pageMetadata({
  path: "/blocks",
  title: "Block Library — 62 Copy-Paste Page Sections",
  description:
    "Preview 62 production page blocks — marketing, auth, dashboards, commerce, and content — with per-block theme cycling and one-click copy.",
})

export default function Page() {
  return <BlocksPage />
}
