import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native'

interface SubmitButtonProps extends TouchableOpacityProps {
  title: string
}

export function SubmitButton({ title, ...rest }: SubmitButtonProps) {
  return (
    <TouchableOpacity
      className="h-10 w-40 items-center justify-center rounded-[20px] bg-primary-500"
      activeOpacity={0.8}
      {...rest}
    >
      <Text className="text-sm font-medium text-white">{title}</Text>
    </TouchableOpacity>
  )
}
