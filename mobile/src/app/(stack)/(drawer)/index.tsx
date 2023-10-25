import { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'

import { DefaultButton } from '@/components/buttons/DefaultButton'
import { useAuth } from '@/hooks/useAuth'

export default function Home() {
  const router = useRouter()
  const { logout, student } = useAuth()

  useEffect(() => {
    if (!student) {
      router.push('/')
    }
  }, [])

  return (
    <View className="flex-1 items-center">
      <Text className="mb-2 text-xl font-semibold">
        Bem-vindo(a), {student?.name}
      </Text>
      <Text className="mb-12 font-regular text-sm">
        Aluno(a) N° {student?.number}
      </Text>

      <View className="gap-7">
        <DefaultButton
          title="Aulas de Código"
          onPress={() => router.push('/theoretical-classes')}
        />
        <DefaultButton
          title="Aulas de Práticas"
          onPress={() => router.push('/practical-classes')}
        />
        <DefaultButton title="Calendário de Aulas" />
        <DefaultButton
          title="Informações"
          onPress={() => router.push('/info')}
        />
        <DefaultButton title="Sair" onPress={() => logout()} />
      </View>
    </View>
  )
}
