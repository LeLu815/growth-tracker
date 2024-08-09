import Box from "@/components/Box"
import MyInfo from "@/app/(providers)/(styles)/my-page/_components/profile/MyInfo"
import ProfileMenu from "@/app/(providers)/(styles)/my-page/_components/profile/ProfileMenu"
import {
  CHALLENGE_MENU_LIST,
  MY_INFO_LIST,
} from "@/app/(providers)/(styles)/my-page/_constants/myPageConstants"

function UserInfoPage() {
  return (
    <div className="mx-auto flex w-full max-w-[640px] flex-col">
      <MyInfo></MyInfo>
      <Box className={""}>
        <div className={"flex flex-col gap-[24px]"}>
          <div>그래프</div>
          <ProfileMenu menuList={MY_INFO_LIST}></ProfileMenu>
          <ProfileMenu menuList={CHALLENGE_MENU_LIST}></ProfileMenu>
        </div>
      </Box>
    </div>
  )
}

export default UserInfoPage
