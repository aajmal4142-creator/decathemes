"use client"

import {
  CheckIcon,
  GaugeIcon,
  MonitorSmartphoneIcon,
  ShieldCheckIcon,
} from "lucide-react"

import { contrastAuditMeta } from "@/lib/accessibility-audit.generated"
import {
  lighthouseAuditMeta,
  lighthouseMinPerformance,
} from "@/lib/lighthouse-audit.generated"
import { cn } from "@/lib/utils"

export function QualityTrustStrip({ className }: { className?: string }) {
  const showLighthouse =
    lighthouseAuditMeta.available &&
    lighthouseMinPerformance !== null &&
    lighthouseMinPerformance >= 95

  const items = [
    showLighthouse
      ? {
          icon: GaugeIcon,
          label: `Lighthouse ${lighthouseMinPerformance}+`,
          detail: `Performance · ${lighthouseAuditMeta.auditedAt}`,
        }
      : null,
    contrastAuditMeta.allThemesPass
      ? {
          icon: ShieldCheckIcon,
          label: "WCAG 2.1 AA",
          detail: `10 themes · ${contrastAuditMeta.auditedAt}`,
        }
      : null,
    {
      icon: MonitorSmartphoneIcon,
      label: "Fully responsive",
      detail: "375 · 768 · 1024 · 1440",
    },
  ].filter(Boolean) as {
    icon: typeof GaugeIcon
    label: string
    detail: string
  }[]

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-3 sm:gap-6",
        className
      )}
      aria-label="Quality verification"
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-xs shadow-sm backdrop-blur-sm"
        >
          <item.icon className="size-3.5 text-primary" aria-hidden />
          <span className="font-medium">{item.label}</span>
          <span className="hidden text-foreground/70 sm:inline">{item.detail}</span>
          <CheckIcon className="size-3 text-primary" aria-hidden />
        </div>
      ))}
    </div>
  )
}
