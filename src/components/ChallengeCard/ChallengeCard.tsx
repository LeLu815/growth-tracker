import { convertStatusToKorean } from "@/app/(providers)/(styles)/challenge/[challenge-id]/_components/ChallengeInfo"

import {
  StructuredChallengeType,
  StructuredMilestoneType,
} from "../../../types/supabase.type"
import ChallengeProgress from "../ChallengeProgress"
import Chip from "../Chip"
import BookmarkIcon from "../Icon/BookmarkIcon"
import CopyIcon from "../Icon/CopyIcon"
import RangeInput from "../RangeInput"

interface ChallengeCardProps {
  title: string
  category: string
  likes: number
  bookmarks: number
  liked: boolean
  nickname: string
  progress: string
  userImage: string
  bookmarked: boolean
  challengeImage: string
  challenge: StructuredChallengeType
  milestones: StructuredMilestoneType[]
}

function ChallengeCard({
  title,
  category,
  liked,
  bookmarks,
  likes,
  nickname,
  progress,
  userImage,
  bookmarked,
  challengeImage,
  challenge,
}: ChallengeCardProps) {
  const getStatusChip = () => {
    const statusLabel = convertStatusToKorean(progress)

    let intent: "primary" | "secondary" | "third" | "category" = "primary"
    let variant: "outline" | "contained" | "selected" = "contained"

    switch (progress) {
      case "on_progress":
        intent = "primary"
        break
      case "on_complete":
        intent = "secondary"
        break
      case "on_fail":
        intent = "third"
        variant = "outline"
        break
      case "not_started":
        intent = "third"
        variant = "outline"
        break
      default:
        intent = "primary"
    }

    return (
      <Chip
        label={statusLabel as string}
        intent={intent}
        variant={variant}
        size="sm"
      />
    )
  }

  return (
    <div
      className="flex flex-col rounded-lg bg-white shadow-sm"
      style={{ border: "1px solid #E0E0E0" }}
    >
      <div className="flex w-full px-[8px] py-[14px]">
        <div className="mr-4 flex w-1/4 min-w-[98px] flex-col">
          <div className="align-start relative flex h-full w-full flex-col items-start justify-between rounded-lg bg-gray-200"></div>
        </div>
        <div className="flex w-3/4 flex-col">
          <div className="flex items-center justify-between">
            <p className="text-title-s font-bold">{title}</p>
          </div>
          <div className="flex w-full items-center justify-between py-[12px]">
            <span>{getStatusChip()}</span>
            <span>
              <span className="text-body-s font-medium">달성률 </span>
              <span className="text-body-m font-medium text-primary">
                <ChallengeProgress
                  challenge={challenge}
                  milestones={challenge.milestones || []}
                />
                100%
              </span>
            </span>
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
        <div className="flex w-1/4"></div>
        <div className="flex w-3/4 flex-col items-end px-[8px]">
          <ChallengeProgress
            challenge={challenge}
            milestones={challenge.milestones || []}
          />

          <RangeInput
            max={100}
            min={10}
            getValue={() => {}}
            trackColor="#82D0DC"
            thumbColor="#FC5A6B"
            step={5}
            defaultValue={50}
          />
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
