import { ChangeEventHandler, InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasIcon?: ReactNode
  id: string
  type: string
  placeholder: string
  name: string
  inputValue?: string
  onChangeInput?: ChangeEventHandler<HTMLInputElement>
  required?: boolean
}

export function Input({
  className,
  hasIcon,
  id,
  type,
  placeholder,
  name,
  onChangeInput,
  inputValue,
  required,
  ...rest
}: InputProps) {
  return (
    <div
      className={`flex w-full items-center justify-between rounded-lg border border-[#C6C6C6] bg-white px-2 py-[0.375rem] text-black outline-none lg:w-[520px] ${className}`}
    >
      <input
        className={`w-full flex-1 outline-none`}
        id={id}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChangeInput}
        value={inputValue}
        required={required}
        {...rest}
      />
      {hasIcon}
    </div>
  )
}
