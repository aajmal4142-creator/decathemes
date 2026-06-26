"use client"

import * as React from "react"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { pickDefined } from "@/lib/optional-props"
import { cn } from "@/lib/utils"

import type { DateRange } from "react-day-picker"

function DatePicker({
  date,
  onDateChange,
  className,
  placeholder = "Pick a date",
  disabled,
}: {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  className?: string
  placeholder?: string
  disabled?: boolean
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          data-slot="date-picker-trigger"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="size-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          {...pickDefined({
            selected: date,
            onSelect: onDateChange
              ? (selected: Date | undefined) => {
                  onDateChange(selected)
                  setOpen(false)
                }
              : undefined,
          })}
        />
      </PopoverContent>
    </Popover>
  )
}

function DatePickerWithRange({
  date,
  onDateChange,
  className,
  placeholder = "Pick a date range",
  disabled,
}: {
  date?: DateRange
  onDateChange?: (range: DateRange | undefined) => void
  className?: string
  placeholder?: string
  disabled?: boolean
}) {
  const [open, setOpen] = React.useState(false)

  const label = React.useMemo(() => {
    if (!date?.from) return placeholder
    if (date.to) {
      return `${format(date.from, "LLL dd, y")} – ${format(date.to, "LLL dd, y")}`
    }
    return format(date.from, "LLL dd, y")
  }, [date, placeholder])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          data-slot="date-picker-range-trigger"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date?.from && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="size-4" />
          <span>{label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          numberOfMonths={2}
          {...pickDefined({
            selected: date,
            onSelect: onDateChange,
          })}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker, DatePickerWithRange }
