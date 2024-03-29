import { cookies } from 'next/headers'
import { format } from 'date-fns-tz'

import { api } from '@/lib/api'

import { CodeExamsList } from './components/CodeExamsList'

import { User } from '@/utils/interfaces/user'
import { Test } from '@/utils/interfaces/tests'
import { Student } from '@/utils/interfaces/student'

type AxiosData = {
  test: Test[]
}

type StudentsAxiosData = {
  students: Student[]
}

export default async function CodeExams() {
  const user = cookies().get('user')?.value
  const formattedUser = JSON.parse(user!) as User

  let returnedData
  let returnedStudentData

  if (formattedUser.function === 'DIRECTOR') {
    const [testsData, studentsData] = await Promise.all([
      api
        .get<AxiosData>(`/test/categories/category`, {
          params: { category: 'THEORETICAL' },
        })
        .then((result) => result.data),
      api.get<StudentsAxiosData>(`/student`).then((result) => result.data),
    ])

    returnedData = testsData.test
    returnedStudentData = studentsData.students
  } else {
    const [testsData, studentsData] = await Promise.all([
      api
        .get<AxiosData>(`/test/school/${formattedUser.schoolId}/category`, {
          params: { category: 'THEORETICAL' },
        })
        .then((result) => result.data),
      api
        .get<StudentsAxiosData>(`/student/school/${formattedUser.schoolId}`)
        .then((result) => result.data),
    ])

    returnedData = testsData.test
    returnedStudentData = studentsData.students
  }

  const formattedData = returnedData?.map((test) => {
    const formattedTestDate = format(new Date(test.testDate), 'dd/MM/yyyy')

    return {
      ...test,
      testDate: formattedTestDate,
      testDateNotFormatted: test.testDate,
    }
  })

  return (
    <main className="mb-16 mt-14 flex w-full flex-col gap-6 px-4 lg:max-w-[80vw] lg:px-0">
      <h1 className="text-xl">Exames Código</h1>
      <div className="mx-auto -mt-5 h-[1px] w-full max-w-[1440px] bg-[#BFBFBF]" />

      <CodeExamsList
        tests={formattedData}
        students={returnedStudentData}
        userFunction={formattedUser.function}
      />
    </main>
  )
}
