"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

import { Database } from "../../../../types/supabase"

type PostType = Database["public"]["Tables"]["challenge"]["Row"] & {
  user: { nickname: string }
}

function NewsfeedPage() {
  const [posts, setPosts] = useState<PostType[]>([])
  const searchRef = useRef<HTMLInputElement>(null)
  const [filter, setFilter] = useState<string>("recent")
  const [userId, setUserId] = useState<string>("")
  const [category, setCategory] = useState<string>("")

  const router = useRouter()

  const handlePostClick = (id: string) => {
    router.push(`/challenge/${id}`)
  }

  const fetchPosts = useCallback(async () => {
    const searchQuery = searchRef.current?.value || ""

    try {
      const response = await axios.get("/api/challenge", {
        params: { userId, keyword: searchQuery, filter, category },
      })
      setPosts(response.data)
    } catch (error) {
      console.error("리스트 페팅 에러", error)
    }
  }, [filter, userId, category])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  console.log(posts)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchPosts()
    }
  }

  return (
    <div>
      <h2>뉴스피드 페이지</h2>

      {/* TODO: 검색 필터 */}
      <div>
        <input
          type="text"
          ref={searchRef}
          name=""
          id=""
          placeholder="검색"
          className="text-black"
          onKeyDown={handleKeyDown}
        />
        <button onClick={fetchPosts}>검색</button>
      </div>

      {/* TODO: 정렬 */}
      <div>
        <select
          name=""
          id=""
          className="text-black"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="recent">최신순</option>
          <option value="popular">인기순</option>
          <option value="followed">따라하기 많은 순</option>
          <option value="complete">성공 루틴만 보기</option>
        </select>
      </div>

      {/* TODO: 목록 뿌려주기 */}
      <div>
        <ul>
          {posts.map((post) => (
            <li
              key={post.id}
              className="m-2 border border-slate-400 p-4"
              onClick={() => handlePostClick(post.id)}
            >
              <h2>{post.goal}</h2>
              <p>{post.user.nickname}</p>
              <p>{post.template_cnt}</p>
              <p>{post.state}</p>
              <p>❤️ {post.like_cnt}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default NewsfeedPage
