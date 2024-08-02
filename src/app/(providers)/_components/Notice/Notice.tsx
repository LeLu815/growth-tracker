"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { createClient } from "@/supabase/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Badge, Drawer, Space } from "antd"
import axios from "axios"

import { NoticeListType, NoticeType } from "../../../../../types/notice.type"

function Notice() {
  const queryClient = useQueryClient()
  const { me } = useAuth()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(0)
  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const getNoticeList = async (): Promise<NoticeListType> => {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${me?.id}/notice`)
      .then((response) => response.data)

    const filter = response.data.filter((item: NoticeType) => !item.is_view)
    debugger
    setCount(filter.length)
    return response.data
  }

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["noticeList"],
    queryFn: getNoticeList,
    enabled: !!me,
  })

  const handleMove = async ({
    challengeId,
    noticeId,
    isView,
  }: {
    challengeId: string
    noticeId: number
    isView: boolean
  }) => {
    try {
      if (!isView) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${me?.id}/notice/${noticeId}`
        )
      }
    } catch (error) {
      console.error(error)
    } finally {
      setCount(count - 1)
      setOpen(false)
      router.push(`/challenge/${challengeId}`)
    }
  }

  const deleteNotice = async (noticeId: number) => {
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
      debugger
      await queryClient.cancelQueries({ queryKey: ["noticeList"] })
      const noticeList = queryClient.getQueryData(["noticeList"])

      queryClient.setQueryData(["noticeList"], (prev: NoticeListType) => {
        return prev.filter((notice) => notice.id !== noticeId)
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
    const usersNoticeChannel = createClient().channel("notice")

    usersNoticeChannel
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notice",
          filter: `user_id=eq.${me?.id}`,
        },
        () => refetch()
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "notice",
          filter: `user_id=eq.${me?.id}`,
        },
        () => refetch()
      )
      .subscribe()
  }, [me?.id])

  return (
    <div className={"fixed right-0 top-0"}>
      <Image
        src={"/icon/bell.svg"}
        width={40}
        height={40}
        alt="알림"
        className={`fixed right-1 top-1 rounded-full border-[1px] border-solid bg-white`}
        onClick={showDrawer}
      ></Image>
      {count > 0 && (
        <Space>
          <Badge count={count} />
        </Space>
      )}
      <Drawer title="알림" onClose={onClose} open={open}>
        <div className={"flex flex-col gap-4"}>
          {data?.map((notice, idx) => {
            return (
              <div
                key={notice.id}
                className={
                  "flex w-full transform flex-col rounded-lg border shadow-md hover:cursor-pointer"
                }
              >
                {notice.is_view || (
                  <Space>
                    <Badge count={"new"} />
                  </Space>
                )}

                <div
                  className={"absolute right-0 w-[20px] text-[15px]"}
                  onClick={() => handleDeleteNoticeMutate(notice.id)}
                >
                  {" "}
                  X
                </div>
                <div
                  onClick={() =>
                    handleMove({
                      challengeId: notice.challenge_id as string,
                      noticeId: notice.id,
                      isView: notice.is_view,
                    })
                  }
                  className={`w-[300px] p-4 text-[14px] ${notice.is_view ? "text-gray-500" : "text-black-500"}`}
                >
                  {notice.content}
                </div>
              </div>
            )
          })}
        </div>
      </Drawer>
    </div>
  )
}

export default Notice
