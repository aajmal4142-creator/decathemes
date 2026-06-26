"use client"

import * as React from "react"

import { HomeIcon, SettingsIcon } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { pickDefined } from "@/lib/optional-props"

import type { ColumnDef } from "@tanstack/react-table"

interface Payment {
  id: string
  email: string
  status: string
  amount: number
}

const payments: Payment[] = [
  { id: "1", email: "ada@example.com", status: "paid", amount: 120 },
  { id: "2", email: "linus@example.com", status: "pending", amount: 89 },
  { id: "3", email: "grace@example.com", status: "paid", amount: 240 },
  { id: "4", email: "alan@example.com", status: "failed", amount: 45 },
  { id: "5", email: "katherine@example.com", status: "paid", amount: 310 },
  { id: "6", email: "dennis@example.com", status: "pending", amount: 72 },
]

const paymentColumns: ColumnDef<Payment>[] = [
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

const chartData = [
  { month: "Jan", value: 186 },
  { month: "Feb", value: 305 },
  { month: "Mar", value: 237 },
  { month: "Apr", value: 173 },
]

const chartConfig = {
  value: { label: "Revenue", color: "var(--chart-1)" },
}

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <div className="max-w-xs">
      <DatePicker onDateChange={setDate} {...pickDefined({ date })} />
    </div>
  )
}

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}

export function CommandDemo() {
  return (
    <Command className="max-w-sm rounded-lg border">
      <CommandInput placeholder="Search commands…" aria-label="Search commands" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export function DataTableDemo() {
  return (
    <DataTable
      columns={paymentColumns}
      data={payments}
      searchKey="email"
      searchPlaceholder="Filter emails…"
    />
  )
}

export function ChartDemo() {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full max-w-md">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

export function CarouselDemo() {
  return (
    <Carousel className="mx-auto w-full max-w-xs">
      <CarouselContent>
        {["One", "Two", "Three"].map((slide) => (
          <CarouselItem key={slide}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-3xl font-semibold">{slide}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export function SidebarDemo() {
  return (
    <SidebarProvider className="min-h-[220px] w-full max-w-md rounded-lg border">
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <HomeIcon />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <SettingsIcon />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="flex flex-1 flex-col gap-theme-2 p-theme-4">
        <SidebarTrigger />
        <p className="text-sm text-muted-foreground">Sidebar demo content.</p>
      </main>
    </SidebarProvider>
  )
}
