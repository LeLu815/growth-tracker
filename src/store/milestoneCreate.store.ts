import { Dispatch, SetStateAction } from "react"
import { create } from "zustand"

export type RoutineType = {
  id: string
  content: string
}

export type MilestoneType = {
  id: string
  routines: RoutineType[]
  start_at: string
  end_at: string
  challenge_id: string
  total_day: number
  total_cnt: number
  success_requirement_cnt: number
  is_fri: boolean
  is_mon: boolean
  is_sat: boolean
  is_sun: boolean
  is_thu: boolean
  is_tue: boolean
  is_wed: boolean
}

interface MilestoneState {
  data: MilestoneType[]
  setData: Dispatch<SetStateAction<MilestoneType[]>>
  currentSlideId: string
  setCurrentSlideId: Dispatch<SetStateAction<string>>
}
export const initialData: MilestoneType[] = []
export const useMilestoneCreateStore = create<MilestoneState>((set) => ({
  data: initialData,
  setData: (setData) =>
    set((state) => ({
      data: typeof setData === "function" ? setData(state.data) : setData,
    })),
  currentSlideId: "",
  setCurrentSlideId: (setData) =>
    set((state) => ({
      currentSlideId:
        typeof setData === "function" ? setData(state.currentSlideId) : setData,
    })),
}))

export default useMilestoneCreateStore
