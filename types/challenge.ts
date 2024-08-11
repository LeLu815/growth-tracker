// PostType을 ProgressChallengeType과 일치하도록 수정
import { ProgressMilestoneType } from "./challengeProgress.type"
import { Database } from "./supabase"

// 루틴 완료 여부
export interface RoutineDoneDaily {
  is_success: boolean
}

// 루틴의 기본 구조를 정의하는 인터페이스
export interface RoutineType {
  content: string
  created_at: string
  id: string
  milestone_id: string
  routine_done_daily?: RoutineDoneDaily[] // 루틴 완료 여부를 배열로 변경
}

export type PostType = Database["public"]["Tables"]["challenge"]["Row"] & {
  // user?: {
  //   nickname: string
  //   profile_image_url: string
  // }
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
}
