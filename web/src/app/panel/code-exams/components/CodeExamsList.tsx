'use client'
import { useState } from "react"

import { SearchInput } from "@/components/SearchInput"
import { CreateCodeExamModal } from "./CreateCodeExamModal"
import { CodeExamsListTable } from "./CodeExamsListTable"

import { Student } from "@/utils/interfaces/student"
import { Test } from "@/utils/interfaces/tests"

interface CodeExamsListProps {
  tests: Test[]
  students: Student[]
  userFunction: 'ADMIN' | 'DIRECTOR' | 'INSTRUCTOR'
}

export function CodeExamsList({ tests, students, userFunction }: CodeExamsListProps) {
  const [inputValue, setInputValue] = useState<string>('')
  
  const filteredTests = tests?.filter(test => {
    if (inputValue === '') return test

    const testFilteredByStudent = test.student?.name?.toLocaleUpperCase()?.startsWith(inputValue.toLocaleUpperCase())

    return testFilteredByStudent
  })

  return (
    <section className="w-full max-w-7xl -mt-4 pl-10">
      <h1 className='text-lg mt-6 font-medium mb-9'>Listagem dos Exames de código marcados</h1>
      
      <div className="flex items-center max-w-3xl">
        <SearchInput
          setInputValue={setInputValue}
          placeholder="Filtrar por nome de aluno"
          className="!w-96"
        >
          {userFunction !== 'INSTRUCTOR' && (
            <CreateCodeExamModal
              students={students.map(student => { return { label: student.name, value: student.id } })}
            />
          )}
        </SearchInput>
      </div>

      <CodeExamsListTable
        tests={filteredTests}
      />
    </section>
  )
}