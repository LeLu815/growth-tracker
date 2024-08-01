export type RoutineType = {
  id: string
  created_at: string
  content: string
}

export type MilestoneType = {
  created_at: string
  start_at: string
  challenge_id: string
  end_at: string
  total_day: number
  weeks: string[]
  is_success: boolean
  id: string
  success_requirement_cnt: number
  total_cnt: number
  routines: RoutineType[]
}

export type ChallengeType = {
  id: string
  created_at: string
  user_id: string
  nickname: string
  goal: string
  like_cnt: number
  template_cnt: number
  view_cnt: number
  is_secret: boolean
  day_cnt: number
  comment_cnt: number
  state: string
  category: string
  start_at: string
  end_at: string
  milestones: MilestoneType[]
}

export type ChallengeCommentType = {
  user_id: string
  content: string
  is_like: boolean
  email: string
  nickname: string
  profile_image_url: string
  id: string
}

export type ChallengeCommentPageType = {
  pages: [ChallengeCommentType[]]
  pageParams: number[]
}
