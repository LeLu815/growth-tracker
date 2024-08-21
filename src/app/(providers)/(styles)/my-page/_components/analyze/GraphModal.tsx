"use client"

import React from "react"
import { useRouter } from "next/navigation"

import Button from "@/components/Button"

function GraphModal({ top = "-350px" }: { top?: string }) {
  const router = useRouter()
  return (
    <div
      className="relative right-[10px] z-20 px-[20px] py-[18px]"
      style={{ top: top }}
    >
      <div className="mx-auto flex max-w-md flex-col gap-[16px] rounded-lg bg-white p-6 text-center shadow-3">
        <div className="flex flex-col gap-[8px] px-[20px] py-[18px]">
          <div className="text-title-m">아직 완료한 챌린지가 없어요😢</div>
          <p className="mb-4 text-body-xs text-grey-500">
            최소 1개의 챌린지를 완료해야 <br />
            분석기능을 이용할 수 있어요!
          </p>
        </div>
        <Button
          intent="primary"
          size="lg"
          onClick={() => router.push("/my-challenge")}
        >
          챌린지 완료하고 분석받기
        </Button>
      </div>
    </div>
  )
}

export default GraphModal
