"use client"

import { useEffect, useState } from "react"

interface RoutineDoneDaily {
  is_success: boolean
}

interface RoutineType {
  content: string
  created_at: string
  id: string
  milestone_id: string
  routine_done_daily?: RoutineDoneDaily
}

interface StructuredMilestoneType {
  id: string
  challenge_id: string
  routines: RoutineType[]
}

interface ChallengeType {
  id: string
  user_id: string
  goal: string
  milestones: StructuredMilestoneType[]
}

interface ChallengeProgressProps {
  challenge: ChallengeType
  milestones: StructuredMilestoneType[]
}

function ChallengeProgress({
  challenge,
  milestones = [],
}: ChallengeProgressProps) {
  const [completionRate, setCompletionRate] = useState<number>(0)

  useEffect(() => {
    const today = new Date().toLocaleDateString("ko-KR")

    const totalRoutines = milestones.reduce((acc, milestone) => {
      const validRoutines = milestone.routines.filter((routine) => {
        return new Date(routine.created_at).toLocaleDateString("ko-KR") <= today
      })

      return acc + validRoutines.length
    }, 0)

    const successfulRoutines = milestones.reduce((acc, milestone) => {
      const todaySuccess = milestone.routines.filter((routine) => {
        const isSuccess = routine.routine_done_daily
          ? routine.routine_done_daily.is_success
          : false

        return (
          new Date(routine.created_at).toLocaleDateString("ko-KR") <= today &&
          isSuccess
        )
      })

      return acc + todaySuccess.length
    }, 0)

    const completion =
      totalRoutines > 0 ? (successfulRoutines / totalRoutines) * 100 : 0

    setCompletionRate(completion)

    console.log(totalRoutines)
    console.log(successfulRoutines)
  }, [milestones])

  return <div>{completionRate.toFixed(2)}%</div>
}

export default ChallengeProgress
