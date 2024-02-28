import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Image from "next/image";
import Head from 'next/head'
import { useForm } from "react-hook-form";
import { EnvelopeSimple } from "@phosphor-icons/react";
import { AxiosError } from "axios";

import { SubmitButton } from "@/components/buttons/SubmitButton";
import { Input } from "@/components/Input";
import { useToast } from "@/components/ui/use-toast";

import { server } from "@/lib/server";
import { errorMessages } from "@/utils/errors/errorMessages";

import logo from '../../assets/tecnica_LOGO.jpg'

interface ForgotFormData {
  email: string
}

export default function ForgotPassword() {
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<ForgotFormData>()

  async function handleForgotPassword(data: ForgotFormData) {
    try {
      await server.post('/student/password/forgot-password',
        { email: data.email, link: 'https://students-platform-mu.vercel.app/reset-password' }
      )
      reset()

      toast({
        title: 'Enviado com sucesso!',
        description: 'Caso o e-mail digitado exista você irá receber um e-mail para recuperação da senha.'
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          if (error.response?.data.message[0] === errorMessages.emailEmpty) {
            return toast({
              title: 'Campo obrigatório',
              description: 'O E-mail é um campo obrigatório',
              variant: 'destructive'
            })
          } else if (error.response?.data.message === errorMessages.linkEmpty) {
            return toast({
              title: 'Erro ao enviar!',
              description: 'Erro ao enviar o link, tente novamente mais tarde!',
              variant: 'destructive'
            })
          }
        }
      }
      return toast({
        title: 'Erro ao enviar!',
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

      <form onSubmit={handleSubmit(handleForgotPassword)} className="flex flex-col w-full items-center justify-center gap-9 px-8">
        <div className="w-full">
          <Input
            {...register('email')}
            required
            Icon={<EnvelopeSimple size={24} weight="fill" color={'#000000'} />}
            placeholder="Email"
          />
        </div>

        <SubmitButton
          disabled={isSubmitting}
          title="Enviar"
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