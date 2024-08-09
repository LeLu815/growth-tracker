import React from "react"

function MyChallengeNavBar() {
  return (
    <div className="flex h-[50px] w-full flex-row items-center text-[16px] font-[700]">
      <div className="flex h-full w-[50%] cursor-pointer items-center justify-center border-b-2 border-solid border-b-[#141414] px-4 text-center text-black">
        <p>진행 중</p>
      </div>
      <div className="flex h-full w-[50%] cursor-pointer items-center justify-center border-b-[1px] border-solid border-b-gray-300 px-4 text-center text-[#ADADAD]">
        <p>진행 완료</p>
      </div>
    </div>
  )
}

export default MyChallengeNavBar
