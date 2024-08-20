"use client"

import React from "react"
import { useSearchParams } from "next/navigation"

import useMyChallengePageContext from "../../context"

function ChallengeResultPage() {
  const params = useSearchParams()
  const challengeId = params.get("challengeId") || ""
  const { structuredChallengeData, currentUserRoutineDoneDaily } =
    useMyChallengePageContext()

  console.log(structuredChallengeData)

  const targetChallenge = structuredChallengeData.find((item) => {
    return (item.id = challengeId)
  })
  console.log(targetChallenge)

  const targetMilestones = targetChallenge?.milestones || []
  console.log(targetMilestones)

  const isSuccess = targetMilestones.every((milestone) => {
    const targetRDDs = currentUserRoutineDoneDaily.filter((item) => {
      return item.milestone_id == milestone.id
    })
    console.log(targetRDDs)
    console.log(milestone.success_requirement_cnt)
    console.log(targetRDDs.length)
    return milestone.success_requirement_cnt == targetRDDs.length
  })
  console.log(isSuccess)

  return <div>{isSuccess}</div>
}

export default ChallengeResultPage
