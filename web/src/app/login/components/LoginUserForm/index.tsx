'use client'
import { useRouter } from 'next/navigation'
import { Mail, Lock } from 'lucide-react';

import { Input } from '@/app/components/UserRegistrationForm/Input';
import { SubmitButton } from '@/app/components/UserRegistrationForm/SubmitButton';
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

      <SubmitButton text='Entrar' />
    </form>
  )
}