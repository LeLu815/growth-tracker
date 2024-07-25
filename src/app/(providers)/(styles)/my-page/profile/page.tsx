"use client"

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useAuth } from "@/context/auth.context"
import { useModal } from "@/context/modal.context"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import {
  deleteImage,
  PROFILE,
  uploadImage,
} from "@/app/(providers)/_utils/imageUploadUtils"

function UserInfoPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const originProfileImageUrlRef = useRef<string | null>(null)

  const [nickname, setNickname] = useState("")
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const { me } = useAuth()
  const modal = useModal()
  /**
   * 유저 정보 조회
   * */
  const getUser = async () => {
    if (me) {
      const response = await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${me.id}`)
        .then((response) => response.data)

      if (response.data.error) {
        alertOpen(response.data.error)
        throw new Error(response.data.error)
      }

      return response.data
    }
  }

  /**
   * 유저 정보 수정
   * */
  const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    debugger
    let updateProfileImageUrl = originProfileImageUrlRef.current
    if (originProfileImageUrlRef.current !== profileImageUrl) {
      if (!deleteImage(originProfileImageUrlRef.current, PROFILE)) {
        alertOpen("기존이미지 삭제가 실패했습니다. 다시 시도해주세요.")
        throw new Error("기존이미지 삭제가 실패했습니다. 다시 시도해주세요.")
      }

      updateProfileImageUrl = selectedFile
        ? await uploadImage(PROFILE, selectedFile)
        : null
    }

    const response = await axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${me?.id}`,
        JSON.stringify({ profileImageUrl: updateProfileImageUrl, nickname }), // JSON 데이터
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => response.data)

    if (response.data.error) {
      alertOpen(response.data.error)
      throw new Error(response.data.error)
    }

    setSelectedFile(null)
    alertOpen("저장되었습니다.")
    refetch()
  }

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["user_profile"],
    queryFn: getUser,
  })

  useEffect(() => {
    setNickname(data?.nickname)
    setProfileImageUrl(data?.profile_image_url)

    originProfileImageUrlRef.current = data?.profile_image_url
  }, [data?.nickname, data?.profile_image_url])

  const alertOpen = (message: string) => {
    modal.open({
      type: "alert",
      content: message,
    })
    return
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    debugger
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImageUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error loading data</div>

  return (
    <div className="mt-1 flex items-start justify-center">
      <div className="w-96 bg-white p-6">
        <div className="flex flex-col items-center">
          <div className="flex h-48 w-48 items-center justify-center">
            <div className="relative h-48 w-48 border-2 border-solid">
              {profileImageUrl ? (
                <Image
                  src={profileImageUrl as string}
                  alt="Profile"
                  className="h-full w-full object-cover"
                  width={160}
                  height={160}
                  priority
                />
              ) : (
                <Image
                  src="/image/profile-Image.png"
                  alt="Profile"
                  className="h-full w-full object-cover"
                  width={160}
                  height={160}
                  priority
                />
              )}
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <button
            className="hover:bg-hover mt-1 h-8 w-48 rounded-md border-2 border-solid text-xs text-gray-600"
            onClick={() => fileInputRef.current?.click()}
          >
            프로필사진 변경
          </button>
          <button
            className="hover:bg-hover mt-1 h-8 w-48 rounded-md border-2 border-solid text-xs text-gray-600"
            onClick={() => {
              setProfileImageUrl(null)
              setSelectedFile(null)
            }}
          >
            기본이미지 적용
          </button>
        </div>
        <form className={"flex flex-col gap-4"} onSubmit={handleUpdateUser}>
          <div className="mx-auto mt-6 w-full max-w-[12rem] md:max-w-full">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                이메일
              </label>
              <input
                value={me?.email}
                disabled={true}
                type="text"
                id="email"
                className="box-border block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
            <label
              htmlFor="nickname"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              닉네임
            </label>
            <input
              value={nickname}
              type="text"
              onChange={(e) => setNickname(e.target.value)}
              id="nickname"
              className="box-border block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>
          <button type={"submit"}>저장</button>
        </form>
      </div>
    </div>
  )
}

export default UserInfoPage
