import { useState } from "react"

import Box from "@/components/Box"
import Page from "@/components/Page"

import ChallengePageTitle from "../ChallengePageTitle"
import MilestoneCreateConfig from "./MilestoneCreateConfig"
import MilestoneCreateSwitch from "./MilestoneCreateSwitch"

export interface MilestoneCreateProps {
  status: "config" | "switch"
  title: string
  handleChangeStep: (step: number) => void
}
function MilestoneCreate({
  status,
  title,
  handleChangeStep,
}: MilestoneCreateProps) {
  const [showComponent, setShowCompoent] =
    useState<MilestoneCreateProps["status"]>(status)

  return (
    <div>
      {showComponent === "config" && (
        <>
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
                setShowCompoent={(status: MilestoneCreateProps["status"]) =>
                  setShowCompoent(status)
                }
              />
            </Box>
          </Page>
        </>
      )}
      {showComponent === "switch" && (
        <>
          <ChallengePageTitle
            title={title}
            step={4}
            allStepCount={4}
            titleHidden={false}
            handleClickGoBack={() => handleChangeStep(3)}
          />
          <Page>
            <Box>
              <MilestoneCreateSwitch
                setShowCompoent={(status: MilestoneCreateProps["status"]) =>
                  setShowCompoent(status)
                }
              />
            </Box>
          </Page>
        </>
      )}
    </div>
  )
}

export default MilestoneCreate
