"use client"

import * as React from "react"

import { DemoAvatar } from "@/components/demo/demo-avatar"
import {
  DemoEmptyState,
  DemoErrorState,
  DemoLoadingRows,
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
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table"
import { type DemoTransaction, pulseTransactions } from "@/lib/demo/data"

import type { ColumnDef } from "@tanstack/react-table"

const statusVariant: Record<
  DemoTransaction["status"],
  "default" | "secondary" | "destructive" | "outline"
> = {
  paid: "default",
  pending: "secondary",
  failed: "destructive",
  refunded: "outline",
}

const columns: ColumnDef<DemoTransaction>[] = [
  {
    accessorKey: "customer",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
    cell: ({ row }) => {
      const customer = row.getValue("customer") as string
      return (
        <div className="flex items-center gap-2">
          <DemoAvatar name={customer} size="sm" />
          <div className="min-w-0">
            <p className="truncate font-medium">{customer}</p>
            <p className="truncate text-xs text-muted-foreground">
              {row.original.email}
            </p>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => <Badge variant="outline">{row.getValue("plan")}</Badge>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as DemoTransaction["status"]
      return (
        <Badge variant={statusVariant[status]} className="capitalize">
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => {
      const amount = Number(row.getValue("amount"))
      return <span className="tabular-nums">${amount.toFixed(0)}</span>
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("date")}</span>
    ),
  },
]

export function DashboardTransactionsTable() {
  const [viewState, setViewState] = React.useState<DemoViewState>("data")
  const [search, setSearch] = React.useState("")

  const tableData =
    viewState === "data" ? pulseTransactions : viewState === "empty" ? [] : []

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-base">Recent transactions</CardTitle>
          <CardDescription>
            Subscription charges across Pulse workspaces
          </CardDescription>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DemoStateTabs value={viewState} onChange={setViewState} />
          <Button size="sm" variant="outline">
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {viewState === "loading" ? (
          <DemoLoadingRows rows={6} cols={5} />
        ) : viewState === "error" ? (
          <DemoErrorState
            title="Transactions unavailable"
            description="Stripe sync failed. Your data is safe — retry in a moment."
            onRetry={() => setViewState("data")}
          />
        ) : viewState === "empty" ? (
          <DemoEmptyState
            title="No transactions yet"
            description="When customers subscribe, charges will appear here with plan and status."
            actionLabel="Connect billing"
            onAction={() => setViewState("data")}
          />
        ) : (
          <DataTable
            columns={columns}
            data={tableData}
            searchKey="customer"
            searchPlaceholder="Search customers…"
            searchValue={search}
            onSearchChange={setSearch}
            noResults={<DemoNoResults query={search} onClear={() => setSearch("")} />}
          />
        )}
      </CardContent>
    </Card>
  )
}
