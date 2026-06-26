import { ArrowUpRightIcon } from "lucide-react"

import { DemoAvatar } from "@/components/demo/demo-avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { pulseActivity } from "@/lib/demo/data"

export function RecentActivityPanel() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-base">Recent activity</CardTitle>
          <CardDescription>
            Events across Pulse workspaces in the last 24 hours
          </CardDescription>
        </div>
        <Badge variant="secondary">Live</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {pulseActivity.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <DemoAvatar name={item.user} size="sm" />
            <div className="min-w-0 flex-1 space-y-0.5">
              <p className="text-sm leading-snug">
                <span className="font-medium">{item.user}</span>{" "}
                <span className="text-muted-foreground">{item.action}</span>
              </p>
              <p className="text-xs text-muted-foreground">{item.time}</p>
            </div>
            <ArrowUpRightIcon
              className="size-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
