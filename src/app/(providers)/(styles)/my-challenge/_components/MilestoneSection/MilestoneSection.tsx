"use client"

/* eslint-disable react-hooks/exhaustive-deps */
import React, { PropsWithChildren, useEffect, useState } from "react"
import { POSTnewRoutineDoneDaily } from "@/api/supabase/routineDoneDaily"
import { useModal } from "@/context/modal.context"
import queryClient from "@/query/queryClient"
import { v4 } from "uuid"

import Button from "@/components/Button"
import ArrowDownIcon from "@/components/Icon/ArrowDownIcon"

import { StructuredMilestoneType } from "../../../../../../../types/supabase.type"
import useMyChallengePageContext from "../../context"
import DiarySection from "../DiarySection"
import ProgressBar from "../ProgressBar"
import RoutineCheckBox from "../RoutineCheckBox"

interface MilestoneSectionProps {
  milestone: StructuredMilestoneType
  milestoneDoDays: string[]
  challengeId: string
  challengeGoal: string
}

function MilestoneSection({
  milestone,
  milestoneDoDays, // 마일스톤 시행 요일이 담긴 배열
  challengeId,
  challengeGoal,
}: PropsWithChildren<MilestoneSectionProps>) {
  const {
    userId,
    todayDate,
    selectedDate,
    selectedDayOfWeek,
    currentUserRoutineDoneDaily,
  } = useMyChallengePageContext()

  const [targetRDDId, setTargetRDDId] = useState(
    currentUserRoutineDoneDaily.find((item) => {
      return (
        item.milestone_id == milestone.id &&
        item.created_at.slice(0, 10) == selectedDate
      )
    })?.id || ""
  )
  const [isVisible, setIsVisible] = useState(false)

  const modal = useModal()

  const handleRoutineCompleteButtonClick = () => {
    modal.open({
      type: "custom",
      children: (
        <DiarySection
          selectedDate={selectedDate}
          challengeId={challengeId}
          routineDoneDailyId={targetRDDId}
          handleClickConfirm={() => modal.close()}
        />
      ),
    })
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }
  // 오늘 날짜 RDD
  const targetRDD = currentUserRoutineDoneDaily.find((item) => {
    return (
      item.milestone_id == milestone.id &&
      item.created_at.slice(0, 10) == selectedDate
    )
  })

  useEffect(() => {
    // 오늘에 대한 RDD가 없다면 하나 새로 생성해주는 함수 실행
    initializeRDD()
  }, [selectedDate])

  useEffect(() => {
    setIsVisible(false)
  }, [selectedDate])

  // 선택된 일자의 요일이 해당 마일스톤의 실행 요일인지 확인
  const checkMilestoneDayOfWeek = milestoneDoDays.find((milestoneDoDay) => {
    return milestoneDoDay == selectedDayOfWeek
  })

  // 오늘에 대한 RDD가 없다면 하나 새로 생성해주는 함수
  const initializeRDD = async () => {
    // 선택한 일자가 마일스톤 시행 요일이면서
    // 동시에 routine_done_daily에 유효한 레코드가 없는 경우에 새로운 레코드  생성
    if (checkMilestoneDayOfWeek && !targetRDD) {
      const newId = v4()

      POSTnewRoutineDoneDaily({
        challengeId,
        milestoneId: milestone.id,
        userId,
        createdAt: selectedDate,
        routineDoneId: newId,
        isSuccess: false,
      })
      queryClient.invalidateQueries({
        queryKey: ["fetchCurrentUserRoutineDoneDaily"],
      })

      setTargetRDDId(newId)
    }

    if (targetRDD) {
      setTargetRDDId(targetRDD.id)
    }
  }

  return (
    <div>
      <div className="flex">
        <div className="h-[84px] w-[84px] rounded-md bg-[#DDDDDD]"></div>
        <div className="grow">
          <div className="ml-5 flex">
            <div>
              {!checkMilestoneDayOfWeek ? (
                <p className="w-[77px] rounded-2xl bg-gray-500 px-2 py-2 text-center text-[11px] text-white">
                  루틴 없음
                </p>
              ) : (
                <div
                  className={`w-[77px] rounded-2xl px-2 py-2 text-center text-[11px] text-white ${targetRDD?.is_success ? "bg-[#4CD964]" : "bg-red-300"}`}
                >
                  {targetRDD?.is_success ? "루틴 완료" : "루틴 미완료"}
                </div>
              )}
              <h3 className="mt-2 text-[16px] font-bold">{challengeGoal}</h3>
            </div>
            <div className="ml-auto mr-0">
              {!checkMilestoneDayOfWeek ? (
                <></>
              ) : (
                <button onClick={toggleVisibility}>
                  <ArrowDownIcon />
                </button>
              )}
            </div>
          </div>
          <div className="ml-5">
            {!checkMilestoneDayOfWeek ? (
              <></>
            ) : (
              <ProgressBar
                routineDoneDailyId={targetRDDId}
                routines={milestone.routines}
              />
            )}
          </div>
        </div>
      </div>

      {isVisible && (
        <div className="mt-5 flex flex-col gap-y-3">
          {milestone.routines?.map((routine) => {
            if (routine.milestone_id == milestone.id) {
              return (
                <div
                  key={routine.id}
                  className="flex items-center justify-between rounded-lg border-[1.5px] border-solid border-[#D9D9D9] bg-[#F5F5F5] px-3 py-2"
                >
                  <p className="text-[14px] font-semibold">{routine.content}</p>
                  <RoutineCheckBox
                    routines={milestone.routines}
                    challengeId={challengeId}
                    selectedDate={selectedDate}
                    milestoneId={milestone.id}
                    userId={userId}
                    routineId={routine.id}
                    routineDoneDailyId={targetRDDId}
                  />
                </div>
              )
            }
          })}
          <Button
            intent={todayDate == selectedDate ? "primary" : "secondary"}
            size={"lg"}
            className="mt-3 text-sm"
            onClick={handleRoutineCompleteButtonClick}
          >
            {"회고 확인하기"}
          </Button>
        </div>
      )}
    </div>
  )
}

export default MilestoneSection
