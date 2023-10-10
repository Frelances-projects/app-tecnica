import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { api } from '@/lib/api';

import { CreateCodeCalendarForm } from "./components/CreateCodeCalendarForm";

import { User } from '@/utils/interfaces/user';

export default async function CreateCodeCalendar() {
  const user = cookies().get('user')?.value
  const formattedUser = JSON.parse(user!!) as User

  if (formattedUser.function === 'INSTRUCTOR') {
    redirect('/panel/driving-lessons')
  }

  const { data } = await api.get(`/school`)

  const schools = data.school?.map((school: any) => {
    return  {
      value: school.id,
      label: school.name
    }
  })

  return (
    <div className="w-full max-w-[810px] flex flex-col gap-3 mt-14 mb-16">
      <h1 className='text-lg'>Adicionar Calendário Código</h1>
      <div className='mx-auto -mt-1 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>

      <CreateCodeCalendarForm userFunction={formattedUser.function} schools={schools}  />
    </div>

  )
}