"use client"

import Link from "next/link"
import { useMediaQuery } from "react-responsive"

import ArrowRightIcon from "@/components/Icon/ArrowRightIcon"
import { MenuProps } from "@/app/(providers)/(styles)/my-page/_constants/myPageConstants"

function ProfileMenu({
  menuList,
  title,
}: {
  menuList: MenuProps[]
  title: string
}) {
  const isLargeScreen = useMediaQuery({ minWidth: 1024 }) // lg 사이즈 이상일 때 true

  return (
    <div>
      <div className="mb-2 font-bold text-primary">{title}</div>
      <div className="rounded-lg border border-solid border-grey-800 px-[12px] py-[8px]">
        {menuList.map((menu, index) => {
          const isLastMenu = menuList.length - 1 !== index
          const isOneMenu = menuList.length === 1

          const isActive = isLargeScreen ? menu.isPcActive : menu.isMoActive

          return (
            <div
              key={menu.name}
              className={`flex flex-col gap-[12px] ${!isLastMenu && !isOneMenu && "mt-[12px]"}`}
            >
              <Link
                href={isActive ? menu.path : "#"}
                className={`flex flex-col px-[4px] py-[8px] text-gray-600 ${isActive ? "cursor-pointer" : "cursor-default"}`}
              >
                <div className={"flex justify-between"}>
                  <div className={"lg:text-title-xs"}>{menu.name}</div>
                  <ArrowRightIcon
                    className={"h-[20px] lg:hidden"}
                  ></ArrowRightIcon>
                </div>
                {menu.childMenu &&
                  menu.childMenu.map((subMenu) => {
                    const isActive = isLargeScreen
                      ? subMenu.isPcActive
                      : subMenu.isMoActive
                    return (
                      <div
                        key={subMenu.name}
                        className={
                          "flex cursor-pointer flex-col gap-[10px] pt-[14px] lg:block"
                        }
                      >
                        <Link
                          href={isActive ? subMenu.path : "#"}
                          className={`block text-gray-600`}
                        >
                          <div className={"flex justify-between"}>
                            {subMenu.name}
                          </div>
                        </Link>
                      </div>
                    )
                  })}
              </Link>
              {isLastMenu && (
                <div className={"border-b border-solid border-grey-800"}></div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProfileMenu
