import create from "zustand"

type GraphSliceCount = {
  currentCount: number
  setCurrentCount: (currentCount: number) => void
}

const initialData = 0

const useGraphSliceCountStore = create<GraphSliceCount>((set) => ({
  currentCount: initialData,
  setCurrentCount: (currentCount) => {
    console.log("setCurrentCount called with:", currentCount) // 디버깅 로그 추가
    set({ currentCount: currentCount })
  },
}))

export default useGraphSliceCountStore
