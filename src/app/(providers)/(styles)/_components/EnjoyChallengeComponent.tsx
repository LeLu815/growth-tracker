import { PropsWithChildren } from "react"

const cardInfos = [
  {
    title1: "목표에 도전하고 나의 성공률을",
    title2: "눈으로 확인해요",
    description1: "챌린지를 설정해 성공한 기록을 확인하면서",
    description2: "더 많은 챌린지에 도전하세요.",
    imgUrl: "/image/enjoy/chart.png",
  },
  {
    title1: "매일 루틴을 실행하는 것만으로",
    title2: "챌린지 성공을 이루세요",
    description1: "여러 챌린지에 도전하고 성공하면서",
    description2: "뱃지를 얻어요.",
    imgUrl: "/image/enjoy/shield.png",
  },
  {
    title1: "오늘 루틴을 다 실행했다면",
    title2: "하루 일기를 써보세요",
    description1: "오늘을 돌아보며 기록하면서",
    description2: "습관을 만들어요.",
    imgUrl: "/image/enjoy/diary.png",
  },
]

function EnjoyChallengeComponent() {
  return (
    <div className="bg-[#FFF9FA]">
      <div className="flex flex-col items-center gap-4 py-[120px]">
        <h4 className="text-[40px] font-[700]">
          함께 도전하고 성장할 수 있는 챌린지
        </h4>
        <p className="text-[20px] text-grey-300">
          도전이 즐거울 수 있도록, 디딧이 함께 할게요!
        </p>
      </div>
      <ul className="flex justify-center gap-[3%]">
        {cardInfos.map((cardInfo, index) => (
          <EnjoyCardComponent
            key={cardInfo.title1}
            description1={cardInfo.description1}
            description2={cardInfo.description2}
            title1={cardInfo.title1}
            title2={cardInfo.title2}
            imgUrl={cardInfo.imgUrl}
            index={index}
          />
        ))}
      </ul>
    </div>
  )
}

export default EnjoyChallengeComponent

interface EnjoyCardComponentProps {
  title1: string
  title2: string
  description1: string
  description2: string
  imgUrl: string
  index: number
}
const EnjoyCardComponent = ({
  children,
  title1,
  title2,
  description1,
  description2,
  imgUrl,
  index,
}: PropsWithChildren<EnjoyCardComponentProps>) => {
  return (
    <div
      className={`flex flex-col items-center justify-between p-[2%] ${index === 1 ? "mt-[4%]" : "mb-[4%]"} aspect-[7/10] w-full max-w-[300px] rounded-[5%] border border-solid border-grey-800 bg-white shadow-3`}
    >
      <div className="flex flex-col gap-6">
        <div className="tex-[16px] flex flex-col gap-2">
          <h5>{title1}</h5>
          <h5>{title2}</h5>
        </div>
        <div className="flex flex-col gap-2 text-[12px] text-grey-300">
          <p>{description1}</p>
          <p>{description2}</p>
        </div>
      </div>
      <img
        className="w-[80%] object-contain pb-3"
        src={imgUrl}
        alt="카드 이미지"
      />
      {children}
    </div>
  )
}
