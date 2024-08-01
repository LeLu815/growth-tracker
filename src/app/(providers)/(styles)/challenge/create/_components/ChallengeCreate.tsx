"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth.context"
import useChallengeQuery from "@/query/challenge/userChallengeQuery"
import useChallengeCreateStore from "@/store/challengeCreate.store"
import useMilestoneCreateStore, {
  MilestoneType,
} from "@/store/milestoneCreate.store"
import { addDays, format, isValid, parse, parseISO } from "date-fns"
import { produce } from "immer"
import { nanoid } from "nanoid"
import { DateRange } from "react-day-picker"

import Input from "@/components/Input"

import Calender from "../calender"
import {
  calculateTotalDays,
  formatDateYearMonthDate,
} from "../calender/calender"
import ChallengeInfoBox from "./Cate"
import CategorySelect from "./CategorySelect"
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
  const { data, setData, setCurrentSlideId } = useMilestoneCreateStore()

  // 민영님이 추후에 모달 올려주시면 열고닫기 함수로 수정될 예정
  const [isShow, setIsShow] = useState<boolean>(false)

  const {
    challengeCreateMutate,
    challengeCreateIsPending,
    challengeUpdateMutate,
  } = useChallengeQuery()

  // auth 데이터
  const { me, userData } = useAuth()

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
                  const newMilestoneId = nanoid()
                  const lastMilestone =
                    data.length === 0 ? null : data[data.length - 1]
                  const newMilestoneObj = {
                    id: newMilestoneId,
                    routines: [],
                    challenge_id: challenge_id ? challenge_id : "",
                    start_at:
                      (lastMilestone
                        ? getNextDayString(lastMilestone.end_at)
                        : range?.from && format(range?.from, "yyyy-MM-dd")) ||
                      "",
                    end_at: lastMilestone
                      ? getNextFewDayString(lastMilestone.end_at, 6)
                      : (range?.from &&
                          addDays(range?.from, 6) &&
                          format(addDays(range?.from, 6), "yyyy-MM-dd")) ||
                        "",
                    total_day: 7,
                    total_cnt: 0,
                    success_requirement_cnt: 0,
                    is_mon: false,
                    is_tue: false,
                    is_wed: false,
                    is_thu: false,
                    is_fri: false,
                    is_sat: false,
                    is_sun: false,
                  }
                  createMilestone(newMilestoneObj)
                  setCurrentSlideId(newMilestoneId)
                }}
                className="flex items-center justify-center rounded border bg-white px-2 py-1 hover:brightness-95 active:brightness-75"
              >
                새로 생성하기
              </button>
            </div>
          </div>
          {data.length !== 0 && <DragDropContainer goal={goal} range={range} />}
          {data.length === 0 && (
            <div className="flex h-[300px] items-center justify-center text-slate-400">
              아직 생성된 마일스톤 없어요. 만들어주세요!
            </div>
          )}
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
          <div className="flex justify-between">
            <button onClick={() => setCreateStep(1)}>이전</button>
            <button
              disabled={data.length === 0}
              className={`rounded border bg-white px-2 py-1 active:brightness-75 disabled:bg-slate-500`}
              onClick={() => {
                challengeCreateMutate({
                  challenge: {
                    category: catetegory,
                    user_id: me?.id || "",
                    day_cnt: calculateTotalDays(range),
                    end_at: convertDateFormat(
                      formatDateYearMonthDate(range?.to)
                    ),
                    goal: goal,
                    is_secret: false,
                    start_at: convertDateFormat(
                      formatDateYearMonthDate(range?.from)
                    ),
                  },
                  milestone: data.map((obj) =>
                    produce(
                      obj,
                      (
                        draft: Omit<MilestoneType, "routines" | "id"> & {
                          routines?: MilestoneType["routines"]
                          id?: MilestoneType["id"]
                        }
                      ) => {
                        draft.start_at = convertDateFormat(draft.start_at)
                        draft.end_at = convertDateFormat(draft.end_at)
                        delete draft.routines
                        delete draft.id
                      }
                    )
                  ),
                  routine: data.map((obj) =>
                    obj.routines.map((routine) => ({
                      content: routine.content,
                      milestone_id: obj.id,
                    }))
                  ),
                })
              }}
            >
              챌린지 생성
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default ChallengeCreate

export function getNextDayString(dateString: string): string {
  const date = parse(dateString, "yyyy-MM-dd", new Date())
  const nextDay = addDays(date, 1)
  return format(nextDay, "yyyy-MM-dd")
}
export function getNextFewDayString(
  dateString: string,
  addDay: number
): string {
  const date = parse(dateString, "yyyy-MM-dd", new Date())
  const nextDay = addDays(date, addDay)
  return format(nextDay, "yyyy-MM-dd")
}

export function createDateRange(
  startDate: string,
  duration: number
): DateRange | undefined {
  if (!startDate || isNaN(duration) || duration <= 0) {
    return undefined
  }

  const start = parseISO(startDate)
  if (!isValid(start)) {
    return undefined
  }

  const end = addDays(start, duration)

  return {
    from: start,
    to: end,
  }
}

export function convertDateFormat(dateStr: string): string {
  // 입력이 "YY.MM.DD." 형식인지 확인
  const datePattern = /^\d{2}\.\d{2}\.\d{2}\.$/
  if (!datePattern.test(dateStr)) {
    return dateStr
  }

  // 날짜 문자열 파싱
  const [year, month, day] = dateStr
    .split(".")
    .map((part) => parseInt(part, 10))

  // 연도를 2000년대 기준으로 변환
  const fullYear = 2000 + year

  // 원하는 형식으로 변환하여 반환
  return `${fullYear}-${month}-${day}`
}
