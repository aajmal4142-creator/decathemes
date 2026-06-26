/**
 * Site-wide URLs and integration placeholders.
 * Copy .env.example → .env.local and set values before deploying.
 */
export const siteConfig = {
  name: "Decathemes",
  tagline: "10 premium UI themes for Next.js & shadcn/ui",
  description:
    "Production-ready themes, 50+ components, 62 copy-paste blocks, and 9 full demo pages for Next.js 16 and React 19.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://decathemes.vercel.app",
  purchaseUrl: process.env.NEXT_PUBLIC_PURCHASE_URL ?? "https://codecanyon.net",
  /** Set NEXT_PUBLIC_GA_MEASUREMENT_ID for Google Analytics 4 */
  analyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  author: "Decathemes",
  links: {
    docs: "/docs",
    preview: "/preview",
    components: "/components",
    blocks: "/blocks",
    themeBuilder: "/theme-builder",
    accessibility: "/accessibility",
  },
} as const
