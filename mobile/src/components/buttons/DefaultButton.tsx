import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native'

interface DefaultButtonProps extends TouchableOpacityProps {
  title: string
}

export function DefaultButton({ title, ...rest }: DefaultButtonProps) {
  return (
    <TouchableOpacity
      className="h-11 w-60 items-center justify-center rounded-[22.5px] bg-primary-500"
      activeOpacity={0.8}
      {...rest}
    >
      <Text className="text-sm font-medium text-white">{title}</Text>
    </TouchableOpacity>
  )
}
