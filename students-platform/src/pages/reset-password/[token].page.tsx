import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Image from "next/image";
import Head from 'next/head'
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Lock } from '@phosphor-icons/react'
import { AxiosError } from "axios";

import { SubmitButton } from "@/components/buttons/SubmitButton";
import { Input } from "@/components/Input";
import { useToast } from "@/components/ui/use-toast";

import { server } from "@/lib/server";
import { errorMessages } from "@/utils/errors/errorMessages";

import logo from '../../assets/tecnica_LOGO.jpg'

interface ResetFormData {
  password: string
}

interface ResetPasswordParams {
  token: string
}

export default function ResetPassword() {
  const { query, push } = useRouter()
  const { token } = query as unknown as ResetPasswordParams
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<ResetFormData>()

  async function handleResetPassword(data: ResetFormData) {
    try {
      await server.patch(`/student/password/reset-password/${token}`,
        { newPassword: data.password }
      )
      reset()

      toast({
        title: 'Redefinição concluída',
        description: 'A redefinição de senha com concluida com sucesso, agora você pose entrar na plataforma'
      })

      push('/menu')
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          if (error.response?.data.message[0] === errorMessages.newPasswordEmpty) {
            return toast({
              title: 'Campo obrigatório',
              description: 'A senha é um campo obrigatório',
              variant: 'destructive'
            })
          }
        }
      }

      return toast({
        title: 'Erro',
        description: 'Ocorreu um erro no servidor! Por favor tente novamente mais tarde',
        variant: 'destructive'
      })
    }
  }
  
  return (
    <div className="flex h-screen pb-16 flex-col items-center justify-center">
      <Head>
        <title>Alunos - Grupo Técnica</title>
      </Head>

      <Image src={logo} alt='Logo' width={295} height={295} className='mx-auto mb-32'/>

      <form onSubmit={handleSubmit(handleResetPassword)} className="flex flex-col w-full items-center justify-center gap-9 px-8">
        <div className="w-full">
          <Input
            required
            {...register('password')}
            Icon={<Lock size={24} weight="fill" color={'#000000'} />}
            placeholder="Nova Password"
            type='password'
          />
        </div>

        <SubmitButton
          disabled={isSubmitting}
          title="Redefinir"
          type="submit"
        />
      </form>
    </div>
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