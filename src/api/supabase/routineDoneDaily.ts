import queryClient from "@/query/queryClient"
import axios from "axios"

import { RoutineDoneDailyType } from "../../../types/routineDoneDaily.type"

export interface POSTnewRoutineDoneDailyProps {
  milestoneId: string
  challengeId: string
  userId: string
  createdAt: string
  routineDoneId: string
  isSuccess: boolean
}

export interface PUTisSuccessRoutineDoneDaily {
  currentIsSuccess: boolean
  routineDoneDailyId: string
}

export const GETroutineDoneDaily = async (userId: string | undefined) => {
  if (userId) {
    const response = await axios.get(
      `/api/challenge/milestone/routine/done/daily/${userId}`
    )
    const getResponse: RoutineDoneDailyType[] = response.data
    return getResponse
  }
}

// 개별 마일스톤에 대해서 내부 루틴을 처음 체크할 때,
// routine_done_daily 테이블에 새로운 레코드를 생성하는 함수
export const POSTnewRoutineDoneDaily = async (
  params: POSTnewRoutineDoneDailyProps
) => {
  const postResponse = await axios.post(
    `/api/challenge/milestone/routine/done/daily`,
    {
      challengeId: params.challengeId,
      milestoneId: params.milestoneId,
      userId: params.userId,
      createdAt: params.createdAt,
      routineDoneId: params.routineDoneId,
      isSuccess: params.isSuccess,
    }
  )
  queryClient.invalidateQueries({
    queryKey: ["fetchCurrentUserRoutineDoneDaily"],
  })
  return postResponse
}

// 모든 체크박스가 선택완료됐을 때 또는 선택이 하나라도 해제됐을 때,
// RDD의 is_success를 true 또는 false로 바꾸는 함수
export const PUTisSuccessRoutineDoneDaily = async (
  params: PUTisSuccessRoutineDoneDaily
) => {
  const putResponse = await axios.put(
    `/api/challenge/milestone/routine/done/daily`,
    {
      currentIsSuccess: params.currentIsSuccess,
      routineDoneDailyId: params.routineDoneDailyId,
    }
  )

  return putResponse
}
