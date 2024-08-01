"use client"

import { useState } from "react"

export const categories = ["건강", "생활", "공부", "취미"]

function CreateChallenge() {
  const [stepNum, setStepNum] = useState<number>(1)
  return <div>CreateChallenge</div>
}

export default CreateChallenge
