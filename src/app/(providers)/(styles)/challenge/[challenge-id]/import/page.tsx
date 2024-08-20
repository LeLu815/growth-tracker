import { Metadata } from "next"

import ChallengeCreateImport from "./_components/ChallengeCreateImport"

export const generateMetadata = ({
  params,
}: ChallengeImportPageProps): Metadata => {
  const challengeId = params["challenge-id"]
  return {
    title: "챌린지 가져오기 - 디딧",
    description: "이 페이지에서 챌린지를 가져오기할 수 있습니다.",
    openGraph: {
      title: "챌린지 가져오기 - 디딧",
      description: "이 페이지에서 챌린지를 가져오기할 수 있습니다.",
      url: `https://growth-tracker-text.vercel.app/challenge/${challengeId}/import`,
    },
    twitter: {
      title: "챌린지 가져오기 - 디딧",
      description: "이 페이지에서 챌린지를 가져오기할 수 있습니다.",
    },
  }
}

interface ChallengeImportPageProps {
  params: { "challenge-id": string }
}
function ChallengeImportPage({ params }: ChallengeImportPageProps) {
  const challengeId = params["challenge-id"]
  return <ChallengeCreateImport challengeId={challengeId} />
}

export default ChallengeImportPage
