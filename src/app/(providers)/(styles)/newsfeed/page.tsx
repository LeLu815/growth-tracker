import Box from "@/components/Box"
import Page from "@/components/Page"

import NewsfeedClient from "./_components/NewsfeedClient"

function NewsfeedPage() {
  return (
    <Page className="lg:max-w-full">
      <Box className="relative pt-0 lg:px-0">
        <NewsfeedClient />
      </Box>
    </Page>
  )
}

export default NewsfeedPage
