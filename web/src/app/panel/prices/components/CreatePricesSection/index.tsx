import { cookies } from 'next/headers'

import { api } from "@/lib/api";

import { CreatePricesForm } from "./CreatePricesForm"

import { User } from '@/utils/interfaces/user';

export async function CreatePricesSection() {
  const user = cookies().get('user')?.value
  const formattedUser = JSON.parse(user!!) as User

  let schools

  if (formattedUser.function === 'DIRECTOR') {
    const { data } = await api.get(`/school`)

    schools = data.school?.map((school: any) => {
      return  {
        value: school.id,
        label: school.name
      }
    })
  } else {
    const { data } = await api.get(`/school/${formattedUser.schoolId}`)

    schools = [
      {
        value: data.school.id,
        label: data.school.name
      }
    ]
  }
  
  return (
    <section className="w-full max-w-7xl pl-10">
      <h1 className='text-lg mt-6 font-medium mb-9'>Adicionar Valores</h1>
      
      <CreatePricesForm schools={schools} />
    </section>
  )
}