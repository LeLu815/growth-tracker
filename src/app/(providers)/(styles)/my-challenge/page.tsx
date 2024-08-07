"use client"

import { useState } from "react"
import { format, startOfDay } from "date-fns"
import { ko } from "date-fns/locale"

import Box from "@/components/Box"
import Page from "@/components/Page"

import ChallengeList from "./_components/ChallengeList"
import DatePickerContainer from "./_components/DatePickerContainer"
import MyChallengeNavBar from "./_components/MyChallengeNavBar"
import { MyChallengePageContext } from "./context"

function MyChallengePage() {
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
      <Page>
        <Box>
          <h1 className="mb-8 ml-2 text-[20px] font-bold">내 챌린지</h1>
          <div className="flex flex-col items-center">
            <MyChallengeNavBar />
            <DatePickerContainer />
            <ChallengeList />
          </div>
        </Box>
      </Page>
    </MyChallengePageContext.Provider>
  )
}

export default MyChallengePage
