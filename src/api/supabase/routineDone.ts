import axios from "axios"

import { RoutineDoneType } from "../../../types/routineDone.type"

export const GETroutineDone = async () => {
  const response = await axios.get(`/api/challenge/milestone/routine/done`)
  const getResponse: RoutineDoneType[] = response.data
  return getResponse
}
