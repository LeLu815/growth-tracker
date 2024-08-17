"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { createClient } from "@/supabase/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Avatar, Badge, Drawer, Space } from "antd"
import axios from "axios"
import { debounce } from "lodash"

import AlarmIcon from "@/components/Icon/AlarmIcon"
import ArrowLeftIcon from "@/components/Icon/ArrowLeftIcon"

import { NoticeListType, NoticeType } from "../../../../../types/notice.type"

function Notice() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const queryClient = useQueryClient()
  const { me } = useAuth()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(0)
  const showDrawer = () => {
    setOpen(true)
  }

  const handleResize = debounce(() => {
    setScreenWidth(window.innerWidth)
  }, 200)

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      // cleanup
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const onClose = () => {
    setOpen(false)
  }

  const getNoticeList = async (): Promise<NoticeListType> => {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${me?.id}/notice`)
      .then((response) => response.data)

    const filter = response.data.filter((item: NoticeType) => !item.is_view)

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
    <div className="relative right-[20px] top-2 cursor-pointer">
      <div onClick={showDrawer}>
        <Badge count={count}>
          <Avatar
            className={"bg-white"}
            shape="square"
            icon={
              <AlarmIcon
                width={16}
                height={16}
                className={"absolute right-0 top-[2px]"}
              />
            }
          />
        </Badge>
      </div>

      <Drawer
        className="text-center text-title-s"
        title="알림"
        onClose={onClose}
        open={open}
        // contentWrapperStyle={{
        //   width: "100%",
        //   maxWidth: "100%",
        // }}
        // width="378"
        width={screenWidth >= 1024 ? "378" : "100%"}
        closeIcon={<ArrowLeftIcon width={24} height={24} />}
        style={{ fontFamily: "SUITE", borderBottom: "none" }}
      >
        <div
          className={
            "fontFamily-suite relative flex w-full flex-col gap-4 lg:w-[378px]"
          }
        >
          {data?.map((notice, idx) => {
            return (
              <div
                key={notice.id}
                className={
                  "flex w-full transform flex-col rounded-lg border border-grey-800 p-[16px] text-left text-title-xs shadow-2 hover:cursor-pointer"
                }
              >
                {notice.is_view || (
                  <Space className="mb-[4px] flex justify-end">
                    <Badge
                      count={"new"}
                      color="#FC5A6B"
                      style={{
                        padding: "4px 8px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      // className="border-2 border-black bg-primary"
                    />
                  </Space>
                )}

                {/* 알림 리스트 삭제 */}
                {/* <div
                  className={"absolute right-[20px] w-[20px] text-[15px]"}
                  onClick={() => handleDeleteNoticeMutate(notice.id)}
                >
                  {" "}
                  X
                </div> */}
                <div
                  onClick={() =>
                    handleMove({
                      challengeId: notice.challenge_id as string,
                      noticeId: notice.id,
                      isView: notice.is_view,
                    })
                  }
                  className={`w-full text-[14px] ${notice.is_view ? "text-gray-500" : "text-black-500"}`}
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
