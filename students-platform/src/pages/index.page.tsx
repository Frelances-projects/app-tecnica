import { Input } from '@/components/Input'
import { SubmitButton } from '@/components/buttons/SubmitButton'
import { Lock, User } from '@phosphor-icons/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'

import logo from '../assets/tecnica_LOGO.jpg'

interface LoginFormData {
  number: string
  password: string
}

export default function Home() {
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<LoginFormData>()

  const router = useRouter()
  const { login, student } = useAuth()

  async function handleLogin(data: LoginFormData) {
    await login({ number: Number(data.number), password: data.password })
    reset()

    router.push('/pratical-classes')
  }

  useEffect(() => {
    if (student) {
      router.push('/pratical-classes')
    }
  }, [student])

  return (
    <section className="items-center justify-center px-4 max-w-xs flex flex-col mx-auto m-36">
     <Image src={logo} alt='Logo' width={295} height={295} className='mx-auto mb-32'/>

      <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col w-full items-center justify-center gap-6">
        <Input
          Icon={<User size={24} weight="fill" color={'#000000'} />}
          placeholder="Nº de Aluno"
        />

        <Input
          Icon={<Lock size={24} weight="fill" color={'#000000'} />}
          placeholder="Senha"
        />

        <Link href={'/forgot-password'} className='text-[#858585] font-regular'>
          Esqueceu-se da sua senha?
        </Link>

        <SubmitButton
          isLoading={isSubmitting}
          title="Entrar"
        />
      </form>
    </section>
  )
}
