"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

import LogoIcon from "@/components/Icon/LogoIcon"

const menuLists = [
  { label: "피드", path: "/newsfeed" },
  { label: "내 챌린지", path: "/my-challenge" },
  { label: "마이페이지", path: "/my-page" },
]

function WebHeader() {
  const pathname = useParams()

  return (
    <header className="sticky top-0 flex w-full items-center bg-white">
      <nav className="mx-auto flex w-full gap-x-[31px] px-[40px] py-[32px]">
        <Link href="/">
          <LogoIcon width={91.5} height={43.5} />
        </Link>

        <ul className="flex items-center gap-x-[30px]">
          {menuLists.map((list) => (
            <li key={list.path}>
              <Link href={list.path}>{list.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default WebHeader
