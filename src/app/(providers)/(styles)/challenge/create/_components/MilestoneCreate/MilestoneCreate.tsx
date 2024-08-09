import Box from "@/components/Box"
import Page from "@/components/Page"

import ChallengePageTitle from "../ChallengePageTitle"
import MilestoneCreateConfig from "./MilestoneCreateConfig"

export interface MilestoneCreateProps {
  title: string
  handleChangeStep: (step: number) => void
}
function MilestoneCreate({ title, handleChangeStep }: MilestoneCreateProps) {
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
          <MilestoneCreateConfig goNextPage={() => handleChangeStep(5)} />
        </Box>
      </Page>
    </div>
    // <div>
    //   {showComponent === "config" && (
    //     <>

    //     </>
    //   )}
    //   {showComponent === "switch" && (
    //     <>
    //       <ChallengePageTitle
    //         title={title}
    //         step={4}
    //         allStepCount={4}
    //         titleHidden={false}
    //         handleClickGoBack={() => handleChangeStep(3)}
    //       />
    //       <Page>
    //         <Box>
    //           <MilestoneCreateSwitch
    //             setShowCompoent={(status: MilestoneCreateProps["status"]) =>
    //               setShowCompoent(status)
    //             }
    //           />
    //         </Box>
    //       </Page>
    //     </>
    //   )}
    // </div>
  )
}

export default MilestoneCreate
