import dynamic from "next/dynamic"

import { ThemeSwitchMedia } from "@/components/marketing/theme-switch-media"
import { Skeleton } from "@/components/ui/skeleton"

import { pageMetadata } from "@/lib/page-metadata"
import { siteConfig } from "@/lib/site-config"

import type { Metadata } from "next"

const MarketingHome = dynamic(
  () =>
    import("@/components/marketing/marketing-home").then((m) => ({
      default: m.MarketingHome,
    })),
  {
    loading: () => (
      <div className="flex min-h-[70vh] flex-col gap-6 p-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-16 w-full max-w-2xl" />
        <Skeleton className="h-6 w-full max-w-xl" />
        <div className="flex gap-3">
          <Skeleton className="h-11 w-36" />
          <Skeleton className="h-11 w-36" />
        </div>
      </div>
    ),
  }
)

export const metadata: Metadata = {
  ...pageMetadata({
    path: "/",
    title: "Decathemes — 10 Premium UI Themes for Next.js & shadcn/ui",
    description:
      "Production-ready themes, 50+ components, 62 copy-paste blocks, and 9 full demo pages. The CodeCanyon live preview for serious Next.js teams.",
  }),
  openGraph: {
    title: "Decathemes — 10 Premium UI Themes",
    description:
      "Swap one attribute, transform your entire product. Live preview all 10 themes instantly.",
    url: siteConfig.url,
  },
}

export default function Home() {
  return <MarketingHome themeSwitchMedia={<ThemeSwitchMedia />} />
}
