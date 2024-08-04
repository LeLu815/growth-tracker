"use client"

import { useAuth } from "@/context/auth.context"

import ChallengeCard from "@/components/ChallengeCard"

import { PostType } from "../../../../../../types/challenge"

interface ChallengePostsProps {
  posts: PostType[]
  onClickPost: (id: string) => void
}

function ChallengePosts({ posts, onClickPost }: ChallengePostsProps) {
  const { me } = useAuth()

  return (
    <div>
      <ul>
        {posts.map((post) => {
          const userImage =
            post.user.profile_image_url || "/image/profileImage.png"
          console.log("User image URL:", userImage) // 이미지 URL 확인
          return (
            <li
              key={post.id}
              onClick={() => onClickPost(post.id)}
              className="mb-[20px] cursor-pointer"
            >
              <ChallengeCard
                title={post.goal}
                category={post.category}
                likes={post.like_cnt}
                bookmarks={post.template_cnt}
                liked={me ? (post.liked || []).includes(me.id) : false}
                nickname={post.user.nickname}
                progress={post.progress}
                userImage={userImage}
                bookmarked={
                  me ? (post.bookmarked || []).includes(me.id) : false
                }
                challengeImage={post.image}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ChallengePosts
