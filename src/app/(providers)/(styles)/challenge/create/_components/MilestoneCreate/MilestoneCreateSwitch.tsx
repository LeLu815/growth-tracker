import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import useChallengeQuery from "@/query/challenge/userChallengeQuery"
import useChallengeCreateStore, {
  categories,
  defaultSelected,
} from "@/store/challengeCreate.store"
import useMilestoneCreateStore, {
  MilestoneType,
} from "@/store/milestoneCreate.store"
import { differenceInCalendarDays, format } from "date-fns"
import { produce } from "immer"

import Button from "@/components/Button"
import CalenderIcon from "@/components/Icon/CalenderIcon"
import FlagIcon from "@/components/Icon/FlagIcon"

import DragDropContainer from "../DrapDropContainer/DragDropContainer"
import SubTitle from "../styles/SubTitle"

interface MilestoneCreateSwitchProps {}
function MilestoneCreateSwitch({}: MilestoneCreateSwitchProps) {
  const { category, range, goal, setRange, setCategory, setGoal } =
    useChallengeCreateStore()
  const { data, setData } = useMilestoneCreateStore()
  const { me } = useAuth()
  const router = useRouter()

  // 뮤테이션 함수 => db에 생성 저장하는 로직
  const {
    challengeCreateMutate,
    challengeCreateIsPending,
    challengeUpdateMutate,
  } = useChallengeQuery()

  return (
    <>
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
      <div className="h-[40px]" />
      <Button
        intent="secondary"
        className="h-full"
        size="lg"
        onClick={() => {
          // setShowCompoent("config")
        }}
        disabled={
          data.length !== 0 &&
          range &&
          format(range?.to!, "yyyy-MM-dd") === data[data.length - 1].end_at
        }
      >
        + 루틴 추가
      </Button>
      <div className="h-[20px]" />
      <DragDropContainer range={range} />
      <div className="h-[100px]"></div>
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-[640px] bg-white px-[20px] pb-8 pt-5">
        <Button
          className="h-full"
          onClick={() => {
            // 1. 홈으로 네비게이션 돌리기
            router.push("/")

            // 2. 먼저 뮤테이션 돌리고
            challengeCreateMutate({
              challenge: {
                category: category,
                user_id: me?.id || "",
                day_cnt: differenceInCalendarDays(range?.to!, range?.from!) + 1,
                end_at: format(range?.to!, "yyyy-MM-dd"),
                goal: goal,
                is_secret: false,
                start_at: format(range?.from!, "yyyy-MM-dd"),
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
            })
            // 3. 주스텐드 싹다 정리하는 함수를 실행하기 (스토어 초기화)
            setData([])
            setRange(defaultSelected)
            setCategory(categories[0])
            setGoal("")
          }}
          disabled={data.length === 0}
          size="lg"
        >
          완료
        </Button>
      </div>
    </>
  )
}

export default MilestoneCreateSwitch
