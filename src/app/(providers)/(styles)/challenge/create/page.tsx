import { Metadata } from "next"

import CreateChallenge from "./_components/CreateChallenge"

export const generateMetadata = (): Metadata => {
  return {
    title: "챌린지 생성 - 디딧",
    description: "생성 페이지에서 나만의 챌린지를 생성할 수 있습니다.",
    openGraph: {
      title: "챌린지 생성 - 디딧",
      description: "생성 페이지에서 나만의 챌린지를 생성할 수 있습니다.",
      url: "https://growth-tracker-text.vercel.app/challenge/create",
    },
    twitter: {
      title: "챌린지 생성 - 디딧",
      description: "생성 페이지에서 나만의 챌린지를 생성할 수 있습니다.",
    },
  }
}

function CreatePage() {
  return <CreateChallenge />
}

export default CreatePage
