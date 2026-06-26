"use client"

import * as React from "react"

import {
  Building2Icon,
  KanbanIcon,
  MailIcon,
  PhoneIcon,
  SearchIcon,
  UsersIcon,
} from "lucide-react"

import { DemoAppShell } from "@/components/demo/demo-app-shell"
import { DemoAvatar } from "@/components/demo/demo-avatar"
import {
  DemoEmptyState,
  DemoErrorState,
  DemoInlineLoading,
  DemoNoResults,
  DemoStateTabs,
  type DemoViewState,
} from "@/components/demo/demo-states"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { crmContacts, crmCopy, crmPipeline } from "@/lib/demo/data"

export function CrmDemoPage() {
  const [viewState, setViewState] = React.useState<DemoViewState>("data")
  const [search, setSearch] = React.useState("")

  const filtered =
    viewState === "data"
      ? crmContacts.filter((row) => {
          const q = search.toLowerCase()
          if (!q) return true
          return (
            row.name.toLowerCase().includes(q) ||
            row.company.toLowerCase().includes(q) ||
            row.deal.toLowerCase().includes(q)
          )
        })
      : []

  return (
    <DemoAppShell
      title="Customers"
      description={crmCopy.description}
      activeNav="Customers"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {crmPipeline.map((col) => (
          <Card key={col.stage}>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1.5">
                <KanbanIcon className="size-3.5" />
                {col.stage}
              </CardDescription>
              <CardTitle className="text-2xl">{col.count}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{col.value} pipeline</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Contacts</CardTitle>
            <CardDescription>Leads and accounts synced from Pulse</CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <DemoStateTabs value={viewState} onChange={setViewState} />
            <Button size="sm">
              <UsersIcon className="size-4" />
              Add contact
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {viewState === "data" ? (
            <div className="relative max-w-sm">
              <SearchIcon className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search contacts…"
                className="pl-8"
                aria-label="Search contacts"
              />
            </div>
          ) : null}

          {viewState === "loading" ? (
            <DemoInlineLoading label="Loading contacts…" />
          ) : viewState === "error" ? (
            <DemoErrorState
              title="CRM sync failed"
              description="HubSpot connection dropped. Reconnect to refresh contacts."
              onRetry={() => setViewState("data")}
            />
          ) : viewState === "empty" ? (
            <DemoEmptyState
              title="No contacts yet"
              description="Import accounts from Pulse or connect your CRM to populate this view."
              actionLabel="Import contacts"
              onAction={() => setViewState("data")}
            />
          ) : filtered.length === 0 ? (
            <DemoNoResults query={search} onClear={() => setSearch("")} />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Deal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-end">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DemoAvatar name={row.name} size="sm" />
                        <div>
                          <p className="font-medium">{row.name}</p>
                          <p className="text-xs text-muted-foreground">{row.title}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Building2Icon className="size-3.5" />
                        {row.company}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{row.deal}</p>
                        <p className="text-xs text-muted-foreground">{row.value}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={row.status === "Hot" ? "default" : "secondary"}>
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-end">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Email ${row.name}`}
                      >
                        <MailIcon className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Call ${row.name}`}
                      >
                        <PhoneIcon className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </DemoAppShell>
  )
}
