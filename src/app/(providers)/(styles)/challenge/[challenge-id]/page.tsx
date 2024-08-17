import ChallengeDetail from "./_components/ChallengeDetail"

interface ChallengeDetailPageProps {
  params: { "challenge-id": string }
}

function ChallengeDetailPage({ params }: ChallengeDetailPageProps) {
  const challengeId = params["challenge-id"]

  return <ChallengeDetail challengeId={challengeId} />
}

export default ChallengeDetailPage
