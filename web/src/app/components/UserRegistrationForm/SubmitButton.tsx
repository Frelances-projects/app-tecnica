'use client'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

import { Spinner } from '@/components/Spinner'

interface SubmitButtonProps {
  text: string
}

export function SubmitButton({ text }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      className='text-white bg-[#E3000F] w-40 h-10 rounded-[20px] enabled:hover:bg-[#E3000F]/90 transition-colors duration-300 disabled:bg-[#E3000F]/50 disabled:cursor-not-allowed'
      type='submit'
    >
      {pending ? <Spinner /> : text}
    </button>
  )
} 