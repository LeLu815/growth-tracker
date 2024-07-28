import React, { PropsWithChildren, useEffect, useState } from "react"
import queryClient from "@/query/queryClient"

import { RoutineDoneDailyType } from "../../../../../../../types/routineDoneDaily.type"

interface DiarySectionProps {
  milestoneId: string
  currentUserRoutineDoneDaily: RoutineDoneDailyType[]
}

function DiarySection({
  milestoneId,
  currentUserRoutineDoneDaily,
}: PropsWithChildren<DiarySectionProps>) {
  queryClient.invalidateQueries({
    queryKey: ["fetchCurrentUserRoutineDoneDaily"],
  })

  const [inputText, setInputText] = useState("")

  const targetMilestoneIndex = currentUserRoutineDoneDaily.findIndex((item) => {
    return item.milestone_id == milestoneId
  })

  const handleDiarySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(currentUserRoutineDoneDaily[targetMilestoneIndex].id)
    console.log(inputText)
  }

  return (
    <div
      className={
        !currentUserRoutineDoneDaily[targetMilestoneIndex]?.is_success ? "" : ""
      }
    >
      <h5>오늘의 소감</h5>
      <form className="mt-2 flex flex-col gap-y-3" onSubmit={handleDiarySubmit}>
        <textarea
          className="h-[150px] resize-none border-2 border-black px-2 py-2"
          onChange={(event) => setInputText(event.target.value)}
        />
        <button className="border-2 border-black px-2 py-2">저장하기</button>
      </form>
    </div>
  )
}

export default DiarySection
