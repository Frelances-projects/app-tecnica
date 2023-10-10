import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { CreatePricesSection } from "./components/CreatePricesSection";

import { User } from '@/utils/interfaces/user';

export default function DrivingLessons() {
  const user = cookies().get('user')?.value
  const formattedUser = JSON.parse(user!!) as User

  if (formattedUser.function === 'INSTRUCTOR') {
    redirect('/panel/driving-lessons')
  }
  
  return (
    <main className="w-full max-w-[80vw] flex flex-col gap-6 mt-14 mb-16">
      <h1 className='text-xl'>Definir Preços</h1>
      <div className='mx-auto -mt-5 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>

      <CreatePricesSection />
    </main>
  )
}