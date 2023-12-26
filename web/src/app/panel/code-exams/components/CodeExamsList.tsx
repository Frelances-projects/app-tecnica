'use client'
import { useState } from 'react'

import { SearchInput } from '@/components/SearchInput'
import { CreateCodeExamModal } from './CreateCodeExamModal'
import { CodeExamsListTable } from './CodeExamsListTable'

import { Student } from '@/utils/interfaces/student'
import { Test } from '@/utils/interfaces/tests'

interface CodeExamsListProps {
  tests: Test[]
  students: Student[]
  userFunction: 'ADMIN' | 'DIRECTOR' | 'INSTRUCTOR'
}

export function CodeExamsList({
  tests,
  students,
  userFunction,
}: CodeExamsListProps) {
  const [inputValue, setInputValue] = useState<string>('')

  const filteredTests = tests?.filter((test) => {
    if (inputValue === '') return test

    const testFilteredByStudent = test.student?.name
      ?.toLocaleUpperCase()
      ?.startsWith(inputValue.toLocaleUpperCase())

    return testFilteredByStudent
  })

  return (
    <section className="-mt-4 w-full max-w-7xl pl-10">
      <h1 className="mb-9 mt-6 text-lg font-medium">
        Listagem dos Exames de código marcados
      </h1>

      <div className="flex max-w-3xl items-center">
        <SearchInput
          setInputValue={setInputValue}
          placeholder="Filtrar por nome de aluno"
          className="!w-96"
        >
          {userFunction !== 'INSTRUCTOR' && (
            <CreateCodeExamModal
              students={students.map((student) => {
                return { label: student.name, value: student.id }
              })}
            />
          )}
        </SearchInput>
      </div>

      <CodeExamsListTable tests={filteredTests} />
    </section>
  )
}
