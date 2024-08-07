import React, { PropsWithChildren, useState } from "react"
import {
  GETdiary as GETcurrentDiary,
  POSTdiary,
  PUTdiary,
} from "@/api/supabase/diary"
import { useQuery } from "@tanstack/react-query"
import { v4 } from "uuid"

import Button from "@/components/Button"
import CloseIcon02 from "@/components/Icon/CloseIcon02"

import { DiaryType } from "../../../../../../../types/diary.type"
import useMyChallengePageContext from "../../context"

interface DiarySectionProps {
  challengeId: string
  routineDoneDailyId: string
  handleClickConfirm?: () => void
  selectedDate: string
}

function DiarySection({
  challengeId,
  routineDoneDailyId,
  handleClickConfirm,
  selectedDate,
}: PropsWithChildren<DiarySectionProps>) {
  const [inputText, setInputText] = useState("")

  const {
    data: currentDiary,
    isPending: diaryPending,
    isError: diaryError,
  } = useQuery({
    queryKey: ["fetchDiary", { routineDoneDailyId, selectedDate }],
    queryFn: () => GETcurrentDiary({ routineDoneDailyId, selectedDate }),
  })

  if (diaryPending) {
    return <div className="mt-5">로딩 중</div>
  }

  if (diaryError) {
    return <div className="mt-5">서버에서 데이터 로드 중 오류 발생</div>
  }

  const handleDiarySubmit = async () => {
    const newId = v4()
    const diaryToPost: DiaryType = {
      id: newId,
      routine_done_daily_id: routineDoneDailyId,
      created_at: selectedDate,
      content: inputText,
      challenge_id: challengeId,
    }
    if (currentDiary[0]) {
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
    <div className="px-3 pt-10">
      <div className="flex">
        <p className="text-[20px] font-bold">루틴 기록하기</p>
        <CloseIcon02
          className="ml-auto mr-0 cursor-pointer"
          onClick={handleClickConfirm}
        ></CloseIcon02>
      </div>
      <p className="mt-7 text-[14px] font-bold">오늘 하루 기록하기</p>
      <div className="mt-5 flex flex-col items-center justify-center">
        <textarea
          className="h-[150px] w-full resize-none rounded-lg border-[1.5px] border-solid border-[#CBC9CF] bg-[#FAFAFA] px-2 py-2"
          onChange={(event) => setInputText(event.target.value)}
          defaultValue={currentDiary[0]?.content || ""}
        />
        <div className="mt-5 flex w-full">
          <Button onClick={handleDiarySubmit}>
            {currentDiary[0] ? "수정하기" : "저장하기"}
          </Button>
          <Button intent="secondary" onClick={handleClickConfirm}>
            취소
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DiarySection
