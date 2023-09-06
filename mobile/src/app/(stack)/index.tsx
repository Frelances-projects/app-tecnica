import { useEffect } from 'react'
import { View, Text } from 'react-native'
import { Link, useRouter } from 'expo-router'
import { Lock, UserSquare } from 'phosphor-react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { useAuth } from '@/hooks/useAuth'

import { SubmitButton } from '@/components/buttons/SubmitButton'
import { Input } from '@/components/Input'

import Logo from '@/assets/Logo'

const loginFormValidationSchema = zod.object({
  number: zod.string().nonempty('Número obrigatório'),
  password: zod.string().nonempty('Senha obrigatória').min(6, 'A senha deve conter no mínimo 6 caracteres')
})

type LoginFormData = zod.infer<typeof loginFormValidationSchema>

export default function Login() {
  const router = useRouter()
  const { login, student } = useAuth()

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({ resolver: zodResolver(loginFormValidationSchema), defaultValues: {
    number: '',
    password: '',
  }})

  async function handleLogin(data: LoginFormData) {
    await login({ number: Number(data.number), password: data.password })
    reset()

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
          <Controller control={control} render={({ field: { onChange, value } }) => (
            <Input
              Icon={<UserSquare size={24} weight="fill" color={'#000000'} />}
              placeholder="Nº de Aluno"
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}
            />
          )}
            name='number'
          />
          {errors.number && <Text className='text-red-500 font-medium pt-2 ml-4'>{errors.number.message}</Text>}
        </View>

        <View className="w-full">
          <Controller control={control} render={({ field: { onChange, value } }) => (
            <Input
              Icon={<Lock size={24} weight="fill" color={'#000000'} />}
              placeholder="Senha"
              autoCapitalize="none"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          )} 
            name='password'
          />
          {errors.password && <Text className='text-red-500 font-medium pt-2 ml-4'>{errors.password.message}</Text>}
        </View>

        <Link href={'/forgot-password'} className='text-[#858585] font-regular'>
          Esqueceu-se da sua senha?
        </Link>

        <SubmitButton 
          isLoading={isSubmitting}
          disabled={isSubmitting}
          onPress={handleSubmit(handleLogin)}
          title="Entrar"
        />
      </View>
    </View>
  )
}
