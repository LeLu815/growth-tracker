import { Dispatch, FormEventHandler, SetStateAction, useState } from "react"
import { useToast } from "@/context/toast.context"
import { WEEK_DAY_LIST } from "@/store/challengeCreate.store"
import { MilestoneType } from "@/store/milestoneCreate.store"
import { addDays, differenceInCalendarDays, format } from "date-fns"
import { produce } from "immer"
import { PlusIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { v4 as uuidv4 } from "uuid"

import Button from "@/components/Button"
import Chip from "@/components/Chip"
import DaysItem from "@/components/DaysItem"
import CalenderIcon from "@/components/Icon/CalenderIcon"
import Input from "@/components/Input"
import RangeInput from "@/components/RangeInput"

import Subsubtitle from "../../../../create/_browser/_components/Subsubtitle"
import ChallengeMilestoneCalender from "../../../../create/_components/ChallengeCalender/ChallengeMilestoneCalender"
import MilestoneCreateComponent from "../../../../create/_components/MilestoneCreate/MilestoneCreateComponent"
import { SELECT_WEEK_BTN_VALUES } from "../../../../create/_components/MilestoneCreate/MilestoneCreateConfig"
import ContentTitle from "../../../../create/_components/styles/ContentTitle"
import { countWeekdaysBetweenDates } from "../MilestoneUpdateConfig/MilestoneUpdateConfig"

const initialSelectWeeks = WEEK_DAY_LIST.map((_) => false)

// 최초 생성 페이지임
interface ChallengeUpdateCreateMilestonePcProps {
  range: DateRange | undefined
  data: MilestoneType[]
  setData: Dispatch<SetStateAction<MilestoneType[]>>
  onClickGoBack: () => void
}
function ChallengeUpdateCreateMilestonePc({
  range,
  data,
  onClickGoBack,
  setData,
}: ChallengeUpdateCreateMilestonePcProps) {
  // 토스트 띄우기
  const { showToast } = useToast()
  // 마일스톤 실행 요일 배열
  const [selectWeeks, setSelectWeeks] = useState<boolean[]>(initialSelectWeeks)
  // 마일스톤 이름 input
  const [milestoneNameInput, setMilestoneNameInput] = useState("")
  // 챌린지 토탈 일수
  const challenge_total_day =
    differenceInCalendarDays(range?.to!, range?.from!) + 1
  const [milestonePeriod, setMilestonePeriod] = useState<string>(
    `${data.length === 0 ? Math.round(challenge_total_day / 2) : "1"}`
  )
  // 마일스톤 성공 기준 퍼센트
  const [minPercent, setMinPercent] = useState<string>("50")
  // 루틴 이름 input
  const [routineInpt, setRoutineInput] = useState<string>("")
  // 루틴 배열
  const [routines, setRoutines] = useState<string[]>([])

  // 마일스톤 시작 날짜
  const milestone_start_date = range
    ? data.length === 0
      ? format(range?.from!, "yyyy-MM-dd")
      : format(addDays(data[data.length - 1].end_at, 1), "yyyy-MM-dd")
    : ""
  // 마일스톤 종료 날짜
  const milestone_end_date = range
    ? data.length === 0
      ? format(addDays(range?.from!, +milestonePeriod - 1), "yyyy-MM-dd")
      : format(
          addDays(data[data.length - 1].end_at, parseInt(milestonePeriod)),
          "yyyy-MM-dd"
        )
    : ""
  // 마일스톤 기간 실제 일수
  const milestone_actual_day = countWeekdaysBetweenDates(
    milestone_start_date,
    milestone_end_date,
    selectWeeks
  )

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
  // 루틴 이름 제출 폼 함수 => 루틴 배열에 삽입됨
  const hanleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (routineInpt === "") {
      return
    }
    if (routines.findIndex((routine) => routine === routineInpt) !== -1) {
      // 같은 값 금지 토스트 띄우기
      return showToast("이미 추가한 루틴입니다.", 500)
    }
    setRoutines((prev) => [...prev, routineInpt])
    setRoutineInput("")
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
      <div>
        <Subsubtitle>선택한 챌린지 기간</Subsubtitle>
        <div className="flex items-center gap-2">
          <CalenderIcon color="#717171" />
          <p className="text-[18px] font-[500] text-[#717171]">
            {range
              ? `${format(range.from!, "yyyy.MM.dd.")} ~ ${format(range.to!, "yyyy.MM.dd.")} (${differenceInCalendarDays(range.to!, range.from!) + 1}일)`
              : "기간을 선택해주세요."}
          </p>
        </div>
      </div>
      <hr />
      <div>
        <Subsubtitle>루틴을 설정해주세요.</Subsubtitle>
      </div>
      {/* 마일스톤 이름 input */}
      <Input
        label="루틴명"
        variant="login"
        placeholder="루틴명을 입력해주세요"
        value={milestoneNameInput}
        onChange={(e) => {
          if (e.target.value.length > 20) {
            return
          }
          setMilestoneNameInput(e.target.value)
        }}
      />
      {/* 루틴기간 설정 */}
      <div>
        <Subsubtitle>루틴 기간 설정</Subsubtitle>
        <div>
          {range && (
            <ChallengeMilestoneCalender
              range={range}
              milestoneStartDate={new Date(milestone_start_date)}
              getValue={(value: string) => {
                setMilestonePeriod(value)
              }}
            />
          )}
          <div>
            <Subsubtitle>실행 요일 설정</Subsubtitle>
            <ul className="mr-auto flex justify-end gap-2">
              {SELECT_WEEK_BTN_VALUES.map((value) => (
                <li key={value} onClick={() => handleClickDayGroupType(value)}>
                  <Chip
                    label={value}
                    selected={currentDayGroupType === value}
                    intent="third"
                    variant="outline"
                  />
                </li>
              ))}
            </ul>
            <ul className="my-[20px] flex h-[40px] justify-between">
              {WEEK_DAY_LIST.map((value, index) => (
                <li key={value} onClick={() => handleClickDay(index)}>
                  <DaysItem isSelected={selectWeeks[index]}>{value}</DaysItem>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* 목표 달성률 */}
      <ContentTitle>최소 달성률을 설정해 주세요</ContentTitle>
      <p className="mb-[20px] text-[14px]">권장 달성률 50%에요</p>
      <RangeInput
        thumbColor="#FC5A6B"
        trackColor="#FC5A6B"
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
      {/* 루틴 작성 */}
      <form onSubmit={hanleSubmit}>
        <ContentTitle className="mb-[10px] mt-[44px]">해야할 루틴</ContentTitle>
        <p className="mb-[6px] text-[14px]">무엇을 꾸준히 해볼까요?</p>
        <div className="relative">
          <Input
            placeholder="ex. 영단어 100개씩 암기"
            value={routineInpt}
            onChange={(e) => {
              if (e.target.value.length > 20) return
              setRoutineInput(e.target.value)
            }}
          />
          <button
            className="absolute right-[20px] top-[25px] flex cursor-pointer items-center justify-center"
            type="submit"
          >
            <PlusIcon className="stroke-grey-600" />
          </button>
        </div>
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
      <div className="flex gap-2">
        <Button
          onClick={() => {
            onClickGoBack()
          }}
          size="lg"
          variant="outline"
        >
          취소
        </Button>
        <Button
          onClick={() => {
            createMilestone({
              challenge_id: "",
              id: uuidv4(),
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
              name: milestoneNameInput,
              success_percent: parseInt(minPercent),
            })
            onClickGoBack()
          }}
          disabled={
            routines.length === 0 ||
            milestoneNameInput === "" ||
            selectWeeks.filter((value) => value).length === 0 ||
            milestone_actual_day === 0
          }
          size="lg"
        >
          루틴 추가
        </Button>
      </div>
    </>
  )
}

export default ChallengeUpdateCreateMilestonePc
