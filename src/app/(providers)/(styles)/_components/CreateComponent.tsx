import { PropsWithChildren, useEffect, useRef } from "react"

interface CreateComponentProps {
  selected: "create" | "import"
  isFirstSelected: Boolean
}

function CreateComponent({ selected, isFirstSelected }: CreateComponentProps) {
  const createRef = useRef<HTMLDivElement | null>(null)
  const importRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isFirstSelected) {
      return
    }
    if (selected === "create" && createRef.current) {
      // selected가 "create"일 때 스크롤 이동
      createRef.current.scrollIntoView({ behavior: "smooth" })
    }
    if (selected === "import" && importRef.current) {
      // selected가 "create"일 때 스크롤 이동
      importRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [selected, isFirstSelected]) // selected가 변경될 때마다 실행

  return (
    <div>
      <div ref={createRef} className="mb-14 ml-5 pt-28">
        <h5 className="mb-4 text-[20px] font-[600] text-primary">
          챌린지 생성하기
        </h5>
        <div className="flex flex-col gap-1 text-[20px] font-[600]">
          <p>챌린지를 생성하고</p>
          <p>루틴을 만들어요</p>
        </div>
      </div>
      <CardComponent stepNum="1" paddingY={true}>
        <div className="flex justify-around">
          <div className="flex flex-col gap-3 text-[22px] font-[600]">
            <p>먼저 무엇에</p>
            <p>도전하는지 입력해요</p>
          </div>
          <img
            className="w-[75%] object-contain"
            src="/image/step_1.png"
            alt="생성 단계 이미지 1"
          />
        </div>
      </CardComponent>
      <CardComponent stepNum="2" paddingY={false}>
        <div className="mx-auto flex justify-around">
          <div className="mt-10 flex flex-col gap-6 text-[22px] font-[600]">
            <p>루틴을 설정해주세요</p>
            <div className="flex flex-col gap-3 text-[12px] text-grey-400">
              <p>* 루틴을 최소 한 개 이상 만들어야지만 챌린지가 생성돼요</p>
              <p>* 루틴이 시작되기 전에는 자유롭게 수정할 수 있어요</p>
            </div>
          </div>
          <img
            className="w-[50%] object-contain"
            src="/image/step_2.png"
            alt="생성 단계 이미지 2"
          />
        </div>
      </CardComponent>
      <div ref={importRef} className="mb-14 ml-5 pt-28">
        <h5 className="mb-4 text-[20px] font-[600] text-primary">
          챌린지 가져오기
        </h5>
        <div className="flex flex-col gap-1 text-[20px] font-[600]">
          <p>다른 사람의 챌린지에 도전하거나</p>
          <p>나의 루틴에 맞게 수정해서 새로운 챌린지를 만들 수 있어요.</p>
        </div>
      </div>
      <CardComponent stepNum="3" paddingY={false}>
        <div className="mx-auto flex justify-center gap-5 pt-6">
          <img
            className="w-[40%] object-contain"
            src="/image/step_3.png"
            alt="생성 단계 이미지 3"
          />
          <div className="mt-[6%] flex flex-col gap-4 text-[20px] font-[600]">
            <p>챌린지 가져오기 기능으로</p>
            <p>쉽게 도전하고 목표를 이뤄보세요!</p>
            <p className="text-[14px] text-grey-400">
              챌린지 상세페이지의 가져오기 버튼을 통해 챌린지를 가져올 수
              있어요!
            </p>
          </div>
        </div>
      </CardComponent>
      <div className="py-8"></div>
    </div>
  )
}

export default CreateComponent

interface CardComponentProps {
  stepNum: string
  paddingY: boolean
}
export const CardComponent = ({
  children,
  stepNum,
  paddingY,
}: PropsWithChildren<CardComponentProps>) => {
  return (
    <>
      <p className="mb-8 text-center text-[28px] font-[600]">Step. {stepNum}</p>
      <div
        className={`mb-[65px] rounded-[20px] bg-white px-[40px] ${paddingY && "py-[86px]"}`}
        style={{ boxShadow: "1px 2px 40px 0px rgba(0, 0, 0, 0.08)" }}
      >
        {children}
      </div>
    </>
  )
}
