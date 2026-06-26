import { ThemeIdentityGridCapture } from "@/components/marketing/theme-identity-grid-capture"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Theme identity grid — capture",
  robots: { index: false, follow: false },
}

/** Internal screenshot page — 2×5 grid of the same demo page in all 10 themes. */
export default function ThemeIdentityGridCapturePage() {
  return <ThemeIdentityGridCapture />
}
