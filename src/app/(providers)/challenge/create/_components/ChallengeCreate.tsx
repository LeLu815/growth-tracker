"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth.context"
import { useChallengeQuery } from "@/query/challenge/userChallengeQuery"

function ChallengeCreate() {
  // 챌린지 관련 데이터
  const [title, setTitle] = useState<string>("")
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  // 마일스톤 관련 데이터
  const [routineCount, setRoutineCount] = useState<number>(0)
  // 루틴 관련 데이터

  const { challengeCreateMutate, challengeCreateIsPending } =
    useChallengeQuery()

  // auth 데이터
  const { me } = useAuth()

  const INITIAL_DATA = {
    challenge: {
      category: "",
      day_cnt: 40,
      end_at: "2024-7-24",
      start_at: "2024-7-23",
      goal: "챌린지 생성 테스트 이인",
      is_secret: false,
      user_id: me?.id!,
    },
    milestone: [
      {
        challenge_id: "",
        end_at: "2024-7-24",
        start_at: "2024-7-23",
        success_requirement_cnt: 30,
        total_cnt: 40,
        total_day: 30,
        is_fri: true,
        is_sat: true,
      },
      {
        challenge_id: "",
        end_at: "2024-7-24",
        start_at: "2024-7-23",
        success_requirement_cnt: 30,
        total_cnt: 40,
        total_day: 30,
        is_fri: true,
        is_sat: true,
      },
      {
        challenge_id: "",
        end_at: "2024-7-24",
        start_at: "2024-7-23",
        success_requirement_cnt: 30,
        total_cnt: 40,
        total_day: 30,
        is_fri: true,
        is_sat: true,
      },
      {
        challenge_id: "",
        end_at: "2024-7-24",
        start_at: "2024-7-23",
        success_requirement_cnt: 30,
        total_cnt: 40,
        total_day: 30,
        is_fri: true,
        is_sat: true,
      },
      {
        challenge_id: "",
        end_at: "2024-7-24",
        start_at: "2024-7-23",
        success_requirement_cnt: 30,
        total_cnt: 40,
        total_day: 30,
        is_fri: true,
        is_sat: true,
      },
    ],
    routine: [
      [
        {
          content: "루틴 생성 테스트 이인",
          milestone_id: "",
        },
      ],
    ],
  }

  return (
    <div>
      <input
        type="text"
        placeholder="챌린지 이름"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
        <label htmlFor="">챌린지 시작날짜</label>
        <input
          className="text-black"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="">챌린지 종료날짜</label>
        <input
          className="text-black"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <hr />

      <div>
        <label htmlFor="">챌린지 시작날짜</label>
        <input
          className="text-black"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="">챌린지 종료날짜</label>
        <input
          className="text-black"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <button onClick={() => challengeCreateMutate(INITIAL_DATA)}>
        챌린지 생성하기 버튼
      </button>
    </div>
  )
}

export default ChallengeCreate
