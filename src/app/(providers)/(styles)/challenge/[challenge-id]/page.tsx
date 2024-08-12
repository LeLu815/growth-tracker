import Box from "@/components/Box"
import Page from "@/components/Page"
import ChallengeCommentCreate from "@/app/(providers)/(styles)/challenge/[challenge-id]/_components/ChallengeCommentCreate"

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
      <Box className={"mx-auto w-full max-w-[640px]"}>
        <ChallengeCommentList challengeId={challengeId} />
        <ChallengeCommentCreate challengeId={challengeId} />
      </Box>
    </Page>
  )
}

export default ChallengeDetailPage
