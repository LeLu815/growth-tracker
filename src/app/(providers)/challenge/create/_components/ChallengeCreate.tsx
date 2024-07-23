"use client"

import { useState } from "react"

function ChallengeCreate() {
  const [text, setText] = useState<string>()
  return (
    <div>
      <input
        type="date"
        onChange={(e) => console.log(e.target.value, typeof e.target.value)}
      />
    </div>
  )
}

export default ChallengeCreate
