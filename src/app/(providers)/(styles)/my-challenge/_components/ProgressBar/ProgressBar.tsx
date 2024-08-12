/* eslint-disable react-hooks/exhaustive-deps */
import React, { PropsWithChildren, useEffect } from "react"
import { PUTisSuccessRoutineDoneDaily } from "@/api/supabase/routineDoneDaily"
import queryClient from "@/query/queryClient"

import { RoutineType } from "../../../../../../../types/supabase.type"
import useMyChallengePageContext from "../../context"

interface ProgressBar {
  routines: RoutineType[]
  routineDoneDailyId: string
  leftDays: number
}

function ProgressBar({
  leftDays,
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
    <div className="flex w-full flex-col gap-y-[12px]">
      <div className="flex items-baseline font-bold">
        <p className="mr-[5px] text-[10px] text-[#717171]">오늘해야하는 일</p>
        <p className="text-[#FC5A6B]">
          {todayDoneRoutineArray.length}/{routines.length}
        </p>
        <p className="ml-[3px] text-[10px] text-[#717171]">개 완료</p>
        <p className="ml-auto mr-0 text-[12px] font-[500] leading-[135%] text-gray-400">
          {leftDays}일 남음
        </p>
      </div>

      <div className="h-[6px] w-full overflow-hidden rounded-lg bg-gray-300">
        <div
          className={`transition-width h-full bg-[#82D0DC] duration-300 ease-in-out w-[${progress}%]`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
