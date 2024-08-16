import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth.context"
import { useModal } from "@/context/modal.context"
import { useToast } from "@/context/toast.context"
import useChallengeDetailStore from "@/store/challengeDetail.store"
import { useQueryClient } from "@tanstack/react-query"
import { Dropdown, MenuProps, Space } from "antd"
import axios from "axios"

import ArrowLeftIcon from "@/components/Icon/ArrowLeftIcon"
import KebabMenuIcon from "@/components/Icon/KebabMenuIcon"
import DefaultHeader from "@/app/(providers)/_components/Header/DefaultHeader"

function DetailHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMe, setIsMe] = useState(false)
  const router = useRouter()
  const modal = useModal()
  const { showToast } = useToast()
  const { open } = useModal()
  const { me } = useAuth()
  const queryClient = useQueryClient()

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 230)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const challengeDetail = useChallengeDetailStore(
    (state) => state.challengeDetail
  )

  const handleDeleteChallengeToast = () => {
    showToast("챌린지가 삭제되었습니다.", 3000, "bottom-20 max-w-[640px]")
  }

  const handleMoveChallenge = () => {
    if (
      challengeDetail?.state !== "on_progress" &&
      challengeDetail?.state !== "not_started"
    ) {
      open({
        type: "alert",
        content: "완료된 챌린지는 수정할 수 없습니다.",
      })

      return
    }
    router.push(`/challenge/${challengeDetail.id}/update`)
  }

  const confirmOpen = (message: string, ocConfirm: () => void) => {
    modal.open({
      type: "confirm",
      content: message,
      onConfirm: ocConfirm,
    })
  }

  const handleDeleteChallenge = async () => {
    const response = await axios
      .delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/challenge/${challengeDetail.id}`
      )
      .then((response) => response.data)

    queryClient.invalidateQueries({ queryKey: ["posts"] })
    router.push("/newsfeed")
    handleDeleteChallengeToast()
  }

  const menuList: MenuProps["items"] = [
    {
      key: "1",
      label: <div onClick={handleMoveChallenge}>수정하기</div>,
    },
    {
      key: "2",
      label: (
        <div
          onClick={() =>
            confirmOpen(
              `삭제한 챌린지는 복구할 수 없어요. 삭제하시겠어요?`,
              handleDeleteChallenge
            )
          }
        >
          삭제하기
        </div>
      ),
    },
  ]
  useEffect(() => {
    setIsMe(me?.id === challengeDetail.userId)
  }, [me && challengeDetail])

  return (
    <DefaultHeader
      className={`!fixed ${isScrolled ? "bg-white" : "bg-transparent"}`}
    >
      <div className="flex w-full items-center">
        <button className="flex items-center p-2">
          <ArrowLeftIcon onClick={() => router.back()} />
        </button>
        <div className="flex-1 text-center"></div>
        <div></div>
        {isMe && (
          <div className="right-0">
            <Space direction="vertical">
              <Dropdown menu={{ items: menuList }} placement="bottomRight">
                <KebabMenuIcon
                  className={"cursor-pointer"}
                  width={30}
                  height={40}
                ></KebabMenuIcon>
              </Dropdown>
            </Space>
          </div>
        )}
      </div>
    </DefaultHeader>
  )
}

export default DetailHeader
