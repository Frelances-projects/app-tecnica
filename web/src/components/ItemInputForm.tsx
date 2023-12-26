import { ChangeEventHandler, ReactNode } from 'react'

import { WrapperItem } from './WrapperItem'
import { Input } from './Input'

interface ItemInputFormProps {
  label: string
  hasIcon?: ReactNode
  id: string
  type: string
  placeholder: string
  inputValue?: string
  onChangeInput?: ChangeEventHandler<HTMLInputElement>
  required?: boolean
  classNameDiv?: string
}

export function ItemInputForm({
  id,
  label,
  placeholder,
  type,
  hasIcon,
  required,
  inputValue,
  onChangeInput,
  classNameDiv,
}: ItemInputFormProps) {
  return (
    <WrapperItem htmlFor={id} label={label}>
      <Input
        required={required}
        id={id}
        placeholder={placeholder}
        type={type}
        name={id}
        className={classNameDiv}
        hasIcon={hasIcon}
        inputValue={inputValue}
        onChangeInput={onChangeInput}
      />
    </WrapperItem>
  )
}
