"use client"

import Box from "@/components/Box"
import Page from "@/components/Page"

import NewsfeedClient from "./_components/NewsfeedClient"

function NewsfeedPage() {
  return (
    <Page>
      <Box>
        <NewsfeedClient />
      </Box>
    </Page>
  )
}

export default NewsfeedPage
