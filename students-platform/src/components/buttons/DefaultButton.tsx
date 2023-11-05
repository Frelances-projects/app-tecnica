import { ButtonHTMLAttributes } from "react"

interface DefaultButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

export function DefaultButton({ title, ...rest }: DefaultButtonProps) {
  return (
    <button
      {...rest}
      className="text-white h-11 w-full items-center justify-center rounded-[22.5px] bg-primary-500 enabled:hover:opacity-80 enabled:hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {title}
    </button>
  )
}
