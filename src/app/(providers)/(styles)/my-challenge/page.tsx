"use client"

import { useState } from "react"
import { format, startOfDay } from "date-fns"
import { ko } from "date-fns/locale"

import ChallengeList from "./_components/ChallengeList"
import DatePickerContainer from "./_components/DatePickerContainer"
import { MyChallengePageContext } from "./context"

function MyChallengePage() {
  const TODAY = format(startOfDay(new Date()), "yyyy-MM-dd", { locale: ko })
  const TODAY_DAY_OF_WEEK = format(startOfDay(new Date()), "eee", {
    locale: ko,
  })
  const [selectedDate, setSelectedDate] = useState<string>(TODAY)
  const [selectedDayOfWeek, setSelectedDayOfWeek] =
    useState<string>(TODAY_DAY_OF_WEEK)

  return (
    <MyChallengePageContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedDayOfWeek,
        setSelectedDayOfWeek,
      }}
    >
      <div className="my-20 flex flex-col items-center">
        <h1 className="text-center text-5xl font-black">내 챌린지</h1>
        <DatePickerContainer />
        <ChallengeList />
      </div>
    </MyChallengePageContext.Provider>
  )
}

export default MyChallengePage
