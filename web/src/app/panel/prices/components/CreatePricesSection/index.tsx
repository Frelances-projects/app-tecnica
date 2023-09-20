import { cookies } from 'next/headers'

import { api } from "@/lib/api";

import { CreatePricesForm } from "./CreatePricesForm"

export async function CreatePricesSection() {
  const user = cookies().get('user')?.value
  const formattedUser = JSON.parse(user!!)

  const { data } = await api.get(`/school/${formattedUser.schoolId}`)

  const schools = [
    {
      value: data.school.id,
      label: data.school.name
    }
  ]
  
  return (
    <section className="w-full max-w-7xl pl-10">
      <h1 className='text-lg mt-6 font-medium mb-9'>Adicionar Valores</h1>
      
      <CreatePricesForm schools={schools} />
    </section>
  )
}