"use client"

import { ChangeEvent, useEffect, useRef, useState } from "react"
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

import NoneProfile from "@/components/Icon/NoneProfile"
import ThumbsUpIcon from "@/components/Icon/ThumbsUpIcon"
import ChallengeCommentCreate from "@/app/(providers)/(styles)/challenge/[challenge-id]/_components/ChallengeCommentCreate"

import {
  ChallengeCommentPageType,
  ChallengeCommentType,
} from "../../../../../../../types/challengeDetail.type"

interface ChallengeCommentListProps {
  challengeId: string
  className: string | null
}

function ChallengeCommentList({
  challengeId,
  className = "",
}: ChallengeCommentListProps) {
  const { me } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()

  const [updateContent, setUpdateContent] = useState("")
  const [isUpdate, setIsUpdate] = useState(false)
  const [updateCommentId, setUpdateCommentId] = useState("")
  const modal = useModal()

  const textareaRefs = useRef<HTMLTextAreaElement[]>([])
  const [sortField, setSortField] = useState("")

  /**
   * 유저정보, 댓글정보, 좋아요정보 조회
   * */
  const getChallengeCommentList = async ({
    pageParam,
  }: {
    pageParam: number
  }): Promise<ChallengeCommentType> => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/challenge/${challengeId}/comment?limit=20&page=${pageParam}&userId=${me ? me?.id : ""}&sortField=${sortField}`
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
        JSON.stringify({ content: content, rows: content.split("\n").length }), // JSON 데이터
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
                  comment.like_cnt = comment.is_like
                    ? comment.like_cnt + 1
                    : comment.like_cnt - 1
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
      return lastPage.length === 20 ? nextPage : undefined
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

  const confirmOpen = (message: string, ocConfirm: () => void) => {
    modal.open({
      type: "confirm",
      content: message,
      onConfirm: ocConfirm,
    })
  }

  const handleOnChangeTextarea = (
    e: ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const newRows = e.target.value.split("\n").length
    if (textareaRefs) {
      textareaRefs.current![index].rows = newRows
    }

    setUpdateContent(e.target.value)
  }

  const handleChangeIsUpdate = (comment: ChallengeCommentType) => {
    if (isUpdate) {
      setUpdateContent("")
      setIsUpdate(false)
      setUpdateCommentId("")
    } else {
      setUpdateContent(comment.content)
      setIsUpdate(true)
      setUpdateCommentId(comment.id)
    }
  }

  useEffect(() => {
    if (me?.id) {
      refetch()
    }
  }, [me?.id && !isPending])

  useEffect(() => {
    if (sortField) {
      refetch()
    }
  }, [sortField])

  const handleChangeSortField = (sortField: string) => {
    setSortField((sorted) => (sorted = sortField))
  }

  if (isPending) return <div />
  if (isError) return <div>Error loading data</div>

  return (
    <div
      className={`flex w-full flex-col items-center gap-[14p] mb-20 overflow-hidden px-[20px] ${className}`}
    >
      <div className="flex w-full justify-between border-b-[1px] p-[20px] lg:border-t-2 lg:border-solid lg:border-grey-800 lg:bg-grey-900 lg:px-[40px] lg:py-[12px]">
        <div className={"text-body-xxs text-grey-50 lg:text-body-xs"}>
          댓글 {data?.[0] ? data?.[0].total_count : 0}
        </div>
        <div className={"flex cursor-pointer gap-3"}>
          <div
            onClick={() => handleChangeSortField("like_cnt")}
            className={`text-[14px] ${sortField === "like_cnt" || !sortField ? "font-bold text-black" : "font-medium text-[#474747]"} lg:text-[12px]`}
          >
            인기순
          </div>
          <div
            onClick={() => handleChangeSortField("created_at")}
            className={`text-[14px] ${sortField === "created_at" ? "font-bold text-black" : "font-medium text-[#474747]"} lg:text-[12px]`}
          >
            최신순
          </div>
        </div>
      </div>
      <ChallengeCommentCreate
        challengeId={challengeId}
        className="hidden w-full lg:block lg:mb-4"
      />
      {data?.length === 0 ? (
        <div className={"text-gray-custom p-24 text-center text-body-m"}>
          아직 댓글이 없어요.
          <br />
          댓글을 제일 먼저 남겨보세요.
        </div>
      ) : (
        <div
          className={
            "flex w-full flex-col lg:gap-[8px] lg:overflow-y-auto lg:custom-scrollbar"
          }
        >
          {data?.map((comment, idx) => {
            const isLastItem = data?.length - 1 === idx
            return (
              <div
                className={"mt-2 flex w-full gap-[8px] rounded-lg border p-4"}
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
                  <div>
                    <div className={"flex justify-between"}>
                      <div className={"text-sub-m font-bold text-grey-400"}>
                        {comment.nickname}
                      </div>
                      {comment.user_id === me?.id && (
                        <div className={"flex gap-2"}>
                          <button
                            type="submit"
                            className="cursor-pointer text-center text-body-s text-[#969696]"
                            onClick={() => {
                              isUpdate && comment.id === updateCommentId
                                ? handleCommentMutate({
                                    commentId: comment.id,
                                    content: updateContent,
                                  })
                                : handleChangeIsUpdate(comment)
                            }}
                          >
                            {isUpdate && comment.id === updateCommentId
                              ? "수정완료"
                              : "수정"}
                          </button>
                          <button
                            className="cursor-pointer text-center text-body-s text-[#969696]"
                            onClick={() => {
                              isUpdate && comment.id === updateCommentId
                                ? handleChangeIsUpdate(comment)
                                : confirmOpen("댓글을 삭제하겠습니까?", () =>
                                    handleCommentDeleteMutate(comment.id)
                                  )
                            }}
                          >
                            {isUpdate && comment.id === updateCommentId
                              ? "취소"
                              : "삭제"}
                          </button>
                        </div>
                      )}
                    </div>
                    <div className={"text-sub-m text-grey-400"}>
                      {comment.created_at}
                    </div>
                  </div>
                  {
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        handleCommentMutate({
                          commentId: comment.id,
                          content: updateContent,
                        })
                      }}
                    >
                      <textarea
                        style={{ overflow: "hidden" }}
                        rows={comment.rows}
                        disabled={!isUpdate}
                        className={`h-full w-full resize-none text-black focus:outline-none disabled:text-black ${
                          isUpdate && comment.id === updateCommentId
                            ? `border-b border-l-0 border-r-0 border-t-0 border-[#141414] bg-white p-2`
                            : "border-none bg-transparent"
                        }`}
                        value={`${isUpdate && comment.id === updateCommentId ? updateContent : comment.content}`}
                        ref={(el) => {
                          if (el) {
                            textareaRefs.current[idx] = el
                          }
                          return // Ensure the callback returns void
                        }}
                        onChange={(e) => handleOnChangeTextarea(e, idx)}
                      />
                    </form>
                  }
                  <div
                    className={"flex gap-1"}
                    onClick={() =>
                      me
                        ? handleCommentLikeMutate({
                            isLike: comment.is_like,
                            commentId: comment.id,
                          })
                        : router.push("/")
                    }
                  >
                    <div>
                      <ThumbsUpIcon
                        className={"h-[20px] w-[20px]"}
                        stroke={`${comment.is_like ? "#FC5A6B" : ""}`}
                      />
                    </div>
                    <div
                      className={
                        "pt-[2px] text-body-l leading-none text-gray-600"
                      }
                    >
                      {comment.like_cnt}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ChallengeCommentList
