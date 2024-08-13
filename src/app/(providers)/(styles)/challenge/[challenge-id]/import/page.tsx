import ChallengeCreateImport from "./_components/ChallengeCreateImport"

interface ChallengeImportPageProps {
  params: { "challenge-id": string }
}
function ChallengeImportPage({ params }: ChallengeImportPageProps) {
  const challengeId = params["challenge-id"]
  return <ChallengeCreateImport challengeId={challengeId} />
}

export default ChallengeImportPage
