"use client"

import { useState } from "react"
import { POSTchallengeArgumentType } from "@/api/supabase/challenge"
import { useAuth } from "@/context/auth.context"
import useChallengeQuery from "@/query/challenge/userChallengeQuery"

function ChallengeCreate() {
  // 챌린지 관련 데이터
  const [goal, setGoal] = useState<string>("")
  const [start_at, setStart_at] = useState<string>("")
  const [end_at, setEnd_at] = useState<string>("")
  const [is_secret, setIs_secret] = useState<false>(false)
  const [day_cnt, setDay_cnt] = useState<number>(0)
  const [user_id, setUser_id] = useState<string>("")
  const [state, setState] = useState<"" | "" | "">("")
  const [catetegory, setCatetegory] = useState<"" | "">("")

  // 마일스톤 객체 리스트
  const [milestones, setMilestones] = useState<
    POSTchallengeArgumentType["milestone"]
  >([])

  const {
    challengeCreateMutate,
    challengeCreateIsPending,
    challengeUpdateMutate,
  } = useChallengeQuery()

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
        success_requirement_cnt: 10,
        total_cnt: 10,
        total_day: 10,
        is_fri: true,
        is_mon: true,
        is_sat: true,
        is_sun: true,
        is_thu: true,
        is_tue: true,
        is_wed: false,
      },
      {
        challenge_id: "",
        end_at: "2024-7-24",
        start_at: "2024-7-23",
        success_requirement_cnt: 20,
        total_cnt: 20,
        total_day: 20,
        is_fri: true,
        is_mon: true,
        is_sat: true,
        is_sun: true,
        is_thu: true,
        is_tue: false,
        is_wed: false,
      },
      {
        challenge_id: "",
        end_at: "2024-7-24",
        start_at: "2024-7-23",
        success_requirement_cnt: 30,
        total_cnt: 30,
        total_day: 30,
        is_fri: true,
        is_mon: true,
        is_sat: true,
        is_sun: true,
        is_thu: false,
        is_tue: false,
        is_wed: false,
      },
      {
        challenge_id: "",
        end_at: "2024-7-24",
        start_at: "2024-7-23",
        success_requirement_cnt: 40,
        total_cnt: 40,
        total_day: 40,
        is_fri: true,
        is_mon: true,
        is_sat: true,
        is_sun: false,
        is_thu: false,
        is_tue: false,
        is_wed: false,
      },
    ],
    routine: [
      [
        {
          content: "10 - 루틴 생성 테스트 이인 ddlsmaa",
          milestone_id: "",
        },
        {
          content: "10 - 루틴 생성 테스트 이인 ef;ka;sc",
          milestone_id: "",
        },
        {
          content: "10 - 루틴 생성 테스트 이인 12r1f4tfe",
          milestone_id: "",
        },
      ],
      [
        {
          content: "20 - 루틴 생성 테스트 이인 ddlsmaa",
          milestone_id: "",
        },
        {
          content: "20 - 루틴 생성 테스트 이인 ef;ka;sc",
          milestone_id: "",
        },
        {
          content: "20 - 루틴 생성 테스트 이인 12r1f4tfe",
          milestone_id: "",
        },
      ],
      [
        {
          content: "30 - 루틴 생성 테스트 이인 ddlsmaa",
          milestone_id: "",
        },
        {
          content: "30 - 루틴 생성 테스트 이인 ef;ka;sc",
          milestone_id: "",
        },
        {
          content: "30 - 루틴 생성 테스트 이인 12r1f4tfe",
          milestone_id: "",
        },
      ],
      [
        {
          content: "40 - 루틴 생성 테스트 이인 ddlsmaa",
          milestone_id: "",
        },
        {
          content: "40 - 루틴 생성 테스트 이인 ef;ka;sc",
          milestone_id: "",
        },
        {
          content: "40 - 루틴 생성 테스트 이인 12r1f4tfe",
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
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <div>
        <label htmlFor="">챌린지 시작날짜</label>
        <input
          className="text-black"
          type="date"
          value={start_at}
          onChange={(e) => setStart_at(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="">챌린지 종료날짜</label>
        <input
          className="text-black"
          type="date"
          value={end_at}
          onChange={(e) => setEnd_at(e.target.value)}
        />
      </div>

      <hr />

      <div>
        <label htmlFor="">챌린지 시작날짜</label>
        <input
          className="text-black"
          type="date"
          value={start_at}
          onChange={(e) => setStart_at(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="">챌린지 종료날짜</label>
        <input
          className="text-black"
          type="date"
          value={end_at}
          onChange={(e) => setEnd_at(e.target.value)}
        />
      </div>

      <button onClick={() => challengeCreateMutate(INITIAL_DATA)}>
        챌린지 생성하기 버튼
      </button>
      <button
        onClick={() =>
          challengeUpdateMutate({
            "challenge-id": "663d4d24-0d90-4f8e-b5fc-0796d0e9ba5f",
            milestoneIds: [
              "6fff2e62-6493-461f-8a2a-5f4863effca1",
              "a219f5bf-3c4b-469d-a0f9-e97503486120",
              "7726fec4-ee2d-45a1-a6c9-3db173402030",
              "94f2d842-d476-4ab3-a9e8-0f45c6c94efe",
            ],
            milestone: INITIAL_DATA.milestone,
            routine: INITIAL_DATA.routine,
          })
        }
        className="mt-9 flex items-center justify-center rounded border border-white bg-neutral-600 px-4 py-2 hover:brightness-90 active:brightness-75"
      >
        챌린지 업데이트 버튼
      </button>
    </div>
  )
}

export default ChallengeCreate
