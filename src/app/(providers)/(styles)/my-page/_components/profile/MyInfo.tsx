"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useAuth } from "@/context/auth.context"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import DefaultProfile from "@/components/Icon/DefaultProfile"

function MyInfo() {
  const originProfileImageUrlRef = useRef<string | null>(null)
  const { me } = useAuth()

  /**
   * 유저 정보 조회
   * */
  const getUser = async () => {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${me?.id}`)
      .then((response) => response.data)

    if (response.data.error) {
      throw new Error(response.data.error)
    }

    return response.data
  }

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUser,
    enabled: !!me, // me가 있을 때만 쿼리 실행
  })
  const [nickname, setNickname] = useState("")
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  useEffect(() => {
    setNickname(data?.nickname)
    setProfileImageUrl(data?.profile_image_url)

    originProfileImageUrlRef.current = data?.profile_image_url
  }, [data?.nickname, data?.profile_image_url])

  if (isPending) return <div></div>
  if (isError) return <div>Error loading data</div>

  return (
    <div className="flex justify-start gap-[24px] border-b border-solid border-grey-800 pb-2 pl-10">
      {profileImageUrl ? (
        <Image
          src={profileImageUrl as string}
          alt="MyPageMain"
          className="h-[60px] w-[60px] rounded-full object-cover"
          width={60}
          height={60}
        />
      ) : (
        <DefaultProfile width={60} height={60}></DefaultProfile>
      )}
      <div>
        <div className="mb-1 text-lg font-bold">{nickname || ""}</div>
        <div className="mb-4 text-body-xs text-grey-500">{me?.email}</div>
      </div>
    </div>
  )
}

export default MyInfo
