'use client'
import { useState } from 'react'
import { SearchInput } from './SearchInput'
import { StudentsTable } from './StudentsTable'

import { Student } from '@/utils/interfaces/student'

interface ListOfStudentsProps {
  students: Student[]
  activePathname: string
  categoryCard?: {
    value: string
    label: string
    schoolId: string
  }[]
  schools?: {
    value: string
    label: string
  }[]
}

export function ListOfStudents({
  students,
  activePathname,
  categoryCard,
  schools,
}: ListOfStudentsProps) {
  const [inputValue, setInputValue] = useState<string>('')

  const filteredStudents = students?.filter((student) => {
    if (inputValue === '') return student

    const studentFiltered = student?.name
      ?.toLocaleUpperCase()
      ?.startsWith(inputValue.toLocaleUpperCase())

    return studentFiltered
  })

  return (
    <section className="-mt-4 w-full max-w-7xl pl-10">
      <h1 className="mb-9 mt-6 text-lg font-medium">Listagem dos Alunos</h1>
      <SearchInput setInputValue={setInputValue} />

      <StudentsTable
        students={filteredStudents}
        activePathname={activePathname}
        schools={schools!}
        categoryCard={categoryCard!}
      />
    </section>
  )
}
