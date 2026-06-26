"use client"

import { UsersIcon } from "lucide-react"

import { DemoAppShell } from "@/components/demo/demo-app-shell"
import { DemoAvatar } from "@/components/demo/demo-avatar"
import { Badge } from "@/components/ui/badge"
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
import { demoUser, pulseAnalytics } from "@/lib/demo/brand"
import { settingsTeam } from "@/lib/demo/data"

export function SettingsDemoPage() {
  return (
    <DemoAppShell
      activeNav="Settings"
      title="Settings"
      description={`Manage your ${pulseAnalytics.name} workspace, billing, and team.`}
    >
      <Tabs defaultValue="profile" className="max-w-3xl">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Update your personal information and avatar.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <DemoAvatar name={demoUser.name} className="size-16" />
                <Button variant="outline" size="sm">
                  Upload photo
                </Button>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="demo-name">Display name</Label>
                <Input id="demo-name" defaultValue={demoUser.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="demo-email">Email</Label>
                <Input id="demo-email" type="email" defaultValue={demoUser.email} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="demo-bio">Role</Label>
                <Input id="demo-bio" defaultValue={demoUser.role} />
              </div>
              <Button size="sm">Save changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>
                Manage your subscription and payment methods.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Scale plan</p>
                  <p className="text-sm text-muted-foreground">
                    $890/month · Renews Jul 1, 2026
                  </p>
                </div>
                <Badge>Active</Badge>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="demo-plan">Change plan</Label>
                <Select defaultValue="scale">
                  <SelectTrigger id="demo-plan">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter — $79/mo</SelectItem>
                    <SelectItem value="growth">Growth — $249/mo</SelectItem>
                    <SelectItem value="scale">Scale — $890/mo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Update payment method
                </Button>
                <Button size="sm" variant="ghost">
                  View invoices
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="mt-6 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Team</CardTitle>
                <CardDescription>
                  Invite collaborators and manage roles.
                </CardDescription>
              </div>
              <Button size="sm">
                <UsersIcon className="size-4" />
                Invite member
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {settingsTeam.map((member, index) => (
                <div key={member.email}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <DemoAvatar name={member.name} size="sm" />
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{member.role}</Badge>
                  </div>
                  {index < settingsTeam.length - 1 ? (
                    <Separator className="mt-4" />
                  ) : null}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Choose what you want to be notified about.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="demo-email-alerts">Revenue alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    MRR changes, failed charges, and renewals.
                  </p>
                </div>
                <Switch id="demo-email-alerts" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="demo-weekly">Weekly digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Workspace metrics summary every Monday.
                  </p>
                </div>
                <Switch id="demo-weekly" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="demo-marketing">Product updates</Label>
                  <p className="text-sm text-muted-foreground">
                    New Pulse features and release notes.
                  </p>
                </div>
                <Switch id="demo-marketing" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DemoAppShell>
  )
}
