import axios from "axios"

import { RoutineDoneDailyType } from "../../../types/routineDoneDaily.type"

export const GETroutineDoneDaily = async (userId: string) => {
  const response = await axios.get(
    `/api/challenge/milestone/routine/done/daily/${userId}`
  )
  const getResponse: RoutineDoneDailyType[] = response.data
  return getResponse
}
