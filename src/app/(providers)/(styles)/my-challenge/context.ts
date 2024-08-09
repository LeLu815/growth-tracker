"use client"

import { createContext, useContext } from "react"

import { RoutineDoneType } from "../../../../../types/routineDone.type"
import { RoutineDoneDailyType } from "../../../../../types/routineDoneDaily.type"
import { StructuredChallengeType } from "../../../../../types/supabase.type"

// context 타입 지정
interface MyChallengePageContextType {
  userId: string
  todayDate: string
  selectedDate: string
  setSelectedDate: (date: string) => void
  selectedDayOfWeek: string
  setSelectedDayOfWeek: (date: string) => void
  structuredChallengeData: StructuredChallengeType[]
  challengeDataPending: boolean
  challengeDataError: boolean
  currentUserRoutineDoneDaily: RoutineDoneDailyType[]
  routineDoneDailyPending: boolean
  routineDoneDailyError: boolean
  routineDone: RoutineDoneType[]
  routineDonePending: boolean
  routineDoneError: boolean
  pageToView: "onProgress" | "completed"
  setPageToView: (item: "onProgress" | "completed") => void
}

// conetext 생성
const MyChallengePageContext = createContext<MyChallengePageContextType | null>(
  null
)

export { MyChallengePageContext }

// 기본값을 사용하도록 하는 커스텀 훅
function useMyChallengePageContext() {
  const context = useContext(MyChallengePageContext)
  if (!context) {
    throw new Error(
      "MyChallengePageContext를 지정된 Provider 외부에서 사용하려 하고 있습니다"
    )
  }
  return context
}

export default useMyChallengePageContext
