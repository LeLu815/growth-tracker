import { RoutineType } from "../../../../../../../types/challengeDetail.type"

function Routine({ routine }: { routine: RoutineType }) {
  return (
    <div
      className={
        "flex w-full items-center justify-between rounded-[6px] border border-[#D9D9D9] bg-[#F5F5F5] p-[14px_10px]"
      }
      key={routine.id}
    >
      <span
        className={
          "font-pretendard text-[14px] font-medium leading-normal tracking-[-0.35px] text-[#000]"
        }
      >
        {routine.content}
      </span>
    </div>
  )
}

export default Routine
