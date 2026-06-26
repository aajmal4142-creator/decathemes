import dynamic from "next/dynamic"

import { ShowcaseRouteSkeleton } from "@/components/showcase/showcase-route-skeleton"

import type { Metadata } from "next"

const BlocksPage = dynamic(
  () =>
    import("@/components/showcase/blocks-page").then((m) => ({
      default: m.BlocksPage,
    })),
  { loading: () => <ShowcaseRouteSkeleton /> }
)

export const metadata: Metadata = {
  title: "Blocks — Decathemes",
  description:
    "62 copy-paste page sections across marketing, auth, dashboards, commerce, and content — fully theme-aware.",
}

export default function Page() {
  return <BlocksPage />
}
