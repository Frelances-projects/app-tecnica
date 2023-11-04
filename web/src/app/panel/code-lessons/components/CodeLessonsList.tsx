'use client'
import { useState } from "react"

import { SearchInput } from "@/components/SearchInput"
import { CodeLessonsTable } from "./CodeLessonsTable"

import { Class } from "@/utils/interfaces/class"

interface CodeLessonsListProps {
  classes: Class[]
}

export function CodeLessonsList({ classes }: CodeLessonsListProps) {
  const [inputValue, setInputValue] = useState<string>('')
  
  const filteredScheduledClasses = classes?.filter(lesson => {
    if (inputValue === '') return lesson

    const filteredByCode = String(lesson.code)?.startsWith(inputValue.toLocaleUpperCase())

    return filteredByCode
  })

  return (
    <section className="w-full max-w-7xl -mt-4 pl-10">
      <h1 className='text-lg mt-6 font-medium mb-9'>Listagem das aulas de código</h1>
      
      <div className="flex items-center max-w-3xl">
        <SearchInput
          setInputValue={setInputValue}
          placeholder="Filtrar por código"
          className="!w-96"
          type="number"
        />
      </div>

      <CodeLessonsTable
        classes={filteredScheduledClasses}
      />
    </section>
  )
}