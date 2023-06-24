import { View } from 'react-native'
import { useRouter } from 'expo-router'

import { SubmitButton } from '@/components/buttons/SubmitButton'
import Logo from '@/assets/Logo'

export default function Login() {
  const router = useRouter()

  return (
    <View className="my-auto items-center justify-center">
      <Logo />
      <SubmitButton onPress={() => router.push('(drawer)')} title="Entrar" />
    </View>
  )
}
