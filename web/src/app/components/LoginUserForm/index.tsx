'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { Mail, Lock } from 'lucide-react';

import { Input } from '@/app/register/components/UserRegistrationForm/Input';
import { SubmitButton } from '@/app/register/components/UserRegistrationForm/SubmitButton';
import { useToast } from "@/components/ui/use-toast"
import { loginUser } from './action';

export function LoginUserForm() {
  const router = useRouter()
  const { toast } = useToast()

  async function handleLoginUser(data: FormData) {
    const { message } = await loginUser(data)

    if (message === 'Success!') {
      router.push('/panel/alert/create')
    } else {
      toast({
        variant: "destructive",
        title: "Erro!",
        description: message,
      })
    }
  }

  return (
    <form action={handleLoginUser} className='flex flex-col items-center justify-between gap-9'>
      <Input
        id='email'
        Icon={<Mail strokeWidth={1.5} className='ml-1' />}
        placeholder='Email'
        type="email"
      />

      <Input
        id='password'
        Icon={<Lock strokeWidth={1.5} className='ml-1' />}
        placeholder='Senha' 
        type="password"
        minLength={6}
      />

      <div className='flex items-center justify-between gap-x-16'>
        <Link
          href={'/register'}
          className='text-gray-400 text-sm font-semibold'
        >
          Criar conta
        </Link>

        <Link
          href={'/'}
          className='text-gray-400 text-sm font-semibold'
        >
          Esqueci minha senha
        </Link>
      </div>

      <SubmitButton text='Entrar' />
    </form>
  )
}