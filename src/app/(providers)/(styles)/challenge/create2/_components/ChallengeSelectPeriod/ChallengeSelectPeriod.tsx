import useChallengeCreateStore from "@/store/challengeCreate.store"

import Button from "@/components/Button"

import ChallengeCalender from "../ChallengeCalender/ChallengeCalender"
import ChallengeTitle from "../ChallengeTitle"

interface ChallengeSelectPeriod {
  handleChangeStep: (step: number) => void
  title: string
}

function ChallengeSelectPeriod({
  handleChangeStep,
  title,
}: ChallengeSelectPeriod) {
  const { range, setRange } = useChallengeCreateStore()
  return (
    <div>
      <ChallengeTitle
        title={title}
        step={2}
        allStepCount={4}
        titleHidden={false}
      />
      <div>
        <ChallengeCalender range={range} setRange={setRange} />
      </div>
      <Button onClick={() => handleChangeStep(2)}>다음</Button>
    </div>
  )
}

export default ChallengeSelectPeriod
