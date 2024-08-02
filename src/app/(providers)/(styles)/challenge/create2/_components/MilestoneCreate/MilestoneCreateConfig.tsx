import { FormEventHandler, useState } from "react"
import useChallengeCreateStore from "@/store/challengeCreate.store"
import { differenceInCalendarDays, format } from "date-fns"

import Button from "@/components/Button"
import Input from "@/components/Input"

import { MilestoneCreateProps } from "./MilestoneCreate"

interface MilestoneCreateConfigProps {
  setShowCompoent: (staus: MilestoneCreateProps["status"]) => void
}

function MilestoneCreateConfig({
  setShowCompoent,
}: MilestoneCreateConfigProps) {
  const [milestoneNameInput, setMilestoneNameInput] = useState("")
  const [routineInpt, setRoutineInput] = useState<string>("")
  const [routines, setRoutines] = useState<string[]>([])
  const { range } = useChallengeCreateStore()

  const hanleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setRoutines((prev) => [...prev, routineInpt])
    setRoutineInput("")
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
        </div>
        <div>
          <p>루틴 설정 요일</p>
        </div>
        <div>
          <p>최소 달성률을 설정해 주세요</p>
          <p>권장 달성률 {}%에요</p>
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
