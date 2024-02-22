/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers'

import { api } from '@/lib/api'

import { RegisterStudentForm } from './RegisterStudentForm'

import type { User } from '@/utils/interfaces/user'
import type { Group } from '@/utils/interfaces/group'

type AxiosData = {
  group: Group
}

export async function RegisterStudentSection() {
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

  const { data } = await api.get<AxiosData>('/group/name/find', {
    params: { groupName: 'Grupo Técnica' },
  })
  const categories = data.group?.schools.flatMap((school) => {
    return school.driverLicenseCategories
  })
  const categoryCard = categories.map((category) => {
    return {
      value: category.id,
      label: category.name,
      schoolId: category.schoolId,
    }
  })

  return (
    <section className="w-full max-w-7xl px-4 lg:pl-10">
      <h1 className="mb-11 mt-5 text-lg font-medium">Adicionar Alunos</h1>

      <RegisterStudentForm
        schools={schools}
        categoryCard={categoryCard as any}
      />
    </section>
  )
}
