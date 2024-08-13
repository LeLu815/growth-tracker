import useChallengeCreateStore from "@/store/challengeCreate.store"
import { differenceInCalendarDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import Box from "@/components/Box"
import Button from "@/components/Button"
import Page from "@/components/Page"

import ChallengeCalender from "../ChallengeCalender/ChallengeCalender"
import ChallengePageTitle from "../ChallengePageTitle"
import SubTitle from "../styles/SubTitle"

interface ChallengeSelectPeriod {
  handleChangeStep: (step: number) => void
  title: string
}

function ChallengeSelectPeriod({
  handleChangeStep,
  title,
}: ChallengeSelectPeriod) {
  const { range, setRange } = useChallengeCreateStore()
  const isOkay =
    range?.from &&
    range.to &&
    differenceInCalendarDays(range?.from!, new Date()) >= 0
  return (
    <>
      <ChallengePageTitle
        title={title}
        step={2}
        allStepCount={4}
        titleHidden={false}
        handleClickGoBack={() => handleChangeStep(1)}
      />
      <Page>
        <Box className="flex-1">
          <SubTitle className="justify-center">
            목표하는 챌린지 기간을 알려주세요.
          </SubTitle>
          <div className="mb-[30px] mt-[45px] flex justify-around">
            <div className="flex flex-col gap-[12px]">
              <p className="text-center text-[14px] font-[500] text-[#BCBDC2]">
                시작일
              </p>
              <p className="text-[16px] font-[700] text-[#1D1D1D]">
                {formatDateRange(range).start || "- 월 - 일"}
              </p>
            </div>
            <div className="flex flex-col gap-[12px]">
              <p className="text-center text-[14px] font-[500] text-[#BCBDC2]">
                완료일
              </p>
              <p className="text-[16px] font-[700] text-[#1D1D1D]">
                {formatDateRange(range).end || "- 월 - 일"}
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <ChallengeCalender range={range} setRange={setRange} />
          </div>
          <div className="h-[100px]"></div>
          <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-[480px] bg-white px-[20px] pb-8 pt-5">
            <Button
              disabled={!isOkay}
              size="lg"
              onClick={() => handleChangeStep(3)}
            >
              다음
            </Button>
          </div>
        </Box>
      </Page>
    </>
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
