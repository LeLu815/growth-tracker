import Link from "next/link"

import { MenuProps } from "@/app/(providers)/(styles)/my-page/_constants/myPageConstants"

function ProfileMenu({ menuList }: { menuList: MenuProps[] }) {
  return (
    <div>
      <div className="mb-2 font-bold text-primary">챌린지</div>
      <div className="rounded-lg border border-solid border-grey-800 bg-grey-900">
        {menuList.map((menu, index) => {
          const isLastMenu = menuList.length - 1 !== index

          return (
            <Link
              key={menu.name}
              href={menu.path}
              className={`block border-b px-4 py-8 text-gray-600 ${isLastMenu && "border-solid border-grey-800"}`}
            >
              {menu.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default ProfileMenu
