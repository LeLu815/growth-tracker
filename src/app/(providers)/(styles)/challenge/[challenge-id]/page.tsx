import { Metadata } from "next"

import ChallengeDetail from "./_components/ChallengeDetail"

export const generateMetadata = ({
  params,
}: ChallengeDetailPageProps): Metadata => {
  const challengeId = params["challenge-id"]
  return {
    title: "챌린지 상세보기 - 디딧",
    description: "이 페이지에서 챌린지의 세부 정보를 확인할 수 있습니다.",
    openGraph: {
      title: "챌린지 상세보기 - 디딧",
      description: "이 페이지에서 챌린지의 세부 정보를 확인할 수 있습니다.",
      url: `https://growth-tracker-text.vercel.app/challenge/${challengeId}`,
    },
    twitter: {
      title: "챌린지 상세보기 - 디딧",
      description: "이 페이지에서 챌린지의 세부 정보를 확인할 수 있습니다.",
    },
  }
}

interface ChallengeDetailPageProps {
  params: { "challenge-id": string }
}

function ChallengeDetailPage({ params }: ChallengeDetailPageProps) {
  const challengeId = params["challenge-id"]

  return <ChallengeDetail challengeId={challengeId} />
}

export default ChallengeDetailPage
