"use client"

import Box from "@/components/Box"
import Page from "@/components/Page"

import NewsfeedClient from "./_components/NewsfeedClient"

function NewsfeedPage() {
  return (
    <Page>
      <Box>
        <div className="h-[120px] w-full rounded-md bg-[#D9D9D9]"></div>

        <NewsfeedClient />
      </Box>
    </Page>
  )
}

export default NewsfeedPage
