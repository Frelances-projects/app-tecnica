import { ReactNode } from 'react'
import { TextInputProps, TextInput, TouchableOpacity } from 'react-native'

interface InputProps extends TextInputProps {
  placeholder: string
  Icon: ReactNode
  padding?: string
}

export function Input({
  placeholder,
  Icon,
  padding = 'py-3 pl-8 pr-3',
  ...rest
}: InputProps) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      className={`w-full flex-row items-center justify-between rounded-[44px] bg-white shadow shadow-black ${padding}`}
    >
      <TextInput
        style={{ width: '90%' }}
        className="font-regular text-base"
        placeholder={placeholder}
        {...rest}
      />

      {Icon}
    </TouchableOpacity>
  )
}
