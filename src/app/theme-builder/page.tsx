import dynamic from "next/dynamic"

import { ShowcaseRouteSkeleton } from "@/components/showcase/showcase-route-skeleton"

import type { Metadata } from "next"

const ThemeBuilderPage = dynamic(
  () =>
    import("@/components/tools/theme-builder-page").then((m) => ({
      default: m.ThemeBuilderPage,
    })),
  { loading: () => <ShowcaseRouteSkeleton /> }
)

export const metadata: Metadata = {
  title: "Theme Builder",
  description:
    "Generate custom theme token CSS with live preview — primary color, radius, fonts, and shadows.",
}

export default function Page() {
  return <ThemeBuilderPage />
}
