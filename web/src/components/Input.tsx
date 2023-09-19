import { ChangeEventHandler, InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLLabelElement> {
  hasIcon?: ReactNode
  id: string
  type: string
  placeholder: string
  name: string
  inputValue?: string
  onChangeInput?: ChangeEventHandler<HTMLInputElement>
  required?: boolean
}

export function Input({ className, hasIcon, id, type, placeholder, name, onChangeInput, inputValue, required, ...rest }: InputProps) {
  return (
    <label htmlFor={id} className={`border w-[520px] border-[#C6C6C6] outline-none flex items-center justify-between bg-white rounded-lg px-2 py-[0.375rem] text-black ${className}`} {...rest}>
      <input 
        className={`outline-none`} 
        id={id} 
        type={type} 
        placeholder={placeholder} 
        name={name}
        onChange={onChangeInput}
        value={inputValue}
        required={required}
      />
      {hasIcon}
    </label>
  )
}