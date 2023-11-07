import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { parseCookies } from 'nookies'

import { Input } from '@/components/Input'
import { SubmitButton } from '@/components/buttons/SubmitButton'
import { Lock, User } from '@phosphor-icons/react'

import { useAuth } from '@/hooks/useAuth'

import logo from '../assets/tecnica_LOGO.jpg'

interface LoginFormData {
  number: string
  password: string
}

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<LoginFormData>()

  const router = useRouter()
  const { login } = useAuth()

  async function handleLogin(data: LoginFormData) {
    await login({ number: Number(data.number), password: data.password })
    reset()

    router.push('/practical-classes')
  }

  return (
    <section className="items-center justify-center px-4 max-w-xs flex flex-col mx-auto m-36">
     <Image src={logo} alt='Logo' width={295} height={295} className='mx-auto mb-32'/>

      <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col w-full items-center justify-center gap-6">
        <Input
          {...register('number')}
          Icon={<User size={24} weight="fill" color={'#000000'} />}
          placeholder="Nº de Aluno"
          type='number'
        />

        <Input
          {...register('password')}
          Icon={<Lock size={24} weight="fill" color={'#000000'} />}
          placeholder="Senha"
          type='password'
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

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { '@studentsPlatform:student': student } = parseCookies({ req: ctx.req })

  if (student) {
    return {
      redirect: {
        destination: '/practical-classes',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
