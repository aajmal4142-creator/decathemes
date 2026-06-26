import type { ReactNode } from "react"

import type { ColumnDef } from "@tanstack/react-table"

export interface DataTableProps<TData, TValue = unknown> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  noResults?: ReactNode
  className?: string
}
