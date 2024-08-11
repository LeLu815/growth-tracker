interface ConfirmMessageProps {
  message: string
}

function ConfirmMessage({ message }: ConfirmMessageProps) {
  return <p className="text-body-m text-[#4CD964]">{message}</p>
}

export default ConfirmMessage
