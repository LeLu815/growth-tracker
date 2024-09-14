"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

const cardInfos: Omit<CardComponentProps, "index" | "animate">[] = [
  {
    title: "CHALLENGE",
    description1: `어떤 것을 목표로 하고 있나요?`,
    description2: "목표를 설정하고 챌린지에 도전하세요.",
    imgUrl: "/image/landingCelebration.png",
    bottomString: `"챌린지가 생성되었어요."`,
  },
  {
    title: "SEARCH",
    description1: `다른 유저의 챌린지를 탐색해보고`,
    description2: "따라해보며 쉽게 시작해보세요.",
    imgUrl: "/image/landingSearch.png",
    bottomString: null,
  },
  {
    title: "COMPETITION",
    description1: `다른 유저와의 통계를 확인하고`,
    description2: "더 높은 목표를 달성해보세요",
    imgUrl: "/image/landingGraph.png",
    bottomString: null,
  },
]

function YouDidItComponent() {
  const { ref, inView } = useInView({
    threshold: 0,
  })

  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (inView) {
      setAnimate(true) // 카드가 화면에 들어오면 애니메이션 적용
    } else {
      setAnimate(false) // 카드가 화면에서 나가면 애니메이션 제거
    }
  }, [inView])

  return (
    <div className="bg-gradient-to-t from-pink-900 to-white">
      <TitleComponent />
      <div ref={ref} className="pb-28">
        <ul className="relative flex justify-center">
          <div className="aspect-[3/4] w-[31%] max-w-[280px]" />
          {cardInfos.map((info, index) => (
            <CardComponent
              index={index}
              key={info.title}
              title={info.title}
              description1={info.description1}
              description2={info.description2}
              imgUrl={info.imgUrl}
              bottomString={info.bottomString}
              animate={animate && (index === 0 || index === 2)} // 애니메이션을 첫 번째와 세 번째 카드에만 적용
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default YouDidItComponent

export const TitleComponent = () => {
  return (
    <div className="mx-auto flex flex-col pt-[110px]">
      <h2 className="mb-3 text-center text-[40px] font-[700] text-primary">
        YOU DID IT!
      </h2>
      <p className="mb-[84px] text-center text-[20px]">
        디딧과 함께 목표에 도전해봐요!
      </p>
    </div>
  )
}

interface CardComponentProps {
  title: string
  description1: string
  description2: string
  imgUrl: string
  bottomString: string | null
  index: number
  animate: boolean
}
export const CardComponent = ({
  title,
  description1,
  description2,
  imgUrl,
  bottomString,
  index,
  animate,
}: CardComponentProps) => {
  return (
    <div
      className={`${index === 0 ? "right-[45%]" : index === 2 ? "left-[45%]" : ""} ${animate ? (index === 0 ? "animate-spread-left" : "animate-spread-right") : ""} absolute flex aspect-[3/4] w-[31%] max-w-[280px] flex-col justify-between rounded-[5%] border border-solid border-white bg-grey-100 p-[3%] shadow-custom`}
    >
      <div className="flex flex-col gap-2">
        <h4 className="text-primary">{title}</h4>
        <div className="flex flex-col gap-[3px] text-[13px]">
          <p className="text-white">{description1}</p>
          <p className="text-white">{description2}</p>
        </div>
      </div>
      <div className="mx-auto flex aspect-square w-full max-w-[210px] items-center justify-center">
        <img
          alt={title}
          src={imgUrl}
          className={`object-contain ${title === "CHALLENGE" && "w-[60%]"}`}
        />
      </div>
      {bottomString && <p className="text-[14px] text-white">{bottomString}</p>}
    </div>
  )
}
