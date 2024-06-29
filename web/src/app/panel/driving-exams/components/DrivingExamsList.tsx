'use client'
import { useState, SetStateAction } from 'react'

import { SearchInput } from '@/components/SearchInput'
import { CreateDrivingExamsModal } from './CreateDrivingExamsModal'
import { DrivingExamsListTable } from './DrivingExamsListTable'

import { Student } from '@/utils/interfaces/student'
import { Test } from '@/utils/interfaces/tests'

import { ChevronLeft, ChevronRight, User2 } from 'lucide-react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { EditDrivingExamModal } from './DrivingExamsListTable/EditDrivingExamModal'
import { DeleteDrivingExamModal } from './DrivingExamsListTable/DeleteDrivingExamModal'

interface DrivingExamsListProps {
  tests: Test[]
  students: Student[]
  userFunction: 'ADMIN' | 'DIRECTOR' | 'INSTRUCTOR'
}

export function DrivingExamsList({
  tests,
  students,
  userFunction,
}: DrivingExamsListProps) {
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

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(0)

  const startIndex = currentPage * itemsPerPage
  const slicedData = filteredTestByStudentNumber?.slice(
    startIndex,
    startIndex + itemsPerPage,
  )

  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber)
  }

  return (
    <section className="-mt-4 w-full max-w-7xl lg:pl-10">
      <h1 className="mb-9 mt-6 text-lg font-medium">
        Listagem dos Exames de condução marcados
      </h1>

      <div className="flex w-full items-center lg:max-w-3xl">
        <SearchInput
          setInputValue={setInputValueName}
          placeholder="Filtrar por nome de aluno"
          className="md:!w-96"
        >
          {userFunction !== 'INSTRUCTOR' && (
            <CreateDrivingExamsModal
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
          )}
        </SearchInput>
      </div>

      <SearchInput
        className="!-mt-5 md:!w-96"
        placeholder="Pesquisar pelo número do aluno"
        setInputValue={setInputValueCode}
        type="number"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {slicedData?.map((exam) => {
          return (
            <Dialog key={exam?.id}>
              <DialogTrigger className="flex w-full gap-3 rounded-md border px-3 py-2 hover:border-[#E86255]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E86255] text-white">
                  <User2 size={24} />
                </div>
                <div className="w-[80%] text-left">
                  <p className="w-[85%] truncate font-medium">
                    {exam?.student?.name}
                  </p>
                  <p className="w-[85%] truncate text-sm text-[#b1b2bc]">
                    {exam.testDate} {exam.testHour}
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="w-full max-w-[95vw] sm:max-w-96">
                <div className="mt-4 flex flex-col gap-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E86255] text-white">
                    <User2 size={32} />
                  </div>
                  <div className="text-center">
                    <h1 className="text-lg font-medium">
                      {exam?.student?.name}
                    </h1>
                    <p className="text-[#b1b2bc]">{exam?.student?.email}</p>
                    <p className="text-[#b1b2bc]">{exam?.student?.phone}</p>

                    <div className="mt-4 flex flex-col gap-2 border-y py-2 text-left">
                      <p className="mt-2 flex items-center justify-between">
                        Escola: <span>{exam.student?.school?.name}</span>
                      </p>

                      <p className="flex items-center justify-between">
                        Data:{' '}
                        <span>
                          {exam.testDate} {exam.testHour}
                        </span>
                      </p>

                      <p className="flex items-center justify-between">
                        Status:{' '}
                        <span>
                          {exam.status === 'APPROVED'
                            ? 'APROVADO'
                            : exam.status === 'DISAPPROVED'
                              ? 'REPROVADO'
                              : 'MARCADO'}
                        </span>
                      </p>

                      <p className="flex items-center justify-between">
                        Instrutor:{' '}
                        <span>{exam?.instructor?.name ?? 'Não informado'}</span>
                      </p>
                    </div>
                    <div className="mt-4 flex gap-4">
                      <EditDrivingExamModal test={exam} trigger />
                      <DeleteDrivingExamModal test={exam} trigger />
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )
        })}
      </div>
      <div className="hidden lg:block">
        <DrivingExamsListTable tests={slicedData} />
      </div>

      {filteredTestByStudentNumber?.length > 0 && (
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
              startIndex + itemsPerPage >= filteredTestByStudentNumber?.length
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
