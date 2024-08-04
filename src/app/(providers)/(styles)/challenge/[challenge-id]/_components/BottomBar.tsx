"use client"

import { FormEvent, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { useModal } from "@/context/modal.context"
import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import NoneProfile from "@/components/Icon/NoneProfile"
import Input from "@/components/Input"

import Button from "../../../../../../components/Button"

function BottomBar({ challengeId }: { challengeId: string }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { me, userData } = useAuth()
  const modal = useModal()
  const [content, setContent] = useState("")

  /**
   * 댓글 생성
   * */
  const createComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!me) {
      router.push("/")
      return
    } else if (!content.trim()) {
      alertOpen("댓글 내용을 입력해주세요.")
      return
    }

    setContent("")

    const response = await axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/challenge/${challengeId}/comment`,
        JSON.stringify({ content, userId: me?.id }), // JSON 데이터
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => response.data)

    if (response.error) {
      alertOpen("댓글 작성에 실패했습니다.")
      throw new Error(response.error)
    }
    queryClient.invalidateQueries({ queryKey: ["challengeComment"] })
  }

  const alertOpen = (message: string) => {
    modal.open({
      type: "alert",
      content: message,
    })
    return
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 w-full">
      <div className="flex items-center gap-[9px] self-stretch bg-white px-[20px] py-[10px]">
        <div className="mt-5 h-12 w-12 overflow-hidden rounded-full">
          {userData?.profile_image_url ? (
            <Image
              src={userData?.profile_image_url!}
              width={50}
              height={50}
              className={"object-cover"}
              alt={"프로필이미지"}
            />
          ) : (
            <NoneProfile width={50} height={50} />
          )}
        </div>

        <form onSubmit={createComment} className={"w-full"}>
          <Input
            className={
              "flex h-[50px] items-center gap-[10px] rounded-[8px] p-[10px]"
            }
            placeholder="댓글을 입력해주세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            intent="primary"
            variant="rounded"
            size="sm"
            type="submit"
            hidden
          >
            댓글 등록
          </Button>
        </form>
      </div>
    </div>
  )
}

export default BottomBar
