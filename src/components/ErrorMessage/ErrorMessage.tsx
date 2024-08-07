interface ErrorMessageProps {
  message: string
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className="text-[14px] text-[#FE3636]">{message}</p>
}

export default ErrorMessage
