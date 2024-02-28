/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers'
import { format } from 'date-fns-tz'

import { InstructorsScheduleList } from './components/InstructorsScheduleList'

import { api } from '@/lib/api'

import type { ScheduleClass } from '@/utils/interfaces/schedule-class'
import type { Test } from '@/utils/interfaces/tests'
import type { User } from '@/utils/interfaces/user'

type AxiosData = {
  scheduledClasses: ScheduleClass[]
}

type TestAxiosData = {
  test: Test[]
}

type InstructorAxiosData = {
  users: User[]
}

export default async function InstructorsSchedule() {
  const user = cookies().get('user')?.value
  const formattedUser = JSON.parse(user!)

  let returnedData
  let testReturnedData
  let instructorsReturnedData

  if (
    formattedUser.function === 'DIRECTOR' ||
    formattedUser.function === 'ADMIN'
  ) {
    const [scheduleClassesData, testData, userData] = await Promise.all([
      api
        .get<AxiosData>(`/scheduled-class/classes/category`, {
          params: { category: 'PRACTICAL' },
        })
        .then((result) => result.data),
      api.get<TestAxiosData>(`/test`).then((result) => result.data),
      api.get<InstructorAxiosData>(`/user`).then((result) => result.data),
    ])

    returnedData = scheduleClassesData.scheduledClasses
    testReturnedData = testData.test
    instructorsReturnedData = userData.users.filter(
      (user) => user.function === 'INSTRUCTOR',
    )
  } else {
    const [scheduleClassesData, testData] = await Promise.all([
      api
        .get<AxiosData>(`/scheduled-class/category/${formattedUser.schoolId}`, {
          params: { category: 'PRACTICAL' },
        })
        .then((result) => result.data),
      api
        .get<TestAxiosData>(`/test/school/${formattedUser.schoolId}`)
        .then((result) => result.data),
    ])

    returnedData = scheduleClassesData.scheduledClasses
    testReturnedData = testData.test
  }

  const formattedScheduledClassData = returnedData?.map((scheduledClass) => {
    if (scheduledClass.schedulingDate) {
      const formattedSchedulingDate = format(
        new Date(scheduledClass.schedulingDate),
        'dd/MM/yyyy',
      )

      return {
        ...scheduledClass,
        schedulingDate: formattedSchedulingDate,
        schedulingDateNotFormatted: scheduledClass.schedulingDate,
        slug: 'scheduled-class',
      }
    } else {
      return {
        ...scheduledClass,
        slug: 'scheduled-class',
      }
    }
  })

  const formattedTestData = testReturnedData?.map((test) => {
    const formattedTestDate = format(new Date(test.testDate), 'dd/MM/yyyy')

    return {
      ...test,
      testDate: formattedTestDate,
      testDateNotFormatted: test.testDate,
      slug: 'test',
    }
  })

  return (
    <main className="mb-16 mt-14 flex w-full flex-col gap-10 px-4 lg:max-w-[90vw] lg:px-0">
      <h1 className="text-xl">Agenda dos instrutores</h1>
      <div className="mx-auto -mt-9 h-[1px] w-full max-w-[1440px] bg-[#BFBFBF]" />

      <InstructorsScheduleList
        instructorsLessons={formattedScheduledClassData as any}
        instructorsTest={formattedTestData as any}
        userFunction={formattedUser.function}
        instructors={instructorsReturnedData}
        userId={formattedUser.id}
      />
    </main>
  )
}
