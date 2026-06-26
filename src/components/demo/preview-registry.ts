import type { ComponentType } from "react"

import {
  BarChart3Icon,
  BookOpenIcon,
  BotIcon,
  Building2Icon,
  LayoutDashboardIcon,
  LockIcon,
  RocketIcon,
  SettingsIcon,
  ShoppingBagIcon,
} from "lucide-react"

export type DemoPageId =
  | "landing"
  | "dashboard"
  | "auth"
  | "settings"
  | "store"
  | "blog"
  | "crm"
  | "analytics"
  | "ai-chat"

export interface DemoPageDefinition {
  id: DemoPageId
  label: string
  description: string
  icon: ComponentType<{ className?: string }>
  path: string
}

/** Metadata only — components are lazy-loaded in demo-page-loader.tsx */
export const demoPages: DemoPageDefinition[] = [
  {
    id: "landing",
    label: "Landing",
    description: "Marketing site with hero, pricing, FAQ, and footer",
    icon: RocketIcon,
    path: "/preview/landing",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    description: "SaaS app shell with stats, charts, and data table",
    icon: LayoutDashboardIcon,
    path: "/preview/dashboard",
  },
  {
    id: "auth",
    label: "Auth",
    description: "Login, signup, forgot password, and OTP flows",
    icon: LockIcon,
    path: "/preview/auth",
  },
  {
    id: "settings",
    label: "Settings",
    description: "Account area with profile, billing, team, notifications",
    icon: SettingsIcon,
    path: "/preview/settings",
  },
  {
    id: "store",
    label: "Store",
    description: "E-commerce storefront, product detail, and cart",
    icon: ShoppingBagIcon,
    path: "/preview/store",
  },
  {
    id: "blog",
    label: "Blog & Docs",
    description: "Blog index, article layout, and documentation",
    icon: BookOpenIcon,
    path: "/preview/blog",
  },
  {
    id: "crm",
    label: "CRM",
    description: "Admin CRM with contacts table and sales pipeline",
    icon: Building2Icon,
    path: "/preview/crm",
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Multi-chart analytics dashboard with channel breakdown",
    icon: BarChart3Icon,
    path: "/preview/analytics",
  },
  {
    id: "ai-chat",
    label: "AI Chat",
    description: "AI assistant UI with thread sidebar and message stream",
    icon: BotIcon,
    path: "/preview/ai-chat",
  },
]

export function getDemoPage(id: DemoPageId): DemoPageDefinition {
  const found = demoPages.find((page) => page.id === id)
  if (found) return found
  const fallback = demoPages[0]
  if (!fallback) {
    throw new Error("Decathemes: demoPages registry is empty")
  }
  return fallback
}
