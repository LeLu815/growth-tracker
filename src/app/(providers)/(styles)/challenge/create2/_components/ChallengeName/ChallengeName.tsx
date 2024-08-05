import { useState } from "react"
import useChallengeCreateStore from "@/store/challengeCreate.store"

import Box from "@/components/Box"
import Button from "@/components/Button"
import Input from "@/components/Input"
import Page from "@/components/Page"

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
    <>
      <ChallengePageTitle
        title={title}
        step={3}
        allStepCount={4}
        titleHidden={false}
        handleClickGoBack={() => handleChangeStep(2)}
      />
      <Page>
        <Box>
          <SubTitle className="justify-center">
            챌린지 명을 입력해주세요.
          </SubTitle>
          <div className="h-[40px]"></div>
          <Input
            label={"챌린지 명"}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            placeholder="챌린지명을 입력해주세요"
          />
          {inputValue === "" && (
            <span className="text-[12px] text-[#B0B0B0]">
              챌린지명을 입력해주세요
            </span>
          )}
          <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-[640px] bg-white px-[20px] pb-8 pt-5">
            <Button
              size="lg"
              disabled={inputValue === ""}
              onClick={() => {
                handleChangeStep(4)
                setGoal(inputValue)
              }}
            >
              완료
            </Button>
          </div>
        </Box>
      </Page>
    </>
  )
}

export default ChallengeName
