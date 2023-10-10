import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { RegisterStudentSection } from "./components/RegisterStudentSection";

import { User } from '@/utils/interfaces/user';

export default function RegisterStudent() {
  const user = cookies().get('user')?.value
  const formattedUser = JSON.parse(user!!) as User

  if (formattedUser.function === 'INSTRUCTOR') {
    redirect('/panel/driving-lessons')
  }
  
  return(
    <main className="w-full max-w-[810px] flex flex-col gap-10 mt-14 mb-16">
      <h1 className='text-xl'>Gerir Alunos</h1>
      <div className='mx-auto -mt-9 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>

      <RegisterStudentSection />
    </main>
  )
}