"use client"

import { useState } from "react"
import { POSTchallengeArgumentProps } from "@/api/supabase/challenge"
import { useAuth } from "@/context/auth.context"
import useChallengeQuery from "@/query/challenge/userChallengeQuery"
import useChallengeCreateStore from "@/store/challengeCreate.store"
import useMilestoneCreateStore, {
  MilestoneType,
} from "@/store/milestoneCreate.store"
import { produce } from "immer"
import { nanoid } from "nanoid"

import Input from "@/components/Input"

import Calender from "../calender"
import {
  calculateTotalDays,
  formatDateYearMonthDate,
} from "../calender/calender"
import CategorySelect from "./CategorySelect"
import ChallengeInfoBox from "./ChallengeInfoBox"
import CreateStep from "./CreateStep"
import DragDropContainer from "./Milestone/DragDropContainer"

const CATEOGRIES = ["공부", "건강", "생활"]

interface ChallengeCreateProps {
  challenge_id?: string
}
function ChallengeCreate({ challenge_id }: ChallengeCreateProps) {
  // 챌린지 관련 데이터
  const [createStep, setCreateStep] = useState<1 | 2>(1)
  const [goal, setGoal] = useState<string>("")
  const [catetegory, setCatetegory] = useState<string>(CATEOGRIES[0])
  const { range, setRange } = useChallengeCreateStore()

  // 챌린지 기간 변수
  const challengePeriod = `${formatDateYearMonthDate(range?.from)} ~ ${formatDateYearMonthDate(range?.to)} (${calculateTotalDays(range)}일)`

  // 마일스톤 생성
  const { data, setData } = useMilestoneCreateStore()

  // 민영님이 추후에 모달 올려주시면 열고닫기 함수로 수정될 예정
  const [isShow, setIsShow] = useState<boolean>(false)
  const [start_at, setStart_at] = useState<string>("")
  const [end_at, setEnd_at] = useState<string>("")
  const [is_secret, setIs_secret] = useState<false>(false)
  const [day_cnt, setDay_cnt] = useState<number>(0)
  const [user_id, setUser_id] = useState<string>("")
  const [state, setState] = useState<"" | "" | "">("")

  // 마일스톤 객체 리스트
  const [milestones, setMilestones] = useState<
    POSTchallengeArgumentProps["milestone"]
  >([])

  const {
    challengeCreateMutate,
    challengeCreateIsPending,
    challengeUpdateMutate,
  } = useChallengeQuery()

  // auth 데이터
  const { me, userData } = useAuth()

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

  // 마일스톤 생성함수
  const createMilestone = (milestoneObj: MilestoneType) => {
    setData((prev) =>
      produce(prev, (draft) => {
        draft.push(milestoneObj)
      })
    )
  }

  return (
    <>
      <CreateStep
        nickname={userData?.nickname || me?.email || "유저"}
        createStep={createStep}
      />
      {createStep === 1 && (
        <div>
          <h2>카테고리 선택</h2>
          <CategorySelect
            categoryList={CATEOGRIES}
            handleClickList={setCatetegory}
          />

          <Input
            label="챌린지 이름"
            placeholder="챌린지 이름을 만들어주세요"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <Input
            label="목표 기간"
            placeholder="기간을 설정해 주세요 (시작일 ~ 완료일)"
            value={challengePeriod}
            onClick={() => setIsShow(true)}
            className="caret-transparent"
          />
          <div className="rounded-[10px] border border-slate-300 p-4">
            <div className="flex gap-2">
              <div>🏁</div>
              <div>
                <p>{`<${goal}>에 도전하시는군요.`}</p>
                <p>목표를 향한 루틴을 작성해보세요</p>
              </div>
            </div>
            <hr />
            <div className="mt-3 flex gap-3">
              <button
                className="flex items-center justify-center rounded border px-3 py-1.5"
                onClick={() => alert("준비중입니다.")}
              >
                루틴 찾아보기
              </button>
            </div>
          </div>

          {isShow && (
            <div className="flex flex-col">
              <Calender range={range} setRange={setRange} />
              <button
                onClick={() => {
                  setIsShow(false)
                }}
              >
                챌린지 기간 설정하기
              </button>
            </div>
          )}

          {/* <button onClick={() => challengeCreateMutate(INITIAL_DATA)}>
        챌린지 생성하기 버튼
      </button> */}
          {/* <button
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
      </button> */}
        </div>
      )}
      {createStep === 2 && (
        <div>
          <ChallengeInfoBox
            challengePeriod={challengePeriod}
            goal={goal}
            catetegory={catetegory}
          />
          <div>
            <h2>마일스톤 만들기 *</h2>
            <div className="flex items-center justify-between">
              <div>
                <p>목표를 쪼개면 달성이 쉬워져요.</p>
                <p>마일스톤을 세우고 세부 루틴을 구체화하세요.</p>
              </div>
              <button
                onClick={() => {
                  createMilestone({
                    id: nanoid(),
                    routines: [],
                    challenge_id: challenge_id ? challenge_id : "",
                    start_at: "",
                    end_at: "",
                    total_day: 0,
                    total_cnt: 0,
                    success_requirement_cnt: 0,
                    is_mon: false,
                    is_tue: false,
                    is_wed: false,
                    is_thu: false,
                    is_fri: false,
                    is_sat: false,
                    is_sun: false,
                  })
                }}
                className="flex items-center justify-center rounded border bg-white px-2 py-1 hover:brightness-95 active:brightness-75"
              >
                새로 생성하기
              </button>
            </div>
          </div>
          <DragDropContainer goal={goal} range={range} />
        </div>
      )}
      <div>
        {createStep === 1 && (
          <button
            onClick={() => {
              if (challengePeriod !== "" && goal !== "") {
                return setCreateStep(2)
              }
            }}
          >
            다음
          </button>
        )}
        {createStep === 2 && (
          <div>
            <button onClick={() => setCreateStep(1)}>이전</button>
            <button>챌린지 생성</button>
          </div>
        )}
      </div>
    </>
  )
}

export default ChallengeCreate
