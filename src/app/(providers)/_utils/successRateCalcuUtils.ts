import { ProgressMilestoneType } from "../../../../types/challengeProgress.type"

export function successRateCalcu(milestones: ProgressMilestoneType[]): number {
  const totalRoutineDays = milestones.reduce((acc, milestone) => {
    const totalDays = milestone.routine_done_daily?.length || 0
    return acc + totalDays
  }, 0)

  // 성공한 루틴 총 횟수
  const successfulRoutine = milestones.reduce((acc, milestone) => {
    const successfulInMilestone =
      milestone.routine_done_daily?.filter((rdd) => rdd.is_success).length || 0
    return acc + successfulInMilestone
  }, 0)

  // 전체 성공률 계산
  const overallSuccessRate =
    totalRoutineDays > 0
      ? Math.round((successfulRoutine / totalRoutineDays) * 100)
      : 0

  return overallSuccessRate
}
