// src/types/challenge.ts
export interface RoutineDoneDaily {
  is_success: boolean
  // 필요한 다른 속성들 추가
}

export interface RoutineType {
  content: string
  created_at: string
  id: string
  milestone_id: string
  routine_done_daily?: RoutineDoneDaily
}

export interface StructuredMilestoneType {
  id: string
  challenge_id: string
  routines: RoutineType[]
  // 필요한 다른 속성들 추가
}

export interface ChallengeType {
  id: string
  user_id: string
  goal: string
  milestones: StructuredMilestoneType[]
  // 필요한 다른 속성들 추가
}
