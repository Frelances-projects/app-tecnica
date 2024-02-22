import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { RegisterStudentSection } from './components/RegisterStudentSection'

import { User } from '@/utils/interfaces/user'

export default function RegisterStudent() {
  const user = cookies().get('user')?.value
  const formattedUser = JSON.parse(user!) as User

  if (formattedUser.function === 'INSTRUCTOR') {
    redirect('/panel/driving-lessons')
  }

  return (
    <main className="mb-16 mt-14 flex w-full max-w-[810px] flex-col gap-10">
      <h1 className="px-4 text-xl">Gerir Alunos</h1>
      <div className="mx-auto -mt-9 h-[1px] w-full max-w-[1440px] bg-[#BFBFBF]" />

      <RegisterStudentSection />
    </main>
  )
}
