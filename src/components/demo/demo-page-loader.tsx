"use client"

import type { ComponentType } from "react"

import dynamic from "next/dynamic"

import { DemoPageFallback } from "@/components/demo/demo-lazy"
import type { DemoPageId } from "@/components/demo/preview-registry"

function lazyPage(loader: () => Promise<{ default: ComponentType }>): ComponentType {
  return dynamic(loader, { loading: DemoPageFallback, ssr: false })
}

const demoPageComponents: Record<DemoPageId, ComponentType> = {
  landing: lazyPage(() =>
    import("@/components/demo/pages/landing-demo").then((m) => ({
      default: m.LandingDemoPage,
    }))
  ),
  dashboard: lazyPage(() =>
    import("@/components/demo/pages/dashboard-demo").then((m) => ({
      default: m.DashboardDemoPage,
    }))
  ),
  auth: lazyPage(() =>
    import("@/components/demo/pages/auth-demo").then((m) => ({
      default: m.AuthDemoPage,
    }))
  ),
  settings: lazyPage(() =>
    import("@/components/demo/pages/settings-demo").then((m) => ({
      default: m.SettingsDemoPage,
    }))
  ),
  store: lazyPage(() =>
    import("@/components/demo/pages/store-demo").then((m) => ({
      default: m.StoreDemoPage,
    }))
  ),
  blog: lazyPage(() =>
    import("@/components/demo/pages/blog-demo").then((m) => ({
      default: m.BlogDemoPage,
    }))
  ),
  crm: lazyPage(() =>
    import("@/components/demo/pages/crm-demo").then((m) => ({
      default: m.CrmDemoPage,
    }))
  ),
  analytics: lazyPage(() =>
    import("@/components/demo/pages/analytics-demo").then((m) => ({
      default: m.AnalyticsDemoPage,
    }))
  ),
  "ai-chat": lazyPage(() =>
    import("@/components/demo/pages/ai-chat-demo").then((m) => ({
      default: m.AiChatDemoPage,
    }))
  ),
}

export function LazyDemoPage({ pageId }: { pageId: DemoPageId }) {
  const Page = demoPageComponents[pageId]
  return <Page />
}
