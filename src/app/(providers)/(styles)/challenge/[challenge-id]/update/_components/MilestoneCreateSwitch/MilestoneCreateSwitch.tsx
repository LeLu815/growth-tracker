import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { useToast } from "@/context/toast.context"
import useChallengeQuery from "@/query/challenge/userChallengeQuery"
import useChallengeCreateStore from "@/store/challengeCreate.store"
import useMilestoneCreateStore, {
  MilestoneType,
} from "@/store/milestoneCreate.store"
import { differenceInCalendarDays, format } from "date-fns"
import { produce } from "immer"

import Button from "@/components/Button"
import CalenderIcon from "@/components/Icon/CalenderIcon"
import FlagIcon from "@/components/Icon/FlagIcon"
import Page from "@/components/Page"

import DragDropContainer from "../../../../create/_components/DrapDropContainer/DragDropContainer"
import SubTitle from "../../../../create/_components/styles/SubTitle"

interface MilestoneCreateSwitchProps {
  goNextPage: () => void
  challengeId?: string
  milestoneIds?: string[]
}
function MilestoneCreateSwitch({
  goNextPage,
  challengeId,
  milestoneIds,
}: MilestoneCreateSwitchProps) {
  const {
    randomImgUrl,
    range,
    category,
    goal,
    setRange,
    setCategory,
    setGoal,
    setRandomImgUrl,
  } = useChallengeCreateStore()
  const { data, setData } = useMilestoneCreateStore()
  const { me } = useAuth()
  const router = useRouter()
  const { showToast } = useToast()

  // 뮤테이션 함수 => db에 생성 저장하는 로직
  const {
    challengeCreateMutate,
    challengeCreateIsPending,
    challengeUpdateMutate,
  } = useChallengeQuery()
  return (
    <>
      <Page>
        <section className="p-[20px]">
          <div className="mt-[12px] flex items-center gap-2">
            <FlagIcon />
            <SubTitle>{goal}</SubTitle>
          </div>
          <div className="mt-[12px] flex items-center gap-2">
            <CalenderIcon color="#717171" />
            <p className="text-[18px] font-[500] text-[#717171]">
              {range
                ? `${format(range.from!, "yyyy.MM.dd.")} ~ ${format(range.to!, "yyyy.MM.dd.")} (${differenceInCalendarDays(range.to!, range.from!) + 1}일)`
                : "기간을 선택해주세요."}
            </p>
          </div>
        </section>

        <div className="h-[10px] flex-shrink-0 bg-grey-800" />
        <section className="p-[20px]">
          <Button
            variant="outline"
            className="h-full"
            size="lg"
            onClick={() => {
              goNextPage()
            }}
            disabled={
              (data.length !== 0 &&
                range &&
                format(range?.to!, "yyyy-MM-dd") ===
                  data[data.length - 1].end_at) ||
              (data.length !== 0 &&
                range &&
                new Date(data[data.length - 1].end_at) >
                  new Date(format(range?.to!, "yyyy-MM-dd")))
            }
          >
            + 루틴 추가
          </Button>
        </section>

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
        <div className="py-[50px]"></div>
        <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-[480px] bg-white px-[20px] pb-8 pt-5">
          <Button
            className="h-full"
            onClick={() => {
              // 1. 여기에서 그냥 생성 함수가 들어갈 수도 있다. 가져오기일때
              {
                !milestoneIds &&
                  !challengeId &&
                  challengeCreateMutate(
                    {
                      challenge: {
                        category: category,
                        user_id: me?.id || "",
                        day_cnt:
                          differenceInCalendarDays(range?.to!, range?.from!) +
                          1,
                        end_at: format(range?.to!, "yyyy-MM-dd"),
                        goal: goal,
                        is_secret: false,
                        start_at: format(range?.from!, "yyyy-MM-dd"),
                        image_url: randomImgUrl,
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
              }
              // 1. 뮤테이션
              // milestoneIds 안에 있는 값만 업데이트하게 필터링
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
                        // 2. 홈으로 네비게이션 돌리기
                        showToast("성공했습니다 :)")
                        router.push("/")
                      },
                      onError: () => {
                        showToast("실패했습니다 :(")
                      },
                    }
                  )
              }
            }}
            disabled={data.length === 0}
            size="lg"
          >
            수정 완료
          </Button>
        </div>
      </Page>
    </>
  )
}

export default MilestoneCreateSwitch
