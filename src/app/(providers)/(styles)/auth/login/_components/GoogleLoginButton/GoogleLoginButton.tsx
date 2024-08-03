import { handleSocialLogin } from "@/api/auth/api.auth"

import Button from "@/components/Button"
import GoogleIcon from "@/components/Icon/GoogleIcon"

function GoogleLoginButton() {
  const googleLogin = () => {
    handleSocialLogin("google")
  }

  return (
    <Button intent="secondary" size="lg" onClick={googleLogin}>
      <div className="flex w-full items-center justify-center">
        <GoogleIcon width="24px" height="24px" />
        <span className="ml-4">Google로 시작하기</span>
      </div>
    </Button>
  )
}

export default GoogleLoginButton
