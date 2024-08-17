"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { useModal } from "@/context/modal.context"
import { useToast } from "@/context/toast.context"
import useChallengeQuery from "@/query/challenge/userChallengeQuery"
import useChallengeCreateStore, {
  categories,
  defaultSelected,
} from "@/store/challengeCreate.store"
import useMilestoneCreateStore, {
  MilestoneType,
} from "@/store/milestoneCreate.store"
import { format } from "date-fns"
import { produce } from "immer"

import Button from "@/components/Button"
import Chip from "@/components/Chip"
import PlusIcon from "@/components/Icon/PlusIcon"

import Subsubtitle from "../../../../create/_browser/_components/Subsubtitle"
import DragDropContainer from "../../../../create/_components/DrapDropContainer/DragDropContainer"
import ChallengeUpdateCreateMilestonePc from "./ChallengeUpdateCreateMilestonePc"

interface ChallengeUpdatePcProps {
  challengeId: string
  milestoneIds: string[]
}
function ChallengeUpdatePc({
  milestoneIds,
  challengeId,
}: ChallengeUpdatePcProps) {
  const {
    challengeDeleteIsPending,
    challengeDeleteMutate,
    challengeUpdateIsPending,
    challengeUpdateMutate,
  } = useChallengeQuery()
  // 이전 정보 불러와서 저장하기
  // 챌린지 정보
  const {
    setCategory,
    setGoal,
    setRandomImgUrl,
    setRange,
    randomImgUrl,
    goal,
    category,
    range,
  } = useChallengeCreateStore()
  // 마일스톤과 루틴 정보
  const { setData, data } = useMilestoneCreateStore()
  // 마일스톤 추가
  const [isOpenAddMilestone, setIsOpenAddMilestone] = useState<boolean>(false)

  // 토스트 열기
  const { showToast } = useToast()
  // 컨펌 모달 열기
  const { open, close } = useModal()
  // 넥스트 라우터로 보내기
  const router = useRouter()
  // 유저 데이터
  const { me, userData } = useAuth()

  return (
    <div className="mx-auto hidden h-screen flex-col lg:flex">
      {isOpenAddMilestone ? (
        <ChallengeUpdateCreateMilestonePc
          data={data}
          range={range}
          setData={setData}
          onClickGoBack={() => setIsOpenAddMilestone(false)}
        />
      ) : (
        <>
          {/* 페이지 타이틀 */}
          <Subsubtitle>챌린지 수정</Subsubtitle>
          {/* 1. 카테고리 */}
          <ul>
            {categories.map((value) => (
              <li key={value}>
                <Chip
                  size="md"
                  intent="secondary"
                  label={value}
                  variant={value === category ? null : "outline"}
                />
              </li>
            ))}
          </ul>
          {/* 2. 챌린지 기간 */}
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
          {/* 3. 랜덤 이미지 */}
          <div className="relative h-[156px] w-[156px] overflow-hidden rounded-[12px]">
            {randomImgUrl && (
              <Image
                alt="랜덤 이미지"
                src={randomImgUrl}
                fill
                className="object-cover"
              />
            )}
          </div>
          {/* 4. 챌린지 명 */}
          <div>
            <p>챌린지 명</p>
            <div>{goal}</div>
          </div>
          {/* 루틴 정보들 */}
          {/* 5. 루틴 추가 */}
          <hr />
          <div>
            <Subsubtitle>루틴 정보</Subsubtitle>
            <button
              onClick={() => {
                setIsOpenAddMilestone(true)
              }}
              className="flex items-center gap-2"
              disabled={
                data.length !== 0 &&
                range &&
                format(range?.to!, "yyyy-MM-dd") ===
                  data[data.length - 1].end_at
              }
            >
              <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-solid border-primary">
                <PlusIcon className="stroke-primary" />
              </div>
              루틴 추가
            </button>
          </div>
          {/* 6. 루틴 보여주기 */}
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
          {/* 7. 수정 & 삭제 버튼 */}
          <div className="flex gap-[32px]">
            <Button
              size="lg"
              onClick={() => {
                open({
                  type: "confirm",
                  content: "삭제한 챌린지는 복구할 수 없어요. 삭제하시겠어요?",
                  onConfirm: () => {
                    challengeDeleteMutate(challengeId, {
                      onSuccess: () => {
                        showToast("챌린지 삭제가 완료되었습니다.")
                        return router.push("/")
                      },
                      onError: () => {
                        return showToast("챌린지 삭제가 실패했습니다.")
                      },
                    })
                  },
                  onCancel: () => {
                    close()
                  },
                })
              }}
              disabled={challengeDeleteIsPending || challengeUpdateIsPending}
            >
              챌린지 삭제
            </Button>
            <Button
              size="lg"
              variant="outline"
              disabled={challengeDeleteIsPending || challengeUpdateIsPending}
              onClick={() => {
                const filteredData = data.filter(
                  (obj) => milestoneIds && milestoneIds.includes(obj.id)
                )
                // 뮤테이션 돌리기
                {
                  milestoneIds &&
                    challengeId &&
                    challengeUpdateMutate(
                      {
                        milestoneIds: milestoneIds,
                        "challenge-id": challengeId,
                        milestone: filteredData.map((obj) =>
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
                        routine: filteredData.map((obj) =>
                          obj.routines.map((routine) => ({
                            content: routine.content,
                            milestone_id: obj.id,
                          }))
                        ),
                      },
                      {
                        onSuccess: () => {
                          // 3. 주스텐드 싹다 정리하는 함수를 실행하기 (스토어 초기화)
                          setData([])
                          setRange(defaultSelected)
                          setCategory(categories[0])
                          setGoal("")
                          setRandomImgUrl("")
                          router.push("/")
                          return showToast("챌린지 정보가 업데이트 되었습니다.")
                        },
                        onError: () => {
                          return showToast(
                            "챌린지 정보 업데이트를 실패했습니다."
                          )
                        },
                      }
                    )
                }
              }}
            >
              수정 완료
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default ChallengeUpdatePc
