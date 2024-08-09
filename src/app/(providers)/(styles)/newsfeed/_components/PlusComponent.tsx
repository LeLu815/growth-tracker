"use client"

import { useRouter } from "next/navigation"

import PlusIcon from "@/components/Icon/PlusIcon"

function PlusComponent() {
  const router = useRouter()
  return (
    <div
      onClick={() => {
        return router.push("/challenge/create")
      }}
      className="fixed bottom-32 right-10 z-50 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-black shadow-custom"
    >
      <PlusIcon />
    </div>
  )
}

export default PlusComponent
