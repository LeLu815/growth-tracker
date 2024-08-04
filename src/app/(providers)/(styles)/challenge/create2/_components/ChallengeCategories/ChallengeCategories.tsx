"use client"

import { useState } from "react"
import useChallengeCreateStore from "@/store/challengeCreate.store"

import Button from "@/components/Button"
import TrophyIcon from "@/components/Icon/TrophyIcon"

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
  const { setCategory, category } = useChallengeCreateStore()
  const [selectedCategory, setSelectedCategory] = useState<string>(
    category || categories[0]
  )
  return (
    <div>
      <ChallengePageTitle
        title={title}
        step={1}
        allStepCount={4}
        titleHidden={false}
        handleClickGoBack={() => {}}
      />
      <SubTitle>어떤 챌린지에 도전하세요?</SubTitle>
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
              size="lg"
              selected={selectedCategory === category}
              intent="secondary"
            >
              {category}
            </Button>
          </li>
        ))}
      </ul>
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
  )
}

export default ChallengeCategories
