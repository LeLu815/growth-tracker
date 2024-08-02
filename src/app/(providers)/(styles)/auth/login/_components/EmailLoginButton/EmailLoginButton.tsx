import Button from "@/components/Button"
import EmailIcon from "@/components/Icon/EmailIcon"

interface EmailLoginButtonProps {
  onClick: () => void
}

function EmailLoginButton({ onClick }: EmailLoginButtonProps) {
  return (
    <Button intent="secondary" size="lg" onClick={onClick}>
      <div className="flex w-full items-center justify-center">
        <EmailIcon width="24px" height="24px" />
        <span className="ml-4">이메일로 로그인하기</span>
      </div>
    </Button>
  )
}

export default EmailLoginButton
