"use client"

import React, { PropsWithChildren } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import BookMarkIcon02 from "@/components/Icon/BookMarkIcon02"
import SaveIcon from "@/components/Icon/SaveIcon"

import { StructuredChallengeType } from "../../../../../../../types/supabase.type"

interface FutureMilestoneSectionProps {
  challenge: StructuredChallengeType
}

function FutureChallengeSection({
  challenge,
}: PropsWithChildren<FutureMilestoneSectionProps>) {
  const router = useRouter()
  return (
    <section>
      <div className="flex gap-x-[24px]">
        {/* 챌린지 썸네일 이미지 */}
        <Image
          src={challenge.image_url || ""}
          alt={challenge.goal}
          width={84}
          height={84}
          className="h-[84px] w-[84px] rounded-md object-cover"
        />
        {/* 이미지 옆 모든 것 */}
        <div className="flex grow flex-col gap-y-[12px]">
          {/* 챌린지 이름 */}
          <h3 className="text-title-xs font-bold">{challenge.goal}</h3>
          {/* 챌린지 상태 칩 및 시작일 */}
          <div className="flex items-center justify-between">
            <p className="w-[82px] rounded-2xl border-[1px] border-solid border-[#7A7A7A] px-2 py-1 text-center text-[11px] text-[#7A7A7A]">
              챌린지 실행전
            </p>
            <p className="text-[11px] text-[#7A7A7A]">
              {(challenge.start_at || "").replace(/-/g, ".")} 예정
            </p>
          </div>
          {/* 아이콘 섹션 */}
          <div className="flex items-center justify-start gap-x-[11px]">
            <div className="flex items-center justify-start gap-x-[4px]">
              <BookMarkIcon02 />
              <p className="text-[12px] text-[#1A1A1A]">{challenge.like_cnt}</p>
            </div>
            <div className="flex items-center justify-start gap-x-[4px]">
              <SaveIcon />
              <p className="my-auto text-[12px] text-[#1A1A1A]">
                {challenge.template_cnt}
              </p>
            </div>
          </div>
          {/* 구분선 */}
          <div className="h-[6px] w-full overflow-hidden rounded-lg bg-gray-300"></div>
        </div>
      </div>
      {/* 상세페이지 링크 */}
      <div className="mt-[16px] flex w-full justify-center">
        <p
          className="text-[12px] text-[#1A1A1A]"
          onClick={() => {
            router.push(`/challenge/${challenge.id}`)
          }}
        >
          {"챌린지 상세 보기 >"}
        </p>
      </div>
    </section>
  )
}

export default FutureChallengeSection
