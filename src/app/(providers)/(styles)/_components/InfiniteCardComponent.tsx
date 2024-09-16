import InfiniteSwiperComponent from "./InfiniteSwiperComponent"

function InfiniteCardComponent() {
  return (
    <div className="bg-grey-100">
      <div className="pb-[60px] pt-[96px]">
        <h4 className="mb-6 text-center text-[36px] font-[600] text-secondary">
          다양한 종류의 챌린지
        </h4>
        <div className="flex flex-col items-center gap-2 text-[18px] text-white">
          <p>카테고리만 설정하면 무궁무진하게 다양한 챌린지를</p>
          <p>생성하고 목표를 달성해 볼 수 있어요!</p>
        </div>
      </div>
      <InfiniteSwiperComponent oppositeDirection={false} />
      <InfiniteSwiperComponent oppositeDirection={true} />
    </div>
  )
}

export default InfiniteCardComponent
