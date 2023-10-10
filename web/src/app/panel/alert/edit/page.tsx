import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { EditInfoForm } from "./components/EditInfoForm";

import { api } from "@/lib/api";

import { User } from '@/utils/interfaces/user';

export type Information = {
  id: string
  name: string
  description: string
  date: string
  schoolId: string
}

type AxiosData = {
  information: Information[]
}

export default async function EditInfo() {
  const user = cookies().get('user')?.value
  const formattedUser = JSON.parse(user!!) as User

  if (formattedUser.function === 'INSTRUCTOR') {
    redirect('/panel/driving-lessons')
  }

  const { data } = await api.get<AxiosData>(`/information/school/${formattedUser.schoolId}`)
  
  return (
    <main className="w-full max-w-[800px] flex flex-col gap-10 mt-14 mb-16">
      <h1 className='text-lg'>Editar Alerta</h1>
      <div className='mx-auto -mt-9 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>

      <EditInfoForm information={data.information} />
    </main>
  )
}