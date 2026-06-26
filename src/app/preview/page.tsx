import dynamic from "next/dynamic"

import { ShowcaseRouteSkeleton } from "@/components/showcase/showcase-route-skeleton"

import type { Metadata } from "next"

const PreviewShell = dynamic(
  () =>
    import("@/components/demo/preview-shell").then((m) => ({
      default: m.PreviewShell,
    })),
  { loading: () => <ShowcaseRouteSkeleton /> }
)

export const metadata: Metadata = {
  title: "Live Preview — Decathemes",
  description:
    "Preview nine demo pages across all 10 themes — landing, dashboard, CRM, analytics, AI chat, and more.",
}

interface PageProps {
  searchParams: Promise<{ theme?: string }>
}

export default async function Page({ searchParams }: PageProps) {
  const { theme } = await searchParams
  return <PreviewShell {...(theme !== undefined ? { initialTheme: theme } : {})} />
}
