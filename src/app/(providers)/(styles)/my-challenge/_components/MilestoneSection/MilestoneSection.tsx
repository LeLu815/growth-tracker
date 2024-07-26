import React, { PropsWithChildren } from "react"
import { GETroutineDone } from "@/api/supabase/routineDone"
import { GETroutineDoneDaily } from "@/api/supabase/routineDoneDaily"
import { useQuery } from "@tanstack/react-query"

import { StructuredMilestoneType } from "../../../../../../../types/supabase.type"
import RoutineCheckBox from "../RoutineCheckBox"

interface MilestoneSectionProps {
  milestone: StructuredMilestoneType
  milestoneDoDays: string[]
  CURRENT_DATE: string
  CURRENT_DAY_OF_WEEK: string
  userId: string
  challengeId: string
}

function MilestoneSection({
  milestone,
  milestoneDoDays,
  CURRENT_DATE,
  CURRENT_DAY_OF_WEEK,
  userId,
  challengeId,
}: PropsWithChildren<MilestoneSectionProps>) {
  const {
    data: currentUserRoutineDoneDaily,
    isPending: routineDoneDailyPending,
    isError: routineDoneDailyError,
  } = useQuery({
    queryKey: ["fetchCurrentUserRoutineDoneDaily", userId],
    queryFn: () => GETroutineDoneDaily(userId),
  })

  const {
    data: RoutineDone,
    isPending: routineDonePending,
    isError: routineDoneError,
  } = useQuery({
    queryKey: ["fetchRoutineDone"],
    queryFn: GETroutineDone,
  })

  if (routineDoneDailyPending || routineDonePending) {
    return <div>로딩 중</div>
  }

  if (routineDoneDailyError || routineDoneError) {
    return <div>서버에서 데이터 로드 중 오류 발생</div>
  }

  return (
    <div className="border-2 border-black px-4 py-10">
      <div className="mt-3">
        <p>마일스톤 시작: {milestone.start_at}</p>
        <p>마일스톤의 종료: {milestone.end_at}</p>
      </div>
      <p className="mt-5">마일스톤을 실행 요일:</p>
      <div className="flex gap-x-5">
        {milestone.is_mon ? <p>월</p> : <></>}
        {milestone.is_tue ? <p>화</p> : <></>}
        {milestone.is_wed ? <p>수</p> : <></>}
        {milestone.is_thu ? <p>목</p> : <></>}
        {milestone.is_fri ? <p>금</p> : <></>}
        {milestone.is_sat ? <p>토</p> : <></>}
        {milestone.is_sun ? <p>일</p> : <></>}
      </div>
      <>
        {milestoneDoDays.findIndex((milestoneDoDay) => {
          return milestoneDoDay == CURRENT_DAY_OF_WEEK
        }) == -1 ? (
          <p className="mt-5">오늘은 할 일이 없어요</p>
        ) : (
          <div className="mt-5 flex flex-col gap-y-3">
            {milestone.routines?.map((routine) => {
              if (routine.milestone_id == milestone.id) {
                return (
                  <div key={routine.id} className="flex justify-between">
                    <p>루틴: {routine.content}</p>
                    <RoutineCheckBox
                      routines={milestone.routines}
                      challengeId={challengeId}
                      createdAt={CURRENT_DATE}
                      mileStoneId={milestone.id}
                      userId={userId}
                      routineId={routine.id}
                      routineDoneDaily={currentUserRoutineDoneDaily}
                      routineDone={RoutineDone}
                    />
                  </div>
                )
              }
            })}
          </div>
        )}
      </>
    </div>
  )
}

export default MilestoneSection
