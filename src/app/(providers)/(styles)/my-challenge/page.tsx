"use client"

import { useState } from "react"
import { format, startOfDay } from "date-fns"
import { ko } from "date-fns/locale"

import Box from "@/components/Box"
import Page from "@/components/Page"

import InfiniteDateScroll from "./_components/InfiniteDateScroll"
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
        todayDate: TODAY,
      }}
    >
      <Page>
        <h1 className="mb-8 ml-2 text-[20px] font-bold">내 챌린지</h1>
        {/* <MyChallengeNavBar /> */}
        <InfiniteDateScroll />
        <Box>
          <div className="flex flex-col items-center">
            {/* <DatePickerContainer />
            <ChallengeList /> */}
          </div>
        </Box>
      </Page>
    </MyChallengePageContext.Provider>
  )
}

export default MyChallengePage
