"use client"

import { useQuery } from "@tanstack/react-query"

function ChallengeInfo() {

  const getChallenge = async (): Promise<Challenge> => {
    const promise = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/challenge/37be6653-34e9-48dc-9559-3dbca4aabd5e`
    )
    const response = await promise.json()
    if (response.error) {
      throw new Error("Network response was not ok")
    }

    return response.data
  }

  const { data, isLoading, isError } = useQuery<Challenge>({
    queryKey: ["challenge"],
    queryFn: getChallenge,
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading data</div>

  return (
    <div>
      <div className={"text-2xl"}>
        {data?.goal} / {data?.state}
      </div>
      <div className={"flex justify-between"}>
        <div>총 {data?.day_cnt} / 계산해야함</div>
        <div>챌린지 복사하기</div>
      </div>
      <div>그래프나오는 곳</div>
      <div className={"h-1 w-full bg-black"}>s</div>
      <div className={"flex flex-col gap-4"}>
        {data?.milestones?.map((milestone, index) => {
          return (
            <div key={milestone.id} className={" border border-black"}>
              마일스톤{index + 1}
              <div>
                {milestone.start_at} ~ {milestone.end_at} ({milestone.total_day}
                )
              </div>
              <div>
                <div>루틴 실행 요일</div>
                <div className={"flex gap-2"}>
                  {milestone.weeks.map((week, index) => {
                    return (
                      <div key={index}>
                        <div
                          className={`rounded-full border border-black p-4 ${week === "true" ? "bg-gray-500" : ""}`}
                        >
                          {numberToWeek(index)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className={"flex gap-14"}>
                <div>
                  {milestone.success_requirement_cnt} 이상 실천시 루틴 성공!
                </div>
                <div>
                  총 루틴 횟수 {milestone.total_cnt}회 | {milestone.total_day}일
                </div>
              </div>
              <div >
                {milestone.routines.map((routine) => {
                  return <div className={" border border-black"} key={routine.id}>{routine.content}</div>
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const numberToWeek = (index: number) => {
  switch (index) {
    case 0:
      return "월"
    case 1:
      return "화"
    case 2:
      return "수"
    case 3:
      return "목"
    case 4:
      return "금"
    case 5:
      return "토"
    case 6:
      return "일"
  }
}

export default ChallengeInfo
