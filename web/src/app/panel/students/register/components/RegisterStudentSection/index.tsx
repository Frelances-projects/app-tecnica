import { cookies } from 'next/headers'

import { api } from "@/lib/api";

import { RegisterStudentForm } from "./RegisterStudentForm";

import { User } from '@/utils/interfaces/user';

export async function RegisterStudentSection() {
  const user = cookies().get('user')?.value
  const formattedUser = JSON.parse(user!!) as User

  let schools
  let categoryCard

  if (formattedUser.function === 'DIRECTOR') {
    const { data } = await api.get(`/school`)

    schools = data.school?.map((school: any) => {
      categoryCard = school.driverLicenseCategories.map((category: any) => {
        return {
          value: category.id,
          label: category.name,
          schoolId: category.schoolId
        }
      })

      return {
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
    categoryCard = data.school.driverLicenseCategories.map((category: any) => {
      return {
        value: category.id,
        label: category.name,
        schoolId: category.schoolId
      }
    })
  }

  return (
    <section className="w-full max-w-7xl pl-10">
      <h1 className='mb-11 mt-5 text-lg font-medium'>Adicionar Alunos</h1>

      <RegisterStudentForm schools={schools} categoryCard={categoryCard} />
    </section>
  )
}