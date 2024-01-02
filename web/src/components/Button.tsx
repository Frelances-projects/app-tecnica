'use client'
import { ButtonHTMLAttributes } from 'react'
import { useFormStatus } from 'react-dom'

import { Spinner } from './Spinner'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

export function Button({ className, title, ...rest }: ButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      className={`w-32 rounded bg-[#E3000F] px-7 py-[0.375rem] text-white transition-colors duration-300 enabled:hover:bg-[#E3000F]/80 disabled:cursor-not-allowed disabled:bg-[#E3000F]/60 ${className}`}
      {...rest}
    >
      {pending ? <Spinner /> : title}
    </button>
  )
}
