import ArrowLeftIcon from "@/components/Icon/ArrowLeftIcon"
import DefaultHeader from "@/app/(providers)/_components/Header/DefaultHeader"

interface ChallengePageTitleProps {
  title: string
  step?: number
  allStepCount: number
  titleHidden: boolean
  handleClickGoBack?: (index?: number) => void
}
function ChallengePageTitle({
  title,
  step,
  allStepCount,
  titleHidden,
  handleClickGoBack,
}: ChallengePageTitleProps) {
  return (
    <>
      <DefaultHeader className="z-[5] flex items-center justify-center bg-white">
        <div className="absolute left-[20px] cursor-pointer">
          {handleClickGoBack && (
            <ArrowLeftIcon onClick={() => handleClickGoBack(1)} />
          )}
        </div>
        {!titleHidden && <h1 className="text-[20px] font-[700]">{title}</h1>}
      </DefaultHeader>
      <div className="h-[60px]"></div>
      {step && (
        <ul className="mt-[32px] flex justify-center gap-[6px]">
          {!titleHidden &&
            Array(allStepCount)
              .fill(0)
              .map((_, index) => (
                <li
                  className={`h-[14px] w-[14px] rounded-full ${index + 1 <= step ? "bg-black" : "bg-[#D9D9D9]"}`}
                  key={index}
                ></li>
              ))}
        </ul>
      )}
    </>
  )
}

export default ChallengePageTitle
