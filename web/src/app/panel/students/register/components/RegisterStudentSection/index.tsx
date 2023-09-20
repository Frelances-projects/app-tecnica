import { cookies } from 'next/headers'

import { api } from "@/lib/api";

import { RegisterStudentForm } from "./RegisterStudentForm";

export async function RegisterStudentSection() {
  const user = cookies().get('user')?.value
  const formattedUser = JSON.parse(user!!)

  const { data } = await api.get(`/school/${formattedUser.schoolId}`)

  const schools = [
    {
      value: data.school.id,
      label: data.school.name
    }
  ]
  const categoryCard = data.school.driverLicenseCategories.map((category: any) => {
    return {
      value: category.id,
      label: category.name
    }
  })
  
  return (
    <section className="w-full max-w-7xl pl-10">
      <h1 className='mb-11 mt-5 text-lg font-medium'>Adicionar Alunos</h1>

      <RegisterStudentForm schools={schools} categoryCard={categoryCard} />
    </section>
  )
}