import {useMemo} from "react";
import {useQuery} from "@tanstack/react-query";
import {useAuth} from "@/context/auth.context";
import axios from "axios";

function MyPageMenus() {

  const { me } = useAuth()
  const getCountChallenges = async () => {
    debugger
    const response = await axios
    .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${me?.id}/challenge/count`)
    .then((response) => response.data)

    if (response.data.error) {
      throw new Error(response.data.error)
    }

    return response.data
  }


  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["challengeCount"],
    queryFn: getCountChallenges,
    enabled: !!me, // me가 있을 때만 쿼리 실행
  })

  const menuList = useMemo(
      () => [
        { name: "내 챌린지", count: 5 },
        { name: "좋아요 챌린지", count: 3 },
      ],
      []
  )

  return (
    <div className="mt-5 divide-y">
      <div className={"h-[1px] w-full flex-shrink-0"}></div>
      {menuList.map((challenge, index) => (
        <div key={index} className="flex items-center justify-between p-4">
          <span className="text-lg">{`${challenge.name} ${challenge.count}개`}</span>
          <span className="text-gray-400">➔</span>
        </div>
      ))}
    </div>
  )
}

export default MyPageMenus
