/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { CreateInfoForm } from './components/CreateInfoForm'

import { api } from '@/lib/api'

import { User } from '@/utils/interfaces/user'

export default async function CreateInfo() {
  const user = cookies().get('user')?.value

  if (!user) {
    redirect('/')
  }

  const formattedUser = JSON.parse(user!) as User

  if (formattedUser.function === 'INSTRUCTOR') {
    redirect('/panel/driving-lessons')
  }

  const { data } = await api.get(`/school`)

  const schools = data.school?.map((school: any) => {
    return {
      value: school.id,
      label: school.name,
    }
  })

  return (
    <main className="mb-16 mt-14 flex w-full max-w-[800px] flex-col gap-10">
      <h1 className="px-4 text-lg">Criar Alerta</h1>
      <div className="mx-auto -mt-9 h-[1px] w-full max-w-[1440px] bg-[#BFBFBF]" />

      <CreateInfoForm userFunction={formattedUser.function} schools={schools} />
    </main>
  )
}
