"use client"

import { createContext } from "react"
import {
  addDays,
  differenceInCalendarDays,
  format,
  isBefore,
  startOfToday,
} from "date-fns"
import { DateRange, Formatters } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"

interface CalenderProps {
  range: DateRange | undefined
  setRange: (range: DateRange | undefined) => void
}
function Calender({ range, setRange }: CalenderProps) {
  const defaultMonth = new Date()
  const defaultSelected: DateRange = {
    from: defaultMonth,
    to: addDays(defaultMonth, 7),
  }
  const today = startOfToday()

  const contextValue = {
    range,
  }

  return (
    <>
      <Calendar
        mode="range"
        min={7}
        selected={range}
        onSelect={setRange}
        disabled={(date) => isBefore(date, today)}
        formatters={{ formatCaption, formatWeekdayName }}
        fromMonth={today}
      />
      <div>
        <div>
          <span>시작일</span>
          <span>{`${formatDateMonthDate(range?.from)}`}</span>
        </div>
        <div>
          <span>{`${calculateTotalDays(range)}일`}</span>
        </div>
        <div>
          <span>완료일</span>
          <span>{`${formatDateMonthDate(range?.to)}`}</span>
        </div>
      </div>
    </>
  )
}

export default Calender

interface initialValue {
  range: DateRange | undefined
}
export const RangeContext = createContext<initialValue>({ range: undefined })

// 월을 숫자로 포맷하는 함수
export const formatCaption: Formatters["formatCaption"] = (month, options) => {
  return (month.getMonth() + 1).toString() // getMonth()는 0부터 시작하므로 +1 필요
}
// 요일 이름을 설정하는 함수
export const formatWeekdayName: Formatters["formatWeekdayName"] = (date) => {
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"]
  return weekdays[date.getDay()]
}
export const formatDateMonthDate = (date: Date | undefined) => {
  return date ? format(date, "M월 dd일") : "날짜 없음"
}
// 날짜를 "YY.MM.dd." 형식으로 포맷하는 함수
export const formatDateYearMonthDate = (date: Date | undefined) => {
  return date ? format(date, "yy.MM.dd.") : "날짜 없음"
}
export const calculateTotalDays = (range: DateRange | undefined) => {
  if (range?.from && range?.to) {
    return differenceInCalendarDays(range.to, range.from) + 1
  }
  return 0
}
