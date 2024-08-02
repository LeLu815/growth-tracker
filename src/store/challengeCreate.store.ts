import { addDays } from "date-fns"
import { DateRange } from "react-day-picker"
import { create } from "zustand"

export const categories = ["건강", "생활", "공부", "취미"]

interface RangeState {
  range: DateRange | undefined
  setRange: (range: DateRange | undefined) => void
  category: string
  setCategory: (name: string) => void
  goal: string
  setGoal: (name: string) => void
}
const defaultMonth = new Date()
export const defaultSelected: DateRange = {
  from: defaultMonth,
  to: addDays(defaultMonth, 6),
}

export const WEEK_DAY_LIST = ["월", "화", "수", "목", "금", "토", "일"]
export const useChallengeCreateStore = create<RangeState>((set) => ({
  range: defaultSelected,
  setRange: (range) => set({ range }),
  category: categories[0],
  setCategory: (name) => set({ category: name }),
  goal: "",
  setGoal: (name) => set({ goal: name }),
}))

export default useChallengeCreateStore
