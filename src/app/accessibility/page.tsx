import { AccessibilityPage } from "@/components/marketing/accessibility-page"
import { pageMetadata } from "@/lib/page-metadata"

import type { Metadata } from "next"

export const metadata: Metadata = pageMetadata({
  path: "/accessibility",
  title: "Accessibility Audit — WCAG & Keyboard Navigation",
  description:
    "Decathemes accessibility statement with WCAG 2.2 targets, automated contrast checks, keyboard navigation verification, and known limitations.",
})

export default function Page() {
  return <AccessibilityPage />
}
