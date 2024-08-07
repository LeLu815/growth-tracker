import axios from "axios"

import { DiaryType } from "../../../types/diary.type"

// export const GETdiary = async (params: {
//   routineDoneDailyId: string
//   selectedDate: string
// }) => {
//   const response = await axios.get(`/api/challenge/diary`)
//   const getResponse: DiaryType[] = response.data
//   return getResponse
// }

export const GETdiary = async (params: {
  routineDoneDailyId: string
  selectedDate: string
}): Promise<DiaryType[]> => {
  const { routineDoneDailyId, selectedDate } = params

  try {
    const response = await axios.get("/api/challenge/diary", {
      params: {
        routineDoneDailyId,
        selectedDate,
      },
    })
    const getResponse: DiaryType[] = response.data
    return getResponse
  } catch (error) {
    console.error("Error fetching diary:", error)
    throw error
  }
}

export const POSTdiary = async (params: DiaryType) => {
  const postResponse = await axios.post(`/api/challenge/diary`, {
    id: params.id,
    routine_done_daily_id: params.routine_done_daily_id,
    created_at: params.created_at,
    content: params.content,
    challenge_id: params.challenge_id,
  })

  return postResponse
}

export const PUTdiary = async (params: DiaryType) => {
  const postResponse = await axios.put(`/api/challenge/diary`, {
    content: params.content,
    routine_done_daily_id: params.routine_done_daily_id,
  })

  return postResponse
}
