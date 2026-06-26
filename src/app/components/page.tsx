import dynamic from "next/dynamic"

import { ShowcaseRouteSkeleton } from "@/components/showcase/showcase-route-skeleton"

import type { Metadata } from "next"

const ComponentGalleryPage = dynamic(
  () =>
    import("@/components/showcase/component-gallery-page").then((m) => ({
      default: m.ComponentGalleryPage,
    })),
  { loading: () => <ShowcaseRouteSkeleton /> }
)

export const metadata: Metadata = {
  title: "Components — Decathemes",
  description:
    "Live component gallery with 50+ shadcn/ui primitives across 10 distinct themes.",
}

export default function ComponentsPage() {
  return <ComponentGalleryPage />
}
