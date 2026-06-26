"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table"

import type { ColumnDef } from "@tanstack/react-table"

interface Transaction {
  id: string
  email: string
  status: "paid" | "pending" | "failed"
  amount: number
}

const transactions: Transaction[] = [
  { id: "1", email: "ada@example.com", status: "paid", amount: 120 },
  { id: "2", email: "linus@example.com", status: "pending", amount: 89 },
  { id: "3", email: "grace@example.com", status: "paid", amount: 240 },
  { id: "4", email: "alan@example.com", status: "failed", amount: 45 },
  { id: "5", email: "katherine@example.com", status: "paid", amount: 310 },
  { id: "6", email: "dennis@example.com", status: "pending", amount: 72 },
  { id: "7", email: "margaret@example.com", status: "paid", amount: 156 },
  { id: "8", email: "tim@example.com", status: "paid", amount: 98 },
]

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => {
      const amount = Number(row.getValue("amount"))
      return <span>${amount.toFixed(2)}</span>
    },
  },
]

function DataTablePage() {
  return (
    <div className="flex flex-col gap-theme-6">
      <div className="flex flex-col gap-theme-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Transactions</h1>
          <p className="text-sm text-muted-foreground">
            View and manage all payment transactions.
          </p>
        </div>
        <Button size="sm">Export</Button>
      </div>
      <DataTable
        columns={columns}
        data={transactions}
        searchKey="email"
        searchPlaceholder="Filter by email…"
      />
    </div>
  )
}

export { DataTablePage }
