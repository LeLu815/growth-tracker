/* eslint-disable react-hooks/exhaustive-deps */
import React, { PropsWithChildren, useEffect, useState } from "react"
import { GETroutineDone } from "@/api/supabase/routineDone"
import {
  GETroutineDoneDaily,
  POSTnewRoutineDoneDaily,
} from "@/api/supabase/routineDoneDaily"
import queryClient from "@/query/queryClient"
import { useQuery } from "@tanstack/react-query"
import { v4 } from "uuid"

import { StructuredMilestoneType } from "../../../../../../../types/supabase.type"
import DiarySection from "../DiarySection"
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
    data: currentUserRoutineDoneDaily = [],
    isPending: routineDoneDailyPending,
    isError: routineDoneDailyError,
  } = useQuery({
    queryKey: ["fetchCurrentUserRoutineDoneDaily", userId],
    queryFn: () => GETroutineDoneDaily(userId),
    gcTime: 8 * 60 * 1000, // 8분
  })

  const {
    data: RoutineDone,
    isPending: routineDonePending,
    isError: routineDoneError,
  } = useQuery({
    queryKey: ["fetchRoutineDone"],
    queryFn: GETroutineDone,
  })
  useEffect(() => {
    initializeRDD()
  }, [])

  const [targetRDDId, setTargetRDDId] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }
  if (routineDoneDailyPending || routineDonePending) {
    return <div>로딩 중</div>
  }

  if (routineDoneDailyError || routineDoneError) {
    return <div>서버에서 데이터 로드 중 오류 발생</div>
  }

  const targetRDD = currentUserRoutineDoneDaily.find((item) => {
    return (
      item.milestone_id == milestone.id &&
      item.created_at.slice(0, 10) == CURRENT_DATE
    )
  })

  const initializeRDD = async () => {
    // routine_done_daily에 유효한 레코드가 없으므로 새로 생성
    if (!targetRDD) {
      const newId = v4()

      POSTnewRoutineDoneDaily({
        challengeId,
        milestoneId: milestone.id,
        userId,
        createdAt: CURRENT_DATE,
        routineDoneId: newId,
        isSuccess: false,
      })
      queryClient.invalidateQueries({
        queryKey: ["fetchCurrentUserRoutineDoneDaily"],
      })

      setTargetRDDId(newId)
    } else {
      setTargetRDDId(targetRDD.id)
    }
  }

  if (targetRDD)
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
          {!milestoneDoDays.find((milestoneDoDay) => {
            return milestoneDoDay == CURRENT_DAY_OF_WEEK
          }) ? (
            <p className="mt-5">오늘은 할 일이 없어요</p>
          ) : (
            <div>
              <button onClick={toggleVisibility} className="mt-5">
                {isVisible ? "숨기기" : "시행할 루틴 확인"}
              </button>
              {isVisible && (
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
                            milestoneId={milestone.id}
                            userId={userId}
                            routineId={routine.id}
                            routineDoneDailyId={targetRDDId}
                            routineDone={RoutineDone}
                          />
                        </div>
                      )
                    }
                  })}
                  <DiarySection
                    milestoneId={milestone.id}
                    currentUserRoutineDoneDaily={currentUserRoutineDoneDaily}
                    createdAt={CURRENT_DATE}
                    challengeId={challengeId}
                    routineDoneDailyId={targetRDDId}
                  />
                </div>
              )}
            </div>
          )}
        </>
      </div>
    )
}

export default MilestoneSection
