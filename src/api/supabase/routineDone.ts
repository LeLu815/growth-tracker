import queryClient from "@/query/queryClient"
import axios from "axios"

import { RoutineDoneType } from "../../../types/routineDone.type"

export const GETroutineDone = async () => {
  const response = await axios.get(`/api/challenge/milestone/routine/done`)
  const getResponse: RoutineDoneType[] = response.data
  return getResponse
}

export interface POSTnewRoutineDoneProps {
  routineDoneDailyId: string
  routineId: string
  createdAt: string
  routineDoneId: string
}

export const POSTnewRoutineDone = async (params: POSTnewRoutineDoneProps) => {
  const postResponse = await axios.post(
    `/api/challenge/milestone/routine/done`,
    {
      routineDoneDailyId: params.routineDoneDailyId,
      routineId: params.routineId,
      createdAt: params.createdAt,
      routineDoneId: params.routineDoneId,
    }
  )

  return postResponse
}

export interface DELETEroutineDoneProps {
  routineId: string
  routineDoneDailyId: string
}

export const DELETEroutineDone = async (params: DELETEroutineDoneProps) => {
  const deleteResponse = await axios.delete(
    `/api/challenge/milestone/routine/done`,
    {
      data: params,
    }
  )
}
