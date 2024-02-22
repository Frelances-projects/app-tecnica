import { InputHTMLAttributes } from 'react'

import { Select } from '@/components/Select'
import { WrapperItem } from '@/components/WrapperItem'

interface ItemSelectFormProps extends InputHTMLAttributes<HTMLSelectElement> {
  label: string
  id: string
  data?:
    | {
        value: string
        label: string
      }[]
    | undefined
}

export function ItemSelectForm({
  label,
  id,
  className,
  data,
  placeholder,
  ...rest
}: ItemSelectFormProps) {
  return (
    <WrapperItem htmlFor={id} label={label}>
      <Select
        data={data}
        className={`w-full ${className}`}
        placeholder={placeholder}
        name={id}
        id={id}
        {...rest}
      />
    </WrapperItem>
  )
}
