import Box from "@/components/Box"
import Page from "@/components/Page"

import LoginEmailClient from "./_components/LoginEmailClient"

function LoginEmailPage() {
  return (
    <Page>
      <Box className="max-w-[375px]">
        <LoginEmailClient />
      </Box>
    </Page>
  )
}

export default LoginEmailPage
