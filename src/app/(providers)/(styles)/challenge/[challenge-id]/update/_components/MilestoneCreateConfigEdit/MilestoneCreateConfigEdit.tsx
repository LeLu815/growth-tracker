import { FormEventHandler, useEffect, useState } from "react"
import useChallengeCreateStore, {
  WEEK_DAY_LIST,
} from "@/store/challengeCreate.store"
import useMilestoneCreateStore, {
  MilestoneType,
} from "@/store/milestoneCreate.store"
import {
  addDays,
  differenceInCalendarDays,
  eachDayOfInterval,
  format,
  parseISO,
} from "date-fns"
import { produce } from "immer"

import Button from "@/components/Button"
import Chip from "@/components/Chip"
import DaysItem from "@/components/DaysItem"
import CalenderIcon from "@/components/Icon/CalenderIcon"
import Input from "@/components/Input"
import RangeInput from "@/components/RangeInput"

import MilestoneCreateComponent from "../../../../create/_components/MilestoneCreate/MilestoneCreateComponent"
import ContentTitle from "../../../../create/_components/styles/ContentTitle"
import SubTitle from "../../../../create/_components/styles/SubTitle"

// 객체를 기본으로 받자 => 없으면 걍 생성
interface MilestoneCreateConfigProps {
  handleClickConfirm?: () => void
  milestoneId: string
}

const SELECT_WEEK_BTN_VALUES: ("주중" | "주말" | "매일")[] = [
  "주중",
  "주말",
  "매일",
]
const initialSelectWeeks = WEEK_DAY_LIST.map((_) => false)

function MilestoneCreateConfigEdit({
  handleClickConfirm,
  milestoneId,
}: MilestoneCreateConfigProps) {
  // 마일스톤, 루틴 전체 데이터 설정
  const { setData, data } = useMilestoneCreateStore()
  // 선택된 마일스톤 객체
  const currentMilestoneObject = data.find((obj) => obj.id === milestoneId)

  // 챌린지 기간
  const { range } = useChallengeCreateStore()

  // 마일스톤 시작 날짜 *
  const milestone_start_date = currentMilestoneObject?.start_at!
  // 마일스톤 이름 input *
  const [milestoneNameInput, setMilestoneNameInput] = useState("이름은 준비 중")
  // 루틴 이름 input *
  const [routineInpt, setRoutineInput] = useState<string>("")
  // 루틴 배열 *
  const [routines, setRoutines] = useState<string[]>(
    currentMilestoneObject?.routines!.map((obj) => obj.content) || []
  )
  // 마일스톤 실행 요일 배열 *
  const [selectWeeks, setSelectWeeks] = useState<boolean[]>([
    currentMilestoneObject?.is_mon!,
    currentMilestoneObject?.is_tue!,
    currentMilestoneObject?.is_wed!,
    currentMilestoneObject?.is_thu!,
    currentMilestoneObject?.is_fri!,
    currentMilestoneObject?.is_sat!,
    currentMilestoneObject?.is_sun!,
  ])
  // 마일스톤 성공 기준 퍼센트 *
  const [minPercent, setMinPercent] = useState<string>("50")
  // 챌린지 토탈 일수
  const challenge_total_day =
    differenceInCalendarDays(range?.to!, range?.from!) + 1
  // 마일스톤 실행 기간 (챌린지 전체 기간 - 마일스톤 )
  const [milestonePeriod, setMilestonePeriod] = useState<string>(
    `${differenceInCalendarDays(new Date(currentMilestoneObject?.end_at!), new Date(currentMilestoneObject?.start_at!)) + 1}`
  )
  // 이전 일자 계산
  const prevMilestonesPeriod = differenceInCalendarDays(
    milestone_start_date,
    range?.from!
  )
  // 마일스톤 종료 날짜 *
  const milestone_end_date = format(
    addDays(new Date(milestone_start_date), +milestonePeriod - 1),
    "yyyy-MM-dd"
  )
  // 마일스톤 기간 실제 일수
  const milestone_actual_day = countWeekdaysBetweenDates(
    milestone_start_date,
    milestone_end_date,
    selectWeeks
  )

  // 루틴 이름 제출 폼 함수 => 루틴 배열에 삽입됨
  const hanleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (routineInpt === "") {
      return
    }
    setRoutines((prev) => [...prev, routineInpt])
    setRoutineInput("")
  }
  // 마일스톤 실행 요일 주중 주말 매일 상태 표시 함수
  const getCurrentDayGroupType = (days: boolean[]) => {
    const selectedDayLength = days.filter((dayCheck) => dayCheck).length
    switch (selectedDayLength) {
      case 7:
        return "매일"
      case 5:
        if (!selectWeeks[5] && !selectWeeks[6]) {
          return "주중"
        }
        return ""
      case 2:
        if (selectWeeks[5] && selectWeeks[6]) {
          return "주말"
        }
        return ""
      default:
        return ""
    }
  }
  // 마일스톤 실행 요일 선택시 마일스톤 실행 요일 배열 값 변경 함수
  const currentDayGroupType = getCurrentDayGroupType(selectWeeks)
  const handleClickDay = (index: number): void => {
    setSelectWeeks((prev) =>
      produce(prev, (draft) => {
        draft[index] = !draft[index]
      })
    )
  }
  // 마일스톤 실행 요일 주중 주말 매일 선택시 마일스톤 실행 요일 배열 값 변경 함수
  const handleClickDayGroupType = (text: "주중" | "매일" | "주말") => {
    const selectedDayLength = selectWeeks.filter((dayCheck) => dayCheck).length
    switch (text) {
      case "주중":
        if (selectedDayLength === 5 && !selectWeeks[5] && !selectWeeks[6]) {
          return setSelectWeeks(WEEK_DAY_LIST.map((_) => false))
        } else {
          return setSelectWeeks([true, true, true, true, true, false, false])
        }
      case "주말":
        if (selectedDayLength === 2 && selectWeeks[5] && selectWeeks[6]) {
          return setSelectWeeks(WEEK_DAY_LIST.map((_) => false))
        } else {
          return setSelectWeeks([false, false, false, false, false, true, true])
        }
      case "매일":
        if (selectedDayLength === 7) {
          return setSelectWeeks(WEEK_DAY_LIST.map((_) => false))
        } else {
          return setSelectWeeks(WEEK_DAY_LIST.map((_) => true))
        }
    }
  }

  // 마일스톤 수정함수
  const updateMilestone = (milestoneObj: MilestoneType) => {
    setData((prev) =>
      produce(prev, (drafts) => {
        const draft = drafts.find((draft) => draft.id === milestoneId)
        if (draft) {
          Object.assign(draft, milestoneObj)
        }
      })
    )
  }

  const confirmFunc = () => {
    updateMilestone({
      name: "",
      success_percent: 50,
      challenge_id: "",
      id: currentMilestoneObject?.id!,
      start_at: milestone_start_date,
      end_at: milestone_end_date,
      is_mon: selectWeeks[0],
      is_tue: selectWeeks[1],
      is_wed: selectWeeks[2],
      is_thu: selectWeeks[3],
      is_fri: selectWeeks[4],
      is_sat: selectWeeks[5],
      is_sun: selectWeeks[6],
      success_requirement_cnt: Math.ceil(
        (milestone_actual_day * +minPercent) / 100
      ),
      total_cnt: milestone_actual_day,
      total_day: +milestonePeriod,
      routines: routines.map((value) => ({
        id: "",
        content: value,
      })),
    })
  }

  useEffect(() => {}, [data, range])
  return (
    <>
      <div className="mb-16">
        <SubTitle className="justify-start">루틴 A</SubTitle>
        <div>
          <div className="mt-[12px] flex items-center gap-2">
            <CalenderIcon color="#717171" />
            <p className="text-[16px] font-[500] text-[#717171]">
              {range
                ? `${milestone_start_date} ~ ${milestone_end_date} (${differenceInCalendarDays(new Date(milestone_end_date), new Date(milestone_start_date)) + 1}일)`
                : "기간을 선택해주세요."}
            </p>
          </div>
          <div className="h-[40px]" />
          <Input
            label="루틴명"
            placeholder="루틴 명을 입력해주세요"
            value={milestoneNameInput}
            onChange={(e) => setMilestoneNameInput(e.target.value)}
          />
          <div>
            <ContentTitle className="mb-[20px] mt-[44px]">
              루틴 기간 설정
            </ContentTitle>
            {range && (
              <RangeInput
                thumbColor="#fe7d3d"
                trackColor="#fe7d3d"
                getValue={(value: string) => {
                  setMilestonePeriod(value)
                }}
                step={1}
                max={differenceInCalendarDays(range.to!, range.from!) + 1}
                min={differenceInCalendarDays(
                  milestone_start_date,
                  range.from!
                )}
                defaultValue={
                  differenceInCalendarDays(milestone_end_date, range.from!) + 1
                }
              />
            )}
            <p className="mt-[4px] text-end text-[16px] font-[600]">
              {range &&
                `총 ${differenceInCalendarDays(range.to!, range.from!) + 1}일`}
            </p>
          </div>
          <div>
            <ContentTitle className="mb-[20px] mt-[44px]">
              루틴 설정 요일
            </ContentTitle>
            <ul className="mr-auto flex justify-end gap-2">
              {SELECT_WEEK_BTN_VALUES.map((value) => (
                <li key={value} onClick={() => handleClickDayGroupType(value)}>
                  <Chip
                    label={value}
                    selected={currentDayGroupType === value}
                    intent="secondary"
                    variant="outline"
                  />
                </li>
              ))}
            </ul>
            <ul className="my-[20px] flex h-[36px] justify-end gap-[4px]">
              {WEEK_DAY_LIST.map((value, index) => (
                <li key={value} onClick={() => handleClickDay(index)}>
                  <DaysItem isSelected={selectWeeks[index]}>{value}</DaysItem>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ContentTitle className="mb-[10px] mt-[44px]">
              최소 달성률을 설정해 주세요
            </ContentTitle>
            <p className="mb-[20px] text-[14px]">권장 달성률 50%에요</p>
            <RangeInput
              thumbColor="#fe7d3d"
              trackColor="#fe7d3d"
              getValue={(value: string) => {
                setMinPercent(value)
              }}
              step={10}
              max={100}
            />
            <div className="mt-[4px] flex justify-between">
              <p className="font-[800]">0%</p>
              <p className="font-[800]">100%</p>
            </div>
          </div>
          <form onSubmit={hanleSubmit}>
            <ContentTitle className="mb-[10px] mt-[44px]">
              해야할 루틴
            </ContentTitle>
            <p className="mb-[6px] text-[14px]">무엇을 꾸준히 해볼까요?</p>
            <Input
              placeholder="ex. 영단어 100개씩 암기"
              value={routineInpt}
              onChange={(e) => {
                setRoutineInput(e.target.value)
              }}
            />
            <ul className="mt-[24px] flex flex-col gap-[16px]">
              {routines.map((routine) => (
                <li key={routine}>
                  <MilestoneCreateComponent
                    text={routine}
                    onClick={() => {
                      setRoutines((prev) =>
                        prev.filter((draft) => draft !== routine)
                      )
                    }}
                  />
                </li>
              ))}
            </ul>
          </form>
        </div>
      </div>
      <div className="sticky bottom-0 left-0 z-50 h-[100px] w-full bg-gradient-to-t from-white from-70% via-white to-transparent pb-2 pt-[20px]">
        <Button
          onClick={() => {
            // 모달 닫는 함수
            handleClickConfirm && handleClickConfirm()
            // 업데이트 함수
            confirmFunc()
          }}
          disabled={
            routines.length === 0 ||
            milestoneNameInput === "" ||
            selectWeeks.filter((value) => value).length === 0 ||
            milestone_actual_day === 0
          }
          size="lg"
        >
          완료
        </Button>
      </div>
    </>
  )
}

export default MilestoneCreateConfigEdit

// 두 날짜 사이의 불린 리스트를 통한 실 숫자 카운트 함수
export function countWeekdaysBetweenDates(
  startDate: string,
  endDate: string,
  weekdays: boolean[]
): number {
  // 날짜 문자열을 Date 객체로 변환
  const start = parseISO(startDate)
  const end = parseISO(endDate)

  // 시작 날짜가 끝 날짜보다 이후일 경우 0 반환
  if (start > end) {
    return 0
  }

  // 시작 날짜부터 끝 날짜까지의 모든 날짜를 배열로 가져옴
  const allDates = eachDayOfInterval({ start, end })

  let count = 0

  // 각 날짜에 대해 요일을 체크
  allDates.forEach((date) => {
    const day = date.getDay() // 0: 일요일, 1: 월요일, ..., 6: 토요일

    // 월요일부터 일요일까지의 배열에 맞게 인덱스 조정
    const adjustedDay = (day + 6) % 7 // 0: 월요일, 1: 화요일, ..., 6: 일요일
    if (weekdays[adjustedDay]) {
      count++
    }
  })

  return count
}
