import ArrowLeftIcon from "@/components/Icon/ArrowLeftIcon"

interface ChallengeTitleProps {
  title: string
  step: number
  allStepCount: number
  titleHidden: boolean
}
function ChallengeTitle({
  title,
  step,
  allStepCount,
  titleHidden,
}: ChallengeTitleProps) {
  return (
    <div>
      <div>
        <ArrowLeftIcon />
        {!titleHidden && <h1>{title}</h1>}
      </div>
      <ul className="flex">
        {!titleHidden &&
          Array(allStepCount)
            .fill(0)
            .map((_, index) => (
              <li
                className={`h-[14px] w-[14px] rounded-full ${index + 1 === step ? "bg-black" : "bg-slate-300"}`}
                key={index}
              ></li>
            ))}
      </ul>
    </div>
  )
}

export default ChallengeTitle
