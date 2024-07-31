import Chip from "@/components/Chip"
import Page from "@/components/Page"

function ComponentTestPage() {
  return (
    <Page title="공용 컴포넌트 테스트">
      <Chip label="전체" />
      <Chip intent="selected" label="운동" />
      <Chip size="sm" intent="selected" label="공부" />
      <Chip size="sm" intent="secondary" label="제테크" />
    </Page>
  )
}

export default ComponentTestPage
