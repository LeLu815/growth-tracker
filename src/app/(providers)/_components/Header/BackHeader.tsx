import { useRouter } from "next/navigation"

import ArrowLeftIcon from "@/components/Icon/ArrowLeftIcon"

import DefaultHeader from "./DefaultHeader"

interface BackHeaderProps {
  title?: string
}

function BackHeader({ title }: BackHeaderProps) {
  const router = useRouter()

  return (
    <DefaultHeader>
      <div className="flex w-full items-center">
        <button className="flex items-center p-2">
          <ArrowLeftIcon onClick={() => router.back()} />
        </button>
        <div className="flex-1 text-center">
          <span className="text-title-s font-bold">{title}</span>
        </div>
      </div>
    </DefaultHeader>
  )
}

export default BackHeader
