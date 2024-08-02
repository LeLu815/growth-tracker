import { FormEventHandler, useState } from "react"
import useChallengeCreateStore, {
  WEEK_DAY_LIST,
} from "@/store/challengeCreate.store"
import { differenceInCalendarDays, format } from "date-fns"
import { produce } from "immer"

import Button from "@/components/Button"
import Chip from "@/components/Chip"
import DaysItem from "@/components/DaysItem"
import Input from "@/components/Input"
import RangeInput from "@/components/RangeInput"

import { MilestoneCreateProps } from "./MilestoneCreate"

// 객체를 기본으로 받자 => 없으면 걍 생성
interface MilestoneCreateConfigProps {
  setShowCompoent: (staus: MilestoneCreateProps["status"]) => void
}

const SELECT_WEEK_BTN_VALUES: ("주중" | "주말" | "매일")[] = [
  "주중",
  "주말",
  "매일",
]
const initialSelectWeeks = WEEK_DAY_LIST.map((_) => false)

function MilestoneCreateConfig({
  setShowCompoent,
}: MilestoneCreateConfigProps) {
  const [milestoneNameInput, setMilestoneNameInput] = useState("")
  const [routineInpt, setRoutineInput] = useState<string>("")
  const [routines, setRoutines] = useState<string[]>([])
  const [selectWeeks, setSelectWeeks] = useState<boolean[]>(initialSelectWeeks)
  const { range } = useChallengeCreateStore()

  const hanleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setRoutines((prev) => [...prev, routineInpt])
    setRoutineInput("")
  }

  const getCurrentDayGroupType = (days: boolean[]) => {
    const selectedDayLength = days.filter((dayCheck) => dayCheck).length
    switch (selectedDayLength) {
      case 7:
        return "매일"
      case 5:
        if (!selectWeeks[5] && !selectWeeks[6]) {
          return "주중"
        }
      case 2:
        if (selectWeeks[5] && selectWeeks[6]) {
          return "주말"
        }
      default:
        return ""
    }
  }
  const currentDayGroupType = getCurrentDayGroupType(selectWeeks)
  const handleClickDay = (index: number): void => {
    setSelectWeeks((prev) =>
      produce(prev, (draft) => {
        draft[index] = !draft[index]
      })
    )
  }

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

  return (
    <div>
      <p>선택한 챌린지 기간</p>
      <div>
        <p>
          {range
            ? `${format(range.from!, "yyyy.MM.dd.")} ~ ${format(range.to!, "yyyy.MM.dd.")} (${differenceInCalendarDays(range.to!, range.from!) + 1}일)`
            : "기간을 선택해주세요."}
        </p>
        <Input
          label="루틴명"
          placeholder="챌린지명을 입력해주세요"
          value={milestoneNameInput}
          onChange={(e) => setMilestoneNameInput(e.target.value)}
        />
        <div>
          <p>루틴 기간 설정</p>
          {range && (
            <RangeInput
              thumbColor="#fe7d3d"
              trackColor="#fe7d3d"
              getValue={() => {}}
              step={1}
              max={differenceInCalendarDays(range.to!, range.from!) + 1}
            />
          )}
          <p>
            {range &&
              `총 ${differenceInCalendarDays(range.to!, range.from!) + 1}일`}
          </p>
        </div>
        <div>
          <p>루틴 설정 요일</p>
          <ul>
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
          <ul className="flex h-[40px]">
            {WEEK_DAY_LIST.map((value, index) => (
              <li key={value} onClick={() => handleClickDay(index)}>
                <DaysItem isSelected={selectWeeks[index]}>{value}</DaysItem>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p>최소 달성률을 설정해 주세요</p>
          <p>권장 달성률 50%에요</p>
          <RangeInput
            thumbColor="#fe7d3d"
            trackColor="#fe7d3d"
            getValue={() => {}}
            step={10}
            max={100}
          />
          <div>
            <p>0%</p>
            <p>100%</p>
          </div>
        </div>
        <form onSubmit={hanleSubmit}>
          <p>해야할 루틴</p>
          <p>무엇을 꾸준히 해볼까요?</p>
          <Input
            placeholder="ex. 영단어 100개씩 암기"
            value={routineInpt}
            onChange={(e) => {
              setRoutineInput(e.target.value)
            }}
          />
          <ul>
            {routines.map((routine) => (
              <li key={routine}>{routine}</li>
            ))}
          </ul>
        </form>
      </div>
      <Button
        onClick={() => {
          setShowCompoent("switch")
        }}
        disabled={routines.length === 0 || milestoneNameInput === ""}
      >
        완료
      </Button>
    </div>
  )
}

export default MilestoneCreateConfig
