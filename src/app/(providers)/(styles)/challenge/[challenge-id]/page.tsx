import ChallengeCommentList from "./_components/ChallengeCommentList"
import ChallengeInfo from "./_components/ChallengeInfo"
import ChallengeLike from "./_components/ChallengeLike"

interface ChallengeDetailPageProps {
  params: { "challenge-id": string }
}

function ChallengeDetailPage({ params }: ChallengeDetailPageProps) {
  const challengeId = params["challenge-id"]

  return (
    <div className={"flex flex-col items-center"}>
      <ChallengeInfo challengeId={challengeId}></ChallengeInfo>
      <ChallengeLike challengeId={challengeId}></ChallengeLike>
      <ChallengeCommentList challengeId={challengeId}></ChallengeCommentList>
    </div>
  )
}

export default ChallengeDetailPage
