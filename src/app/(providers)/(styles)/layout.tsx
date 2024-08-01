import { PropsWithChildren } from "react"
import Link from "next/link"

import Notice from "@/app/(providers)/_components/Notice/Notice"

export default function StylesLayout({ children }: PropsWithChildren) {
  const bottomNavItems = [
    {
      name: "피드",
      path: "/newsfeed",
    },
    {
      name: "내 챌린지",
      path: "/my-challenge",
    },
    {
      name: "마이",
      path: "/my-page/profile",
    },
    {
      name: "챌린지 생성",
      path: "/challenge/create",
    },
  ]
  return (
    <div>
      {children}
      <div className="h-[80px] w-full"></div>
      <Notice></Notice>
      <nav className="fixed bottom-0 z-50 h-[60px] w-full bg-white">
        <ul className="mx-auto flex max-w-[800px] items-center justify-between">
          {bottomNavItems.map((item) => (
            <li
              className="rounded border border-neutral-500 px-6 py-3"
              key={item.name}
            >
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
