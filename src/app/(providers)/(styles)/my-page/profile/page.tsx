"use client"

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { useModal } from "@/context/modal.context"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import Button from "@/components/Button"
import NoneProfile from "@/components/Icon/NoneProfile"
import Input from "@/components/Input"
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

  const router = useRouter()

  /**
   * 유저 정보 조회
   * */
  const getUser = async () => {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${me?.id}`)
      .then((response) => response.data)

    if (response.data.error) {
      alertOpen(response.data.error)
      throw new Error(response.data.error)
    }

    return response.data
  }

  /**
   * 유저 정보 수정
   * */
  const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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
    router.push("/my-page")
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

  const alertOpen = (message: string) => {
    modal.open({
      type: "alert",
      content: message,
    })
    return
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    <div className="flex justify-center">
      <div>
        <div className="bg-white p-4">
          <div className="flex flex-col items-center">
            <div className="mb-3 h-48 w-48">
              {profileImageUrl ? (
                <Image
                  src={profileImageUrl as string}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                  width={192}
                  height={192}
                />
              ) : (
                <NoneProfile width={192} height={192}></NoneProfile>
              )}
            </div>
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
            <div className={"flex flex-col gap-2"}>
              <Button
                intent="secondary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                프로필사진 변경
              </Button>
              <Button
                intent="secondary"
                size="sm"
                onClick={() => {
                  setProfileImageUrl(null)
                  setSelectedFile(null)
                }}
              >
                기본이미지 적용
              </Button>
            </div>
          </div>
          <form className={"flex flex-col gap-4"} onSubmit={handleUpdateUser}>
            <div className="mt-6">
              <div className="mb-4">
                <Input
                  label={"이메일"}
                  placeholder={me?.email}
                  disabled={true}
                  type="text"
                  id="email"
                  className="box-border block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>
              <Input
                label={"닉네임"}
                value={nickname || ""}
                type="text"
                onChange={(e) => setNickname(e.target.value)}
                id="nickname"
                className="box-border block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
            <Button
              className={"mt-5"}
              intent="primary"
              variant="rounded"
              size="sm"
              type={"submit"}
            >
              저장
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserInfoPage
