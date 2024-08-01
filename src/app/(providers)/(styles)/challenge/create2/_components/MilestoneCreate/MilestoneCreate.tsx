import ChallengePageTitle from "../ChallengePageTitle"
import MilestoneCreateConfig from "./MilestoneCreateConfig"
import MilestoneCreateSwitch from "./MilestoneCreateSwitch"

interface MilestoneCreateProps {
  status: "config" | "switch"
  title: string
  handleChangeStep: (step: number) => void
}

function MilestoneCreate({
  status,
  title,
  handleChangeStep,
}: MilestoneCreateProps) {
  return (
    <div>
      {status === "config" && (
        <>
          <ChallengePageTitle
            title={title}
            step={4}
            allStepCount={4}
            titleHidden={false}
            handleClickGoBack={() => handleChangeStep(3)}
          />
          <MilestoneCreateConfig />
        </>
      )}
      {status === "switch" && (
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
