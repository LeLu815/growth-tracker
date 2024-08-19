import Image from "next/image"

import DefaultProfile from "@/components/Icon/DefaultProfile"

import { ChallengeType } from "../../../../../../../types/challengeDetail.type"
import StateChip from "../../../../../../components/Chip/StateChip"

interface ChallengeDetailUserInfoProps {
  challenge: ChallengeType
  className?: string
}

function ChallengeDetailUserInfo({
  challenge,
  className = "",
}: ChallengeDetailUserInfoProps) {
  return (
    <div className={`flex items-center gap-[8px] self-stretch ${className}`}>
      {challenge?.profile_image_url ? (
        <div className="h-[50px] w-[50px] overflow-hidden rounded-full bg-gray-300 lg:h-[42px] lg:w-[42px]">
          <Image
            width={50}
            height={50}
            src={challenge.profile_image_url}
            alt="MyPageMain Image"
            className="h-[50px] w-[50px] object-cover lg:h-[42px] lg:w-[42px]"
          />
        </div>
      ) : (
        <DefaultProfile width={50} height={50}></DefaultProfile>
      )}
      <div className={"flex"}>
        <div className="flex flex-col gap-[10px]">
          <p className="text-title-m text-[#717171]">{challenge?.nickname}</p>
          <div className="w-[195px] text-body-s text-[#717171] lg:hidden">
            {challenge?.start_at} ~ {challenge?.end_at}
          </div>
        </div>
        <div className={"my-auto flex flex-nowrap lg:hidden"}>
          <StateChip state={challenge?.state || ""} />
        </div>
      </div>
    </div>
  )
}

export default ChallengeDetailUserInfo
