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
    <ul>
      {posts.map((post: PostType) => {
        return (
          <li
            key={post.id}
            onClick={() => onClickPost(post.id)}
            className="mb-[20px] cursor-pointer"
          >
            <ChallengeCard
              challenge={post}
              milestone={post.milestone}
              title={post.goal}
              category={post.category}
              likes={post.like_cnt}
              bookmarks={post.template_cnt}
              liked={me ? (post.liked || []).includes(me.id) : false}
              state={post.state}
              bookmarked={me ? (post.bookmarked || []).includes(me.id) : false}
              challengeImage={post.image_url || ""}
              successRate={post.successRate}
              startDate={post.start_at || ""}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default ChallengePosts
