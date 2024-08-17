import Chip from "@/components/Chip"
import ChallengeLike from "@/app/(providers)/(styles)/challenge/[challenge-id]/_components/ChallengeLike"

import { ChallengeType } from "../../../../../../../types/challengeDetail.type"

interface ChallengeDetailInfoProps {
  challenge: ChallengeType
  className: string | null
}

function ChallengeDetailInfo({
  challenge,
  className = "",
}: ChallengeDetailInfoProps) {
  return (
    <div
      className={`flex flex-col items-start gap-[16px] self-stretch pb-[20px] ${className}`}
    >
      <div className="flex w-full flex-col items-start gap-[16px]">
        <div className={"flex w-full justify-between"}>
          <div className={"flex gap-[13px]"}>
            <div className="text-title-s text-[#171717]">챌린지 정보</div>
            {challenge.like_cnt >= 10 && (
              <Chip label={`인기 챌린지`} intent={"popular"} />
            )}
          </div>
          <div className={"hidden lg:block"}>
            <ChallengeLike challengeId={challenge.id}></ChallengeLike>
          </div>
        </div>
        <div className={"flex flex-col gap-[8px]"}>
          <div className={"flex gap-[24px]"}>
            <div className="w-[70px] text-body-m text-grey-50">구분</div>
            <div className="text-body-m text-grey-50">
              {challenge?.category}
            </div>
          </div>

          <div className={"flex gap-[24px]"}>
            <div className="w-[70px] text-body-m text-grey-50">챌린지 기간</div>
            <div className="flex gap-[12px] text-body-m text-grey-50">
              <div className={"hidden lg:block"}>
                {challenge?.start_at} ~ {challenge?.end_at}
              </div>
              <div className={"lg:text-primary"}>{challenge?.day_cnt}일</div>
            </div>
          </div>

          <div className={"flex gap-[24px]"}>
            <div className="w-[70px] text-body-m text-grey-50">달성률</div>
            <div className="text-body-m text-grey-50">
              {challenge?.state === "on_complete"
                ? `${Math.floor(
                    (challenge?.routine_done_daily_success_count /
                      challenge.milestones.reduce((sum, milestone) => {
                        return sum + milestone.total_cnt
                      }, 0)) *
                      100
                  )}%`
                : "진행완료 후 집계됩니다."}
            </div>
          </div>

          <div className={"hidden lg:flex lg:gap-[24px]"}>
            <div className="w-[70px] text-body-m text-grey-50">찜 수</div>
            <div className="text-body-m text-grey-50">
              {challenge?.like_cnt}
            </div>
          </div>

          <div className={"hidden lg:flex lg:gap-[24px]"}>
            <div className="w-[70px] text-body-m text-grey-50">가져오기 수</div>
            <div className="text-body-m text-grey-50">
              {challenge?.template_cnt}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChallengeDetailInfo
