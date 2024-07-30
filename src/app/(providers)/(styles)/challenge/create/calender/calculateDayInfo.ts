import {
  differenceInCalendarDays,
  eachDayOfInterval,
  format,
  getDay,
} from "date-fns"
import { DateRange } from "react-day-picker"

interface CalculateDayInfoType {
  dayChecks: number[]
  minPercentForsuccess: string
  range: DateRange | undefined
}
function calculateDayInfo({
  dayChecks,
  minPercentForsuccess,
  range,
}: CalculateDayInfoType) {
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

  return {
    start: formatDate(range?.from),
    end: formatDate(range?.to),
    wholePeriod: calculateTotalDays(range),
    wholeActualCount: calculateSpecificWeekdays(range, dayChecks),
    minCountForSuccess: Math.ceil(
      (calculateSpecificWeekdays(range, dayChecks) *
        parseInt(minPercentForsuccess)) /
        100
    ),
  }
  // return (
  //   <div>
  //     <p>시작 : {formatDate(range?.from)}</p>
  //     <p>끝 : {formatDate(range?.to)}</p>
  //     <p>총 기간 : {calculateTotalDays(range)}일</p>
  //     <p>총 횟수 : {calculateSpecificWeekdays(range, dayChecks)}번</p>
  //     <p>
  //       성공을 위한 최소 횟수 :{" "}
  //       {Math.ceil(calculateSpecificWeekdays(range, dayChecks) / 2)}회
  //     </p>
  //     <PortionStickBar
  //       currentValue={calculateTotalDays(range)}
  //       prevValue={[2, 5, 3]}
  //       nextValue={[20]}
  //     />
  //   </div>
  // )
}

export default calculateDayInfo
