"use client"

import { BellIcon, CreditCardIcon, GlobeIcon, ShieldIcon, UserIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function SettingsPageTabs() {
  return (
    <div className="flex flex-col gap-theme-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account preferences and notifications.
        </p>
      </div>
      <Tabs defaultValue="profile" className="max-w-2xl">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-theme-4 space-y-theme-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-theme-4">
              <div className="grid gap-theme-2">
                <Label htmlFor="settings-name">Display name</Label>
                <Input id="settings-name" defaultValue="Alex Morgan" />
              </div>
              <div className="grid gap-theme-2">
                <Label htmlFor="settings-email">Email</Label>
                <Input
                  id="settings-email"
                  type="email"
                  defaultValue="alex@decathemes.com"
                />
              </div>
              <Button size="sm">Save changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="mt-theme-4 space-y-theme-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Choose what you want to be notified about.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-theme-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about your account activity.
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-notifications">Marketing</Label>
                  <p className="text-sm text-muted-foreground">
                    Product news and feature announcements.
                  </p>
                </div>
                <Switch id="marketing-notifications" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="billing" className="mt-theme-4 space-y-theme-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>Manage your subscription plan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-theme-4">
              <div className="grid gap-theme-2">
                <Label htmlFor="settings-plan">Current plan</Label>
                <Select defaultValue="pro">
                  <SelectTrigger id="settings-plan">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="pro">Pro — $29/mo</SelectItem>
                    <SelectItem value="team">Team — $79/mo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button size="sm" variant="outline">
                Update payment method
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const settingsSections = [
  {
    id: "account",
    label: "Account",
    icon: UserIcon,
    description: "Profile and personal details",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: BellIcon,
    description: "Email and push preferences",
  },
  {
    id: "security",
    label: "Security",
    icon: ShieldIcon,
    description: "Password and two-factor auth",
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCardIcon,
    description: "Plans and payment methods",
  },
  {
    id: "language",
    label: "Language",
    icon: GlobeIcon,
    description: "Region and locale settings",
  },
]

function SettingsPageSidebar() {
  return (
    <div className="flex flex-col gap-theme-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Configure your workspace preferences.
        </p>
      </div>
      <div className="flex flex-col gap-theme-6 md:flex-row">
        <nav className="flex shrink-0 flex-col gap-1 md:w-56" aria-label="Settings">
          {settingsSections.map((section, index) => (
            <button
              key={section.id}
              type="button"
              className={`flex items-start gap-theme-3 rounded-lg px-theme-3 py-theme-2 text-left text-sm transition-colors hover:bg-muted ${
                index === 0
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <section.icon className="mt-0.5 size-4 shrink-0" />
              <div>
                <p>{section.label}</p>
                <p className="text-xs text-muted-foreground">{section.description}</p>
              </div>
            </button>
          ))}
        </nav>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Update your profile information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-theme-4">
            <div className="grid gap-theme-2">
              <Label htmlFor="sidebar-settings-name">Full name</Label>
              <Input id="sidebar-settings-name" defaultValue="Alex Morgan" />
            </div>
            <div className="grid gap-theme-2">
              <Label htmlFor="sidebar-settings-bio">Bio</Label>
              <Input
                id="sidebar-settings-bio"
                defaultValue="Product designer at DecaThemes"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sidebar-settings-2fa">Two-factor authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security.
                </p>
              </div>
              <Switch id="sidebar-settings-2fa" />
            </div>
            <Button size="sm">Save changes</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export { SettingsPageTabs, SettingsPageSidebar }
