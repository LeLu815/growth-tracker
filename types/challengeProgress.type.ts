// 루틴 완료 여부를 추적하는 인터페이스
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

// 마일스톤 구조를 정의하는 인터페이스
export interface ProgressMilestoneType {
  id: string
  challenge_id: string
  routine: RoutineType[] // 여러 루틴을 포함
  total_cnt: number // 총 루틴 수
  success_cnt: number // 성공한 루틴 수
  success_requirement_cnt: number // 성공에 필요한 루틴 수
  // 필요한 다른 속성들 추가
  routine_done_daily?: RoutineDoneDaily[]
}

// 챌린지의 전체 구조를 정의하는 인터페이스

export interface ProgressChallengeType {
  id: string
  goal: string
  like_cnt: number
  template_cnt: number
  state: string
  category: string
  // user: {
  //   nickname: string
  //   profile_image_url: string
  // }
  milestone: ProgressMilestoneType[]

  progress: string
  image: string
  bookmarked: string[]
  liked: string[]
}
