import { Analytics } from "@/components/showcase/analytics"
import { AppProviders } from "@/components/showcase/app-providers"
import { coreFontVariables } from "@/lib/fonts-core"
import { siteConfig } from "@/lib/site-config"
import { THEME_ID_STORAGE_KEY } from "@/lib/theme"
import { defaultThemeId } from "@/themes/_registry"

import type { Metadata, Viewport } from "next"
import "@/styles/globals.css"

const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_ID_STORAGE_KEY)};var d=${JSON.stringify(defaultThemeId)};var t=localStorage.getItem(k)||d;document.documentElement.setAttribute("data-theme",t);var r=localStorage.getItem("decathemes-rtl");if(r==="1"){document.documentElement.setAttribute("dir","rtl");document.documentElement.dataset.rtl="true";}}catch(e){document.documentElement.setAttribute("data-theme",${JSON.stringify(defaultThemeId)});}})();`

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
  ],
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
      "https://decathemes.vercel.app"
  ),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js themes",
    "shadcn ui",
    "React UI kit",
    "Tailwind CSS",
    "design system",
    "dark mode",
    "TypeScript",
  ],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.svg", type: "image/svg+xml" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-theme={defaultThemeId}
      className={`${coreFontVariables} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col overflow-x-clip">
        <AppProviders>{children}</AppProviders>
        <Analytics />
      </body>
    </html>
  )
}
