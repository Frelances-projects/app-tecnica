'use client'
import { useState, SetStateAction } from 'react'

import { SearchInput } from '@/components/SearchInput'
import { CodeLessonsTable } from './CodeLessonsTable'

import { Class } from '@/utils/interfaces/class'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DeleteCodeLesson } from './CodeLessonsTable/DeleteCodeLesson'

interface CodeLessonsListProps {
  classes: Class[]
}

export function CodeLessonsList({ classes }: CodeLessonsListProps) {
  const [inputValue, setInputValue] = useState<string>('')

  const filteredScheduledClasses = classes?.filter((lesson) => {
    if (inputValue === '') return lesson

    const filteredByCode = String(lesson.code)?.startsWith(
      inputValue.toLocaleUpperCase(),
    )

    return filteredByCode
  })

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(0)

  const startIndex = currentPage * itemsPerPage
  const slicedData = filteredScheduledClasses?.slice(
    startIndex,
    startIndex + itemsPerPage,
  )

  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber)
  }

  return (
    <section className="-mt-4 w-full max-w-7xl lg:pl-10">
      <h1 className="mb-9 mt-6 text-lg font-medium">
        Listagem das aulas de código
      </h1>

      <div className="flex max-w-3xl items-center">
        <SearchInput
          setInputValue={setInputValue}
          placeholder="Filtrar por código"
          className="lg:!w-96"
          type="number"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
        {slicedData?.map((lesson) => {
          return (
            <div
              key={lesson?.id}
              className="flex w-full flex-col gap-3 rounded-md border px-4 py-2 hover:border-[#E86255]"
            >
              <div className="flex flex-col gap-2 text-left">
                <div className="flex justify-between">
                  <h1 className="text-lg font-medium">{lesson?.name}</h1>
                  <p>{lesson?.code}</p>
                </div>
                <p className="text-center">{lesson?.category}</p>
                <p className="text-sm text-[#b1b2bc]">{lesson?.description}</p>
              </div>

              <DeleteCodeLesson lesson={lesson} trigger />
            </div>
          )
        })}
      </div>
      <div className="hidden md:flex">
        <CodeLessonsTable classes={slicedData} />
      </div>

      {filteredScheduledClasses?.length > 0 && (
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
              startIndex + itemsPerPage >= filteredScheduledClasses?.length
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
