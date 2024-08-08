"use client"

import Notice from "../Notice/Notice"
import BaseHeader from "./BaseHeader"

function FeedHeader() {
  return (
    <BaseHeader className="bg-white">
      <div className="relative flex w-full items-center justify-between">
        <div className="absolute right-0">
          <Notice />
        </div>
        <div className="mx-auto">
          <h1 className="text-title-s font-bold">피드</h1>
        </div>
      </div>
    </BaseHeader>
  )
}

export default FeedHeader
