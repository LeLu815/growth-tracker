"use client"

import { PropsWithChildren, useState } from "react"
import { GETroutineDone } from "@/api/supabase/routineDone"
import { GETroutineDoneDaily } from "@/api/supabase/routineDoneDaily"
import { GETstructuredChallengeData } from "@/api/supabase/structured-challenge"
import { useAuth } from "@/context/auth.context"
import { useQuery } from "@tanstack/react-query"
import { format, startOfDay } from "date-fns"
import { ko } from "date-fns/locale"

import BottomNavigation from "@/components/BottomNavigation"

import PlusComponent from "../newsfeed/_components/PlusComponent"
import { MyChallengePageContext } from "./context"

function MyChallengePageLayout({ children }: PropsWithChildren) {
  const TODAY = format(startOfDay(new Date()), "yyyy-MM-dd", { locale: ko })
  const TODAY_DAY_OF_WEEK = format(startOfDay(new Date()), "eee", {
    locale: ko,
  })
  const [selectedDate, setSelectedDate] = useState<string>(TODAY)
  const [selectedDayOfWeek, setSelectedDayOfWeek] =
    useState<string>(TODAY_DAY_OF_WEEK)

  const [pageToView, setPageToView] = useState<"onProgress" | "completed">(
    "onProgress"
  )

  const { me } = useAuth()
  const userId = me?.id

  const {
    data: structuredChallengeData,
    isPending: challengeDataPending,
    isError: challengeDataError,
  } = useQuery({
    queryKey: ["fetchStructuredChallengeData", userId || ""],
    queryFn: () => GETstructuredChallengeData(userId || ""),
    gcTime: 8 * 60 * 1000, // 8분
  })

  const {
    data: currentUserRoutineDoneDaily,
    isPending: routineDoneDailyPending,
    isError: routineDoneDailyError,
  } = useQuery({
    queryKey: ["fetchCurrentUserRoutineDoneDaily", userId || ""],
    queryFn: () => GETroutineDoneDaily(userId || ""),
    gcTime: 8 * 60 * 1000, // 8분
  })

  const {
    data: routineDone,
    isPending: routineDonePending,
    isError: routineDoneError,
  } = useQuery({
    queryKey: ["fetchRoutineDone"],
    queryFn: GETroutineDone,
    gcTime: 8 * 60 * 1000, // 8분
  })

  // context 초기값 설정
  const contextValue = {
    userId: userId || "",
    todayDate: TODAY,
    selectedDate,
    setSelectedDate,
    selectedDayOfWeek,
    setSelectedDayOfWeek,
    structuredChallengeData: structuredChallengeData || [],
    challengeDataPending,
    challengeDataError,
    currentUserRoutineDoneDaily: currentUserRoutineDoneDaily || [],
    routineDoneDailyPending,
    routineDoneDailyError,
    routineDone: routineDone || [],
    routineDonePending,
    routineDoneError,
    pageToView,
    setPageToView,
  }

  return (
    <MyChallengePageContext.Provider value={contextValue}>
      {children}
      <PlusComponent />
      <BottomNavigation />
    </MyChallengePageContext.Provider>
  )
}

export default MyChallengePageLayout
