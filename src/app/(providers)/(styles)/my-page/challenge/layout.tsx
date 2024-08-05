"use client"

import { PropsWithChildren } from "react"
import { useRouter } from "next/navigation"

import ArrowLeftIcon from "@/components/Icon/ArrowLeftIcon"

function Layout({ children }: PropsWithChildren) {
  const router = useRouter()

  return (
    <div>
      <div className={"ml-5"}>
        <ArrowLeftIcon
          className={"mt-5 w-4 cursor-pointer"}
          onClick={router.back}
        />
      </div>
      {children}
    </div>
  )
}

export default Layout
