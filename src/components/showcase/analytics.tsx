"use client"

import * as React from "react"

import Script from "next/script"

import { scheduleWhenReady } from "@/lib/defer-idle"
import { siteConfig } from "@/lib/site-config"

/**
 * Analytics placeholder — loads GA4 after idle or first interaction when configured.
 * TODO (buyer): Set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local / Vercel dashboard.
 */
export function Analytics() {
  const id = siteConfig.analyticsId
  const [enabled, setEnabled] = React.useState(false)

  React.useEffect(() => {
    if (!id) return
    return scheduleWhenReady(() => setEnabled(true))
  }, [id])

  if (!id || !enabled) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
