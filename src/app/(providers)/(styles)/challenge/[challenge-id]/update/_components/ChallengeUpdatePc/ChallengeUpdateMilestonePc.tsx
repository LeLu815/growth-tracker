"use client"

import { FormEventHandler, useState } from "react"
import { useModal } from "@/context/modal.context"
import useChallengeCreateStore, {
  WEEK_DAY_LIST,
} from "@/store/challengeCreate.store"
import useMilestoneCreateStore, {
  MilestoneType,
} from "@/store/milestoneCreate.store"
import { addDays, differenceInCalendarDays, format } from "date-fns"
import { produce } from "immer"

import Button from "@/components/Button"
import Chip from "@/components/Chip"
import DaysItem from "@/components/DaysItem"
import PlusIcon from "@/components/Icon/PlusIcon"
import Input from "@/components/Input"
import RangeInput from "@/components/RangeInput"

import Subsubtitle from "../../../../create/_browser/_components/Subsubtitle"
import { updateDataBetweenSwitchDays } from "../../../../create/_components/DrapDropContainer/DragDropContainer"
import MilestoneCreateComponent from "../../../../create/_components/MilestoneCreate/MilestoneCreateComponent"
import { SELECT_WEEK_BTN_VALUES } from "../../../../create/_components/MilestoneCreate/MilestoneCreateConfig"
import ContentTitle from "../../../../create/_components/styles/ContentTitle"
import { countWeekdaysBetweenDates } from "../MilestoneUpdateConfig/MilestoneUpdateConfig"

