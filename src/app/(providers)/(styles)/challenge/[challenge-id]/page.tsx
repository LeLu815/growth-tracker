import Page from "@/components/Page"

import ChallengeCommentList from "./_components/ChallengeCommentList"
import ChallengeInfo from "./_components/ChallengeInfo"
import ChallengeLike from "./_components/ChallengeLike"
import DetailPageBottomBar from "@/components/DetailPageBottomBar/DetailPageBottomBar";

interface ChallengeDetailPageProps {
  params: { "challenge-id": string }
}

function ChallengeDetailPage({ params }: ChallengeDetailPageProps) {
  const challengeId = params["challenge-id"]

  return (
    <Page title="상세페이지" isTitleHidden>
      <ChallengeInfo challengeId={challengeId} />
      <ChallengeCommentList challengeId={challengeId} />
      <DetailPageBottomBar challengeId={challengeId} />
    </Page>
  )
}

export default ChallengeDetailPage
