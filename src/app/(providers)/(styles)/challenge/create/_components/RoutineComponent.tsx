"use client"

import { useState } from "react"

function RoutineComponent() {
  const [milestone_id, setMilestone_id] = useState<string>("")
  const [content, setContent] = useState<string>("")
  return (
    <div>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button>생성</button>
      <button>수정</button>
      <button>삭제</button>
    </div>
  )
}

export default RoutineComponent
