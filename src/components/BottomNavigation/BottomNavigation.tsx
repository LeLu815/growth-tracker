"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cva } from "class-variance-authority"

import ChallengeIcon from "../Icon/ChallengeIcon"
import FeedIcon from "../Icon/FeedIcon"
import MyPageIcon from "../Icon/MyPageIcon"

interface NavItem {
  label: string
  path: string
  icon: (isActive: boolean) => React.ReactElement
}

const navItemClasses = cva("flex flex-col items-center text-xs lg:hidden", {
  variants: {
    active: {
      true: "text-[#FF5C5C]",
      false: "text-gray-400",
    },
  },
})

function BottomNavigation() {
  const pathname = usePathname()
  const [activePath, setActivePath] = useState<string>("")

  useEffect(() => {
    setActivePath(pathname)
  }, [pathname])

  const navItems: NavItem[] = [
    {
      label: "피드",
      path: "/newsfeed",
      icon: (isActive) => <FeedIcon color={isActive ? "#FF5C5C" : "#ACACAC"} />,
    },
    {
      label: "챌린지",
      path: "/my-challenge",
      icon: (isActive) => (
        <ChallengeIcon color={isActive ? "#FF5C5C" : "#ACACAC"} />
      ),
    },
    {
      label: "마이",
      path: "/my-page",
      icon: (isActive) => (
        <MyPageIcon color={isActive ? "#FF5C5C" : "#ACACAC"} />
      ),
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-around bg-white py-2 shadow-md">
      {navItems.map((item, index) => {
        const isActive = activePath.startsWith(item.path)
        return (
          <Link href={item.path} key={index}>
            <div className={navItemClasses({ active: isActive })}>
              {item.icon(isActive)}
              <span>{item.label}</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default BottomNavigation
