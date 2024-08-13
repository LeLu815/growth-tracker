"use client"

import { useModal } from "@/context/modal.context"
import { useToast } from "@/context/toast.context"
import { useState } from "react"

import Button from "@/components/Button"
import Chip from "@/components/Chip"
import CheckIcon from "@/components/Icon/CheckIcon"
import Input from "@/components/Input"
import Page from "@/components/Page"

function ComponentTestPage() {
  const [isSelected, setIsSelected] = useState<boolean>(false)

  const handleClick = () => {
    setIsSelected(!isSelected)
  }

  const { open } = useModal()
  const { showToast } = useToast()

  const handleToastClick = () => {
    showToast("토스트 테스트 해보자~")
  }

  const handleModalClick = () => {
    open({
      type: "alert",
      content: "안녕",
      onConfirm: () => console.log("dd"),
    })
  }

  return (
    <Page>
      <h3 className="pt-4">Chips</h3>

      <div>
        <Chip label="전체" />
        <Chip label="디폴트 아웃라인" variant="outline" />
        <Chip label="전체" intent="secondary" selected />
        <Chip size="sm" label="공부" />
        <Chip size="md" intent="secondary" label="제테크" />
        <Chip size="sm" intent="secondary" label="제테크" variant="outline" />
        <Chip intent="third" label="제테크" variant="outline" />
        <Chip size="sm" label="제테크" variant="outline" selected />
      </div>

      <h3 className="pt-4">Buttons</h3>
      {/* default size: md, variant: primary */}
      <h4>default</h4>
      <Button size="lg">Default Button</Button>
      <Button size="lg" variant="outline">
        디폴트 아웃라인
      </Button>
      <Button size="lg" disabled>
        Default disabled Button
      </Button>
      <Button>Default Button</Button>
      <Button size="sm">Default Button</Button>

      <h4>secondary buttons</h4>
      <Button intent="secondary" size="lg">
        Secondary Button
      </Button>
      <Button intent="secondary" variant="outline" size="lg">
        Secondary outline Button
      </Button>
      <Button intent="secondary" size="lg" disabled>
        Secondary disabled Button
      </Button>
      <Button intent="secondary" size="lg" selected>
        Secondary selected Button
      </Button>
      <Button intent="secondary">Default Button md Size</Button>
      <Button intent="secondary" size="sm">
        Default Button md Size
      </Button>

      <h4>primary & secondary md size</h4>
      <Button intent="secondary" size="md">
        Default Button
      </Button>
      <Button intent="primary" size="md">
        Default Button
      </Button>
      <Button selected size="md">
        Default selected Button
      </Button>

      <h4>primary & secondary sm size</h4>
      <Button variant="contained" size="sm">
        Button text
      </Button>
      <Button intent="secondary" size="sm">
        Button text
      </Button>
      <Button intent="primary" variant="rounded" size="sm" selected>
        Button text
      </Button>

      <h4>rounded buttons</h4>

      <Button variant="rounded">Button text</Button>
      <Button intent="secondary" variant="rounded">
        Button text
      </Button>

      <Button intent="secondary" variant="rounded" size="sm">
        Button text
      </Button>
      <Button intent="primary" variant="rounded" size="sm">
        Button text
      </Button>

      <Button intent="primary" variant="borderless" size="sm">
        Button text
      </Button>

      <h4>select test</h4>
      <Button
        intent="primary"
        size="md"
        selected={isSelected}
        onClick={handleClick}
      >
        셀렉트 버튼
      </Button>

      <Chip label="공부" selected={isSelected} onClick={handleClick} />

      <h4>challenge card</h4>
      {/* <ChallengeCard
        title="토익 990점~~"
        category="공부"
        likes={3}
        liked={false}
        bookmarks={23}
        // userImage=""
        // nickname="닉네임"
        state="on_progress"
        bookmarked={false}
        challengeImage="/icon/ic-arrow-right.svg"
      />
      <ChallengeCard
        title="토익 990점~~"
        category="공부"
        likes={3}
        liked={false}
        bookmarks={23}
        // userImage=""
        // nickname="닉네임"
        state="not_started"
        bookmarked={false}
        challengeImage="/icon/ic-arrow-right.svg"
      /> */}

      <h4>토스트 테스트</h4>
      <div>
        <button onClick={handleToastClick}>토스트 나와</button>
      </div>

      <Input label="인풋테스트" required />
      <Input label="인풋테스트" />

      <CheckIcon />
      {/*<ChallengeCommentCreate />*/}
      <div className="h-[100px]"></div>

      <Button onClick={handleModalClick}> 모달 테스트 </Button>
    </Page>
  )
}

export default ComponentTestPage
