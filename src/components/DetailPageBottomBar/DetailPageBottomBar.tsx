import { useState } from "react"
import { BookmarkIcon } from "lucide-react"

import Button from "../Button"
import ThumbsUpIcon from "../Icon/ThumbsUpIcon"

function DetailPageBottomBar() {
  const [isLiked, setIsLiked] = useState<boolean>(false)

  const handleLikeClick = () => {
    setIsLiked(!isLiked)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 w-full bg-white">
      <div className="grid grid-cols-5 p-4">
        <div className="col-span-1">
          <button
            className="flex w-full flex-col items-center justify-center transition-all duration-300"
            onClick={handleLikeClick}
          >
            <ThumbsUpIcon
              color={isLiked ? "#e1e1e1" : "#D9D9D9"}
              filled={isLiked || undefined}
            />
            <span
              className={`transition-all duration-300 ${isLiked ? "text-black" : "text-[#D9D9D9]"}`}
            >
              좋아요
            </span>
          </button>
        </div>

        <div className="col-span-4">
          <Button size="lg">
            <div className="flex items-center justify-center gap-[6px]">
              <BookmarkIcon />
              <span>챌린지 가져오기</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DetailPageBottomBar
