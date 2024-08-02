import DetailPageBottomBar from "@/components/DetailPageBottomBar/DetailPageBottomBar"
import Page from "@/components/Page"

import ChallengeCommentList from "./_components/ChallengeCommentList"
import ChallengeInfo from "./_components/ChallengeInfo"

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
