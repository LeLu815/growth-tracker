"use client"

import { PropsWithChildren, useState } from "react"
import { format, startOfDay } from "date-fns"
import { ko } from "date-fns/locale"

import { MyChallengePageContext } from "./context"

function MyChallengePageLayout({ children }: PropsWithChildren) {
  const TODAY = format(startOfDay(new Date()), "yyyy-MM-dd", { locale: ko })
  const TODAY_DAY_OF_WEEK = format(startOfDay(new Date()), "eee", {
    locale: ko,
  })
  const [selectedDate, setSelectedDate] = useState<string>(TODAY)
  const [selectedDayOfWeek, setSelectedDayOfWeek] =
    useState<string>(TODAY_DAY_OF_WEEK)

  // context 초기값 설정
  const contextValue = {
    todayDate: TODAY,
    selectedDate,
    setSelectedDate,
    selectedDayOfWeek,
    setSelectedDayOfWeek,
  }

  return (
    <MyChallengePageContext.Provider value={contextValue}>
      {children}
    </MyChallengePageContext.Provider>
  )
}

export default MyChallengePageLayout
