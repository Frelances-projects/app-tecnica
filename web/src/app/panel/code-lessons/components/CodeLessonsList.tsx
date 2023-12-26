'use client'
import { useState } from 'react'

import { SearchInput } from '@/components/SearchInput'
import { CodeLessonsTable } from './CodeLessonsTable'

import { Class } from '@/utils/interfaces/class'

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

  return (
    <section className="-mt-4 w-full max-w-7xl pl-10">
      <h1 className="mb-9 mt-6 text-lg font-medium">
        Listagem das aulas de código
      </h1>

      <div className="flex max-w-3xl items-center">
        <SearchInput
          setInputValue={setInputValue}
          placeholder="Filtrar por código"
          className="!w-96"
          type="number"
        />
      </div>

      <CodeLessonsTable classes={filteredScheduledClasses} />
    </section>
  )
}
