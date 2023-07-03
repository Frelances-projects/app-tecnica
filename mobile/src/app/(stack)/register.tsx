import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { EnvelopeSimple, Lock, UserSquare } from 'phosphor-react-native'

import { SubmitButton } from '@/components/buttons/SubmitButton'
import { Input } from '@/components/Input'
import Logo from '@/assets/Logo'

export default function Register() {
  const router = useRouter()

  return (
    <View className="my-auto items-center justify-center">
      <Logo marginBottom={44} />

      <View className="w-full items-center justify-center gap-9 px-8">
        <View className="w-full">
          <Input
            Icon={<EnvelopeSimple size={24} weight="fill" color={'#000000'} />}
            placeholder="Email"
          />
        </View>

        <View className="w-full">
          <Input
            Icon={<Lock size={24} weight="fill" color={'#000000'} />}
            placeholder="Password"
          />
        </View>

        <View className="w-full">
          <Input
            Icon={<UserSquare size={24} weight="fill" color={'#000000'} />}
            placeholder="Nome completo"
          />
        </View>

        <SubmitButton
          onPress={() => router.push('(drawer)')}
          title="Registrar"
        />
      </View>
    </View>
  )
}
