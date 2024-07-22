"use client"

import { useAuth } from "@/context/auth.context"
import axios from "axios"

import ChallengeInput from "./_components/ChallengeInput"

// goal: data.goal,
// start_at: data.start_at,
// end_at: data.end_at,
// is_secret: data.is_secret,
// day_cnt: data.day_cnt,

function ChallengeCreatePage() {
  const { me } = useAuth()
  return (
    <>
      <div>
        <h1>챌린지 생성</h1>
        <ChallengeInput />
      </div>
      <button
        onClick={async () => {
          const response = await axios.post("/api/challenge", {
            user_id: me?.id,
            goal: "몸짱되기",
            start_at: new Date(),
            end_at: new Date(),
            is_secret: false,
            day_cnt: 60,
            milestone: [
              {
                challenge_id: "",
                start_at: new Date(),
                end_at: new Date(),
                total_day: 30,
                is_mon: true,
                success_requirement_cnt: 15,
                total_cnt: 20,
              },
              {
                challenge_id: "",
                start_at: new Date(),
                end_at: new Date(),
                total_day: 30,
                is_mon: true,
                success_requirement_cnt: 15,
                total_cnt: 20,
              },
              {
                challenge_id: "",
                start_at: new Date(),
                end_at: new Date(),
                total_day: 30,
                is_mon: true,
                success_requirement_cnt: 15,
                total_cnt: 20,
              },
              {
                challenge_id: "",
                start_at: new Date(),
                end_at: new Date(),
                total_day: 30,
                is_mon: true,
                success_requirement_cnt: 15,
                total_cnt: 20,
              },
            ],
            routine: [
              [
                {
                  milestone_id: "",
                  content: "1 : 이인이 지금 테스트 중입니다.",
                },
                {
                  milestone_id: "",
                  content: "1 : 이인이 지금 테스트 중입니다.",
                },
                {
                  milestone_id: "",
                  content: "1 : 이인이 지금 테스트 중입니다.",
                },
                {
                  milestone_id: "",
                  content: "1 : 이인이 지금 테스트 중입니다.",
                },
                {
                  milestone_id: "",
                  content: "1 : 이인이 지금 테스트 중입니다.",
                },
              ],
              [
                {
                  milestone_id: "",
                  content: "2 : 이인이 지금 테스트 중입니다.",
                },
                {
                  milestone_id: "",
                  content: "2 : 이인이 지금 테스트 중입니다.",
                },
                {
                  milestone_id: "",
                  content: "2 : 이인이 지금 테스트 중입니다.",
                },
              ],
              [
                {
                  milestone_id: "",
                  content: "3 : 이인이 지금 테스트 중입니다.",
                },
                {
                  milestone_id: "",
                  content: "3 : 이인이 지금 테스트 중입니다.",
                },
                {
                  milestone_id: "",
                  content: "3 : 이인이 지금 테스트 중입니다.",
                },
                {
                  milestone_id: "",
                  content: "3 : 이인이 지금 테스트 중입니다.",
                },
                {
                  milestone_id: "",
                  content: "3 : 이인이 지금 테스트 중입니다.",
                },
              ],
              [
                {
                  milestone_id: "",
                  content: "4 : 이인이 지금 테스트 중입니다.",
                },
                {
                  milestone_id: "",
                  content: "4 : 이인이 지금 테스트 중입니다.",
                },
                {
                  milestone_id: "",
                  content: "4 : 이인이 지금 테스트 중입니다.",
                },
                {
                  milestone_id: "",
                  content: "4 : 이인이 지금 테스트 중입니다.",
                },
                {
                  milestone_id: "",
                  content: "4 : 이인이 지금 테스트 중입니다.",
                },
                {
                  milestone_id: "",
                  content: "4 : 이인이 지금 테스트 중입니다.",
                },
                {
                  milestone_id: "",
                  content: "4 : 이인이 지금 테스트 중입니다.",
                },
                {
                  milestone_id: "",
                  content: "4 : 이인이 지금 테스트 중입니다.",
                },
                {
                  milestone_id: "",
                  content: "4 : 이인이 지금 테스트 중입니다.",
                },
                {
                  milestone_id: "",
                  content: "4 : 이인이 지금 테스트 중입니다.",
                },
              ],
            ],
          })
          console.log("response :", response)
        }}
      >
        클릭버튼
      </button>
    </>
  )
}

export default ChallengeCreatePage
