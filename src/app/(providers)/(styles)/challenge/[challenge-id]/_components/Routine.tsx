import { RoutineType } from "../../../../../../../types/challengeDetail.type"

function Routine({ routine }: { routine: RoutineType }) {
  return (
    <div
      className={"h-[39px] w-[305px] rounded-[4px] bg-[#F5F5F5] pt-2"}
      key={routine.id}
    >
      <span className={"pl-3 text-[12px] font-medium text-[#171717]"}>
        {routine.content}
      </span>
    </div>
  )
}

export default Routine
