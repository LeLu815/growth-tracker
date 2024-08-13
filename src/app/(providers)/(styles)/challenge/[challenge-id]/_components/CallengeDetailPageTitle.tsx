"use client"

import { useEffect, useState } from "react"
import { Dropdown, MenuProps, Space } from "antd"

import ArrowLeftIcon from "@/components/Icon/ArrowLeftIcon"
import KebabMenuIcon from "@/components/Icon/KebabMenuIcon"
import DefaultHeader from "@/app/(providers)/_components/Header/DefaultHeader"

export interface KebabMenuPros {
  name: string
  onClickFn: () => void
}

interface ChallengePageTitleProps {
  title: string
  titleHidden: boolean
  goBackFn: () => void
  menuList: MenuProps["items"]
  isMe: boolean
}

function ChallengeDetailPageTitle({
  title,
  titleHidden,
  goBackFn,
  menuList,
  isMe,
}: ChallengePageTitleProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 230)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <DefaultHeader
      className={`w-full items-center justify-between ${isScrolled ? "bg-white" : "bg-transparent"}`}
    >
      <div className="cursor-pointer">
        <ArrowLeftIcon onClick={() => goBackFn()} />
      </div>
      {!titleHidden && <h1 className="text-[20px] font-[700]">{title}</h1>}
      {isMe && (
        <div className="right-0">
          <Space direction="vertical">
            <Dropdown menu={{ items: menuList }} placement="bottomRight">
              <KebabMenuIcon
                className={"cursor-pointer"}
                width={30}
                height={40}
              ></KebabMenuIcon>
            </Dropdown>
          </Space>
        </div>
      )}
    </DefaultHeader>
  )
}

export default ChallengeDetailPageTitle
