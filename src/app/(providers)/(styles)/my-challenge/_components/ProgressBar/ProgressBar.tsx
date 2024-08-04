import React, { PropsWithChildren } from "react"
import { GETroutineDone } from "@/api/supabase/routineDone"
import { GETstructuredChallengeData } from "@/api/supabase/structured-challenge"
import { useQuery } from "@tanstack/react-query"

import { RoutineDoneType } from "../../../../../../../types/routineDone.type"
import { RoutineType } from "../../../../../../../types/supabase.type"

interface ProgressBar {
  routineDone: RoutineDoneType[]
  selectedDate: string
  routines: RoutineType[]
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "100%",
    height: "20px",
    backgroundColor: "#d3d3d3",
    borderRadius: "10px",
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: "#000",
    transition: "width 0.3s ease-in-out",
  },
}

function ProgressBar({
  routineDone,
  selectedDate,
  routines,
}: PropsWithChildren<ProgressBar>) {
  // 오늘 완료한 루틴의 개수
  const todayDoneRoutineArray = routineDone.filter((item) => {
    return item.created_at.slice(0, 10) == selectedDate
  })
  const progress = (todayDoneRoutineArray.length / routines.length) * 100
  return (
    <div className="mt-3 w-full">
      <div className="flex items-baseline font-bold">
        <p className="mr-2 text-[10px] text-[#717171]">오늘해야하는 일</p>
        <p className="text-[#FF7D3D]">
          {todayDoneRoutineArray.length}/{routines.length}
        </p>
        <p className="mr-1 text-[10px] text-[#717171]">개 완료</p>
      </div>
      <div className="mt-3 h-3 w-full overflow-hidden rounded-lg bg-gray-300">
        <div
          className={`transition-width h-full bg-black duration-300 ease-in-out w-[${progress}%]`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
