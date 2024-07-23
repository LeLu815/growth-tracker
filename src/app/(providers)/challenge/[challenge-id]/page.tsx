"use client"

import ChallengeCommentList from "@/app/(providers)/challenge/[challenge-id]/_components/ChallengeCommentList"
import ChallengeInfo from "@/app/(providers)/challenge/[challenge-id]/_components/ChallengeInfo"
import ChallengeLike from "@/app/(providers)/challenge/[challenge-id]/_components/ChallengeLike"
import DiaryList from "@/app/(providers)/challenge/[challenge-id]/_components/DiaryList"

function ChallengeDetailPage() {
  return (
    <div className={"w-full"}>
      <ChallengeInfo></ChallengeInfo>
      <DiaryList></DiaryList>
      <ChallengeLike></ChallengeLike>
      <ChallengeCommentList></ChallengeCommentList>
    </div>
  )
}

export default ChallengeDetailPage
