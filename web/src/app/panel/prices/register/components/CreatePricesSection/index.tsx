/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers'

import { api } from '@/lib/api'

import { CreatePricesForm } from './CreatePricesForm'

import { User } from '@/utils/interfaces/user'

export async function CreatePricesSection() {
  const user = cookies().get('user')?.value
  const formattedUser = JSON.parse(user!) as User

  let schools

  if (formattedUser.function === 'DIRECTOR') {
    const { data } = await api.get(`/school`)

    schools = data.school?.map((school: any) => {
      return {
        value: school.id,
        label: school.name,
      }
    })
  } else {
    const { data } = await api.get(`/school/${formattedUser.schoolId}`)

    schools = [
      {
        value: data.school.id,
        label: data.school.name,
      },
    ]
  }

  return (
    <section className="w-full max-w-7xl lg:pl-10">
      <h1 className="mb-9 mt-6 text-lg font-medium">Adicionar Valores</h1>

      <CreatePricesForm schools={schools} />
    </section>
  )
}
