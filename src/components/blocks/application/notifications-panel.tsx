"use client"

import {
  AlertCircleIcon,
  CheckCircleIcon,
  CreditCardIcon,
  MessageSquareIcon,
  UserPlusIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const notifications = [
  {
    id: "1",
    title: "Payment received",
    description: "Invoice #1042 was paid — $240.00",
    time: "2 min ago",
    icon: CreditCardIcon,
    unread: true,
  },
  {
    id: "2",
    title: "New comment",
    description: "Sarah replied to your design review",
    time: "1 hour ago",
    icon: MessageSquareIcon,
    unread: true,
  },
  {
    id: "3",
    title: "Team invite accepted",
    description: "James joined the Engineering team",
    time: "3 hours ago",
    icon: UserPlusIcon,
    unread: false,
  },
  {
    id: "4",
    title: "Deployment complete",
    description: "v2.4.1 deployed to production",
    time: "Yesterday",
    icon: CheckCircleIcon,
    unread: false,
  },
  {
    id: "5",
    title: "Usage alert",
    description: "API calls reached 80% of monthly limit",
    time: "Yesterday",
    icon: AlertCircleIcon,
    unread: false,
  },
]

const groupedNotifications = {
  Today: [
    {
      id: "g1",
      title: "New signup",
      description: "Acme Corp created an account",
      time: "10:42 AM",
      unread: true,
    },
    {
      id: "g2",
      title: "Invoice sent",
      description: "Invoice #1043 sent to client",
      time: "9:15 AM",
      unread: true,
    },
  ],
  Yesterday: [
    {
      id: "g3",
      title: "Report ready",
      description: "Weekly analytics report is available",
      time: "4:30 PM",
      unread: false,
    },
    {
      id: "g4",
      title: "Password changed",
      description: "Your password was updated successfully",
      time: "11:00 AM",
      unread: false,
    },
  ],
  "Earlier this week": [
    {
      id: "g5",
      title: "Subscription renewed",
      description: "Pro plan renewed for another month",
      time: "Mon",
      unread: false,
    },
  ],
}

function NotificationsPanelList() {
  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <Card className="max-w-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm">
          Mark all read
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[320px]">
          <ul className="divide-y">
            {notifications.map((notification) => (
              <li key={notification.id}>
                <button
                  type="button"
                  className="flex w-full items-start gap-theme-3 px-theme-6 py-theme-3 text-left transition-colors hover:bg-muted/50"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    <notification.icon className="size-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{notification.title}</p>
                      {notification.unread ? (
                        <Badge className="size-1.5 shrink-0 rounded-full p-0" />
                      ) : null}
                    </div>
                    <p className="truncate text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function NotificationsPanelGrouped() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>Grouped by date</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[360px]">
          <div className="px-theme-6 pb-theme-4">
            {Object.entries(groupedNotifications).map(([group, items], groupIndex) => (
              <div key={group}>
                {groupIndex > 0 ? <Separator className="my-theme-4" /> : null}
                <p className="mb-theme-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {group}
                </p>
                <ul className="space-y-theme-2">
                  {items.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        className="flex w-full items-start justify-between gap-theme-3 rounded-lg p-theme-2 text-left transition-colors hover:bg-muted/50"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">{item.title}</p>
                            {item.unread ? (
                              <Badge variant="secondary" className="text-[10px]">
                                New
                              </Badge>
                            ) : null}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {item.time}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export { NotificationsPanelList, NotificationsPanelGrouped }
