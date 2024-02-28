'use client'
import { useState, SetStateAction } from 'react'
import { SearchInput } from '../SearchInput'
import { StudentsTable } from '../StudentsTable'

import { Student } from '@/utils/interfaces/student'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { StudentMobileModal } from './StudentMobileModal'

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

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(0)

  const startIndex = currentPage * itemsPerPage
  const slicedData = filteredStudentsByNumber?.slice(
    startIndex,
    startIndex + itemsPerPage,
  )

  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber)
  }

  return (
    <section className="-mt-4 w-full lg:max-w-7xl lg:pl-10">
      <h1 className="mb-9 mt-6 text-lg font-medium">Listagem dos Alunos</h1>
      <div className="flex flex-col sm:max-w-80 sm:flex-row sm:gap-4 lg:max-w-80 xl:max-w-96">
        <SearchInput setInputValue={setInputValueName} />
        <div className="-mt-4 w-full sm:-mt-0">
          <SearchInput
            placeholder="Pesquisar pelo número do aluno"
            setInputValue={setInputValueCode}
            type="number"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {slicedData?.map((student) => {
          return (
            <StudentMobileModal
              key={student.id}
              student={student}
              schools={schools!}
              categoryCard={categoryCard!}
            />
          )
        })}
      </div>

      <div className="hidden lg:block">
        <StudentsTable
          students={slicedData}
          schools={schools!}
          categoryCard={categoryCard!}
        />
      </div>

      {filteredStudentsByNumber?.length > 0 && (
        <div className="mt-4 flex items-center justify-center gap-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-950 text-white duration-200 ease-linear hover:bg-[#E86255]"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="">Página {currentPage + 1}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              startIndex + itemsPerPage >= filteredStudentsByNumber?.length
            }
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-950 text-white duration-200 ease-linear hover:bg-[#E86255]"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </section>
  )
}
