'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { Mail } from 'lucide-react'

import { Input } from '@/app/register/components/UserRegistrationForm/Input'
import { SubmitButton } from '@/app/register/components/UserRegistrationForm/SubmitButton'
import { useToast } from '@/components/ui/use-toast'
import { forgotPassword } from './action'

export function ForgotPasswordForm() {
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)

  async function handleForgotUserPassword(data: FormData) {
    const { message } = await forgotPassword(data)

    if (message === 'Success!') {
      toast({
        title: 'Enviado com sucesso!',
        description:
          'Caso o e-mail digitado exista você irá receber um e-mail para recuperação da senha.',
      })

      formRef?.current?.reset()
    } else {
      toast({
        variant: 'destructive',
        title: 'Erro!',
        description: message,
      })
    }
  }

  return (
    <form
      ref={formRef}
      action={handleForgotUserPassword}
      className="flex flex-col items-center justify-between gap-9"
    >
      <Input
        id="email"
        Icon={<Mail strokeWidth={1.5} className="ml-1" />}
        placeholder="Email"
        type="email"
      />

      <div className="flex items-center justify-between gap-x-16">
        <Link href={'/'} className="text-sm font-semibold text-gray-400">
          Voltar para o login
        </Link>
      </div>

      <SubmitButton text="Enviar" />
    </form>
  )
}
