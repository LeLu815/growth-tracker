"use client"

import { useState } from "react"

import BottomNavigation from "@/components/BottomNavigation"
import Button from "@/components/Button"
import Chip from "@/components/Chip"
import Page from "@/components/Page"

function ComponentTestPage() {
  const [isSelected, setIsSelected] = useState<boolean>(false)

  const handleClick = () => {
    setIsSelected(!isSelected)
  }

  return (
    <Page title="공통 컴포넌트 테스트">
      <h3 className="pt-4">Chips</h3>
      <Chip label="전체" intent="primary" />
      <Chip intent="selected" label="운동" />
      <Chip size="sm" intent="selected" label="공부" />
      <Chip size="sm" intent="secondary" label="제테크" />
      <Chip size="sm" intent="secondary" label="제테크" variant="outline" />

      <h3 className="pt-4">Buttons</h3>
      {/* default size: md, variant: primary */}
      <h4>default</h4>
      <Button size="lg">Default Button</Button>
      <Button size="lg" disabled>
        Default disabled Button
      </Button>
      <Button>Default Button</Button>
      <Button size="sm">Default Button</Button>

      <h4>secondary buttons</h4>
      <Button intent="secondary" size="lg">
        Secondary Button
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

      <BottomNavigation />
    </Page>
  )
}

export default ComponentTestPage
