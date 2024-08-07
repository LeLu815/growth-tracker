import Image from "next/image"

import NoneProfile from "@/components/Icon/NoneProfile"

import BookmarkIcon from "../Icon/BookmarkIcon"
import CopyIcon from "../Icon/CopyIcon"
import LikeIcon from "../Icon/LikeIcon"

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
    <div
      className="flex flex-col rounded-lg bg-white shadow-sm"
      style={{ border: "1px solid #E0E0E0" }}
    >
      <div className="flex w-full px-[8px] py-[14px]">
        <div className="mr-4 flex w-1/4 min-w-[98px] flex-col">
          <div
            className="align-start relative mb-2 flex h-full w-full flex-col items-start justify-between rounded-lg bg-gray-200"
            // style={{
            //   backgroundImage: `url(${challengeImage})`,
            //   backgroundSize: "cover",
            //   backgroundPosition: "center",
            // }}
          >
            {/* 인기 챌린지 기준 미정의로 인해 일단 주석 처리~~ */}
            {/* <div className="absolute bottom-2 left-2 right-2 flex items-center gap-[3px] rounded-[30px] bg-orange-500 px-2 py-1 text-xs text-white">
              <ThumbsUpIcon color="white" width={12} height={12} />
              <span className="text-[10px]">인기 챌린지</span>
            </div> */}
          </div>
        </div>
        {/* 타이틀, 유저 정보, 좋아요, 북마크 횟수 */}
        <div className="flex w-3/4 flex-col">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-lg font-semibold">{title}</p>
          </div>
          <div className="mb-4 flex items-center">
            <div className="relative mr-[6px] h-[26px] w-[26px]">
              {userImage ? (
                <Image
                  src={userImage}
                  alt={nickname}
                  fill
                  className="rounded-full border border-gray-300"
                />
              ) : (
                <NoneProfile width={26} height={26} />
              )}
            </div>
            <span className="text-xs font-[500] text-gray-500">{nickname}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <LikeIcon
                  width={15}
                  height={17}
                  filled={liked}
                  fill={liked ? "red" : "black"}
                />
                <span className="ml-1 text-sm text-gray-500">{likes}</span>
              </div>
              <div className="flex items-center">
                <BookmarkIcon
                  width={16}
                  height={18}
                  color={bookmarked ? "black" : "#D9D9D9"}
                />
                <span className="ml-1 text-sm text-gray-500">{bookmarks}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 이미지 영역 */}

      <div
        className="w-full border-t-2 border-[#393232] px-[8px] py-[14px]"
        style={{ borderTop: "1px solid #E0E0E0" }}
      >
        <button className="flex w-full items-center justify-center text-sm text-[#474747]">
          <CopyIcon width={24} height={24} />
          <span className="ml-1 font-[500]">이 챌린지 가져오기</span>
        </button>
      </div>
    </div>
  )
}

export default ChallengeCard
