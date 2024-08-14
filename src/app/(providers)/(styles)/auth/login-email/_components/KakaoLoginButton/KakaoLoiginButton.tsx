import { handleSocialLogin } from "@/api/auth/api.auth"

import Button from "@/components/Button"
import KaKaoIcon from "@/components/Icon/KakaoIcon"

function KakaoLoiginButton() {
  const kakaoLogin = () => {
    handleSocialLogin("kakao")
  }
  return (
    <Button intent="kakao" size="lg" onClick={kakaoLogin}>
      <div className="flex items-center justify-center space-x-2">
        <KaKaoIcon width="24px" height="24px" />
        <span>카카오톡으로 시작하기</span>
      </div>
    </Button>
  )
}

export default KakaoLoiginButton
