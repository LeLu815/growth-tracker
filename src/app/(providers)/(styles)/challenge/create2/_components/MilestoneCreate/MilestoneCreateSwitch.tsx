import useChallengeCreateStore from "@/store/challengeCreate.store"
import useMilestoneCreateStore from "@/store/milestoneCreate.store"
import { differenceInCalendarDays, format } from "date-fns"

import Button from "@/components/Button"

import DragDropContainer from "../DrapDropContainer/DragDropContainer"

function MilestoneCreateSwitch() {
  const { range, goal } = useChallengeCreateStore()
  const { data } = useMilestoneCreateStore()
  return (
    <div>
      <div>
        <p>{goal}</p>
      </div>
      <div>
        <p>
          {range
            ? `${format(range.from!, "yyyy.MM.dd.")} ~ ${format(range.to!, "yyyy.MM.dd.")} (${differenceInCalendarDays(range.to!, range.from!) + 1}일)`
            : "기간을 선택해주세요."}
        </p>
      </div>
      <DragDropContainer range={range} />
      <button>+ 루틴 추가</button>
      <Button onClick={() => {}} disabled={data.length === 0}>
        완료
      </Button>
    </div>
  )
}

export default MilestoneCreateSwitch
