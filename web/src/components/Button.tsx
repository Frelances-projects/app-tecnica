'use client'
import { ButtonHTMLAttributes } from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

import { Spinner } from './Spinner'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

export function Button({ className, title, ...rest }: ButtonProps) {
  const { pending } = useFormStatus()
  
  return (
    <button
      disabled={pending}
      className={`w-32 px-7 py-[0.375rem] rounded bg-[#E3000F] text-white enabled:hover:bg-[#E3000F]/80 disabled:bg-[#E3000F]/60 disabled:cursor-not-allowed transition-colors duration-300 ${className}`}
      {...rest}
    >
      {pending ? <Spinner /> : title}
    </button>
  )
}