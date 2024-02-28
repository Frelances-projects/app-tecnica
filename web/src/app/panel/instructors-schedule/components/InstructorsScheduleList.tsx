'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Select } from '@/components/Select'
import { InstructorsScheduleTable } from './InstructorsScheduleTable'
import { InstructorScheduledMobileModal } from './MobileModal'

import type { ScheduleClass } from '@/utils/interfaces/schedule-class'
import type { Test } from '@/utils/interfaces/tests'
import type { User } from '@/utils/interfaces/user'

interface InstructorsScheduleListProps {
  instructorsTest: Test[]
  instructorsLessons: ScheduleClass[]
  instructors?: User[]
  userFunction: 'ADMIN' | 'DIRECTOR' | 'INSTRUCTOR'
  userId: string
}

function parseDate(dateString: string) {
  if (dateString) {
    const parts = dateString?.split('/')
    return new Date(+parts[2], +parts[1] - 1, +parts[0])
  }
}

export function InstructorsScheduleList({
  instructorsTest,
  instructorsLessons,
  userFunction,
  instructors,
  userId,
}: InstructorsScheduleListProps) {
  const [inputValueDate, setInputValueDate] = useState<string>('all')
  const [instructorId, setInstructorId] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 10

  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  const filteredLessonsByDate = instructorsLessons
    .filter((lesson) => {
      if (inputValueDate === 'all') {
        const lessonDate = parseDate(lesson.schedulingDate!)
        return lessonDate! >= currentDate
      }

      const dateFiltered = lesson.schedulingDate === inputValueDate

      return dateFiltered
    })
    .filter(
      (lesson) =>
        lesson.instructorId !== undefined && lesson.instructorId !== null,
    )
    .filter((lesson) => {
      if (instructorId === 'all') return lesson

      const instructorLesson = lesson.instructorId === instructorId

      return instructorLesson
    })

  const myFilteredLessonsByDate = filteredLessonsByDate.filter(
    (lesson) => lesson.instructorId === userId,
  )

  const filteredTestsByDate = instructorsTest
    .filter((test) => {
      if (inputValueDate === 'all') {
        const testDate = parseDate(test.testDate!)
        return testDate! >= currentDate
      }

      const dateFiltered = test.testDate === inputValueDate

      return dateFiltered
    })
    .filter(
      (test) => test.instructorId !== undefined && test.instructorId !== null,
    )
    .filter((test) => {
      if (instructorId === 'all') return test

      const instructorTest = test.instructorId === instructorId

      return instructorTest
    })

  const myFilteredTestsByDate = filteredTestsByDate.filter(
    (test) => test.instructorId === userId,
  )

  const allData = [...filteredLessonsByDate, ...filteredTestsByDate]
  const myData = [...myFilteredLessonsByDate, ...myFilteredTestsByDate]

  const startIndex = currentPage * itemsPerPage
  const slicedAllData = allData?.slice(startIndex, startIndex + itemsPerPage)
  const slicedMyData = myData?.slice(startIndex, startIndex + itemsPerPage)

  const lessonsDate = instructorsLessons
    .map((lesson) => {
      return {
        label: lesson.schedulingDate!,
        value: lesson.schedulingDate!,
      }
    })
    .filter((date) => date.value !== null && date.value !== undefined)

  const testsDate = instructorsTest
    .map((test) => {
      return {
        label: test.testDate!,
        value: test.testDate!,
      }
    })
    .filter((date) => date.value !== null && date.value !== undefined)

  const allDates = [...lessonsDate, ...testsDate]

  const uniqueDates = allDates.filter(
    (date, index, self) =>
      index === self.findIndex((t) => t.value === date.value),
  )

  const futureDates = uniqueDates.filter((dateObj) => {
    const date = parseDate(dateObj.value)
    return date! >= currentDate
  })

  const instructorsToSelect = instructors?.map((instructor) => {
    return {
      label: instructor.name,
      value: instructor.id,
    }
  })

  return (
    <section className="-mt-4 w-full max-w-7xl lg:pl-10">
      <h1 className="mb-9 mt-6 text-lg font-medium">
        Listagem dos afazeres dos instrutores
      </h1>

      <div className="flex max-w-3xl flex-col items-center gap-2 xl:flex-row">
        <Select
          className="lg:!w-96"
          placeHolder="Filtrar por dia"
          data={[{ label: 'Todos', value: 'all' }, ...futureDates]}
          onChange={(event) => setInputValueDate(event.target.value)}
        />

        {userFunction !== 'INSTRUCTOR' && (
          <Select
            className="lg:!w-96"
            placeHolder="Filtrar por instrutor"
            data={[{ label: 'Todos', value: 'all' }, ...instructorsToSelect!]}
            onChange={(event) => setInstructorId(event.target.value)}
          />
        )}
      </div>

      <div className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {userFunction === 'INSTRUCTOR'
          ? slicedMyData.map((item) => (
              <InstructorScheduledMobileModal key={item.id} data={item} />
            ))
          : slicedAllData.map((item) => (
              <InstructorScheduledMobileModal key={item.id} data={item} />
            ))}
      </div>

      <div className="mt-8 hidden lg:block">
        <InstructorsScheduleTable
          data={userFunction === 'INSTRUCTOR' ? slicedMyData : slicedAllData}
        />
      </div>

      <div className="mt-4 flex items-center justify-center gap-6">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-950 text-white duration-200 ease-linear hover:bg-[#E86255]"
        >
          <ChevronLeft size={20} />
        </button>

        <span className="">Página {currentPage + 1}</span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={
            userFunction === 'INSTRUCTOR'
              ? startIndex + itemsPerPage >= myData?.length
              : startIndex + itemsPerPage >= allData?.length
          }
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-950 text-white duration-200 ease-linear hover:bg-[#E86255]"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}
