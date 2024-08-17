"use client"

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { useModal } from "@/context/modal.context"
import { useToast } from "@/context/toast.context"
import useGraphSliceCountStore from "@/store/graphSliceCount.store"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useMediaQuery } from "react-responsive"

import Box from "@/components/Box"
import Button from "@/components/Button"
import Camera from "@/components/Icon/Camera"
import NoneProfile from "@/components/Icon/NoneProfile"
import Input from "@/components/Input"
import Loading from "@/components/Loading"
import {
  deleteImage,
  PROFILE,
  uploadImage,
} from "@/app/(providers)/_utils/imageUploadUtils"
import { MY_PAGE } from "@/app/(providers)/(styles)/my-page/_constants/myPageConstants"

function UserInfoPage() {
  const isLargeScreen = useMediaQuery({ minWidth: 1024 }) // lg 사이즈 이상일 때 true
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const originProfileImageUrlRef = useRef<string | null>(null)

  const [nickname, setNickname] = useState("")
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const { me } = useAuth()
  const modal = useModal()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isResponsive = searchParams.get("isResponsive") || false

  const { showToast } = useToast()

  const setCurrentCount = useGraphSliceCountStore(
    (state) => state.setCurrentCount
  )

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
    refetch()
    showToast("수정되었습니다.")
    router.push(MY_PAGE.path)
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

  useEffect(() => {
    if (!isLargeScreen && isResponsive) {
      router.push("/my-page")
    }
  }, [isLargeScreen])

  useEffect(() => {
    setCurrentCount(0)
  }, [])

  if (isPending) return <Loading />
  if (isError) return <div>Error loading data</div>

  return (
    <Box className="flex justify-center">
      <div className={"w-full"}>
        <div className="flex flex-col items-center">
          {profileImageUrl ? (
            <Image
              src={profileImageUrl as string}
              alt="Profile"
              className="h-[100px] w-[100px] rounded-full object-cover"
              width={100}
              height={100}
            />
          ) : (
            <NoneProfile width={100} height={100}></NoneProfile>
          )}
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <div className={"flex flex-col items-center gap-2"}>
            <div
              className={
                "cursor-pointer rounded-[20px] border-[1px] border-solid border-grey-800 p-[8px_10px]"
              }
              onClick={() => fileInputRef.current?.click()}
            >
              <div className={"flex items-center gap-[4px]"}>
                <Camera className={"h-[24px] w-[24px]"}></Camera>{" "}
                <div>사진 변경</div>
              </div>
            </div>
            <div
              className={"cursor-pointer text-body-s text-grey-400"}
              onClick={() => {
                setProfileImageUrl(null)
                setSelectedFile(null)
              }}
            >
              현재 사진 삭제
            </div>
          </div>
        </div>
        <hr className={"mt-5"} />
        <form
          className={"mx-auto flex max-w-[640px] flex-col gap-4"}
          onSubmit={handleUpdateUser}
        >
          <div className="mt-2 text-lg lg:hidden">회원정보</div>
          <div className="mt-6">
            <div className="mb-4">
              <Input
                variant="login"
                label={"이메일"}
                value={me?.email}
                disabled={true}
                type="text"
                id="email"
                className="border-grey-600 text-sm text-grey-600"
              />
            </div>
            <Input
              variant="login"
              label={"닉네임"}
              value={nickname || ""}
              type="text"
              onChange={(e) => setNickname(e.target.value)}
              id="nickname"
              className={`border-blue-400 text-sm focus:border-blue-400`}
            />
          </div>
          <Button className={"mt-5"} intent="primary" size="lg" type={"submit"}>
            수정 완료
          </Button>
        </form>
      </div>
    </Box>
  )
}

export default UserInfoPage
