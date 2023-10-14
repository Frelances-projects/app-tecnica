import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { addDays } from 'date-fns';
import { format } from 'date-fns-tz'

import { api } from '@/lib/api';

import { ListOfStudents } from '@/components/ListOfStudents';

import { Student } from '@/utils/interfaces/student';

type AxiosData = {
  students: Student[]
}

export default async function ManageStudents() {
  const user = cookies().get('user')?.value
  const formattedUser = JSON.parse(user!!)
  
  if (formattedUser.function === 'INSTRUCTOR') {
    redirect('/panel/driving-lessons')
  }

  let returnedData

  if (formattedUser.function === 'DIRECTOR') {
    const { data } = await api.get<AxiosData>(`/student`)

    returnedData = data.students
  } else {
    const { data } = await api.get<AxiosData>(`/student/school/${formattedUser.schoolId}`)

    returnedData = data.students
  }

  const formattedData = returnedData?.map(student => {
    const formattedEnrolledAt = format(addDays(new Date(student.enrolledAt), 1), 'dd/MM/yyyy')

    return {
      ...student,
      enrolledAt: formattedEnrolledAt
    }
  })

  return (
    <main className="w-full max-w-[80vw] flex flex-col gap-10 mt-14 mb-16">
      <h1 className='text-xl'>Gerir Alunos</h1>
      <div className='mx-auto -mt-9 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>

      <ListOfStudents students={formattedData} />
    </main>
  )
}