type Routine = {
  id: string
  created_at: string
  content: string
}

type Milestone = {
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
  routines: Routine[]
}

type Challenge = {
  id: string
  created_at: string
  user_id: string
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
  milestones: Milestone[]
}
