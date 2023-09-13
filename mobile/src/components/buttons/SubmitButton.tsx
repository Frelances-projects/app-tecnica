import { TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator } from 'react-native'

interface SubmitButtonProps extends TouchableOpacityProps {
  title: string
  isLoading: boolean
}

export function SubmitButton({ title, isLoading, ...rest }: SubmitButtonProps) {
  return (
    <TouchableOpacity
      className="h-10 w-40 items-center justify-center rounded-[20px] bg-primary-500 disabled:opacity-70"
      activeOpacity={0.8}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator animating color="#FFF" />
      ) : (
        <Text className="text-sm font-medium text-white">{title}</Text>
      )}
    </TouchableOpacity>
  )
}
