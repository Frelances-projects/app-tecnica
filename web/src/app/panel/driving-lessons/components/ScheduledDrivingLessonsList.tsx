'use client'
import { useState } from "react"

import { SearchInput } from "@/components/SearchInput"
import { ScheduledDrivingLessonsTable } from "./ScheduledDrivingLessonsTable"
import { CreateScheduleDrivingClassModal } from "./CreateScheduleDrivingClassModal"

import { ScheduleClass } from "@/utils/interfaces/schedule-class"
import { Student } from "@/utils/interfaces/student"

interface ScheduledDrivingLessonsListProps {
  scheduledClasses: ScheduleClass[]
  students: Student[];
  userFunction: 'ADMIN' | 'DIRECTOR' | 'INSTRUCTOR'
}

export function ScheduledDrivingLessonsList({ scheduledClasses, students, userFunction }: ScheduledDrivingLessonsListProps) {
  const [inputValue, setInputValue] = useState<string>('')
  
  const filteredScheduledClasses = scheduledClasses?.filter(scheduledClass => {
    if (inputValue === '') return scheduledClass

    const studentFiltered = scheduledClass.student?.name?.toLocaleUpperCase()?.startsWith(inputValue.toLocaleUpperCase())

    return studentFiltered
  })

  return (
    <section className="w-full max-w-7xl -mt-4 pl-10">
      <h1 className='text-lg mt-6 font-medium mb-9'>Listagem das aulas de condução marcadas</h1>
      
      <div className="flex items-center max-w-3xl">
        <SearchInput
          setInputValue={setInputValue}
          placeholder="Filtrar por nome de aluno"
          className="!w-96"
        >
          {userFunction !== 'INSTRUCTOR' && (
            <CreateScheduleDrivingClassModal
              students={students.map(student => { return { label: student.name, value: student.id } })}
            />
          )}
        </SearchInput>
      </div>

      <ScheduledDrivingLessonsTable
        scheduledClasses={filteredScheduledClasses}
      />
    </section>
  )
}