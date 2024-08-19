import axios from "axios"

import { PostType } from "../../../../../../types/challenge"

export const fetchPosts = async (
  filter: string,
  category: string,
  searchQuery: string,
  userId: string,
  showCompleted: boolean,
  pageParam: number = 1,
  limit: number = 8
): Promise<PostType[]> => {
  console.log("데이터요청", { pageParam, limit })
  const response = await axios.get("/api/challenge", {
    params: {
      userId,
      keyword: searchQuery,
      filter,
      category: category === "전체" ? "" : category,
      showCompleted,
      page: pageParam,
      limit,
    },
  })
  return response.data
}
