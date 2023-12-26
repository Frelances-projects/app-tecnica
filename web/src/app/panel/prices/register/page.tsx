import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { CreatePricesSection } from './components/CreatePricesSection'

import { User } from '@/utils/interfaces/user'

export default function RegisterDrivingLessons() {
  const user = cookies().get('user')?.value
  const formattedUser = JSON.parse(user!) as User

  if (formattedUser.function === 'INSTRUCTOR') {
    redirect('/panel/driving-lessons')
  }

  return (
    <main className="mb-16 mt-14 flex w-full max-w-[80vw] flex-col gap-6">
      <h1 className="text-xl">Definir Preços</h1>
      <div className="mx-auto -mt-5 h-[1px] w-full max-w-[1440px] bg-[#BFBFBF]" />

      <CreatePricesSection />
    </main>
  )
}
