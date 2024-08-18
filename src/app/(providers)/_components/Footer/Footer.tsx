import LogoBlackIcon from "@/components/Icon/LogoBlackIcon"

function Footer() {
  return (
    <footer className="hidden bg-grey-900 lg:block">
      <div className="mx-auto flex w-full max-w-[1024px] items-center gap-x-[92px] py-8">
        <div className="flex flex-col items-center">
          <div className="h-[112px] w-[112px]">
            <LogoBlackIcon width="100%" height="100%" />
          </div>

          <div className="text-[11px] text-grey-400">
            <p>©Didit. All Rights Reserved.</p>
          </div>
        </div>

        <div className="flex gap-x-[60px]">
          <div className="flex flex-col">
            <h3 className="mb-[12px] text-[10px] font-medium text-grey-400">
              DEVELOPER
            </h3>
            <div className="flex gap-x-[14px] text-[11px] text-black">
              <p>Kuk Minyoung</p>
              <p>Baek Hyeonmyeong</p>
              <p>Yun Kijoon</p>
              <p>Lee In</p>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="mb-[12px] text-[10px] font-medium text-grey-400">
              UX/UI DESIGNER
            </h3>
            <div className="flex gap-x-[14px] text-[11px] text-black">
              <p>Lee Jinju</p>
              <p>Yea Nayeo</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
