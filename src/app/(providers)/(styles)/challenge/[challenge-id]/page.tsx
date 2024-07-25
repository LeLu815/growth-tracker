import ChallengeCommentList from "./_components/ChallengeCommentList"
import ChallengeInfo from "./_components/ChallengeInfo"
import ChallengeLike from "./_components/ChallengeLike"
import DiaryList from "./_components/DiaryList"

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
