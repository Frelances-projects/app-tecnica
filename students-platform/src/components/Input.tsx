import { InputHTMLAttributes, ReactNode, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
  Icon: ReactNode,
  type?: string
}

export const Input = forwardRef(({ Icon, type = 'text', ...rest}: InputProps, ref) => {
  return (
    <fieldset className="w-full min-w-full flex px-4 py-1 items-center justify-between rounded-[44px] bg-white shadow shadow-black">
      <input
        className='focus:outline-none'
        type={type}
        {...rest}
        ref={ref as any}
      />
        {Icon}
    </fieldset>
  )
})

Input.displayName = 'Input'
