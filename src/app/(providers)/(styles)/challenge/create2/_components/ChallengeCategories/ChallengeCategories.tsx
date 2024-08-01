"use client"

import { useState } from "react"
import useChallengeCreateStore from "@/store/challengeCreate.store"

import Button from "@/components/Button"
import TrophyIcon from "@/components/Icon/TrophyIcon"

import ChallengePageTitle from "../ChallengePageTitle"

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
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  )
  const { setCategory } = useChallengeCreateStore()
  return (
    <div>
      <ChallengePageTitle
        title={title}
        step={1}
        allStepCount={4}
        titleHidden={false}
        handleClickGoBack={() => {}}
      />
      <p>어떤 챌린지에 도전하세요?</p>
      <TrophyIcon width="153" height="152" />
      <ul>
        {categories.map((category) => (
          <li
            className="cursor-pointer"
            key={category}
            onClick={() => setSelectedCategory(category)}
          >
            <Button selected={selectedCategory === category} intent="secondary">
              {category}
            </Button>
          </li>
        ))}
      </ul>
      <Button
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
