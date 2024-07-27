import Page from "@/components/Page"

import ChallengeCreate from "./_components/ChallengeCreate"
import DragDropContainer from "./_components/Milestone/DragDropContainer"
import Calender from "./calender"

function ChallengeCreatePage() {
  return (
    <Page title="챌린지 생성">
      <h1>챌린지 생성</h1>
      <ChallengeCreate />
      <div className="flex h-[600px] w-[600px] flex-col items-center justify-center gap-8 rounded-[20px] border border-neutral-600">
        <Calender />
      </div>

      <DragDropContainer />
    </Page>
  )
}

export default ChallengeCreatePage
