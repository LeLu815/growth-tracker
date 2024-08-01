"use client"

import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { createClient } from "@/supabase/client"
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import axios from "axios"
import { useInView } from "react-intersection-observer"

import { NoticePageType } from "../../../../../types/notice.type"

function Notice() {
  const queryClient = useQueryClient()

  const { me } = useAuth()
  const [isShowNotice, setIsShowNotice] = useState(false)
  const router = useRouter()

  const noticeRef = useRef<HTMLDivElement>(null)

  const getNoticeList = async ({
    pageParam,
  }: {
    pageParam: number
  }): Promise<NoticePageType> => {
    const response = await axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${me?.id}/notice?page=${pageParam}&limit=7`
      )
      .then((response) => response.data)

    return response.data
  }

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["noticeList"],
    initialPageParam: 0,
    enabled: !!me, // me가 있을 때만 쿼리 실행
    queryFn: getNoticeList,
    getNextPageParam: (
      lastPage: any,
      allPages,
      lastPageParam,
      allPageParams
    ) => {
      const nextPage = lastPageParam + 1
      return lastPage.length === 7 ? nextPage : undefined
    },
    select: ({ pages }) => pages.flat(),
  })

  const handleToggleNotice = () => {
    setIsShowNotice(!isShowNotice)
  }

  const handleMove = async ({
    challengeId,
    noticeId,
  }: {
    challengeId: string
    noticeId: number
  }) => {
    try {
      axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${me?.id}/notice/${noticeId}`
      )
    } catch (error) {
      console.error(error)
    } finally {
      setIsShowNotice(false)
      router.push(`/challenge/${challengeId}`)
    }
  }

  const deleteNotice = async (noticeId: number) => {
    debugger
    const response = await axios
      .delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${me?.id}/notice/${noticeId}`
      )
      .then((response) => response.data)

    if (response.error) {
      throw new Error(response.error)
    }
  }

  const { mutate: handleDeleteNoticeMutate } = useMutation({
    mutationFn: deleteNotice,
    onMutate: async (noticeId: number) => {
      await queryClient.cancelQueries({ queryKey: ["noticeList"] })
      const noticeList = queryClient.getQueryData(["noticeList"])

      queryClient.setQueryData(["noticeList"], (prev: NoticePageType) => {
        return {
          pageParams: [...prev.pageParams],
          pages: prev.pages.map((notices) => {
            return notices.filter((notice) => notice.id !== noticeId)
          }),
        }
      })
      return { noticeList }
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["noticeList"], context?.noticeList)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["noticeList"] })
    },
  })

  useEffect(() => {
    const usersNoticeChannel = createClient().channel("users_notice")

    usersNoticeChannel
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "users_notice",
          filter: `user_id=eq.${me?.id}`,
        },
        () => refetch()
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "users_notice",
          filter: `user_id=eq.${me?.id}`,
        },
        () => refetch()
      )
      .subscribe()
  }, [me?.id])

  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
  })

  const handleClickOutside = (event: MouseEvent) => {
    if (
      noticeRef.current &&
      !noticeRef.current.contains(event.target as Node)
    ) {
      setIsShowNotice(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={"fixed right-0 top-0"}>
      <div
        className={`fixed right-0 h-12 w-12 rounded-full bg-blue-500 ${isShowNotice ? "hidden" : ""}`}
        onClick={handleToggleNotice}
      ></div>

      <div
        className={
          "fixed right-0 top-0 max-h-[300px] w-[500px] overflow-y-auto rounded border-l-4 border-green-400 bg-white"
        }
      >
        <div
          className={`mb-4 p-4 ${isShowNotice ? "" : "hidden"}`}
          role="alert"
        >
          <span
            className="absolute bottom-0 right-0 top-0 px-4 py-3"
            onClick={handleToggleNotice}
          >
            <svg
              className="fixed right-3 h-6 w-6 cursor-pointer fill-current text-gray-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.586 7.066 4.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 12.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934z" />
            </svg>
          </span>
          <div className={"mt-6"} ref={noticeRef}>
            {data?.map((notice, idx) => {
              const isLastItem = data?.length - 1 === idx
              return (
                <div
                  key={notice.id}
                  className={`flex transform border-b-2 border-solid hover:cursor-pointer`}
                  ref={isLastItem ? ref : null}
                >
                  <div
                    onClick={() =>
                      handleMove({
                        challengeId: notice.challenge_id,
                        noticeId: notice.id,
                      })
                    }
                    className={`text-[14px] ${notice.is_view ? "text-gray-500" : "text-black-500"}`}
                  >
                    {notice.content}
                  </div>
                  <div
                    className={"w-4"}
                    onClick={() => handleDeleteNoticeMutate(notice.id)}
                  >
                    x
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notice
