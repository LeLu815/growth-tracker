import Link from "next/link"

import ArrowRightIcon from "@/components/Icon/ArrowRightIcon"
import { MenuProps } from "@/app/(providers)/(styles)/my-page/_constants/myPageConstants"

function ProfileMenu({ menuList }: { menuList: MenuProps[] }) {
  return (
    <div>
      <div className="mb-2 font-bold text-primary">챌린지</div>
      <div className="rounded-lg border border-solid border-grey-800">
        {menuList.map((menu, index) => {
          const isLastMenu = menuList.length - 1 !== index

          return (
            <Link
              key={menu.name}
              href={menu.path}
              className={`block border-b px-4 py-8 text-gray-600 ${isLastMenu && "border-solid border-grey-800"}`}
            >
              <div className={"flex justify-between"}>
                {menu.name}
                <ArrowRightIcon className={"h-[20px]"}></ArrowRightIcon>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default ProfileMenu
