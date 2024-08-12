"use client"

import { useEffect, useState } from "react"

function TestCom() {
  const [milestones, setMilestones] = useState([]) // milestones 상태를 초기화합니다.
  const [challenge, setChallenge] = useState(null)

  useEffect(() => {
    // API 호출을 통해 데이터를 가져옵니다.
    const fetchData = async () => {
      try {
        const response = await fetch("/api/challenges")
        const data = await response.json()
        setMilestones(data.milestones) // 데이터를 상태에 저장합니다.
        setChallenge(data.challenge) // 챌린지 데이터를 상태에 저장합니다.
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData() // fetchData 함수 호출
  }, []) // 컴포넌트가 마운트될 때 한 번만 호출합니다.

  if (!challenge || milestones.length === 0) {
    return <div>Loading...</div> // 데이터를 가져오는 동안 로딩 상태를 표시합니다.
  }

  return (
    // <ChallengeProgress challenge={challenge} milestones={milestones || []} />
    <div></div>
  )
}

export default TestCom
