import { ButtonHTMLAttributes } from "react"

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  isLoading?: boolean
}

export function SubmitButton({ title, isLoading, ...rest }: SubmitButtonProps) {
  return (
    <button
      className="h-10 w-40 items-center justify-center rounded-[20px] bg-primary-500 disabled:opacity-70 text-sm font-medium text-white"
      disabled={isLoading}
      {...rest}
    >
      {title}
    </button>
  )
}
