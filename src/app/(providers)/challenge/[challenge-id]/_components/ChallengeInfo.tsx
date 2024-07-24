"use client"

import { useRouter } from "next/navigation"
import { useModal } from "@/context/modal.context"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { numberToWeek } from "@/app/(providers)/challenge/[challenge-id]/_utils/milestoneweekUtils"

function ChallengeInfo({ challengeId }: { challengeId: string }) {
  const modal = useModal()
  const router = useRouter()

  const getChallenge = async (): Promise<Challenge> => {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/challenge/${challengeId}`)
      .then((response) => response.data)

    if (response.error) {
      modal.open({
        type: "alert",
        content: "해당 챌린지는 존재하지 않습니다.",
      })
      router.push("/newsfeed")
    }

    return response.data
  }

  const { data, isPending, isError } = useQuery<Challenge>({
    queryKey: ["challenge_detail"],
    queryFn: getChallenge,
  })

  if (isPending) return <div>Loading...</div>
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
            <div key={milestone.id} className={"border border-black"}>
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
              <div>
                {milestone.routines.map((routine) => {
                  return (
                    <div className={"border border-black"} key={routine.id}>
                      {routine.content}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ChallengeInfo
