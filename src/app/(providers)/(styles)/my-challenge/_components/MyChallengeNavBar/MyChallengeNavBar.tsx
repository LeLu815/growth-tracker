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
    const isActive = currentPageToView === item
    return `border-b-[1px] border-solid transition-colors duration-300 ease-in-out ${
      isActive
        ? "border-b-2 border-b-[#141414] text-black"
        : "border-b-gray-300 text-[#ADADAD]"
    }`
  }

  return (
    <div className="flex h-[50px] w-full flex-row items-center text-[16px] font-[700]">
      <div
        className={`flex h-full w-[50%] cursor-pointer items-center justify-center px-4 text-center ${getTabStyle(
          pageToView,
          "onProgress"
        )}`}
        onClick={handleOnProgressClick}
      >
        <p>진행 중</p>
      </div>
      <div
        className={`flex h-full w-[50%] cursor-pointer items-center justify-center px-4 text-center ${getTabStyle(
          pageToView,
          "completed"
        )}`}
        onClick={handleCompletedClick}
      >
        <p>예정된 챌린지?!</p>
      </div>
    </div>
  )
}

export default React.memo(MyChallengeNavBar)
