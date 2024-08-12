"use client"

import { ChangeEvent, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { useModal } from "@/context/modal.context"
import { useToast } from "@/context/toast.context"
import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import NoneProfile from "@/components/Icon/NoneProfile"
import SendIcon from "@/components/Icon/SendIcon"

function ChallengeCommentCreate({ challengeId }: { challengeId: string }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { me, userData } = useAuth()
  const modal = useModal()
  const [content, setContent] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { showToast } = useToast()

  const handleCommentCreateToast = () => {
    showToast("댓글을 작성했습니다.", 3000, "bottom-20 max-w-[640px]")
  }

  /**
   * 댓글 생성
   * */
  const createComment = async () => {
    if (!me) {
      router.push("/")
      return
    } else if (!content.trim()) {
      alertOpen("댓글 내용을 입력해주세요.")
      return
    }

    setContent("")
    textareaRef.current!.rows = 1

    const response = await axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/challenge/${challengeId}/comment`,
        JSON.stringify({
          content,
          userId: me?.id,
          rows: content.split("\n").length,
        }), // JSON 데이터
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
    handleCommentCreateToast()
    queryClient.invalidateQueries({ queryKey: ["challengeComment"] })
  }

  const alertOpen = (message: string) => {
    modal.open({
      type: "alert",
      content: message,
    })
    return
  }

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false)
    }, 100)
  }

  const handleOnChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newRows = e.target.value.split("\n").length
    if (textareaRef.current !== null) {
      textareaRef.current.rows = newRows
    }
    setContent(e.target.value)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-[640px]">
      <div className="flex gap-[9px] bg-white px-[20px] py-[10px]">
        <div className="relative h-[50px] w-[60px] overflow-hidden rounded-full">
          {userData?.profile_image_url ? (
            <Image
              fill
              className="object-cover"
              alt="프로필사진"
              src={userData.profile_image_url}
            />
          ) : (
            <NoneProfile width={50} height={50} />
          )}
        </div>

        <form className="flex w-full items-center">
          <div className="flex flex-1 p-2">
            <textarea
              className={`border-red-[#ADADAD] w-full resize-none border-b border-l-0 border-r-0 border-t-0 border-[#141414] bg-white p-2 text-gray-700 outline-none`}
              placeholder="댓글을 입력해주세요..."
              value={content}
              ref={textareaRef}
              rows={1}
              onFocus={() => setIsFocused(true)}
              onBlur={handleBlur}
              onChange={handleOnChangeTextarea}
            />
          </div>
          {isFocused && (
            <SendIcon
              width={30}
              height={30}
              color={content ? "#FD8C98" : ""}
              className="cursor-pointer"
              onClick={createComment}
            />
          )}
        </form>
      </div>
    </div>
  )
}

export default ChallengeCommentCreate
