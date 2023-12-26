'use client'
import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserSquare, Lock, Mail } from 'lucide-react'

import { SubmitButton } from './SubmitButton'
import { Input } from './Input'
import { SelectFunction } from './SelectFunction'
import { useToast } from '@/components/ui/use-toast'

import { registerUser } from './action'

interface UserRegistrationFormProps {
  children: ReactNode
}

export function UserRegistrationForm({ children }: UserRegistrationFormProps) {
  const router = useRouter()
  const { toast } = useToast()

  async function handleRegisterUser(data: FormData) {
    const { message, userFunction } = await registerUser(data)

    if (message === 'Success!') {
      if (userFunction === 'INSTRUCTOR') {
        router.push('/panel/driving-lessons')
      } else {
        router.push('/panel/alert/create')
      }
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
      action={handleRegisterUser}
      className="flex flex-col items-center justify-between gap-9"
    >
      <Input
        id="name"
        Icon={<UserSquare strokeWidth={1.5} className="ml-1" />}
        placeholder="Nome completo"
        type="text"
      />

      <Input
        id="email"
        Icon={<Mail strokeWidth={1.5} className="ml-1" />}
        placeholder="Email"
        type="email"
      />

      <Input
        id="password"
        Icon={<Lock strokeWidth={1.5} className="ml-1" />}
        placeholder="Senha"
        type="password"
        minLength={6}
      />

      {children}
      <SelectFunction />
      <SubmitButton text="Registrar" />

      <Link href={'/'} className="text-sm font-semibold text-gray-400">
        Voltar para o login
      </Link>
    </form>
  )
}
