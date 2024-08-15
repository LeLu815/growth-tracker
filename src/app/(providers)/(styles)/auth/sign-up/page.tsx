import Box from "@/components/Box"
import Page from "@/components/Page"

import SignUpClient from "./_components/SignUpClient"

function LoginEmailPage() {
  return (
    <Page>
      <Box className="max-w-[375px]">
        <SignUpClient />
      </Box>
    </Page>
  )
}

export default LoginEmailPage
