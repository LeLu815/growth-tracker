import ChallengeUpdate from "./_components/ChallengeUpdate"

interface ChallengeUpdatePageProps {
  params: { "challenge-id": string }
}

function ChallengeUpdatePage({ params }: ChallengeUpdatePageProps) {
  const challengeId = params["challenge-id"]

  return <ChallengeUpdate challengeId={challengeId} />
}

export default ChallengeUpdatePage
