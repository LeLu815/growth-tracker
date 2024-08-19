"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { useModal } from "@/context/modal.context"
import { useToast } from "@/context/toast.context"
import useChallengeQuery from "@/query/challenge/userChallengeQuery"
import useChallengeCreateStore, {
  categories,
} from "@/store/challengeCreate.store"
import useMilestoneCreateStore, {
  MilestoneType,
} from "@/store/milestoneCreate.store"
import { createClient } from "@/supabase/client"
import { differenceInCalendarDays, format } from "date-fns"
import { produce } from "immer"

import Button from "@/components/Button"
import PlusIcon from "@/components/Icon/PlusIcon"
import ResetIcon from "@/components/Icon/ResetIcon"
import Input from "@/components/Input"
import Page from "@/components/Page"

import BrowserHeader from "../../../../_components/BrowserHeader"
import Subsubtitle from "../../../../create/_browser/_components/Subsubtitle"
import ChallengeCalender from "../../../../create/_components/ChallengeCalender/ChallengeCalender"
import DragDropContainer from "../../../../create/_components/DrapDropContainer/DragDropContainer"
import SubTitle from "../../../../create/_components/styles/SubTitle"
import ChallengeUpdateCreateMilestonePc from "../../../update/_components/ChallengeUpdatePc/ChallengeUpdateCreateMilestonePc"

