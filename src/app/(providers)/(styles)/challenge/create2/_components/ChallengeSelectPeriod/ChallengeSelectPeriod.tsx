import useChallengeCreateStore from "@/store/challengeCreate.store"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"

import Button from "@/components/Button"

import ChallengeCalender from "../ChallengeCalender/ChallengeCalender"
import ChallengePageTitle from "../ChallengePageTitle"

interface ChallengeSelectPeriod {
  handleChangeStep: (step: number) => void
  title: string
}

function ChallengeSelectPeriod({
  handleChangeStep,
  title,
}: ChallengeSelectPeriod) {
  const { range, setRange } = useChallengeCreateStore()
  return (
    <div>
      <ChallengePageTitle
        title={title}
        step={2}
        allStepCount={4}
        titleHidden={false}
        handleClickGoBack={() => handleChangeStep(1)}
      />
      <p>목표하는 챌린지 기간을 알려주세요.</p>
      <div>
        <div>
          <p>시작일</p>
          <p>{formatDateRange(range).start}</p>
        </div>
        <div>
          <p>완료일</p>
          <p>{formatDateRange(range).end}</p>
        </div>
      </div>
      <div>
        <ChallengeCalender range={range} setRange={setRange} />
      </div>
      <Button onClick={() => handleChangeStep(3)}>다음</Button>
    </div>
  )
}

export default ChallengeSelectPeriod

export const formatDateRange = (
  range: DateRange | undefined
): { start: string; end: string } => {
  if (!range) {
    return {
      start: "",
      end: "",
    }
  }

  const formatDate = (date: Date): string => {
    const month = format(date, "M") // 월을 숫자로 포맷
    const day = format(date, "d") // 날짜를 숫자로 포맷
    return `${month}월 ${day}일`
  }

  if (range.from && range.to) {
    const startDateFormatted = formatDate(range.from)
    const endDateFormatted = formatDate(range.to)

    return {
      start: startDateFormatted,
      end: endDateFormatted,
    }
  }
  return {
    start: "",
    end: "",
  }
}
