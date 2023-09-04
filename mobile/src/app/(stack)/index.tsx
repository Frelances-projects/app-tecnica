import { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Link, useRouter } from 'expo-router'
import { Lock, UserSquare } from 'phosphor-react-native'

import { useAuth } from '@/hooks/useAuth'

import { SubmitButton } from '@/components/buttons/SubmitButton'
import { Input } from '@/components/Input'

import Logo from '@/assets/Logo'

export default function Login() {
  const [number, setNumber] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const router = useRouter()
  const { login, student } = useAuth()

  async function handleLogin() {
    setIsLoading(true)
    await login({ number: Number(number), password })

    setNumber('')
    setPassword('')
    setIsLoading(false)

    router.push('(drawer)')
  }

  useEffect(() => {
    if (student) {
      router.push('(drawer)')
    }
  }, [student])

  return (
    <View className="my-auto items-center justify-center">
      <Logo marginBottom={77} />

      <View className="w-full items-center justify-center gap-9 px-8">
        <View className="w-full">
          <Input
            Icon={<UserSquare size={24} weight="fill" color={'#000000'} />}
            placeholder="Nº de Aluno"
            keyboardType="numeric"
            value={number}
            onChangeText={(number) => setNumber(number)}
          />
        </View>

        <View className="w-full">
          <Input
            Icon={<Lock size={24} weight="fill" color={'#000000'} />}
            placeholder="Senha"
            autoCapitalize="none"
            secureTextEntry
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <Link href={'/forgot-password'} className='text-[#858585] font-regular'>
          Esqueceu-se da sua senha?
        </Link>

        <SubmitButton isLoading={isLoading} disabled={isLoading} onPress={() => handleLogin()} title="Entrar" />
      </View>
    </View>
  )
}
