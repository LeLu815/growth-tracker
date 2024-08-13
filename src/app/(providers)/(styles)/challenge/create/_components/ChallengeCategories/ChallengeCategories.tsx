"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useModal } from "@/context/modal.context"
import useChallengeCreateStore, {
  defaultSelected,
} from "@/store/challengeCreate.store"
import useMilestoneCreateStore from "@/store/milestoneCreate.store"

import Box from "@/components/Box"
import Button from "@/components/Button"
import TrophyIcon from "@/components/Icon/TrophyIcon"
import Page from "@/components/Page"

import ChallengePageTitle from "../ChallengePageTitle"
import SubTitle from "../styles/SubTitle"

interface ChallengeCategoriesProps {
  categories: string[]
  title: string
  handleChangeStep: (step: number) => void
}

function ChallengeCategories({
  categories,
  title,
  handleChangeStep,
}: ChallengeCategoriesProps) {
  const { category, setRange, setCategory, setGoal } = useChallengeCreateStore()
  const { setData } = useMilestoneCreateStore()
  const [selectedCategory, setSelectedCategory] = useState<string>(
    category || categories[0]
  )
  const { open } = useModal()
  const router = useRouter()
  return (
    <>
      <ChallengePageTitle
        title={title}
        step={1}
        allStepCount={4}
        titleHidden={false}
        handleClickGoBack={() => {
          open({
            type: "confirm",
            content: "챌린지 작성을 취소하시겠습니까?",
            onConfirm: () => {
              // 2. 주스텐드 싹다 정리하는 함수를 실행하기 (스토어 초기화)
              setData([])
              setRange(defaultSelected)
              setCategory(categories[0])
              setGoal("")
              router.replace("/")
            },
          })
        }}
      />

      <Page>
        <Box className="flex-1">
          <SubTitle className="justify-center">
            어떤 챌린지에 도전하세요?
          </SubTitle>
          <div className="my-[20px] flex justify-center">
            <TrophyIcon width="153" height="152" />
          </div>
          <ul className="flex flex-col gap-y-[20px]">
            {categories.map((category) => (
              <li
                className="cursor-pointer"
                key={category}
                onClick={() => setSelectedCategory(category)}
              >
                <Button
                  variant="outline"
                  size="lg"
                  selected={selectedCategory === category}
                >
                  {category}
                </Button>
              </li>
            ))}
          </ul>
          <div className="h-[100px]"></div>
          <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-[480px] bg-white px-[20px] pb-8 pt-5">
            <Button
              size="lg"
              onClick={() => {
                handleChangeStep(2)
                setCategory(selectedCategory)
              }}
            >
              다음
            </Button>
          </div>
        </Box>
      </Page>
    </>
  )
}

export default ChallengeCategories
