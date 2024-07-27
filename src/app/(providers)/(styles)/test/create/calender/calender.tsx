"use client"

import { createContext, useState } from "react"
import { addDays, isBefore, startOfToday } from "date-fns"
import { DateRange } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"

import SelectWeek from "./selectWeek"

function Calender() {
  const defaultMonth = new Date()
  const defaultSelected: DateRange = {
    from: defaultMonth,
    to: addDays(defaultMonth, 7),
  }
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected)
  const today = startOfToday()

  const contextValue = {
    range,
  }
  return (
    <>
      <RangeContext.Provider value={contextValue}>
        <SelectWeek />
      </RangeContext.Provider>
      <Calendar
        mode="range"
        min={7}
        selected={range}
        onSelect={setRange}
        disabled={(date) => isBefore(date, today)}
        className="rounded-md border"
      />
    </>
  )
}

export default Calender

interface initialValue {
  range: DateRange | undefined
}
export const RangeContext = createContext<initialValue>({ range: undefined })
