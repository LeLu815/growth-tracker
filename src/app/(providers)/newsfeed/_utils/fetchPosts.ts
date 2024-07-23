import axios from "axios"

import { PostType } from "../../../../../types/challenge"

export const fetchPosts = async (
  filter: string,
  category: string,
  searchQuery: string,
  userId: string
): Promise<PostType[]> => {
  const response = await axios.get("/api/challenge", {
    params: {
      userId,
      keyword: searchQuery,
      filter,
      category: category === "전체보기" ? "" : category,
    },
  })

  return response.data
}
