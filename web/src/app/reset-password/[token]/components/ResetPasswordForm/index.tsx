'use client'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'

import { Input } from '@/app/register/components/UserRegistrationForm/Input'
import { SubmitButton } from '@/app/register/components/UserRegistrationForm/SubmitButton'
import { useToast } from '@/components/ui/use-toast'
import { resetPassword } from './action'

interface ResetPasswordFormProps {
  token: string
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter()
  const { toast } = useToast()

  async function handleResetUserPassword(data: FormData) {
    const { message } = await resetPassword(data, token)

    if (message === 'Success!') {
      toast({
        title: 'Redefinição concluída',
        description:
          'A redefinição de senha com concluida com sucesso, agora você pose entrar na plataforma',
      })

      router.push('/')
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
      action={handleResetUserPassword}
      className="flex flex-col items-center justify-between gap-9"
    >
      <Input
        id="password"
        Icon={<Lock strokeWidth={1.5} className="ml-1" />}
        placeholder="Nova Password"
        type="password"
        minLength={6}
      />

      <SubmitButton text="Redefinir" />
    </form>
  )
}
