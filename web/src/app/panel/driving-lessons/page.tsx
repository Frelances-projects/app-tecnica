import { cookies } from 'next/headers'
import { format } from 'date-fns-tz'

import { api } from '@/lib/api';

import { ScheduledDrivingLessonsList } from './components/ScheduledDrivingLessonsList';

import { ScheduleClass } from '@/utils/interfaces/schedule-class';
import { Student } from '@/utils/interfaces/student';

type AxiosData = {
  scheduledClasses: ScheduleClass[]
}

type StudentsAxiosData = {
  students: Student[]
}

export default async function DrivingLessons() {
  const user = cookies().get('user')?.value
  const formattedUser = JSON.parse(user!!)
  
  let returnedData
  let returnedStudentData

  if (formattedUser.function === 'DIRECTOR') {
    const [scheduleClassesData, studentData] = await Promise.all([
      api.get<AxiosData>(`/scheduled-class/classes/category`, 
        { params: { category: 'PRACTICAL' } }
      ).then(result => result.data),
      api.get<StudentsAxiosData>(`/student`).then(result => result.data)
    ])

    returnedData = scheduleClassesData.scheduledClasses
    returnedStudentData = studentData.students
  } else {
    const [scheduleClassesData, studentData] = await Promise.all([
      api.get<AxiosData>(`/scheduled-class/category/${formattedUser.schoolId}`, 
        { params: { category: 'PRACTICAL' } }
      ).then(result => result.data),
      api.get<StudentsAxiosData>(`/student/school/${formattedUser.schoolId}`).then(result => result.data)
    ])

    returnedData = scheduleClassesData.scheduledClasses
    returnedStudentData = studentData.students
  }
  
  const formattedData = returnedData?.map(scheduledClass => {
    if (scheduledClass.schedulingDate) {
      const formattedSchedulingDate = format(new Date(scheduledClass.schedulingDate), 'dd/MM/yyyy')

      return {
        ...scheduledClass,
        schedulingDate: formattedSchedulingDate
      }
    } else {
      return {
        ...scheduledClass,
      }
    }
  })
  
  return (
    <main className="w-full max-w-[80vw] flex flex-col gap-6 mt-14 mb-16">
      <h1 className='text-xl'>Aulas Condução</h1>
      <div className='mx-auto -mt-5 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>
      
      <ScheduledDrivingLessonsList
        scheduledClasses={formattedData}
        students={returnedStudentData}
      />
    </main>
  )
}