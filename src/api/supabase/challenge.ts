import axios from "axios"

import {
  ChallengeType,
  MilestoneType,
  RoutineType,
} from "../../../types/supabase.type"

// 필요없는 타입 제외한 milestone 타입
export type MilestoneDefaultType = Pick<
  MilestoneType,
  "created_at" | "id" | "is_success"
>
// milestone 필수적인 타입 : MilestoneRequiredType
export type MilestoneRequiredType = Pick<
  MilestoneType,
  | "challenge_id"
  | "start_at"
  | "end_at"
  | "total_cnt"
  | "total_day"
  | "success_requirement_cnt"
  | "name"
  | "success_percent"
>
// milestone 선택 타입 (요일 지정 타입) : MilestonePartialType
export type RemainingType = Omit<
  MilestoneType,
  keyof MilestoneDefaultType | keyof MilestoneRequiredType
>
export type MilestonePartialType = Partial<RemainingType>

// milestone의 타입은 위의 타입연산 결과를 바탕으로 : 필수타입 + 선택 타입의 조합으로 이루어진다.
export interface POSTchallengeArgumentProps {
  challenge: Pick<
    ChallengeType,
    | "user_id"
    | "goal"
    | "start_at"
    | "end_at"
    | "is_secret"
    | "day_cnt"
    | "category"
  >
  milestone: Omit<MilestoneRequiredType & MilestonePartialType, "routines">[]
  routine: Pick<RoutineType, "content" | "milestone_id">[][]
}

// 구조화 챌린지 가져오기 함수 인자 타입
export interface GetstructuredChallengeArgumentProps {
  "user-id": string
}

// 챌린지 디테일 업데이트 함수 인자 타입
export interface PUTchallengeArgumentProps {
  "challenge-id": string
  milestoneIds: ChallengeType["id"][]
  milestone: (MilestoneRequiredType & RemainingType)[]
  routine: Pick<RoutineType, "content" | "milestone_id">[][]
}

// 챌린지 생성함수
export const POSTchallenge = async (params: POSTchallengeArgumentProps) => {
  console.log("params :", params)
  const postResponse = await axios.post("/api/challenge", {
    challenge: params.challenge,
    milestone: params.milestone,
    routine: params.routine,
  })
  return postResponse
}

// 챌린지 디테일 업데이트 함수
export const PUTchallenge = async (params: PUTchallengeArgumentProps) => {
  const putResponse = await axios.put(
    `/api/challenge/${params["challenge-id"]}`,
    {
      milestoneIds: params.milestoneIds,
      milestone: params.milestone,
      routine: params.routine,
    }
  )
  return putResponse
}
