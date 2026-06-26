import dynamic from "next/dynamic"

import { ShowcaseRouteSkeleton } from "@/components/showcase/showcase-route-skeleton"
import { pageMetadata } from "@/lib/page-metadata"

import type { Metadata } from "next"

const ComponentGalleryPage = dynamic(
  () =>
    import("@/components/showcase/component-gallery-page").then((m) => ({
      default: m.ComponentGalleryPage,
    })),
  { loading: () => <ShowcaseRouteSkeleton /> }
)

export const metadata: Metadata = pageMetadata({
  path: "/components",
  title: "Component Gallery — 50+ shadcn/ui Primitives",
  description:
    "Browse every shadcn/ui component with live demos, code peek, and instant theme switching across all ten Decathemes visual identities.",
})

export default function ComponentsPage() {
  return <ComponentGalleryPage />
}
