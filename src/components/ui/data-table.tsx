"use client"

/**
 * Sortable, filterable data table built on TanStack Table.
 *
 * @example
 * ```tsx
 * import { type ColumnDef } from "@tanstack/react-table"
 * import { DataTable } from "@/components/ui/data-table"
 *
 * type Payment = { id: string; amount: number; status: string }
 *
 * const columns: ColumnDef<Payment>[] = [
 *   { accessorKey: "status", header: "Status" },
 *   { accessorKey: "amount", header: "Amount" },
 * ]
 *
 * <DataTable columns={columns} data={payments} searchKey="status" />
 * ```
 *
 * Mobile renders stacked cards; `md+` uses a bordered table with sticky first column.
 */
import * as React from "react"

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { DataTableProps } from "@/types/data-table"

function DataTableColumnHeader({
  column,
  title,
  className,
}: {
  column: {
    getCanSort: () => boolean
    getIsSorted: () => false | "asc" | "desc"
    toggleSorting: (desc?: boolean) => void
  }
  title: string
  className?: string
}) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  const sorted = column.getIsSorted()

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("-ml-3 h-8", className)}
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      <span>{title}</span>
      {sorted === "desc" ? (
        <ArrowDownIcon className="size-4" />
      ) : sorted === "asc" ? (
        <ArrowUpIcon className="size-4" />
      ) : (
        <ChevronsUpDownIcon className="size-4" />
      )}
    </Button>
  )
}

function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Filter…",
  searchValue,
  onSearchChange,
  noResults,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div data-slot="data-table" className={cn("space-y-4", className)}>
      {searchKey ? (
        <Input
          placeholder={searchPlaceholder}
          value={
            searchValue ??
            (table.getColumn(searchKey)?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) => {
            const value = event.target.value
            if (onSearchChange) {
              onSearchChange(value)
            }
            table.getColumn(searchKey)?.setFilterValue(value)
          }}
          className="max-w-sm"
        />
      ) : null}

      {/* Mobile: stacked card layout */}
      <div className="space-y-3 md:hidden">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className="space-y-2 rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
            >
              {row.getVisibleCells().map((cell) => {
                const header = cell.column.columnDef.header
                const label =
                  typeof header === "string"
                    ? header
                    : typeof cell.column.id === "string"
                      ? cell.column.id
                      : "Field"

                return (
                  <div
                    key={cell.id}
                    className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1 text-sm"
                  >
                    <span className="shrink-0 text-muted-foreground">{label}</span>
                    <span className="min-w-0 text-right font-medium break-words">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </span>
                  </div>
                )
              })}
            </div>
          ))
        ) : (
          <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">
            {noResults ?? "No results."}
          </div>
        )}
      </div>

      {/* md+: table with optional horizontal scroll + sticky first column */}
      <div className="table-sticky-first hidden rounded-md border md:block">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-auto p-0">
                  {noResults ?? (
                    <div className="flex h-24 items-center justify-center text-sm text-muted-foreground">
                      No results.
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} row(s)
        </p>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="min-h-11 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            className="min-h-11"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="min-h-11"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export { DataTable, DataTableColumnHeader }
export type { DataTableProps } from "@/types/data-table"
