// PostType을 ProgressChallengeType과 일치하도록 수정
import { ProgressMilestoneType } from "./challengeProgress.type"
import { Database } from "./supabase"

// 루틴 완료 여부
export interface RoutineDoneDaily {
  is_success: boolean
}

export interface RoutineType {
  content: string
  created_at: string
  id: string
  milestone_id: string
  routine_done_daily?: RoutineDoneDaily[]
}

export type PostType = Database["public"]["Tables"]["challenge"]["Row"] & {
  goal: string
  like_cnt: number
  template_cnt: number
  state: string
  category: string
  progress: string
  image: string
  bookmarked: string[]
  liked: string[]
  id: string
  milestone: ProgressMilestoneType[]
  successRate: number
}
