import Box from "@/components/Box"
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
    <Page>
      <ChallengeInfo challengeId={challengeId} />
      <Box>
        <ChallengeCommentList challengeId={challengeId} />
      </Box>
      <DetailPageBottomBar challengeId={challengeId} />
    </Page>
  )
}

export default ChallengeDetailPage
