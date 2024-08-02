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
  icon: React.ReactElement
}

const navItemClasses = cva("flex flex-col items-center text-xs", {
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
      icon: (
        <FeedIcon color={activePath === "/newsfeed" ? "#FF5C5C" : "#ACACAC"} />
      ),
    },
    {
      label: "챌린지",
      path: "/my-challenge",
      icon: (
        <ChallengeIcon
          color={activePath === "/my-challenge" ? "#FF5C5C" : "#ACACAC"}
        />
      ),
    },
    {
      label: "마이",
      path: "/my-page",
      icon: (
        <MyPageIcon
          color={activePath === "/my-page/profile" ? "#FF5C5C" : "#ACACAC"}
        />
      ),
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-around bg-white py-2 shadow-md">
      {navItems.map((item, index) => (
        <Link href={item.path} key={index}>
          <div className={navItemClasses({ active: activePath === item.path })}>
            {item.icon}
            <span>{item.label}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default BottomNavigation
