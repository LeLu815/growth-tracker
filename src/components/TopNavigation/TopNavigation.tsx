import React, { PropsWithChildren } from "react"

import ArrowLeftIcon from "../Icon/ArrowLeftIcon"

interface TopNavigationProps {
  title: string
}

function TopNavigation({ title }: PropsWithChildren<TopNavigationProps>) {
  return (
    <div className="flex h-[50px] w-full items-center justify-center px-[20px] py-[4px]">
      <ArrowLeftIcon className="absolute left-[28px]" />
      <h1 className="text-title-s text-black">{title}</h1>
    </div>
  )
}

export default TopNavigation
