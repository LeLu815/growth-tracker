"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/context/auth.context"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import NoneProfile from "@/components/Icon/NoneProfile"
import Page from "@/components/Page"

function UserInfoPage() {
  const originProfileImageUrlRef = useRef<string | null>(null)

  const [nickname, setNickname] = useState("")
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)

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

  useEffect(() => {
    setNickname(data?.nickname)
    setProfileImageUrl(data?.profile_image_url)

    originProfileImageUrlRef.current = data?.profile_image_url
  }, [data?.nickname, data?.profile_image_url])

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error loading data</div>

  return (
    <div className="w-full">
      <div className="bg-orange-400 p-4">
        <div className="mb-2 text-lg text-black">마이페이지</div>
      </div>
      <div className="flex h-[100px] justify-center bg-orange-400">
        <div className="absolute top-[100px] h-[130px] w-[130px]">
          {profileImageUrl ? (
            <Image
              src={profileImageUrl as string}
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
              width={130}
              height={130}
            />
          ) : (
            <NoneProfile width={130} height={130}></NoneProfile>
          )}
        </div>
      </div>
      <Page>
        <div className="mt-[80px] text-center">
          <div className="mb-1 text-lg text-black">{nickname || ""}</div>
          <div className="mb-4 text-gray-500">{me?.email}</div>
        </div>
        <div className="px-8 pb-4">
          <div className="mb-2 text-sm text-orange-400">정보</div>
          <div className="mb-4 rounded-lg border border-solid border-gray-200 bg-white">
            <Link
              href="/my-page/profile"
              className="block px-4 py-8 text-gray-600 hover:bg-gray-100"
            >
              회원정보수정
              <span className="float-right">&gt;</span>
            </Link>
          </div>
          <div className="mb-2 text-sm text-orange-400">챌린지</div>
          <div className="rounded-lg border border-solid border-gray-200 bg-white">
            <Link
              href="/my-page/challenge"
              className="block border-b border-solid border-gray-200 px-4 py-8 text-gray-600 hover:bg-gray-100"
            >
              내 챌린지
              <span className="float-right">&gt;</span>
            </Link>
            <Link
              href="/my-page/challenge/like"
              className="block border-b border-solid border-gray-200 px-4 py-8 text-gray-600 hover:bg-gray-100"
            >
              좋아요 챌린지
              <span className="float-right">&gt;</span>
            </Link>
            <Link
              href="#"
              className="block border-b border-solid border-gray-200 px-4 py-8 text-gray-600 hover:bg-gray-100"
            >
              임시보관 챌린지 (준비중)
              <span className="float-right">&gt;</span>
            </Link>
          </div>
        </div>
      </Page>
    </div>
  )
}

export default UserInfoPage
