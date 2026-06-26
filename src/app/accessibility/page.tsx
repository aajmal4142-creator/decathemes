import { AccessibilityPage } from "@/components/marketing/accessibility-page"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Decathemes accessibility statement, WCAG targets, and keyboard navigation verification.",
}

export default function Page() {
  return <AccessibilityPage />
}
