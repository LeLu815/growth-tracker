import { Dispatch, SetStateAction } from "react"
import { addDays } from "date-fns"
import { DateRange } from "react-day-picker"
import { create } from "zustand"

interface RangeState {
  range: DateRange | undefined
  setRange: (range: DateRange | undefined) => void
  dayChecks: boolean[]
  setDayChecks: Dispatch<SetStateAction<boolean[]>>
}
const defaultMonth = new Date()
const defaultSelected: DateRange = {
  from: defaultMonth,
  to: addDays(defaultMonth, 6),
}

const WEEK_DAY_LIST = ["일", "월", "화", "수", "목", "금", "토"]
export const useChallengeCreateStore = create<RangeState>((set) => ({
  range: defaultSelected,
  setRange: (range) => set({ range }),
  dayChecks: WEEK_DAY_LIST.map(() => false),
  setDayChecks: (dayChecks) =>
    set((state) => ({
      dayChecks:
        typeof dayChecks === "function"
          ? dayChecks(state.dayChecks)
          : dayChecks,
    })),
}))

export default useChallengeCreateStore
