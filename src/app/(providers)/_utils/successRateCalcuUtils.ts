import { ProgressMilestoneType } from "../../../../types/challengeProgress.type"

export function successRateCalcu(milestone: ProgressMilestoneType[]): number {
  // 총 루틴 수 계산
  const totalRoutines = milestone.reduce(
    (acc, milestoneItem) => acc + (milestoneItem.routine?.length || 0),
    0
  )

  // 성공한 루틴 수 계산
  const successfulRoutines = milestone.reduce((acc, milestoneItem) => {
    const successfulInMilestone =
      milestoneItem.routine_done_daily?.filter((rdd) => rdd.is_success)
        .length || 0
    return acc + successfulInMilestone
  }, 0)

  // 달성률 계산
  const successRate =
    totalRoutines > 0 ? (successfulRoutines / totalRoutines) * 100 : 0

  return successRate
}