function ChallengeCreateImportPc() {
  const { me } = useAuth()
  const router = useRouter()
  const { showToast } = useToast()
  const { open, close } = useModal()
  // 챌린지 전역상태 가져오기
  const {
    category,
    setRange,
    setCategory,
    setGoal,
    goal,
    range,
    randomImgUrl,
  } = useChallengeCreateStore()
  const { challengeCreateIsPending, challengeCreateMutate } =
    useChallengeQuery()

  // 1. 챌린지 카테고리
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  )
  // 2. 목표하는 챌린지 기간
  const [isOpenCalender, setIsOpenCalender] = useState<boolean>(false)
  const handleClickOpenCalendar = () => {
    setIsOpenCalender((prev) => !prev)
  }
  // 3. 챌린지 이름 & 랜덤 이미지 변경
  // 이미지 url 호출용
  const supabase = createClient()
  const [inputValue, setInputValue] = useState<string>("")
  const [imgs, setImgs] = useState<string[]>([])
  const [selectedRandomUrl, setSelectedRandomUrl] = useState<string>(
    randomImgUrl || imgs[0]
  )
  const handleClickRandomImgBtn = () => {
    const length = imgs.length
    const randomIndex = Math.floor(Math.random() * length)
    setSelectedRandomUrl(imgs[randomIndex])
  }
  // 4. 루틴 정보
  const { setData, data } = useMilestoneCreateStore()
  // 마일스톤 추가
  const [isOpenAddMilestone, setIsOpenAddMilestone] = useState<boolean>(false)

  console.log("data :", data)

  // 첼린지 기간이 마일스톤 기간보다 짧으면 토스트 띄우기
  useEffect(() => {
    if (
      data.length !== 0 &&
      range &&
      format(range?.to!, "yyyy-MM-dd") !== data[data.length - 1].end_at &&
      new Date(data[data.length - 1].end_at) >
        new Date(format(range?.to!, "yyyy-MM-dd"))
    ) {
      showToast("첼린지 기간이 루틴기간보다 짧습니다.", 1000)
    }
  }, [range])

  useEffect(() => {
    // 1. 챌린지 카테고리 전역 상태로 업데이트 하기
    category && setSelectedCategory(category)
    goal && setInputValue(goal)
    // 3. 챌린지 이름 업데이트
  }, [goal, category])

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

  const addRoutineBtnDisabledCondition =
    data.length !== 0 &&
    range &&
    format(range?.to!, "yyyy-MM-dd") === data[data.length - 1].end_at

  return (
    <Page className="mx-auto hidden max-w-[1024px] lg:flex">
      {isOpenAddMilestone ? (
        <ChallengeUpdateCreateMilestonePc
          data={data}
          range={range}
          setData={setData}
          onClickGoBack={() => setIsOpenAddMilestone(false)}
        />
      ) : (
        <>
          <BrowserHeader>챌린지 생성</BrowserHeader>
          {/* 1. 챌린지 카테고리 */}
          <div className="flex w-full items-center">
            <div className="flex flex-col justify-center gap-5 p-3">
              <Subsubtitle>어떤 챌린지에 도전하세요?</Subsubtitle>
              <Image
                className="mx-auto"
                alt="트로피 이미지"
                src="/image/Img_trophy.png"
                width={152}
                height={152}
              />
            </div>
            {/* 3. 카테고리 */}
            <ul className="flex flex-1 justify-between">
              {categories.map((category) => (
                <li
                  className="w-[164px] cursor-pointer"
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
          {/* 2. 목표하는 챌린지 기간 */}
          <Subsubtitle className="mx-3 my-5">
            목표하는 챌린지 기간을 알려주세요.
          </Subsubtitle>
          <div
            className="relative mx-3 mt-3 flex"
            onClick={() => {
              handleClickOpenCalendar()
            }}
          >
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
            {data.length !== 0 &&
              range &&
              format(range?.to!, "yyyy-MM-dd") !==
                data[data.length - 1].end_at &&
              new Date(data[data.length - 1].end_at) >
                new Date(format(range?.to!, "yyyy-MM-dd")) && (
                <p>챌린지 기간을 늘려주세요.</p>
              )}
            {isOpenCalender && (
              <div
                className="absolute left-[242px] z-10 overflow-hidden rounded-[20px] border border-solid border-grey-800 bg-white p-5"
                onClick={(e) => e.stopPropagation()}
              >
                <ChallengeCalender range={range} setRange={setRange} />
              </div>
            )}
          </div>

          {/* 3. 챌린지 이름 & 랜덤 이미지 변경 */}
          <div>
            <SubTitle className="mb-3 mt-5 px-3 py-5">
              챌린지 이름을 입력해주세요.
            </SubTitle>
            <div className="flex items-center gap-6 pl-3">
              <div className="flex flex-col items-center gap-[14px]">
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
                  className="mb-[24px] w-[160px]"
                  onClick={() => {
                    handleClickRandomImgBtn()
                  }}
                >
                  <div className="flex items-center justify-center gap-1">
                    <ResetIcon />
                    랜덤 이미지 변경
                  </div>
                </Button>
              </div>
              {inputValue && (
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
              )}
            </div>
          </div>

          <div className="mb-10 h-11 border-b-4 border-solid border-grey-800" />
          {/* 4. 루틴 정보 */}
          <div className="flex items-center justify-between py-5 pl-3">
            <Subsubtitle>루틴 정보</Subsubtitle>
            <button
              onClick={() => {
                setIsOpenAddMilestone(true)
              }}
              className={`flex items-center gap-2 ${addRoutineBtnDisabledCondition && "cursor-not-allowed text-grey-500"}`}
              disabled={addRoutineBtnDisabledCondition}
            >
              <div
                className={`flex h-[48px] w-[48px] items-center justify-center rounded-full border border-solid ${addRoutineBtnDisabledCondition ? "border-grey-500" : "border-primary"}`}
              >
                <PlusIcon
                  className={`${addRoutineBtnDisabledCondition ? "stroke-grey-500" : "stroke-primary"}`}
                />
              </div>
              루틴 추가
            </button>
          </div>
          <section className="p-[20px]">
            {data.length === 0 ? (
              <div className="mt-[40px]">
                <p className="text-center text-[20px] font-[700]">
                  최소 하나의 루틴이 필요해요.
                </p>
                <p className="mt-[12px] text-center text-[12px] font-[500]">
                  루틴을 설정해야 챌린지를 시작할 수 있어요.
                </p>
              </div>
            ) : (
              <DragDropContainer range={range} />
            )}
          </section>
          <div className="mx-auto mb-[60px] flex w-[375px] flex-col gap-3">
            <Button
              disabled={
                challengeCreateIsPending ||
                (range &&
                  data.length !== 0 &&
                  format(range?.to!, "yyyy-MM-dd") !==
                    data[data.length - 1].end_at &&
                  new Date(data[data.length - 1].end_at) >
                    new Date(format(range?.to!, "yyyy-MM-dd")))
              }
              onClick={() => {
                challengeCreateMutate(
                  {
                    challenge: {
                      category: selectedCategory,
                      user_id: me?.id || "",
                      day_cnt:
                        differenceInCalendarDays(range?.to!, range?.from!) + 1,
                      end_at: format(range?.to!, "yyyy-MM-dd"),
                      goal: inputValue,
                      is_secret: false,
                      start_at: format(range?.from!, "yyyy-MM-dd"),
                      image_url: selectedRandomUrl,
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
                          draft.start_at = draft.start_at
                          draft.end_at = draft.end_at
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
                  },
                  {
                    onSuccess: () => {
                      // 2. 홈으로 네비게이션 돌리기
                      showToast("성공했습니다 :)")
                      router.push("/")
                    },
                    onError: () => {
                      showToast("실패했습니다 :(")
                    },
                  }
                )
              }}
              size="lg"
            >
              챌린지 생성
            </Button>
            <button
              className="text-grey-500 underline underline-offset-[3px]"
              onClick={() => {
                open({
                  type: "confirm",
                  content: "챌린지 작성을 취소하시겠습니까?",
                  onConfirm: () => {
                    router.push("/")
                  },
                  onCancel: () => {
                    close()
                  },
                })
              }}
            >
              나가기
            </button>
          </div>
        </>
      )}
    </Page>
  )
}

export default ChallengeCreateImportPc

// ChallengeCreateImportPc
