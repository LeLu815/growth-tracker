import axios from "axios"

import { DiaryType } from "../../../types/diary.type"

export const GETdiary = async () => {
  const response = await axios.get(`/api/challenge/diary`)
  const getResponse: DiaryType[] = response.data
  return getResponse
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
