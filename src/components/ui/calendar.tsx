"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import "./style.css"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  disabled,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(className, "w-[320px]")}
      classNames={{
        months: "flex flex-col",
        month: "space-y-4",
        caption:
          "flex justify-center pt-1 relative items-center mb-[40px] w-[110px] mx-auto",
        caption_label: "text-[27px] font-[800]",
        nav: "flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 p-0 border-none bg-white hover:bg-white text-slate-800 disabled:text-slate-400"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex w-full justify-between mb-[15px]",
        head_cell:
          "text-muted-foreground text-slate-700 w-9 text-grey-500 font-[400] text-[14px]",
        row: "flex w-full mt-2 justify-between",
        cell: "w-full aspect-square text-center text-sm p-0 relative",
        day: "w-full h-full p-0 font-normal aria-selected:opacity-100 text-[16px] !font-[700]",
        day_range_end: "day-range-end !text-white !bg-[#FC5A6B] rounded-full",
        day_range_start: "day-range-end !text-white !bg-[#FC5A6B] rounded-full",
        day_selected: "bg-[#FC5A6B]",
        day_today: "text-[#FC5A6B] border rounded-full border-[#FC5A6B]",
        day_outside:
          "hidden day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "!text-[#FC5A6B] !bg-[#FFF0F2] rounded-none",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-5 w-5" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-5 w-5" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
