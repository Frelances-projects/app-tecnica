import { ReactNode } from 'react'

interface InputProps {
  placeholder: string
  Icon: ReactNode
}

export function Input({
  placeholder,
  Icon,
}: InputProps) {
  return (
    <fieldset className="w-full min-w-full flex px-4 py-1 items-center justify-between rounded-[44px] bg-white shadow shadow-black">
      <input
        placeholder={placeholder}
        className='focus:outline-none'
      />
        {Icon}
    </fieldset>
  )
}
