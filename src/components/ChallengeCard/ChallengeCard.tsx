import Image from "next/image"
import { CopyIcon } from "lucide-react"

import Chip from "../Chip"
import LikeIcon from "../Icon/LikeIcon"
import RightArrowIcon from "../Icon/RightArrowIcon"

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
}: ChallengeCardProps) {
  return (
    <div className="flex rounded-lg border border-gray-200 bg-white p-3 shadow-md">
      <div className="mr-4 flex w-1/4 min-w-[98px] flex-col">
        <div
          className="align-start mb-2 flex h-full w-full flex-col items-start justify-between rounded-lg bg-gray-200 p-[8px]"
          style={{
            backgroundImage: `url(${challengeImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-sm text-white">{progress}</div>
          <Chip label={category} />
        </div>
      </div>
      <div className="flex w-3/4 flex-col">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-lg font-semibold">{title}</p>
          <RightArrowIcon />
        </div>
        <div className="mb-4 flex items-center">
          <div className="relative mr-2 h-[26px] w-[26px]">
            <Image
              src={userImage}
              alt={nickname}
              layout="fill"
              className="rounded-full border border-gray-300"
            />
          </div>
          <span className="text-gray-500">{nickname}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <LikeIcon
                width={15}
                height={17}
                filled={liked}
                color={liked ? "black" : "black"}
              />
              <span className="ml-1 text-sm text-gray-500">{likes}</span>
            </div>
            <div className="flex items-center">
              <CopyIcon
                width={16}
                height={18}
                color={bookmarked ? "black" : "#D9D9D9"}
              />
              <span className="ml-1 text-sm text-gray-500">{bookmarks}</span>
            </div>
          </div>
          <button className="flex text-sm text-gray-500">
            <CopyIcon width={16} height={18} />
            <span className="ml-1">가져오기</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChallengeCard
