"use client"

/* eslint-disable react-hooks/exhaustive-deps */
import React, { PropsWithChildren, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { POSTnewRoutineDoneDaily } from "@/api/supabase/routineDoneDaily"
import { useModal } from "@/context/modal.context"
import { useMutation, useQueryClient } from "@tanstack/react-query"
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

  const router = useRouter()
  const leftDays =
    (new Date(milestone.end_at).getTime() - new Date(selectedDate).getTime()) /
      (1000 * 60 * 60 * 24) +
    1

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

  const handleRoutineCompleteButtonClick = (isTodayDiary: boolean) => {
    modal.open({
      type: "custom",
      children: (
        <DiarySection
          isDiaryToday={isTodayDiary}
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
    setIsVisible(false)
    initializeRDD()
  }, [selectedDate])

  // 선택된 일자의 요일이 해당 마일스톤의 실행 요일인지 확인
  const checkMilestoneDayOfWeek = milestoneDoDays.find((milestoneDoDay) => {
    return milestoneDoDay == selectedDayOfWeek
  })

  const queryClient = useQueryClient()

  const generateRoutineStatusText = (
    selectedDate: string,
    todayDate: string,
    isSuccess: boolean
  ) => {
    if (selectedDate < todayDate) {
      // 과거 날짜에 대한 처리
      return isSuccess ? "루틴 완료" : "루틴 종료"
    } else if (selectedDate == todayDate) {
      return isSuccess ? "루틴 완료" : "루틴 실행중"
    } else {
      // 미래 날짜에 대한 처리
      return "루틴 전"
    }
  }

  const generateRoutineStatusStyle = (
    selectedDate: string,
    todayDate: string,
    isSuccess: boolean
  ) => {
    if (selectedDate < todayDate) {
      // 과거 날짜에 대한 처리
      return isSuccess
        ? "bg-[#82D0DC] text-white border-[1px] border-[#82D0DC] "
        : " border-[1px] border-[#82D0DC] text-[#82D0DC]"
    } else if (selectedDate == todayDate) {
      return isSuccess
        ? "bg-[#82D0DC] text-white border-[1px] border-[#82D0DC] "
        : "bg-[#82D0DC] text-white border-[1px] border-[#82D0DC] "
    } else {
      // 미래 날짜에 대한 처리
      return " border-[1px] border-[#7A7A7A] text-[#7A7A7A]"
    }
  }

  const postRDDmutation = useMutation({
    mutationFn: async (newId: string) =>
      POSTnewRoutineDoneDaily({
        challengeId,
        milestoneId: milestone.id,
        userId,
        createdAt: selectedDate,
        routineDoneId: newId,
        isSuccess: false,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchCurrentUserRoutineDoneDaily"],
      })
    },
  })

  // 오늘에 대한 RDD가 없다면 하나 새로 생성해주는 함수
  const initializeRDD = async () => {
    // 선택한 일자가 마일스톤 시행 요일이면서
    // 동시에 routine_done_daily에 유효한 레코드가 없는 경우에 새로운 레코드  생성
    if (checkMilestoneDayOfWeek && !targetRDD) {
      const newId = v4()

      postRDDmutation.mutate(newId)

      setTargetRDDId(newId)
    }

    if (targetRDD) {
      setTargetRDDId(targetRDD.id)
    }
  }

  return (
    <section>
      <div className="flex gap-x-[24px]">
        {/* 이미지 */}
        <div className="h-[84px] w-[84px] rounded-md bg-[#DDDDDD]"></div>
        {/* 이미지 옆 모든 것 */}
        <div className="flex grow flex-col gap-y-[12px]">
          {/* 제목과 열기버튼 */}
          <div className="flex w-full justify-between">
            <h3 className="text-title-xs font-bold">{challengeGoal}</h3>
            {!checkMilestoneDayOfWeek ? (
              <></>
            ) : (
              <button onClick={toggleVisibility}>
                <ArrowDownIcon />
              </button>
            )}
          </div>
          {/* 챌린지 상태 칩 */}
          <div>
            {!checkMilestoneDayOfWeek ? (
              <p className="w-[77px] rounded-2xl bg-gray-500 px-2 py-2 text-center text-[11px] text-white">
                루틴 없음
              </p>
            ) : (
              <p
                className={`w-max rounded-[30px] border-solid px-[8px] py-[4px] text-center text-[12px] leading-[135%] ${generateRoutineStatusStyle(selectedDate, todayDate, targetRDD?.is_success || false)}`}
              >
                {generateRoutineStatusText(
                  selectedDate,
                  todayDate,
                  targetRDD?.is_success || false
                )}
                {/* {targetRDD?.is_success ? "루틴 완료" : "루틴 실행중"} */}
              </p>
            )}
          </div>
          {/* 프로그레스 바 */}
          {!checkMilestoneDayOfWeek ? (
            <></>
          ) : (
            <ProgressBar
              leftDays={leftDays}
              routineDoneDailyId={targetRDDId}
              routines={milestone.routines}
            />
          )}
        </div>
      </div>

      {isVisible && (
        <div className="mt-5 flex flex-col gap-y-3">
          {milestone.routines?.map((routine) => {
            if (routine.milestone_id == milestone.id) {
              return (
                <div
                  key={routine.id}
                  className="flex items-center justify-between rounded-lg border-[1.5px] border-solid border-[#D9D9D9] px-[10px] py-[14px]"
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
            intent={todayDate == selectedDate ? "primary" : "primary"}
            size={"lg"}
            className="mt-3 text-sm"
            onClick={() =>
              handleRoutineCompleteButtonClick(todayDate == selectedDate)
            }
          >
            {selectedDate == todayDate ? "하루 일기 쓰기" : "오늘의 일기"}
          </Button>
          <p
            onClick={() => {
              router.push(`/challenge/${challengeId}`)
            }}
            className="w-full text-center text-[10px] font-[500] leading-[135%] text-black"
          >
            {`챌린지 정보 확인 >`}
          </p>
        </div>
      )}
    </section>
  )
}

export default MilestoneSection
