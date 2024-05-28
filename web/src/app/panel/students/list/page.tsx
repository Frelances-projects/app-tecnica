/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { addDays } from 'date-fns'
import { format } from 'date-fns-tz'

import { api } from '@/lib/api'

import { ListOfStudents } from '@/components/ListOfStudents'

import { Student } from '@/utils/interfaces/student'

type AxiosData = {
  students: Student[]
}

export default async function ManageStudents() {
  const user = cookies().get('user')?.value
  const formattedUser = JSON.parse(user!)

  if (formattedUser.function === 'INSTRUCTOR') {
    redirect('/panel/driving-lessons')
  }

  let returnedData
  let schools
  let categoryCard

  if (formattedUser.function === 'DIRECTOR') {
    const [studentData, schoolData] = await Promise.all([
      api.get<AxiosData>(`/student`).then((result) => result.data),
      api.get(`/school`).then((result) => result.data),
    ])

    schools = schoolData.school?.map((school: any) => {
      categoryCard = school.driverLicenseCategories.map((category: any) => {
        return {
          value: category.id,
          label: category.name,
          schoolId: category.schoolId,
        }
      })

      return {
        value: school.id,
        label: school.name,
      }
    })

    returnedData = studentData.students
  } else {
    const [studentData, schoolData] = await Promise.all([
      api
        .get<AxiosData>(`/student/school/${formattedUser.schoolId}`)
        .then((result) => result.data),
      api
        .get(`/school/${formattedUser.schoolId}`)
        .then((result) => result.data),
    ])

    schools = [
      {
        value: schoolData.school.id,
        label: schoolData.school.name,
      },
    ]
    categoryCard = schoolData.school.driverLicenseCategories.map(
      (category: any) => {
        return {
          value: category.id,
          label: category.name,
          schoolId: category.schoolId,
        }
      },
    )

    returnedData = studentData.students
  }

  const formattedData = returnedData?.map((student) => {
    if (student.enrolledAt) {
      const formattedEnrolledAt = format(
        addDays(new Date(student.enrolledAt), 1),
        'dd/MM/yyyy',
      )

      return {
        ...student,
        enrolledAt: formattedEnrolledAt,
      }
    } else {
      return {
        ...student,
        enrolledAt: 'Não informado',
      }
    }
  })

  return (
    <main className="mb-16 mt-14 flex w-full flex-col gap-10 px-4 lg:max-w-[90vw] lg:px-0">
      <h1 className="text-xl">Gerir Alunos</h1>
      <div className="mx-auto -mt-9 h-[1px] w-full max-w-[1440px] bg-[#BFBFBF]" />

      <ListOfStudents
        students={formattedData}
        categoryCard={categoryCard}
        schools={schools}
      />
    </main>
  )
}
