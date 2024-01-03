'use client'
import { useState } from 'react'

import { SearchInput } from '@/components/SearchInput'
import { ScheduledDrivingLessonsTable } from './ScheduledDrivingLessonsTable'
import { CreateScheduleDrivingClassModal } from './CreateScheduleDrivingClassModal'

import { ScheduleClass } from '@/utils/interfaces/schedule-class'
import { Student } from '@/utils/interfaces/student'

interface ScheduledDrivingLessonsListProps {
  scheduledClasses: ScheduleClass[]
  students: Student[]
  userFunction: 'ADMIN' | 'DIRECTOR' | 'INSTRUCTOR'
}

export function ScheduledDrivingLessonsList({
  scheduledClasses,
  students,
  userFunction,
}: ScheduledDrivingLessonsListProps) {
  const [inputValueName, setInputValueName] = useState<string>('')
  const [inputValueCode, setInputValueCode] = useState<string>('')

  const filteredScheduledClasses = scheduledClasses?.filter(
    (scheduledClass) => {
      if (inputValueName === '') return scheduledClass

      const studentFiltered = scheduledClass.student?.name
        ?.toLocaleUpperCase()
        ?.startsWith(inputValueName.toLocaleUpperCase())

      return studentFiltered
    },
  )

  const filteredScheduledClassesByStudentNumber =
    filteredScheduledClasses.filter((scheduledClass) => {
      if (inputValueCode === '') return filteredScheduledClasses

      const studentFiltered = String(scheduledClass.student?.number)
        ?.toLocaleUpperCase()
        ?.startsWith(inputValueCode.toLocaleUpperCase())

      return studentFiltered
    })

  return (
    <section className="-mt-4 w-full max-w-7xl pl-10">
      <h1 className="mb-9 mt-6 text-lg font-medium">
        Listagem das aulas de condução marcadas
      </h1>

      <div className="flex max-w-3xl items-center">
        <SearchInput
          setInputValue={setInputValueName}
          placeholder="Filtrar por nome de aluno"
          className="!w-96"
        >
          {userFunction !== 'INSTRUCTOR' && (
            <CreateScheduleDrivingClassModal
              students={students.map((student) => {
                return { label: student.name, value: student.id }
              })}
            />
          )}
        </SearchInput>
      </div>

      <SearchInput
        className="!-mt-5 !w-96"
        placeholder="Pesquisar pelo número do aluno"
        setInputValue={setInputValueCode}
        type="number"
      />

      <ScheduledDrivingLessonsTable
        scheduledClasses={filteredScheduledClassesByStudentNumber}
      />
    </section>
  )
}
