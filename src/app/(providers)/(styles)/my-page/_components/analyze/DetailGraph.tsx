"use client"

import React, { useState } from "react"

import Box from "@/components/Box"
import CategoryCountGraph from "@/app/(providers)/(styles)/my-page/_components/analyze/CategoryCountGraph"
import GraphModal from "@/app/(providers)/(styles)/my-page/_components/analyze/GraphModal"
import SuccessRateGraph from "@/app/(providers)/(styles)/my-page/_components/analyze/SuccessRateGraph"

function DetailGraph() {
  const [isActive, setIsActive] = useState(true)

  return (
    <div>
      <Box
        className={`mt-[28px] flex flex-col gap-10 ${isActive || "blur-md"}`}
      >
        <div>
          <SuccessRateGraph setIsActive={setIsActive} />
        </div>
        <hr></hr>
        <div className={"mt-10"}>
          <CategoryCountGraph setIsActive={setIsActive} />
        </div>
      </Box>
      {!isActive && <GraphModal top={"-600px"} />}
    </div>
  )
}

export default DetailGraph
