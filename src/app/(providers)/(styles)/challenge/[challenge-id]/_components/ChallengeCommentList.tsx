"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { useModal } from "@/context/modal.context"
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import axios from "axios"
import { useInView } from "react-intersection-observer"

import EmptyHart from "@/components/Icon/EmptyHart"
import NoneProfile from "@/components/Icon/NoneProfile"
import RedHart from "@/components/Icon/RedHart"
import Input from "@/components/Input"

import {
  ChallengeCommentPageType,
  ChallengeCommentType,
} from "../../../../../../../types/challengeDetail.type"

function ChallengeCommentList({ challengeId }: { challengeId: string }) {
  const { me } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()

  const [updateContent, setUpdateContent] = useState("")
  const [isUpdate, setIsUpdate] = useState(false)
  const [updateCommentId, setUpdateCommentId] = useState("")
  const modal = useModal()

  /**
   * 유저정보, 댓글정보, 좋아요정보 조회
   * */
  const getChallengeCommentList = async ({
    pageParam,
  }: {
    pageParam: number
  }): Promise<ChallengeCommentType> => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/challenge/${challengeId}/comment?limit=3&page=${pageParam}&userId=${me ? me?.id : ""}`
    )

    return response.data
  }

  /**
   * 댓글 삭제
   * */
  const deleteComment = async (commentId: string) => {
    const response = await axios
      .delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/challenge/${challengeId}/comment/${commentId}`
      )
      .then((response) => response.data)
    if (response.error) {
      alertOpen("댓글 삭제에 실패했습니다.")
      throw new Error(response.error)
    }
    refetch()
  }

  /**
   * 댓글 수정
   * */
  const updateComment = async ({
    commentId,
    content,
  }: {
    commentId: string
    content: string
  }) => {
    const response = await axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/challenge/${challengeId}/comment/${commentId}`,
        JSON.stringify({ content: content }), // JSON 데이터
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => response.data)

    if (response.error) {
      alertOpen("댓글 수정에 실패했습니다.")
      throw new Error(response.error)
    }
  }

  /**
   * 댓글 좋아요
   * */
  const createOrDeleteCommentLike = async ({
    isLike,
    commentId,
  }: {
    isLike: boolean
    commentId: string
  }) => {
    const method = isLike ? "delete" : "post"
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/challenge/${challengeId}/comment/${commentId}/like?userId=${me?.id}`

    const config = { method, url }
    const response = await axios(config).then((response) => response.data)

    if (response.error) {
      throw new Error(response.error.message)
    }
  }

  const { mutate: handleCommentLikeMutate } = useMutation({
    mutationFn: createOrDeleteCommentLike,
    onMutate: async ({
      isLike,
      commentId,
    }: {
      isLike: boolean
      commentId: string
    }) => {
      await queryClient.cancelQueries({ queryKey: ["challengeComment"] })
      const commentList = queryClient.getQueryData(["challengeComment"])
      queryClient.setQueryData(
        ["challengeComment"],
        (prev: ChallengeCommentPageType) => {
          return {
            pageParams: [...prev.pageParams],
            pages: prev.pages.map((comments) => {
              return comments.map((comment) => {
                if (comment.id === commentId) {
                  comment.is_like = !comment.is_like
                }
                return comment
              })
            }),
          }
        }
      )
      return { commentList }
    },
    onError: (err, test, context) => {
      queryClient.setQueryData(["challengeComment"], context?.commentList)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["challengeComment"] })
    },
  })

  const { mutate: handleCommentDeleteMutate } = useMutation({
    mutationFn: deleteComment,
    onMutate: async (commentId: string) => {
      await queryClient.cancelQueries({ queryKey: ["challengeComment"] })
      const commentList = queryClient.getQueryData(["challengeComment"])

      queryClient.setQueryData(
        ["challengeComment"],
        (prev: ChallengeCommentPageType) => {
          return {
            pageParams: [...prev.pageParams],
            pages: prev.pages.map((comments) => {
              return comments.filter((comment) => comment.id !== commentId)
            }),
          }
        }
      )
      return { commentList }
    },
    onError: (err, _commentId, context) => {
      queryClient.setQueryData(["challengeComment"], context?.commentList)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["challengeComment"] })
    },
  })

  const { mutate: handleCommentMutate } = useMutation({
    mutationFn: updateComment,
    onMutate: async ({
      commentId,
      content,
    }: {
      commentId: string
      content: string
    }) => {
      await queryClient.cancelQueries({ queryKey: ["challengeComment"] })
      const commentList = queryClient.getQueryData(["challengeComment"])
      queryClient.setQueryData(
        ["challengeComment"],
        (prev: ChallengeCommentPageType) => {
          return {
            pageParams: [...prev.pageParams],
            pages: prev.pages.map((comments) => {
              return comments.map((comment) => {
                if (comment.id === commentId) {
                  comment.content = content
                }
                return comment
              })
            }),
          }
        }
      )
      setUpdateContent("")
      setIsUpdate(false)
      setUpdateCommentId("")
      return { commentList }
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["challengeComment"], context?.commentList)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["challengeComment"] })
    },
  })

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["challengeComment"],
    initialPageParam: 0,
    queryFn: getChallengeCommentList,
    getNextPageParam: (
      lastPage: any,
      allPages,
      lastPageParam,
      allPageParams
    ) => {
      const nextPage = lastPageParam + 1
      return lastPage.length === 3 ? nextPage : undefined
    },
    select: ({ pages }) => pages.flat(),
  })

  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
  })

  const alertOpen = (message: string) => {
    modal.open({
      type: "alert",
      content: message,
    })
    return
  }

  return (
    <div className={"flex w-full flex-col items-center gap-4"}>
      {data?.map((comment, idx) => {
        const isLastItem = data?.length - 1 === idx
        return (
          <div
            className={
              "mt-2 flex w-full gap-[8px] rounded-lg border p-4 shadow-md"
            }
            key={comment.id}
            ref={isLastItem ? ref : null}
          >
            <div>
              {comment.profile_image_url ? (
                <div className="relative h-[50px] w-[50px] overflow-hidden rounded-full">
                  <Image
                    fill
                    className="object-cover"
                    alt="프로필사진"
                    src={
                      comment.profile_image_url
                        ? comment.profile_image_url
                        : "/image/profileImage.png"
                    }
                  />
                </div>
              ) : (
                <NoneProfile width={50} height={50} />
              )}
            </div>
            <div className={"flex w-full flex-col gap-[6px]"}>
              <div className={"pt-2 text-[#717171]"}>{comment.nickname}</div>

              {isUpdate && comment.id === updateCommentId ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleCommentMutate({
                      commentId: comment.id,
                      content: updateContent,
                    })
                  }}
                >
                  <Input
                    className={"border-[1px] border-solid border-[]"}
                    value={updateContent}
                    onChange={(e) => setUpdateContent(e.target.value)}
                  />
                </form>
              ) : (
                <div>{comment.content}</div>
              )}
              <div
                onClick={() =>
                  me
                    ? handleCommentLikeMutate({
                        isLike: comment.is_like,
                        commentId: comment.id,
                      })
                    : router.push("/")
                }
              >
                {comment.is_like ? (
                  <RedHart width={20} height={20} />
                ) : (
                  <EmptyHart width={20} height={20} color={"#D9D9D9"} />
                )}
              </div>
            </div>

            {comment.user_id === me?.id && (
              <div className={"flex w-[100px] justify-end gap-4"}>
                {isUpdate && comment.id === updateCommentId ? (
                  <div className={"flex items-start gap-2"}>
                    <button
                      type="submit"
                      className="font-suite cursor-pointer text-center text-[12px] font-medium leading-[135%] text-[#969696]"
                      onClick={() => {
                        handleCommentMutate({
                          commentId: comment.id,
                          content: updateContent,
                        })
                      }}
                    >
                      수정완료
                    </button>
                    <button
                      className="font-suite cursor-pointer text-center text-[12px] font-medium leading-[135%] text-[#969696]"
                      onClick={() => {
                        setUpdateContent("")
                        setIsUpdate(false)
                        setUpdateCommentId("")
                      }}
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <div className={"flex w-[100px] items-start gap-2"}>
                    <button
                      className="font-suite cursor-pointer text-center text-[12px] font-medium leading-[135%] text-[#969696]"
                      onClick={() => {
                        setUpdateContent(comment.content)
                        setIsUpdate(true)
                        setUpdateCommentId(comment.id)
                      }}
                    >
                      수정
                    </button>
                    <button
                      className="font-suite cursor-pointer text-center text-[12px] font-medium leading-[135%] text-[#969696]"
                      onClick={() => handleCommentDeleteMutate(comment.id)}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ChallengeCommentList
