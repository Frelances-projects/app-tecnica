import { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLLabelElement> {
  hasIcon?: ReactNode
  id: string
}

export function Input({ className, hasIcon, id, ...rest }: InputProps) {
  return (
    <label htmlFor={id} className={`border w-[520px] border-[#C6C6C6] outline-none flex items-center justify-between bg-white rounded-lg px-2 py-[0.375rem] text-black ${className}`} {...rest}>
      <input className={`outline-none`} id={id} />
      {hasIcon}
    </label>
  )
}