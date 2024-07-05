import { cookies } from 'next/headers'

import { api } from '@/lib/api'

import { ScheduledDrivingLessonsList } from './components/ScheduledDrivingLessonsList'

// import { ScheduleClass } from '@/utils/interfaces/schedule-class'
import { Student } from '@/utils/interfaces/student'

// type AxiosData = {
//   scheduledClasses: ScheduleClass[]
//   total: number
// }

type StudentsAxiosData = {
  students: Student[]
}

export default async function DrivingLessons() {
  const user = cookies().get('user')?.value
  const formattedUser = JSON.parse(user!)

  let returnedStudentData

  if (formattedUser.function === 'DIRECTOR') {
    const studentData = await api.get<StudentsAxiosData>(`/student`)

    returnedStudentData = studentData?.data?.students
  } else {
    const studentData = await api.get<StudentsAxiosData>(
      `/student/school/${formattedUser.schoolId}`,
    )

    returnedStudentData = studentData?.data.students
  }

  return (
    <main className="mb-16 mt-14 flex w-full flex-col gap-6 px-4 lg:max-w-[80vw]">
      <h1 className="text-xl">Aulas Condução</h1>
      <div className="-mt-5 h-[1px] w-full max-w-[1440px] bg-[#BFBFBF] lg:mx-auto" />

      <ScheduledDrivingLessonsList
        students={returnedStudentData}
        userFunction={formattedUser.function}
        schoolId={formattedUser.schoolId}
      />
    </main>
  )
}
