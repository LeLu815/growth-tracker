/* eslint-disable react-hooks/exhaustive-deps */
import React, { PropsWithChildren, useEffect } from "react"
import { PUTisSuccessRoutineDoneDaily } from "@/api/supabase/routineDoneDaily"
import queryClient from "@/query/queryClient"

import { RoutineType } from "../../../../../../../types/supabase.type"
import useMyChallengePageContext from "../../context"

interface ProgressBar {
  routines: RoutineType[]
  routineDoneDailyId: string
}

function ProgressBar({
  routines,
  routineDoneDailyId,
}: PropsWithChildren<ProgressBar>) {
  const { selectedDate, routineDone } = useMyChallengePageContext()

  // 오늘 완료한 루틴의 개수
  const todayDoneRoutineArray = routineDone.filter((item) => {
    return (
      item.created_at.slice(0, 10) == selectedDate &&
      item.routine_done_daily_id == routineDoneDailyId
    )
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
