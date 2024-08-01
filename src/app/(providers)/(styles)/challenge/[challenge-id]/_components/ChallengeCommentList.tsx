"use client"

import { FormEvent, useState } from "react"
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

import {
  ChallengeCommentPageType,
  ChallengeCommentType,
} from "../../../../../../../types/challengeDetail.type"

function ChallengeCommentList({ challengeId }: { challengeId: string }) {
  const { me } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [content, setContent] = useState("")
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
    setContent("")
    refetch()
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
      alertOpen("댓글 작성에 실패했습니다.")
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
    enabled: !!me, // me가 있을 때만 쿼리 실행
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
      <div className="mx-auto mt-10 w-full rounded-lg border p-4">
        <form onSubmit={createComment}>
          <textarea
            className="w-full resize-none rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="댓글을 입력하세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-[#FFAB81] px-4 py-2 text-white hover:bg-[#FF7D3D]"
            >
              댓글 등록
            </button>
          </div>
        </form>
      </div>
      {data?.map((comment, idx) => {
        const isLastItem = data?.length - 1 === idx
        return (
          <div
            className={
              "mt-2 flex w-full flex-col gap-4 rounded-lg border p-4 shadow-md"
            }
            key={comment.id}
            ref={isLastItem ? ref : null}
          >
            <div className={"flex gap-2"}>
              <Image
                width={25}
                height={25}
                className={"rounded-full"}
                alt={"프로필사진"}
                src={
                  comment.profile_image_url
                    ? comment.profile_image_url
                    : "/image/profileImage.png"
                }
              ></Image>
              <div className={"pt-2"}>{comment.nickname}님</div>
            </div>
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
                <input
                  className={"border-[1px] border-solid"}
                  value={updateContent}
                  onChange={(e) => setUpdateContent(e.target.value)}
                />
              </form>
            ) : (
              <div>{comment.content}</div>
            )}

            <div className={"flex gap-2"}>
              종아요{" "}
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
                {comment.is_like ? <p>❤️</p> : <p>🤍</p>}{" "}
              </div>
            </div>
            {comment.user_id === me?.id && (
              <div className={"flex gap-4"}>
                {isUpdate && comment.id === updateCommentId ? (
                  <>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleCommentMutate({
                          commentId: comment.id,
                          content: updateContent,
                        })
                      }}
                      className="cursor-pointer rounded-lg bg-[#FFAB81] px-4 py-2 text-white hover:bg-[#FF7D3D]"
                    >
                      수정완료
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        setUpdateContent("")
                        setIsUpdate(false)
                        setUpdateCommentId("")
                      }}
                      className="cursor-pointer rounded-lg border bg-white px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        setUpdateContent(comment.content)
                        setIsUpdate(true)
                        setUpdateCommentId(comment.id)
                      }}
                      className="cursor-pointer rounded-lg bg-[#FFAB81] px-4 py-2 text-white hover:bg-[#FF7D3D]"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleCommentDeleteMutate(comment.id)}
                      className="cursor-pointer rounded-lg border bg-white px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      삭제
                    </button>
                  </>
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
