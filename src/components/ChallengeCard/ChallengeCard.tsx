import Image from "next/image"

import StateChip from "@/components/Chip/StateChip"
import { formatStartDate } from "@/app/(providers)/(styles)/newsfeed/_utils/dateUtils"

import { PostType } from "../../../types/challenge"
import { ProgressMilestoneType } from "../../../types/challengeProgress.type"
import BookmarkIcon from "../Icon/BookmarkIcon"
import CopyIcon from "../Icon/CopyIcon"
import SuccessBadge from "../Icon/SuccessBadge"
import ProgressBar from "../ProgressBar/ProgressBar"

interface ChallengeCardProps {
  title: string
  category: string
  likes: number
  bookmarks: number
  liked: boolean
  state: string
  bookmarked: boolean
  challengeImage: string
  successRate: number
  challenge?: PostType
  milestone?: ProgressMilestoneType[]
  startDate?: string
}

function ChallengeCard({
  title,
  category,
  liked,
  bookmarks,
  likes,
  state,
  bookmarked,
  challengeImage,
  successRate,
  startDate,
}: ChallengeCardProps) {
  const isCompleted = state === "on_complete"
  const isNotStarted = state === "not_started"
  const formattedStartDate = startDate ? formatStartDate(startDate) : ""

  return (
    <div
      className="flex cursor-pointer flex-col rounded-lg bg-white shadow-sm"
      style={{ border: "1px solid #E0E0E0" }}
    >
      <div className="flex w-full px-[12px] py-[14px]">
        <div className="mr-4 flex w-1/4 min-w-[98px] flex-col">
          <div className="relative flex h-full w-full flex-col items-start justify-between overflow-hidden rounded-[6px] border">
            <Image
              fill
              className="object-cover"
              src={challengeImage}
              alt="챌린지 대표 이미지"
            />
          </div>
        </div>
        <div className="flex w-3/4 flex-col">
          <div className="flex items-center justify-between">
            <p className="flex w-full justify-between text-title-s font-bold">
              <span>{title}</span>
              <span>{successRate === 100 && <SuccessBadge />}</span>
            </p>
          </div>
          <div className="flex w-full items-center justify-between py-[12px]">
            <StateChip state={state} />
            {isCompleted && (
              <span>
                <span className="text-body-s font-medium">달성률 </span>
                <span className="text-body-m font-medium text-primary">
                  {Math.round(successRate)}%
                </span>
              </span>
            )}
            {isNotStarted && (
              <span className="text-body-s text-grey-400">
                {formattedStartDate}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <BookmarkIcon
                  width={14}
                  height={14}
                  filled={liked}
                  fill={liked ? "red" : "black"}
                />
                <span className="ml-1 text-sm text-gray-500">{likes}</span>
              </div>
              <div className="flex items-center">
                <CopyIcon width={20} height={20} />
                <span className="text-sm text-gray-500">{bookmarks}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full">
        <div className="mr-4 flex w-1/4 min-w-[98px]"></div>
        <div className="flex w-3/4 flex-col items-end px-[12px]">
          <ProgressBar progress={Math.round(successRate)} />
        </div>
      </div>

      <div className="w-full py-[16px]">
        <button className="flex w-full items-center justify-center text-body-xs font-medium">
          <span className="ml-1 font-[500]">챌린지 상세 보기 &gt;</span>
        </button>
      </div>
    </div>
  )
}

export default ChallengeCard
