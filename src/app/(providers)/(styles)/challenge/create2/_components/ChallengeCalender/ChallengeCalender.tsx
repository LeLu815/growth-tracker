import { isBefore, startOfToday } from "date-fns"
import { DateRange, Formatters } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"

interface ChallengeCalender {
  range: DateRange | undefined
  setRange: (range: DateRange | undefined) => void
}
function ChallengeCalender({ range, setRange }: ChallengeCalender) {
  const today = startOfToday()
  return (
    <div>
      <Calendar
        mode="range"
        min={7}
        selected={range}
        onSelect={setRange}
        disabled={(date) => isBefore(date, today)}
        formatters={{ formatCaption, formatWeekdayName }}
        fromMonth={today}
      />
    </div>
  )
}

export default ChallengeCalender

// 월을 숫자로 포맷하는 함수
export const formatCaption: Formatters["formatCaption"] = (month, options) => {
  return (month.getMonth() + 1).toString() // getMonth()는 0부터 시작하므로 +1 필요
}
// 요일 이름을 설정하는 함수
export const formatWeekdayName: Formatters["formatWeekdayName"] = (date) => {
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"]
  return weekdays[date.getDay()]
}
