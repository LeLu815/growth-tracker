import React, { PropsWithChildren, useEffect, useState } from "react"
import { GETdiary, POSTdiary, PUTdiary } from "@/api/supabase/diary"
import { useQuery } from "@tanstack/react-query"
import { v4 } from "uuid"

import { DiaryType } from "../../../../../../../types/diary.type"
import { RoutineDoneDailyType } from "../../../../../../../types/routineDoneDaily.type"

interface DiarySectionProps {
  milestoneId: string
  currentUserRoutineDoneDaily: RoutineDoneDailyType[]
  createdAt: string
  challengeId: string
  routineDoneDailyId: string
}

function DiarySection({
  milestoneId,
  currentUserRoutineDoneDaily,
  createdAt,
  challengeId,
  routineDoneDailyId,
}: PropsWithChildren<DiarySectionProps>) {
  // queryClient.invalidateQueries({
  //   queryKey: ["fetchCurrentUserRoutineDoneDaily"],
  // })

  const [inputText, setInputText] = useState("")

  const {
    data: diary,
    isPending: diaryPending,
    isError: diaryError,
  } = useQuery({
    queryKey: ["fetchDiary"],
    queryFn: GETdiary,
  })

  const targetMilestoneIndex = currentUserRoutineDoneDaily.findIndex((item) => {
    return (
      item.milestone_id == milestoneId &&
      item.created_at.slice(0, 10) == createdAt
    )
  })

  if (diaryPending) {
    return <div>로딩 중</div>
  }

  if (diaryError) {
    return <div>서버에서 데이터 로드 중 오류 발생</div>
  }

  if (diary) {
    const currentDiary = diary.find((item) => {
      return (
        item.routine_done_daily_id == routineDoneDailyId &&
        item.created_at.slice(0, 10) == createdAt
      )
    })

    const handleDiarySubmit = async (
      event: React.FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault()
      const newId = v4()
      const diaryToPost: DiaryType = {
        id: newId,
        routine_done_daily_id: routineDoneDailyId,
        created_at: createdAt,
        content: inputText,
        challenge_id: challengeId,
      }
      if (currentDiary) {
        const putResponse = PUTdiary(diaryToPost)
        putResponse.then((response) => {
          if (response.statusText == "OK") {
            alert("수정이 완료되었습니다")
          } else {
            alert("오류 발생, 콘솔 확인")
            console.log(response)
          }
        })
      } else {
        const postResponse = POSTdiary(diaryToPost)
        postResponse.then((response) => {
          if (response.statusText == "OK") {
            alert("저장이 완료되었습니다")
          } else {
            alert("오류 발생, 콘솔 확인")
            console.log(response)
          }
        })
      }
    }

    return (
      <div
      // className={
      //   !currentUserRoutineDoneDaily[targetMilestoneIndex]?.is_success ? "" : ""
      // }
      >
        <h5>오늘의 소감</h5>
        <form
          className="mt-2 flex flex-col gap-y-3"
          onSubmit={handleDiarySubmit}
        >
          <textarea
            className="h-[150px] resize-none border-2 border-black px-2 py-2"
            onChange={(event) => setInputText(event.target.value)}
            defaultValue={currentDiary?.content || ""}
          />
          <button className="border-2 border-black px-2 py-2">
            {currentDiary ? "수정하기" : "저장하기"}
          </button>
        </form>
      </div>
    )
  }
}

export default DiarySection
