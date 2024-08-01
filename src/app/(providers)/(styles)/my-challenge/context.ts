import { createContext } from "react"
import { format, startOfDay } from "date-fns"
import { ko } from "date-fns/locale"

const MyChallengePageContext = createContext({
  selectedDate: format(startOfDay(new Date()), "yyyy-MM-dd", { locale: ko }),
  setSelectedDate: (date: string) => {},
  selectedDayOfWeek: format(startOfDay(new Date()), "eee", {
    locale: ko,
  }),
  setSelectedDayOfWeek: (date: string) => {},
})

// format(selectedDate, "yyyy-MM-dd", { locale: ko })

export { MyChallengePageContext }
