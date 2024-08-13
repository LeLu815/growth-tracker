"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import useChallengeCreateStore from "@/store/challengeCreate.store"
import { createClient } from "@/supabase/client"

import Box from "@/components/Box"
import Button from "@/components/Button"
import ResetIcon from "@/components/Icon/ResetIcon"
import Input from "@/components/Input"
import Page from "@/components/Page"

import ChallengePageTitle from "../ChallengePageTitle"
import SubTitle from "../styles/SubTitle"

interface ChallengeNameProps {
  title: string
  challenge_title?: string
  handleChangeStep: (step: number) => void
}

function ChallengeName({
  title,
  handleChangeStep,
  challenge_title = "",
}: ChallengeNameProps) {
  const [inputValue, setInputValue] = useState<string>(challenge_title)
  const { setGoal, setRandomImgUrl, randomImgUrl } = useChallengeCreateStore()

  const supabase = createClient()
  const [imgs, setImgs] = useState<string[]>([])
  const [selectedRandomUrl, setSelectedRandomUrl] = useState<string>(
    randomImgUrl || imgs[0]
  )
  console.log("randomImgUrl :", randomImgUrl)
  useEffect(() => {
    ;(async () => {
      const { data: imgDatas, error } = await supabase.storage
        .from("challenge_img")
        .list("")
      // 에러
      if (error) {
        console.error(error)
        return
      }
      // 파일 목록이 있는지 확인
      if (imgDatas && imgDatas.length > 0) {
        // 각 파일에 대해 getPublicUrl을 호출하여 URL을 생성
        const urlPromises = imgDatas.map((file) =>
          supabase.storage.from("challenge_img").getPublicUrl(file.name, {
            download: false,
          })
        )
        let urlDatas
        try {
          // 모든 URL 요청을 병렬로 처리
          urlDatas = await Promise.all(urlPromises)
          const newUrls = urlDatas.map((data) => data.data.publicUrl)
          setImgs(newUrls)
          randomImgUrl || setSelectedRandomUrl(newUrls[0])
          // 결과 출력 (혹은 상태 관리)
        } catch (urlError) {
          console.error("Error fetching URLs:", urlError)
        }
      }
    })()
  }, [])

  const handleClickRandomImgBtn = () => {
    const length = imgs.length
    const randomIndex = Math.floor(Math.random() * length)
    setSelectedRandomUrl(imgs[randomIndex])
  }
  return (
    <>
      <ChallengePageTitle
        title={title}
        step={3}
        allStepCount={4}
        titleHidden={false}
        handleClickGoBack={() => handleChangeStep(2)}
      />
      <Page>
        <Box>
          <SubTitle className="justify-center">무엇을 목표로 하나요?</SubTitle>
          <div className="h-[32px]" />
          <div className="flex flex-col items-center gap-[12px]">
            <div className="relative h-[156px] w-[156px] overflow-hidden rounded-[12px]">
              {selectedRandomUrl && (
                <Image
                  alt="랜덤 이미지"
                  src={selectedRandomUrl}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <Button
              intent="secondary"
              variant="rounded"
              onClick={() => {
                handleClickRandomImgBtn()
              }}
            >
              <div className="flex items-center justify-center gap-1">
                <ResetIcon />
                랜덤 이미지 변경
              </div>
            </Button>
          </div>
          <Input
            variant="login"
            label={"챌린지 명"}
            onChange={(e) => {
              if (e.target.value.length > 20) {
                return
              }
              return setInputValue(e.target.value)
            }}
            value={inputValue}
            placeholder="챌린지명을 입력해주세요"
          />
          {inputValue === "" && (
            <span className="text-[12px] text-[#B0B0B0]">
              챌린지명을 입력해주세요
            </span>
          )}
          <div className="h-[100px]" />
          <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-[640px] bg-white px-[20px] pb-8 pt-5">
            <Button
              size="lg"
              disabled={inputValue === ""}
              onClick={() => {
                handleChangeStep(4)
                setGoal(inputValue)
                setRandomImgUrl(selectedRandomUrl)
              }}
            >
              완료
            </Button>
          </div>
        </Box>
      </Page>
    </>
  )
}

export default ChallengeName
