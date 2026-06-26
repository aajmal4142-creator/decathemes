import dynamic from "next/dynamic"

import { ShowcaseRouteSkeleton } from "@/components/showcase/showcase-route-skeleton"
import { pageMetadata } from "@/lib/page-metadata"

import type { Metadata } from "next"

const ThemeBuilderPage = dynamic(
  () =>
    import("@/components/tools/theme-builder-page").then((m) => ({
      default: m.ThemeBuilderPage,
    })),
  { loading: () => <ShowcaseRouteSkeleton /> }
)

export const metadata: Metadata = pageMetadata({
  path: "/theme-builder",
  title: "Theme Builder — Generate Custom tokens.css",
  description:
    "Design custom OKLCH theme tokens with live preview. Tune primary colors, border radius, fonts, and shadows, then download a production-ready tokens.css file.",
})

export default function Page() {
  return <ThemeBuilderPage />
}
