"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import classNames from "classnames"

import Button from "@/components/Button"
import LogoIcon from "@/components/Icon/LogoIcon"

import Notice from "../Notice/Notice"

const menuLists = [
  { label: "피드", path: "/newsfeed" },
  { label: "내 챌린지", path: "/my-challenge" },
  { label: "마이페이지", path: "/my-page" },
]

function WebHeader() {
  const { me, userData } = useAuth()
  const pathname = usePathname()

  return (
    <header className="flex w-full items-center bg-[#fff]">
      <nav className="mx-auto flex w-full items-center justify-between gap-x-[31px] px-[40px] py-[32px]">
        <div className="flex gap-x-[30px]">
          <Link href="/">
            <LogoIcon width={91.5} height={43.5} />
          </Link>

          <ul className="flex items-center gap-x-[30px]">
            {menuLists.map((list) => (
              <li key={list.path} className="text-body-xl">
                <Link
                  href={list.path}
                  className={classNames(
                    "text-base transition-all duration-200",
                    {
                      "text-primary": pathname.startsWith(list.path),
                      "text-grey-600 hover:text-grey-400": !pathname.startsWith(
                        list.path
                      ),
                    }
                  )}
                >
                  {list.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {me ? (
          <div className="flex items-center">
            <Notice />
            <span className="text-title-s">{userData?.nickname} 님</span>
          </div>
        ) : (
          <Button
            intent="secondary"
            variant="outline"
            size="sm"
            className="block border-primary px-[16px] py-[8px] text-body-xl"
            href="/auth/login-email"
            style={{ border: "1px solid #82D0DC", textAlign: "center" }}
          >
            로그인
          </Button>
        )}
        {/* //{" "}
        <div className="flex items-center">
          // <Notice />
          // <span className="text-title-s">{userData?.nickname} 님</span>
          //{" "}
        </div> */}
      </nav>
    </header>
  )
}

export default WebHeader
