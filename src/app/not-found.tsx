import Image from "next/image"

import Button from "@/components/Button"
import Page from "@/components/Page"

function NotFound() {
  return (
    <Page className="h-screen justify-center">
      <h1 className="flex w-full items-center justify-center gap-x-[10px] font-medium lg:gap-x-[30px]">
        <span className="text-[28px] lg:text-[64px]">404</span>
        <span className="text-[24px] lg:text-[48px]">NOT FOUND</span>
      </h1>

      <div className="flex flex-col items-center justify-center">
        <p className="my-[8px] text-center text-body-m lg:my-[32px]">
          죄송합니다. 페이지를 찾을수 없습니다. <br /> 존재하지 않는 주소를
          입력하셨거나, <br /> 요청하신 페이지의 주소가 변경, 삭제되어 찾을 수
          없습니다.
        </p>
        <div className="relative h-[258px] w-[258px]">
          <Image src="/image/img_notfound.png" alt="404 icon" fill />
        </div>

        <Button
          href="/"
          className="mt-[32px] block px-[26px] py-[12px] text-center"
        >
          홈으로
        </Button>
      </div>
    </Page>
  )
}

export default NotFound
