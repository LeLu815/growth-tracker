import { useState } from "react"

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

  console.log("showComponent:", showComponent)
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
          <MilestoneCreateConfig
            setShowCompoent={(status: MilestoneCreateProps["status"]) =>
              setShowCompoent(status)
            }
          />
        </>
      )}
      {showComponent === "switch" && (
        <>
          <ChallengePageTitle
            title={title}
            step={3}
            allStepCount={4}
            titleHidden={true}
            handleClickGoBack={() => handleChangeStep(3)}
          />
          <MilestoneCreateSwitch />
        </>
      )}
    </div>
  )
}

export default MilestoneCreate
