import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...rest }: InputProps) {
  return (
    <input className={`bg-[#C6C6C6] rounded-lg w-[18.188rem] px-2 py-[0.375rem] text-black ${className}`} {...rest} />
  )
}