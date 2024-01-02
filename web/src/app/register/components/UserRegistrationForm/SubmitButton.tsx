'use client'
import { useFormStatus } from 'react-dom'

import { Spinner } from '@/components/Spinner'

interface SubmitButtonProps {
  text: string
}

export function SubmitButton({ text }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      className="h-10 w-40 rounded-[20px] bg-[#E3000F] text-white transition-colors duration-300 enabled:hover:bg-[#E3000F]/90 disabled:cursor-not-allowed disabled:bg-[#E3000F]/50"
      type="submit"
    >
      {pending ? <Spinner /> : text}
    </button>
  )
}
