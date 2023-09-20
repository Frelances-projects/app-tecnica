import { cookies } from 'next/headers'
import { format } from 'date-fns';

import { api } from '@/lib/api';

import { ListOfStudents } from '@/components/ListOfStudents';

export type Student = {
  id: string;
  name: string;
  email: string;
  number: number;
  driverLicenseCategoryId: string;
  paymentId: string;
  token: string | null;
  schoolId: string;
  enrolledAt: string;
  school: {
    id: string,
    name: string,
  };
}

type AxiosData = {
  students: Student[]
}

export default async function ManageStudents() {
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
    <main className="w-full max-w-[80vw] flex flex-col gap-10 mt-14 mb-16">
      <h1 className='text-xl'>Gerir Alunos</h1>
      <div className='mx-auto -mt-9 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>

      <ListOfStudents students={formattedData} />
    </main>
  )
}