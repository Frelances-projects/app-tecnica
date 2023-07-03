import { ReactNode } from 'react'
import { TextInputProps, TextInput, TouchableOpacity } from 'react-native'

interface InputProps extends TextInputProps {
  placeholder: string
  Icon: ReactNode
}

export function Input({ placeholder, Icon, ...rest }: InputProps) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      className={`w-full flex-row items-center justify-between rounded-[44px] bg-white py-3 pl-8 pr-3 shadow shadow-black`}
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
