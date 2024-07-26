import axios from "axios"

import { StructuredChallengeType } from "../../../types/supabase.type"

// 유저 ID 기반으로 구조화된 챌린지-마일스톤-루틴 데이터 일괄적으로 가져오는 함수
export const GETstructuredChallengeData = async (userId: string) => {
  const response = await axios.get(
    `/api/challenge/structured-challenge/${userId}`
  )
  const getResponse: StructuredChallengeType[] = response.data
  return getResponse
}