interface ChallengeUpdateMilestonePcProps {
  milestoneId: string
  closeDetail: () => void
}
function ChallengeUpdateMilestonePc({
  milestoneId,
  closeDetail,
}: ChallengeUpdateMilestonePcProps) {
  // 모달 열기
  const { open, close } = useModal()
  const { range } = useChallengeCreateStore()
  // 마일스톤, 루틴 전체 데이터 설정
  const { setData, data } = useMilestoneCreateStore()
  // 선택된 마일스톤 객체
  const currentMilestoneObject = data.find((obj) => obj.id === milestoneId)

  // 마일스톤 이름 input *
  const [milestoneNameInput, setMilestoneNameInput] = useState(
    currentMilestoneObject?.name || ""
  )
  const [milestonePeriod, setMilestonePeriod] = useState<string>(
    `${differenceInCalendarDays(new Date(currentMilestoneObject?.end_at!), new Date(currentMilestoneObject?.start_at!)) + 1}`
  )
  // 모든 마일스톤이 등록되어있는 기간 일수
  const resisteredMilestonePeriod = data.reduce(
    (prev, curr) => prev + curr.total_day,
    0
  )
  // 현재 내 마일스톤 제외하고 등록되어있는 기간 일수
  const resisteredMilestonePeriodWithoutMe = data.reduce((prev, curr) => {
    if (curr.id !== milestoneId) {
      return prev + curr.total_day
    }
    return prev
  }, 0)
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
  // 마일스톤 성공 기준 퍼센트 *
  const [minPercent, setMinPercent] = useState<string>(
    currentMilestoneObject?.success_percent
      ? `${currentMilestoneObject?.success_percent!}`
      : "50"
  )
  // 루틴 이름 input *
  const [routineInpt, setRoutineInput] = useState<string>("")
  // 루틴 배열 *
  const [routines, setRoutines] = useState<string[]>(
    currentMilestoneObject?.routines!.map((obj) => obj.content) || []
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
  // 마일스톤 삭제 함수
  const deleteMilestone = (milestoneId: string) => {
    setData((prev) =>
      produce(prev, (drafts) => {
        return drafts.filter((draft) => draft.id !== milestoneId)
      })
    )
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
  // 마일스톤 수정을 위한 값들
  // 마일스톤 시작 날짜 *
  const milestone_start_date = currentMilestoneObject?.start_at!
  // 마일스톤 종료 날짜 *
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
  const confirmFunc = () => {
    // 값 저장하기
    updateMilestone({
      name: milestoneNameInput,
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
    // 이후 값들 업데이트 시켜주기
    // 현재 값의 인덱스 구학
    const currentIndex = data.findIndex(
      (milestoneObj) => milestoneObj.id === milestoneId
    )
    const newData = produce(data, (draft) => {
      draft[currentIndex] = {
        name: milestoneNameInput,
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
      }
    })
    setData(
      updateDataBetweenSwitchDays(
        newData,
        currentIndex,
        data.length - 1,
        range?.from
      )
    )
  }

  return (
    <div
      className="mt-6 hidden flex-col lg:flex"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-5 h-5 border-b-4 border-solid border-grey-800" />
      <div className="flex flex-col px-5">
        {/* 루틴 명 */}
        <div className="mt-5">
          <Input
            label="루틴명"
            variant="login"
            placeholder="챌린지명을 입력해주세요"
            value={milestoneNameInput}
            onChange={(e) => {
              if (e.target.value.length > 20) return
              setMilestoneNameInput(e.target.value)
            }}
          />
        </div>
        {/* 루틴 기간 설정 */}
        <div className="mt-10 flex justify-between">
          <div className="w-[380px]">
            <Subsubtitle className="mb-4 !text-[18px]">
              루틴 기간 설정
            </Subsubtitle>
            {range && (
              <RangeInput
                thumbColor="#FC5A6B"
                trackColor="#FC5A6B"
                getValue={(value: string) => {
                  setMilestonePeriod(value)
                }}
                step={1}
                max={differenceInCalendarDays(range.to!, range.from!) + 1}
                min={resisteredMilestonePeriodWithoutMe}
                defaultValue={resisteredMilestonePeriod}
              />
            )}
          </div>
          {/* 루틴 요일 설정 */}
          <div className="w-[380px]">
            <Subsubtitle className="mb-4 !text-[18px]">
              루틴 요일 설정
            </Subsubtitle>
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
            <ul className="my-[20px] flex h-[40px] justify-between">
              {WEEK_DAY_LIST.map((value, index) => (
                <li key={value} onClick={() => handleClickDay(index)}>
                  <DaysItem isSelected={selectWeeks[index]}>{value}</DaysItem>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* 설정된 루틴 */}
        {/* 목표 달성률 */}
        <div className="mt-5 flex flex-col gap-3">
          <Subsubtitle className="!text-[18px]">목표 달성률</Subsubtitle>
          <p className="mb-[10px] text-[14px]">권장 달성률 50%에요</p>
        </div>
        <RangeInput
          thumbColor="#FC5A6B"
          trackColor="#FC5A6B"
          getValue={(value: string) => {
            setMinPercent(value)
          }}
          step={10}
          max={100}
          defaultValue={
            currentMilestoneObject?.success_percent
              ? currentMilestoneObject?.success_percent!
              : 50
          }
        />
        <div className="mt-[4px] flex justify-between">
          <p className="text-[14px] font-[500] text-grey-400">0%</p>
          <p className="text-[14px] font-[500] text-grey-400">100%</p>
        </div>
        {/* 루틴 작성 */}
        <form onSubmit={hanleSubmit}>
          <ContentTitle className="mb-[12px] mt-[44px]">루틴 작성</ContentTitle>
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
              className="absolute right-[20px] top-[30%] flex cursor-pointer items-center justify-center"
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
        {/* 확인 버튼 */}
        <div className="mb-5 mt-16 flex justify-between">
          <div className="flex">
            <Button
              variant="outline"
              onClick={() => {
                // 삭제 경고
                open({
                  type: "confirm",
                  content: "해당 루틴을 삭제하시겠습니까?",
                  onConfirm: () => {
                    deleteMilestone(milestoneId)
                    closeDetail()
                  },
                  onCancel: () => close(),
                })
              }}
              size="lg"
            >
              삭제하기
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                // 취소하면 수정한 내용 날아감 경고
                open({
                  type: "confirm",
                  content: "지금 나가면 수정 내용이 저장되지 않습니다.",
                  onCancel: () => {
                    close()
                  },
                  onConfirm: () => {
                    closeDetail()
                  },
                })
              }}
              size="lg"
              variant="outline"
            >
              취소
            </Button>
            <Button
              onClick={() => {
                closeDetail()
                confirmFunc()
              }}
              size="lg"
            >
              수정
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChallengeUpdateMilestonePc
