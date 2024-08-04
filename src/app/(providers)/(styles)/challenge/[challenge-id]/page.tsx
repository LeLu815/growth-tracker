import Box from "@/components/Box"
import Page from "@/components/Page"
import BottomBar from "@/app/(providers)/(styles)/challenge/[challenge-id]/_components/BottomBar"

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
      <hr className={"mt-5"}></hr>
      <Box>
        <ChallengeCommentList challengeId={challengeId} />
      </Box>
      <Box>
        <BottomBar challengeId={challengeId} />
      </Box>
    </Page>
  )
}

export default ChallengeDetailPage
