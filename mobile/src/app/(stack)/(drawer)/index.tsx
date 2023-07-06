import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'

import { DefaultButton } from '@/components/buttons/DefaultButton'

export default function Home() {
  const router = useRouter()

  return (
    <View className="flex-1 items-center">
      <Text className="mb-2 text-xl font-semibold">Bem-vindo(a), @Nome!</Text>
      <Text className="mb-12 font-regular text-sm">Aluno(a) N° 2342</Text>

      <View className="gap-7">
        <DefaultButton
          title="Aulas de Código"
          onPress={() => router.push('/classes')}
        />
        <DefaultButton title="Calendário de Aulas" />
        <DefaultButton
          title="Informações"
          onPress={() => router.push('/info')}
        />
        <DefaultButton title="Sair" onPress={() => router.back()} />
      </View>
    </View>
  )
}
