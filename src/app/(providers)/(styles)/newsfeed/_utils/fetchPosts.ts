import axios from "axios"

import { PostType } from "../../../../../../types/challenge"

export const fetchPosts = async (
  filter: string,
  category: string,
  searchQuery: string,
  userId: string,
  showCompleted: boolean,
  pageParam: number = 1,
  limit: number = 12
): Promise<PostType[]> => {
  const response = await axios.get("/api/challenge", {
    params: {
      userId,
      keyword: searchQuery,
      filter,
      category: category === "전체" ? "" : category,
      showCompleted,
      page: pageParam - 1,
      limit,
    },
  })
  return response.data
}
