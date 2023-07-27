import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

export function Button({ className, title, ...rest }: ButtonProps) {
  return (
    <button className={`w-32 px-7 py-[0.375rem] rounded-3xl bg-[#E3000F] text-white hover:bg-[#E3000F]/80 transition-colors duration-300 ${className}`} {...rest}>
      {title}
    </button>
  )
}