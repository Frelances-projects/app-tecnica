'use client'
import { useState } from 'react'

import { SearchInput } from '@/components/SearchInput'
import { ScheduledDrivingLessonsTable } from './ScheduledDrivingLessonsTable'
import { CreateScheduleDrivingClassModal } from './CreateScheduleDrivingClassModal'
import { CreateManyScheduleDrivingClassModal } from './CreateManyScheduleDrivingClassModal'

import { ScheduleClass } from '@/utils/interfaces/schedule-class'
import { Student } from '@/utils/interfaces/student'
import { Select } from '@/components/Select'

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
  const [inputValueDate, setInputValueDate] = useState<string>('all')

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

  const filteredScheduledClassesByDate =
    filteredScheduledClassesByStudentNumber.filter((scheduledClass) => {
      if (inputValueDate === 'all') return filteredScheduledClasses

      const dateFiltered = scheduledClass.schedulingDate === inputValueDate

      return dateFiltered
    })

  const dates = scheduledClasses
    .map((scheduledClass) => {
      return {
        label: scheduledClass.schedulingDate!,
        value: scheduledClass.schedulingDate!,
      }
    })
    .filter((date) => date.value !== null && date.value !== undefined)

  const uniqueDates = dates.filter(
    (date, index, self) =>
      index === self.findIndex((t) => t.value === date.value),
  )

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
            <>
              <CreateScheduleDrivingClassModal
                students={students.map((student) => {
                  return {
                    label: student.name,
                    value: student.id,
                    number: String(student.number),
                    vehicles: student.driverLicenseCategory?.vehicles,
                    school: student.school,
                  }
                })}
              />

              <CreateManyScheduleDrivingClassModal
                students={students.map((student) => {
                  return {
                    label: student.name,
                    value: student.id,
                    number: String(student.number),
                    vehicles: student.driverLicenseCategory?.vehicles,
                    school: student.school,
                  }
                })}
              />
            </>
          )}
        </SearchInput>
      </div>

      <SearchInput
        className="!w-80"
        placeholder="Pesquisar pelo número do aluno"
        setInputValue={setInputValueCode}
        type="number"
      >
        <Select
          className="!w-96"
          placeHolder="Filtrar por dia"
          data={[{ label: 'Todos', value: 'all' }, ...uniqueDates]}
          onChange={(event) => setInputValueDate(event.target.value)}
        />
      </SearchInput>

      <ScheduledDrivingLessonsTable
        scheduledClasses={filteredScheduledClassesByDate}
      />
    </section>
  )
}
