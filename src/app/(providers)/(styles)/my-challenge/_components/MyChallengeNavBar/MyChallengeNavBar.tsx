import React from "react"

function MyChallengeNavBar() {
  return (
    <div className="flex w-full flex-row items-center text-[16px] font-[700]">
      <div className="w-[50%] cursor-pointer border-b-2 border-solid border-b-[#141414] px-4 pb-4 text-center text-black">
        진행 중
      </div>
      <div className="w-[50%] cursor-pointer border-b-[1px] border-solid border-b-gray-300 px-4 pb-4 text-center text-[#ADADAD]">
        진행 완료
      </div>
    </div>
  )
}

export default MyChallengeNavBar
