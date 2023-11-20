import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { Lock, User } from '@phosphor-icons/react'
import Link from 'next/link'
import { parseCookies } from 'nookies'

import { Input } from '@/components/Input'
import { SubmitButton } from '@/components/buttons/SubmitButton'

import { useAuth } from '@/hooks/useAuth'

import logo from '../../public/logo.svg'

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

    router.push('/menu')
  }

  return (
    <section className="items-center justify-center px-4 max-w-xs flex flex-col mx-auto m-36">
      <Head>
        <title>Alunos - Grupo Técnica</title>
      </Head>

     <Image src={logo} alt='Logo' width={295} height={295} className='mx-auto mb-28'/>

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
          Recuperar password
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
        destination: '/menu',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
