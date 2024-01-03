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
  const [inputValueName, setInputValueName] = useState<string>('')
  const [inputValueCode, setInputValueCode] = useState<string>('')

  const filteredTests = tests?.filter((test) => {
    if (inputValueName === '') return test

    const testFilteredByStudent = test.student?.name
      ?.toLocaleUpperCase()
      ?.startsWith(inputValueName.toLocaleUpperCase())

    return testFilteredByStudent
  })

  const filteredTestByStudentNumber = filteredTests.filter((test) => {
    if (inputValueCode === '') return filteredTests

    const studentFiltered = String(test.student?.number)
      ?.toLocaleUpperCase()
      ?.startsWith(inputValueCode.toLocaleUpperCase())

    return studentFiltered
  })

  return (
    <section className="-mt-4 w-full max-w-7xl pl-10">
      <h1 className="mb-9 mt-6 text-lg font-medium">
        Listagem dos Exames de código marcados
      </h1>

      <div className="flex max-w-3xl items-center">
        <SearchInput
          setInputValue={setInputValueName}
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

      <SearchInput
        className="!-mt-5 !w-96"
        placeholder="Pesquisar pelo número do aluno"
        setInputValue={setInputValueCode}
        type="number"
      />

      <CodeExamsListTable tests={filteredTestByStudentNumber} />
    </section>
  )
}
