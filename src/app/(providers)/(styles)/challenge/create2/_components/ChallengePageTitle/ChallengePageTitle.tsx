import ArrowLeftIcon from "@/components/Icon/ArrowLeftIcon"

interface ChallengePageTitleProps {
  title: string
  step: number
  allStepCount: number
  titleHidden: boolean
  handleClickGoBack: (index?: number) => void
}
function ChallengePageTitle({
  title,
  step,
  allStepCount,
  titleHidden,
  handleClickGoBack,
}: ChallengePageTitleProps) {
  return (
    <div>
      <div>
        <ArrowLeftIcon onClick={() => handleClickGoBack(1)} />
        {!titleHidden && <h1>{title}</h1>}
      </div>
      <ul className="flex">
        {!titleHidden &&
          Array(allStepCount)
            .fill(0)
            .map((_, index) => (
              <li
                className={`h-[14px] w-[14px] rounded-full ${index + 1 <= step ? "bg-black" : "bg-slate-300"}`}
                key={index}
              ></li>
            ))}
      </ul>
    </div>
  )
}

export default ChallengePageTitle
