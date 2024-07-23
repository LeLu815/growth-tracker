import { PostType } from "../../../../../types/challenge"

interface ChallengePostsProps {
  posts: PostType[]
  onClickPost: (id: string) => void
}

function ChallengePosts({ posts, onClickPost }: ChallengePostsProps) {
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li
            key={post.id}
            className="m-2 border border-slate-400 p-4"
            onClick={() => onClickPost(post.id)}
          >
            <h2>{post.goal}</h2>
            <p>{post.user.nickname}</p>
            <p>{post.template_cnt}</p>
            <p>{post.state}</p>
            <p>{post.category}</p>
            <p>❤️ {post.like_cnt}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChallengePosts
