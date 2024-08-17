import BookmarkIcon from "@/components/Icon/BookmarkIcon"
import ImportIcon from "@/components/Icon/ImportIcon"
import ChallengeLike from "@/app/(providers)/(styles)/challenge/[challenge-id]/_components/ChallengeLike"

import { ChallengeType } from "../../../../../../../types/challengeDetail.type"

interface ChallengeDetailCountProps {
  challenge: ChallengeType
  className: string | null
}

function ChallengeDetailCount({
  challenge,
  className = "",
}: ChallengeDetailCountProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-[10px] self-stretch ${className}`}
    >
      <div className="flex w-full flex-col items-start gap-[9px]">
        {/*챌린지 및 좋아요*/}
        <div className="flex items-start justify-between self-stretch">
          <h2 className="text-title-xl">{challenge?.goal}</h2>
          <ChallengeLike challengeId={challenge.id}></ChallengeLike>
        </div>

        {/*개수*/}
        <div className="flex w-full items-center gap-[11px] lg:hidden">
          <div className="flex gap-1 text-grey-50">
            <BookmarkIcon
              width={20}
              height={20}
              className={"h-[20px] w-[20px]"}
            />
            <div className={"pt-[2px] text-body-m"}>{challenge?.like_cnt}</div>
          </div>
          {challenge?.state === "on_complete" && (
            <div className="flex gap-1 text-grey-50">
              <ImportIcon
                width={20}
                height={20}
                className={"h-[20px] w-[20px]"}
              />
              <div className={"pt-[2px] text-body-m"}>
                {challenge?.template_cnt}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChallengeDetailCount
