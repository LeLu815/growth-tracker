import { PropsWithChildren } from "react"
import Link from "next/link"

function MypageLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-row">
      <nav>
        <ul className="flex cursor-pointer flex-col gap-4">
          <Link href={"/my-page/profile"}>
            <li>
              <p>🙍 프로필</p>
            </li>
          </Link>
          <Link href={"#"}>
            {/*/my-page/challenge*/}
            <li>
              <p>🗓️ 내 챌린지</p>
            </li>
          </Link>
          <Link href={"#"}>
            {/*/my-page/challenge/like*/}
            <li>
              <p>❤️ 좋아요 챌린지</p>
            </li>
          </Link>
        </ul>
      </nav>
      <div className="w-[1000px]">{children}</div>
    </div>
  )
}

export default MypageLayout
