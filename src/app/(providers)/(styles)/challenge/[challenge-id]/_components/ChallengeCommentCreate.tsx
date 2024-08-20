"use client"

import { ChangeEvent, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { useModal } from "@/context/modal.context"
import { useToast } from "@/context/toast.context"
import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import DefaultProfile from "@/components/Icon/DefaultProfile"
import SendIcon from "@/components/Icon/SendIcon"

import { ChallengeCommentType } from "../../../../../../../types/challengeDetail.type"

function ChallengeCommentCreate({
  challengeId,
  className,
  setNewCommentList,
  newCommentList,
}: {
  setNewCommentList: (newVar: (any | ChallengeCommentType)[]) => void
  newCommentList: ChallengeCommentType[]
  challengeId: string
  className: string
}) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { me, userData } = useAuth()
  const modal = useModal()
  const [content, setContent] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { showToast } = useToast()

  const handleCommentCreateToast = () => {
    showToast("댓글을 작성했습니다.", 3000, " bottom-12 mx-auto max-w-[350px]")
  }

  /**
   * 댓글 생성
   * */
  const createComment = async () => {
    if (!me) {
      router.push("/auth/login-email")
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

    const queryData: any = queryClient.getQueryData(["challengeComment"])

    if (queryData.pages[0].length === 0) {
      queryClient.invalidateQueries({ queryKey: ["challengeComment"] })
    } else {
      const newVar = [
        {
          ...response.data[0],
          ...{
            created_at: response.data[0].created_at.substring(0, 10),
            user_id: me.id,
            is_like: false,
            email: me.email,
            nickname: userData?.nickname,
            profile_image_url: userData?.profile_image_url,
          },
        },
        ...newCommentList,
      ]
      setNewCommentList(newVar)
    }
    handleCommentCreateToast()
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
    }, 200)
  }

  const handleOnChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newRows = e.target.value.split("\n").length
    if (textareaRef.current !== null) {
      textareaRef.current.rows = newRows
    }
    setContent(e.target.value)
  }

  return (
    <div
      className={`mx-auto min-w-[320px] max-w-[480px] sm:max-w-[480px] md:max-w-[768px] ${className}`}
    >
      <div className="flex gap-[9px] bg-white px-[20px] py-[10px] lg:px-0">
        <div className="relative h-[50px] w-[60px] overflow-hidden rounded-full">
          {userData?.profile_image_url ? (
            <Image
              fill
              className="object-cover"
              alt="프로필사진"
              src={userData.profile_image_url}
            />
          ) : (
            <DefaultProfile width={50} height={50} />
          )}
        </div>

        <form className="flex w-full items-center">
          <div className="flex flex-1 p-2">
            <textarea
              className={`w-full resize-none border-b border-[#141414] bg-transparent p-2 text-grey-200 outline-none lg:max-w-[335px]`}
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
              color={content ? "#FD8C98" : ""}
              className="relative h-[20px] w-[20px] cursor-pointer lg:right-3"
              onClick={createComment}
            />
          )}
        </form>
      </div>
    </div>
  )
}

export default ChallengeCommentCreate
