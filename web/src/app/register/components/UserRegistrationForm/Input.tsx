import { ReactNode } from 'react'

interface InputProps {
  type: string
  id: string
  Icon: ReactNode
  placeholder: string
  minLength?: number
}

export function Input({ Icon, id, type, placeholder, minLength }: InputProps) {
  return (
    <label
      htmlFor={id}
      className="flex flex-row items-center justify-between rounded-[44px] bg-white py-3 pl-9 pr-4 shadow shadow-black"
    >
      <input
        minLength={minLength}
        required
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="outline-none"
      />
      {Icon}
    </label>
  )
}
