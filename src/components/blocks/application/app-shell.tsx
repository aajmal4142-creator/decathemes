"use client"

import {
  BarChart3Icon,
  BellIcon,
  HomeIcon,
  LayersIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { getAvatarGradientStyle } from "@/lib/demo/avatars"

const navItems = [
  { label: "Dashboard", icon: HomeIcon, active: true },
  { label: "Analytics", icon: BarChart3Icon, active: false },
  { label: "Customers", icon: UsersIcon, active: false },
  { label: "Settings", icon: SettingsIcon, active: false },
]

function AppShellSidebar() {
  return (
    <SidebarProvider className="min-h-[480px] w-full rounded-xl border">
      <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="flex items-center gap-2 px-2 py-1">
            <LayersIcon className="size-5 text-primary" aria-hidden="true" />
            <span className="font-semibold">DecaThemes</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton isActive={item.active}>
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
            <Avatar size="sm">
              <AvatarFallback
                className="text-[0.65rem] font-semibold text-white"
                style={getAvatarGradientStyle("Alex Morgan")}
              >
                AM
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">Alex Morgan</p>
              <p className="truncate text-xs text-muted-foreground">
                alex@decathemes.com
              </p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-theme-3 border-b px-theme-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <div className="relative flex-1 max-w-sm">
            <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search…" className="h-8 pl-8" aria-label="Search" />
          </div>
          <div className="ml-auto flex items-center gap-theme-2">
            <Button variant="ghost" size="icon" className="relative">
              <BellIcon className="size-4" />
              <Badge className="absolute -top-1 -right-1 size-4 justify-center p-0 text-[10px]">
                3
              </Badge>
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar size="sm">
              <AvatarFallback
                className="text-[0.65rem] font-semibold text-white"
                style={getAvatarGradientStyle("Alex Morgan")}
              >
                AM
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-theme-4 p-theme-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back. Here&apos;s what&apos;s happening today.
            </p>
          </div>
          <div className="grid gap-theme-4 sm:grid-cols-2 lg:grid-cols-3">
            {["Revenue", "Active users", "Conversion"].map((label) => (
              <div
                key={label}
                className="rounded-lg border bg-card p-theme-4 shadow-sm"
              >
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="mt-1 text-2xl font-semibold">—</p>
              </div>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

function AppShellCompact() {
  return (
    <SidebarProvider className="min-h-[360px] w-full rounded-xl border">
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton isActive={item.active} tooltip={item.label}>
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-theme-2 border-b px-theme-3">
          <SidebarTrigger />
          <span className="text-sm font-medium">Overview</span>
        </header>
        <div className="p-theme-4">
          <p className="text-sm text-muted-foreground">
            Compact shell with icon-collapsible sidebar.
          </p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export { AppShellSidebar, AppShellCompact }
