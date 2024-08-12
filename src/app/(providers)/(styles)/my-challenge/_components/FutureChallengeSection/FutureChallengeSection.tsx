import React, { PropsWithChildren } from "react"

import { StructuredChallengeType } from "../../../../../../../types/supabase.type"

interface FutureMilestoneSectionProps {
  challenge: StructuredChallengeType
}

function FutureChallengeSection({
  challenge,
}: PropsWithChildren<FutureMilestoneSectionProps>) {
  return (
    <>
      <div>{challenge.goal}</div>
      <div>{challenge.start_at}</div>
    </>
  )
}

export default FutureChallengeSection
