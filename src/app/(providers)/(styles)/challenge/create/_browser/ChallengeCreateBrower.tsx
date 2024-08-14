"use client"

import { FormEventHandler, useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { useModal } from "@/context/modal.context"
import { useToast } from "@/context/toast.context"
import useChallengeQuery from "@/query/challenge/userChallengeQuery"
import useChallengeCreateStore, {
  categories,
  WEEK_DAY_LIST,
} from "@/store/challengeCreate.store"
import useMilestoneCreateStore from "@/store/milestoneCreate.store"
import { createClient } from "@/supabase/client"
import { addDays, differenceInCalendarDays, format } from "date-fns"
import { produce } from "immer"
import { PlusIcon } from "lucide-react"

import Button from "@/components/Button"
import Chip from "@/components/Chip"
import DaysItem from "@/components/DaysItem"
import ResetIcon from "@/components/Icon/ResetIcon"
import Input from "@/components/Input"
import Page from "@/components/Page"
import RangeInput from "@/components/RangeInput"

import ChallengeCalender from "../_components/ChallengeCalender/ChallengeCalender"
import ChallengeMilestoneCalender from "../_components/ChallengeCalender/ChallengeMilestoneCalender"
import MilestoneCreateComponent from "../_components/MilestoneCreate/MilestoneCreateComponent"
import {
  countWeekdaysBetweenDates,
  initialSelectWeeks,
  SELECT_WEEK_BTN_VALUES,
} from "../_components/MilestoneCreate/MilestoneCreateConfig"
import SubTitle from "../_components/styles/SubTitle"
import Subsubtitle from "./_components/Subsubtitle"

function ChallengeCreateBrower() {
  // 전역 데이터
  const {
    setGoal,
    setRandomImgUrl,
    setCategory,
    setRange,
    randomImgUrl,
    category,
    goal,
    range,
  } = useChallengeCreateStore()
  const { data, setData } = useMilestoneCreateStore()
  // 이미지 url 호출용
  const supabase = createClient()
  // db 저장용 쿼리
  const { challengeCreateMutate, challengeCreateIsPending } =
    useChallengeQuery()
  // 유저데이터
  const { me } = useAuth()
  // 모달
  const { open } = useModal()
  // 라우터
  const router = useRouter()

  // 상태---------------------------------------------------------------------------------
  // 1. 랜덤 이미지 생성
  const [imgs, setImgs] = useState<string[]>([])
  const [selectedRandomUrl, setSelectedRandomUrl] = useState<string>(
    randomImgUrl || imgs[0]
  )
  // 2. 챌린지명
  const [inputValue, setInputValue] = useState<string>(goal)

  // 3. 카테고리
  const [selectedCategory, setSelectedCategory] = useState<string>(
    category || categories[0]
  )

  // 4. 챌린지 기간
  const [isOpenCalender, setIsOpenCalender] = useState<boolean>(false)

  // 5. 루틴 이름
  const [milestoneNameInput, setMilestoneNameInput] = useState("")

  // 6. 루틴 요일
  const [selectWeeks, setSelectWeeks] = useState<boolean[]>(initialSelectWeeks)

  // 7. 루틴 기간 설정
  // 마일스톤 시작 날짜
  const milestone_start_date = range
    ? data.length === 0
      ? format(range?.from!, "yyyy-MM-dd")
      : format(addDays(data[data.length - 1].end_at, 1), "yyyy-MM-dd")
    : ""
  const challenge_total_day =
    differenceInCalendarDays(range?.to!, range?.from!) + 1
  const [milestonePeriod, setMilestonePeriod] = useState<string>(
    `${data.length === 0 ? Math.round(challenge_total_day / 2) : differenceInCalendarDays(milestone_start_date, range?.from!)}`
  )
  // 이전 일자 계산
  const prevMilestonesPeriod = differenceInCalendarDays(
    milestone_start_date,
    range?.from!
  )
  // 마일스톤 종료 날짜
  const milestone_end_date = range
    ? data.length === 0
      ? format(addDays(range?.from!, +milestonePeriod - 1), "yyyy-MM-dd")
      : format(
          addDays(
            data[data.length - 1].end_at,
            parseInt(milestonePeriod) - prevMilestonesPeriod
          ),
          "yyyy-MM-dd"
        )
    : ""
  // 마일스톤 기간 실제 일수
  const milestone_actual_day = countWeekdaysBetweenDates(
    milestone_start_date,
    milestone_end_date,
    selectWeeks
  )

  // 8. 목표 달성률
  const [minPercent, setMinPercent] = useState<string>("50")

  // 9. 루틴 작성
  const [routineInpt, setRoutineInput] = useState<string>("")
  const [routines, setRoutines] = useState<string[]>([])

  // 함수---------------------------------------------------------------------------------
  // 1. 랜덤 이미지 생성
  const handleClickRandomImgBtn = () => {
    const length = imgs.length
    const randomIndex = Math.floor(Math.random() * length)
    setSelectedRandomUrl(imgs[randomIndex])
  }
  // 4. 챌린지 기간
  const handleClickOpenCalendar = () => {
    setIsOpenCalender((prev) => !prev)
  }
  // 6. 루틴 요일
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
  // 마일스톤 실행 요일 주중 주말 매일 상태 표시 함수
  const { showToast } = useToast()
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
  // 7. 루틴 작성
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

  useEffect(() => {
    ;(async () => {
      const { data: imgDatas, error } = await supabase.storage
        .from("challenge_img")
        .list("")
      // 에러
      if (error) {
        console.error(error)
        return
      }
      // 파일 목록이 있는지 확인
      if (imgDatas && imgDatas.length > 0) {
        // 각 파일에 대해 getPublicUrl을 호출하여 URL을 생성
        const urlPromises = imgDatas.map((file) =>
          supabase.storage.from("challenge_img").getPublicUrl(file.name, {
            download: false,
          })
        )
        let urlDatas
        try {
          // 모든 URL 요청을 병렬로 처리
          urlDatas = await Promise.all(urlPromises)
          const newUrls = urlDatas.map((data) => data.data.publicUrl)
          setImgs(newUrls)
          randomImgUrl || setSelectedRandomUrl(newUrls[0])
          // 결과 출력 (혹은 상태 관리)
        } catch (urlError) {
          console.error("Error fetching URLs:", urlError)
        }
      }
    })()
  }, [])
  return (
    <Page className="mx-auto hidden max-w-[1024px] lg:flex">
      {/* 1. 랜덤 이미지 생성 */}
      <div>
        <div className="relative h-[156px] w-[156px] overflow-hidden rounded-[12px]">
          {selectedRandomUrl && (
            <Image
              alt="랜덤 이미지"
              src={selectedRandomUrl}
              fill
              className="object-cover"
            />
          )}
        </div>
        <Button
          intent="secondary"
          size="sm"
          variant="rounded"
          onClick={() => {
            handleClickRandomImgBtn()
          }}
          className="mb-[24px]"
        >
          <div className="flex items-center justify-center gap-1">
            <ResetIcon />
            랜덤 이미지 변경
          </div>
        </Button>
      </div>

      {/* 2. 챌린지명 */}
      <div>
        <SubTitle>무엇을 목표로 하시나요?</SubTitle>
        <Input
          variant="login"
          label={"챌린지 명"}
          onChange={(e) => {
            if (e.target.value.length > 20) {
              return
            }
            return setInputValue(e.target.value)
          }}
          value={inputValue}
          placeholder="챌린지명을 입력해주세요"
        />
      </div>

      {/* 3. 카테고리 */}
      <div>
        <ul className="flex flex-col gap-y-[20px]">
          {categories.map((category) => (
            <li
              className="cursor-pointer"
              key={category}
              onClick={() => setSelectedCategory(category)}
            >
              <Button
                variant="outline"
                size="lg"
                selected={selectedCategory === category}
              >
                {category}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* 4. 챌린지 기간 */}
      <div
        className="relative"
        onClick={() => {
          handleClickOpenCalendar()
        }}
      >
        <Subsubtitle>챌린지 기간</Subsubtitle>
        <div className="flex w-[230px] justify-between rounded-[12px] border border-solid border-grey-800 px-[16px] py-[12px]">
          <div className="flex flex-col items-center gap-y-[12px]">
            <p className="text-[16px] font-[500] text-grey-300">시작일</p>
            <p className="text-black">{`${range?.from ? range.from?.getMonth() + 1 : "-"} 월 ${range?.from ? range.from?.getDate() : "-"} 일`}</p>
          </div>
          <div className="flex flex-col items-center gap-y-[12px]">
            <p className="text-[16px] font-[500] text-grey-300">완료일</p>
            <p className="text-black">{`${range?.to ? range.to?.getMonth() + 1 : "-"} 월 ${range?.to ? range.to?.getDate() : "-"} 일`}</p>
          </div>
        </div>
        {isOpenCalender && (
          <div className="absolute z-10 bg-white">
            <ChallengeCalender range={range} setRange={setRange} />
          </div>
        )}
      </div>

      <SubTitle>루틴을 만들어볼까요?</SubTitle>

      {/* 5. 루틴 이름 */}
      <div>
        <Input
          variant="login"
          label="루틴 이름"
          placeholder="루틴 명을 입력해주세요"
          value={milestoneNameInput}
          onChange={(e) => {
            if (e.target.value.length > 20) {
              return
            }
            setMilestoneNameInput(e.target.value)
          }}
        />
      </div>

      {/* 6. 루틴 요일 */}
      <div>
        <Subsubtitle className="mb-[20px] mt-[44px]">
          루틴 설정 요일
        </Subsubtitle>
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

      {/* 7. 루틴 기간 설정 */}
      <div>
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
        </div>
        <div className="flex w-[230px] justify-between rounded-[12px] border border-solid border-grey-800 px-[16px] py-[12px]">
          <div className="flex flex-col items-center gap-y-[12px]">
            <p className="text-[16px] font-[500] text-grey-300">시작일</p>
            <p className="text-black">{`${milestone_start_date ? new Date(milestone_start_date).getMonth() + 1 : "-"} 월 ${milestone_start_date ? new Date(milestone_start_date).getDate() : "-"} 일`}</p>
          </div>
          <div className="flex flex-col items-center gap-y-[12px]">
            <p className="text-[16px] font-[500] text-grey-300">완료일</p>
            <p className="text-black">{`${range?.to ? range.to?.getMonth() + 1 : "-"} 월 ${range?.to ? range.to?.getDate() : "-"} 일`}</p>
          </div>
        </div>
      </div>

      {/* 8. 목표 달성률 */}
      <div>
        <Subsubtitle>목표 달성률</Subsubtitle>
        <p>권장 달성률은 50%에요</p>
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
          <p className="font-[500] text-grey-400">0%</p>
          <p className="font-[500] text-grey-400">100%</p>
        </div>
      </div>

      {/* 9. 루틴 작성 */}
      <form onSubmit={hanleSubmit}>
        <Subsubtitle>루틴 작성</Subsubtitle>
        <p>무엇을 꾸준히 해볼까요?</p>
        <div className="relative">
          <Input
            placeholder="ex. 영단어 100개씩 암기"
            value={routineInpt}
            onChange={(e) => {
              if (e.target.value.length > 20) {
                return
              }
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
      <div>
        <Button
          onClick={async () => {
            challengeCreateMutate(
              {
                challenge: {
                  category: category,
                  user_id: me?.id || "",
                  day_cnt:
                    differenceInCalendarDays(range?.to!, range?.from!) + 1,
                  end_at: format(range?.to!, "yyyy-MM-dd"),
                  goal: goal,
                  is_secret: false,
                  start_at: format(range?.from!, "yyyy-MM-dd"),
                  image_url: randomImgUrl,
                },
                milestone: [
                  {
                    challenge_id: "",
                    start_at: milestone_start_date,
                    end_at: milestone_end_date,
                    is_mon: selectWeeks[0],
                    is_tue: selectWeeks[1],
                    is_wed: selectWeeks[2],
                    is_thu: selectWeeks[3],
                    is_fri: selectWeeks[4],
                    is_sat: selectWeeks[5],
                    is_sun: selectWeeks[6],
                    total_cnt: milestone_actual_day,
                    total_day: +milestonePeriod - prevMilestonesPeriod,
                    success_requirement_cnt: Math.ceil(
                      (milestone_actual_day * +minPercent) / 100
                    ),
                    name: milestoneNameInput,
                    success_percent: parseInt(minPercent),
                  },
                ],
                routine: [
                  routines.map((value) => ({
                    milestone_id: "",
                    content: value,
                  })),
                ],
              },
              {
                onSuccess: (id) => {
                  open({
                    type: "confirm",
                    content: "루틴을 추가로 생성하시겠습니까?",
                    onConfirm: () => {
                      return router.replace("/")
                    },
                  })
                },
              }
            )
          }}
          disabled={
            routines.length === 0 ||
            milestoneNameInput === "" ||
            selectWeeks.filter((value) => value).length === 0 ||
            milestone_actual_day === 0 ||
            challengeCreateIsPending
          }
          size="lg"
        >
          완료
        </Button>
      </div>
    </Page>
  )
}

export default ChallengeCreateBrower
