import ChallengeCommentList from "@/app/(providers)/challenge/[challenge-id]/_components/ChallengeCommentList"
import ChallengeInfo from "@/app/(providers)/challenge/[challenge-id]/_components/ChallengeInfo"
import ChallengeLike from "@/app/(providers)/challenge/[challenge-id]/_components/ChallengeLike"
import DiaryList from "@/app/(providers)/challenge/[challenge-id]/_components/DiaryList"

interface ChallengeDetailPageProps {
  params: { "challenge-id": string }
}

function ChallengeDetailPage({ params }: ChallengeDetailPageProps) {
  const challengeId = params["challenge-id"]

  return (
    <div className={"w-full"}>
      <ChallengeInfo challengeId={challengeId}></ChallengeInfo>
      <DiaryList></DiaryList>
      <ChallengeLike challengeId={challengeId}></ChallengeLike>
      <ChallengeCommentList challengeId={challengeId}></ChallengeCommentList>
    </div>
  )
}

export default ChallengeDetailPage
