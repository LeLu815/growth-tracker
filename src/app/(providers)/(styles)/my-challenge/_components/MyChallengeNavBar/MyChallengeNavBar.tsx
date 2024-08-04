import React from "react"

function MyChallengeNavBar() {
  return (
    <div className="flex w-full flex-row items-center justify-between font-bold">
      <div className="cursor-pointer border-b-2 border-solid border-b-orange-400 px-4 pb-4 text-orange-400">
        진행 중
      </div>
      <div className="cursor-pointer border-b-2 border-solid border-b-gray-400 px-4 pb-4 text-gray-400">
        진행 완료
      </div>
      <div className="cursor-pointer border-b-2 border-solid border-b-gray-400 px-4 pb-4 text-gray-400">
        보관함
      </div>
    </div>
  )
}

export default MyChallengeNavBar
