import { useState } from "react"
import useChallengeCreateStore from "@/store/challengeCreate.store"

import Button from "@/components/Button"
import Input from "@/components/Input"

import ChallengePageTitle from "../ChallengePageTitle"
import SubTitle from "../styles/SubTitle"

interface ChallengeNameProps {
  title: string
  challenge_title?: string
  handleChangeStep: (step: number) => void
}

function ChallengeName({
  title,
  handleChangeStep,
  challenge_title = "",
}: ChallengeNameProps) {
  const [inputValue, setInputValue] = useState<string>(challenge_title)
  const { setGoal } = useChallengeCreateStore()
  return (
    <div>
      <ChallengePageTitle
        title={title}
        step={3}
        allStepCount={4}
        titleHidden={false}
        handleClickGoBack={() => handleChangeStep(2)}
      />
      <SubTitle>챌린지 명을 입력해주세요.</SubTitle>
      <Input
        label={"챌린지 명"}
        required
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        placeholder="챌린지명을 입력해주세요"
      />
      <Button
        disabled={inputValue === ""}
        onClick={() => {
          handleChangeStep(4)
          setGoal(inputValue)
        }}
      >
        완료
      </Button>
    </div>
  )
}

export default ChallengeName
