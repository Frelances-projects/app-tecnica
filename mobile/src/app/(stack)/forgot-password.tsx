import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { EnvelopeSimple } from 'phosphor-react-native'

import { SubmitButton } from '@/components/buttons/SubmitButton'
import { Input } from '@/components/Input'
import Logo from '@/assets/Logo'

export default function ForgotPassword() {
  const router = useRouter()

  return (
    <View className="my-auto items-center justify-center">
      <Logo marginBottom={124} />

      <View className="w-full items-center justify-center gap-9 px-8">
        <View className="w-full">
          <Input
            Icon={<EnvelopeSimple size={24} weight="fill" color={'#000000'} />}
            placeholder="Email"
          />
        </View>

        <SubmitButton
          onPress={() => router.push('(drawer)')}
          title="Submeter"
        />
      </View>
    </View>
  )
}
