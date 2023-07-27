import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

export function Button({ className, title, ...rest }: ButtonProps) {
  <button className={`w-32 px-7 py-[0.375rem] rounded-3xl bg-[#E3000F] text-white ${className}`} {...rest}>
    {title}
  </button>
}