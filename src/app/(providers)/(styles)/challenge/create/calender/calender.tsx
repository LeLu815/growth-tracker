"use client"

import { useState } from "react"
import {
  addDays,
  differenceInCalendarDays,
  eachDayOfInterval,
  format,
  getDay,
  isBefore,
  startOfToday,
} from "date-fns"
import { DateRange } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"

const PERCENT_FOR_SUCCESS = "50"

function Calender() {
  const defaultMonth = new Date()
  const defaultSelected: DateRange = {
    from: defaultMonth,
    to: addDays(defaultMonth, 7),
  }
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected)

  const today = startOfToday()

  const formatDate = (date: Date | undefined) => {
    return date ? format(date, "yyyy-MM-dd") : "날짜 없음"
  }
  const calculateTotalDays = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      return differenceInCalendarDays(range.to, range.from) + 1
    }
    return 0
  }
  const calculateSpecificWeekdays = (
    range: DateRange | undefined,
    weekdays: number[]
  ) => {
    if (range?.from && range?.to) {
      const allDays = eachDayOfInterval({ start: range.from, end: range.to })
      return allDays.filter((day) => weekdays.includes(getDay(day))).length
    }
    return 0
  }
  // 1: 월요일, 2: 화요일, 3: 수요일, 4: 목요일, 5: 금요일, 6: 토요일, 7: 일요일
  const totalMondaysAndWednesdays = calculateSpecificWeekdays(range, [1, 3])

  return (
    <>
      <div>
        <p>시작 : {formatDate(range?.from)}</p>
        <p>끝 : {formatDate(range?.to)}</p>
        <p>총 기간 : {calculateTotalDays(range)}일</p>
        <p>총 횟수 : {totalMondaysAndWednesdays}번</p>
        <p>
          성공을 위한 최소 횟수 : {Math.ceil(totalMondaysAndWednesdays / 2)}회
        </p>
      </div>
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
