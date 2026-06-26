"use client"

import * as React from "react"

import {
  ActivityIcon,
  BarChart3Icon,
  BellIcon,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

import { DemoAvatar } from "@/components/demo/demo-avatar"
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/reveal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { demoUser, pulseAnalytics } from "@/lib/demo/brand"
import { pickDefined } from "@/lib/optional-props"
import { cn } from "@/lib/utils"

const defaultNav = [
  { label: "Dashboard", icon: HomeIcon },
  { label: "Analytics", icon: BarChart3Icon },
  { label: "Customers", icon: UsersIcon },
  { label: "Settings", icon: SettingsIcon },
]

export function DemoAppShell({
  children,
  title,
  description,
  activeNav = "Dashboard",
  className,
  compact,
}: {
  children: React.ReactNode
  title?: string
  description?: string
  activeNav?: string
  className?: string
  compact?: boolean
}) {
  const navItems = defaultNav.map((item) => ({
    ...item,
    active: item.label === activeNav,
  }))

  return (
    <SidebarProvider
      className={cn(
        "min-h-[640px] w-full bg-background",
        compact && "min-h-[520px]",
        className
      )}
    >
      <Sidebar collapsible={compact ? "icon" : "offcanvas"}>
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="flex items-center gap-2 px-2 py-1">
            <ActivityIcon className="size-5 text-primary" aria-hidden="true" />
            <span className="font-semibold">{pulseAnalytics.name}</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      isActive={item.active}
                      {...pickDefined({ tooltip: compact ? item.label : undefined })}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t border-sidebar-border">
          <div className="flex items-center gap-2 px-2 py-1">
            <DemoAvatar name={demoUser.name} size="sm" />
            <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
              <p className="truncate text-sm font-medium">{demoUser.name}</p>
              <p className="truncate text-xs text-muted-foreground">{demoUser.email}</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="min-w-0">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <div className="relative max-w-sm flex-1">
            <SearchIcon
              className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              placeholder="Search workspaces…"
              className="h-8 pl-8"
              aria-label="Search"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <BellIcon className="size-4" />
              <Badge className="absolute -top-1 -right-1 size-4 justify-center p-0 text-[10px]">
                3
              </Badge>
              <span className="sr-only">Notifications</span>
            </Button>
            <DemoAvatar name={demoUser.name} size="sm" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
          {title ? (
            <Reveal>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                {description ? (
                  <p className="text-sm text-muted-foreground">{description}</p>
                ) : null}
              </div>
            </Reveal>
          ) : null}
          <RevealStagger className="flex flex-col gap-6">
            {React.Children.map(children, (child) => (
              <RevealItem>{child}</RevealItem>
            ))}
          </RevealStagger>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
