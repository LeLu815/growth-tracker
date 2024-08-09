import React from "react"

import useMyChallengePageContext from "../../context"

function MyChallengeNavBar() {
  const { setPageToView, pageToView } = useMyChallengePageContext()

  const handleOnProgressClick = () => {
    setPageToView("onProgress")
  }
  const handleCompletedClick = () => {
    setPageToView("completed")
  }

  const getTabStyle = (
    currentPageToView: "onProgress" | "completed",
    item: "onProgress" | "completed"
  ) => {
    if (currentPageToView === item) {
      return "border-b-2 text-black border-b-[#141414]"
    } else {
      return "border-b-gray-300 border-b-[1px] text-[#ADADAD]" // 나머지 날짜는 모두 연한 회색 배경
    }
  }

  return (
    <div className="flex h-[50px] w-full flex-row items-center text-[16px] font-[700]">
      <div
        className={`flex h-full w-[50%] cursor-pointer items-center justify-center border-solid px-4 text-center ${getTabStyle(pageToView, "onProgress")}`}
        onClick={handleOnProgressClick}
      >
        <p>진행 중</p>
      </div>
      <div
        className={`flex h-full w-[50%] cursor-pointer items-center justify-center border-solid px-4 text-center ${getTabStyle(pageToView, "completed")}`}
        onClick={handleCompletedClick}
      >
        <p>진행 완료</p>
      </div>
    </div>
  )
}

export default MyChallengeNavBar
