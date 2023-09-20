import { cookies } from 'next/headers'
import { format } from 'date-fns';

import { api } from '@/lib/api';

import { ListOfStudents } from "@/components/ListOfStudents";

import { Student } from '../students/list/page';

type AxiosData = {
  students: Student[]
}

export default async function DrivingExams() {
  const user = cookies().get('user')?.value
  const formattedUser = JSON.parse(user!!)
  
  const { data } = await api.get<AxiosData>(`/student/school/${formattedUser.schoolId}`)

  const formattedData = data.students.map(student => {
    const formattedEnrolledAt = format(new Date(student.enrolledAt), 'dd/MM/yyyy')

    return {
      ...student,
      enrolledAt: formattedEnrolledAt
    }
  })
  
  return (
    <main className="w-full max-w-[80vw] flex flex-col gap-6 mt-14 mb-16">
      <h1 className='text-xl'>Exames Condução</h1>
      <div className='mx-auto -mt-5 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>

      <ListOfStudents students={formattedData} />
    </main>
  )
}