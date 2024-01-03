'use client'
import { useState } from 'react'
import { SearchInput } from './SearchInput'
import { StudentsTable } from './StudentsTable'

import { Student } from '@/utils/interfaces/student'

interface ListOfStudentsProps {
  students: Student[]
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
  categoryCard,
  schools,
}: ListOfStudentsProps) {
  const [inputValueName, setInputValueName] = useState<string>('')
  const [inputValueCode, setInputValueCode] = useState<string>('')

  const filteredStudents = students?.filter((student) => {
    if (inputValueName === '') return student

    const studentFiltered = student?.name
      ?.toLocaleUpperCase()
      ?.startsWith(inputValueName.toLocaleUpperCase())

    return studentFiltered
  })

  const filteredStudentsByNumber = filteredStudents.filter((student) => {
    if (inputValueCode === '') return filteredStudents

    const studentFiltered = String(student?.number)
      ?.toLocaleUpperCase()
      ?.startsWith(inputValueCode.toLocaleUpperCase())

    return studentFiltered
  })

  return (
    <section className="-mt-4 w-full max-w-7xl pl-10">
      <h1 className="mb-9 mt-6 text-lg font-medium">Listagem dos Alunos</h1>
      <div className="flex">
        <SearchInput setInputValue={setInputValueName} />
        <SearchInput
          placeholder="Pesquisar pelo número do aluno"
          setInputValue={setInputValueCode}
          type="number"
        />
      </div>

      <StudentsTable
        students={filteredStudentsByNumber}
        schools={schools!}
        categoryCard={categoryCard!}
      />
    </section>
  )
}
