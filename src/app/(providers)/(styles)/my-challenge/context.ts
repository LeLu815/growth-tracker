import { createContext } from "react"
import { format, startOfDay } from "date-fns"
import { ko } from "date-fns/locale"

const MyChallengePageContext = createContext({
  todayDate: format(startOfDay(new Date()), "yyyy-MM-dd", { locale: ko }),
  selectedDate: format(startOfDay(new Date()), "yyyy-MM-dd", { locale: ko }),
  setSelectedDate: (date: string) => {},
  selectedDayOfWeek: format(startOfDay(new Date()), "eee", {
    locale: ko,
  }),
  setSelectedDayOfWeek: (date: string) => {},
})

export { MyChallengePageContext }
