import Box from "@/components/Box"
import Page from "@/components/Page"

import ChallengePageTitle from "../ChallengePageTitle"
import MilestoneCreateConfig from "./MilestoneCreateConfig"

export interface MilestoneCreateProps {
  title: string
  handleChangeStep: (step: number) => void
  getCreatedChallengeId: (id: string) => void
}
function MilestoneCreate({
  title,
  handleChangeStep,
  getCreatedChallengeId,
}: MilestoneCreateProps) {
  return (
    <div>
      <ChallengePageTitle
        title={title}
        step={4}
        allStepCount={4}
        titleHidden={false}
        handleClickGoBack={() => handleChangeStep(3)}
      />
      <Page>
        <Box>
          <MilestoneCreateConfig
            goNextPage={() => handleChangeStep(5)}
            getCreatedChallengeId={(id: string) => {
              console.log("마일스톤 크리에이트 id : ", id)
              getCreatedChallengeId(id)
            }}
          />
        </Box>
      </Page>
    </div>
  )
}

export default MilestoneCreate
