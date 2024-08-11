"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import Box from "@/components/Box"
import Button from "@/components/Button"
import CategoryCountGraph from "@/app/(providers)/(styles)/my-page/_components/analyze/CategoryCountGraph"
import ChallengeStatusOverviewGraph from "@/app/(providers)/(styles)/my-page/_components/analyze/ChallengeStatusOverviewGraph"
import SuccessRateGraph from "@/app/(providers)/(styles)/my-page/_components/analyze/SuccessRateGraph"

function Page() {
  const [step, setStep] = useState(2)

  const handleAddStep = (addStep: number) => {
    setStep(step + addStep)
  }

  useEffect(() => {
    return setStep(0)
  }, [])

  return (
    <Box
      className={
        "mx-auto mb-10 flex h-screen w-full max-w-[640px] flex-col gap-2"
      }
    >
      {step === 0 && <SuccessRateGraph />}
      {step === 1 && <CategoryCountGraph></CategoryCountGraph>}
      {step === 2 && (
        <ChallengeStatusOverviewGraph></ChallengeStatusOverviewGraph>
      )}
      <div className={"mt-4 flex flex-col gap-4"}>
        <ul className="flex justify-center gap-[6px]">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <li
                className={`h-[14px] w-[14px] rounded-full ${index == step ? "bg-black" : "bg-[#D9D9D9]"}`}
                key={index}
              ></li>
            ))}
        </ul>
        <div className={"flex justify-center gap-4"}>
          {step > 0 && (
            <Button
              intent="primary"
              size="sm"
              type={"button"}
              onClick={() => handleAddStep(-1)}
            >
              이전
            </Button>
          )}
          {step < 2 && (
            <Button
              intent="primary"
              size="sm"
              type={"button"}
              onClick={() => handleAddStep(1)}
            >
              다음
            </Button>
          )}
        </div>
      </div>
    </Box>
  )
}

export default Page
