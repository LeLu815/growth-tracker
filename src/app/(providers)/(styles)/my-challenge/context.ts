import { createContext, useContext } from "react"

// context 타입 지정
interface MyChallengePageContextType {
  todayDate: string
  selectedDate: string
  setSelectedDate: (date: string) => void
  selectedDayOfWeek: string
  setSelectedDayOfWeek: (date: string) => void
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
