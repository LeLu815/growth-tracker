import { Metadata } from "next"

import ChallengeUpdate from "./_components/ChallengeUpdate"

export const generateMetadata = ({
  params,
}: ChallengeUpdatePageProps): Metadata => {
  const challengeId = params["challenge-id"]
  return {
    title: "챌린지 수정하기 - 디딧",
    description: "이 페이지에서 챌린지의 세부 정보를 수정할 수 있습니다.",
    openGraph: {
      title: "챌린지 수정하기 - 디딧",
      description: "이 페이지에서 챌린지의 세부 정보를 수정할 수 있습니다.",
      url: `https://growth-tracker-text.vercel.app/challenge/${challengeId}/update`,
    },
    twitter: {
      title: "챌린지 수정하기 - 디딧",
      description: "이 페이지에서 챌린지의 세부 정보를 수정할 수 있습니다.",
    },
  }
}

interface ChallengeUpdatePageProps {
  params: { "challenge-id": string }
}

function ChallengeUpdatePage({ params }: ChallengeUpdatePageProps) {
  const challengeId = params["challenge-id"]

  return <ChallengeUpdate challengeId={challengeId} />
}

export default ChallengeUpdatePage
