import create from "zustand"

type GraphSliceCount = {
  currentCount: number
  activeTap: string
  currentPreviousWidth: number
  isResponsive: boolean
  setCurrentCount: (currentCount: number) => void
  setActiveTap: (currentActiveTap: string) => void
  setCurrentPreviousWidth: (currentPreviousWidth: number) => void
  setIsResponsive: (isResponsive: boolean) => void
}

const currentCountInitialData = 0
const activeTapInitialData = "completeChallenge"
const currentPreviousWidthInitialData = 0
const isResponsiveInitialData = false

const useMyPageResponsive = create<GraphSliceCount>((set) => ({
  currentCount: currentCountInitialData,
  activeTap: activeTapInitialData,
  currentPreviousWidth: currentPreviousWidthInitialData,
  isResponsive: isResponsiveInitialData,
  setCurrentCount: (currentCount) => {
    set({ currentCount: currentCount })
  },
  setActiveTap: (currentActiveTap) => {
    set({ activeTap: currentActiveTap })
  },
  setCurrentPreviousWidth: (currentPreviousWidth) => {
    set({ currentPreviousWidth: currentPreviousWidth })
  },
  setIsResponsive: (isResponsive) => {
    set({ isResponsive: isResponsive })
  },
}))

export default useMyPageResponsive
