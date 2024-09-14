import Link from "next/link"

function TrophyComponent() {
  return (
    <div className="flex bg-[#FEEABE] py-14">
      <div className="mx-auto flex justify-center">
        <div className="flex flex-col justify-between">
          <h4 className="flex text-[36px] font-[500]">목표를 위한 첫걸음</h4>
          <div className="flex flex-col gap-[6px] text-[18px]">
            <p>목표를 달성하기 위한 첫걸음으로</p>
            <p>챌린지와 루틴을 설정하고, 목표를 향해 달려가세요!</p>
          </div>
          <div className="">
            <Link
              className="box-border rounded-[8px] bg-[#82D0DC] px-6 py-3 text-[16px] text-white"
              prefetch={false}
              href="/challenge/create"
            >
              챌린지 생성 바로가기
            </Link>
          </div>
        </div>
        <div className="px-[120px] py-3">
          <img
            className="w-full max-w-[152px] object-contain"
            src="/image/trophyPicture.png"
            alt="트로피 이미지"
          />
        </div>
      </div>
    </div>
  )
}

export default TrophyComponent
