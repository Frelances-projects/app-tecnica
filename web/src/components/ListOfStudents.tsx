'use client'
import { useState } from "react";
import { SearchInput } from "./SearchInput";
import { StudentsTable } from "./StudentsTable";

import { Student } from "@/utils/interfaces/student";

interface ListOfStudentsProps {
  students: Student[];
  activePathname: string
  categoryCard?: {
    value: string;
    label: string;
    schoolId: string
  }[]
  schools?: {
    value: string;
    label: string;
  }[]
}

export function ListOfStudents({ students, activePathname, categoryCard, schools }: ListOfStudentsProps) {
  const [inputValue, setInputValue] = useState<string>('')
  
  const filteredStudents = students?.filter(student => {
    if (inputValue === '') return student

    const studentFiltered = student?.name?.toLocaleUpperCase()?.startsWith(inputValue.toLocaleUpperCase())

    return studentFiltered
  })

  return (
    <section className="w-full max-w-7xl -mt-4 pl-10">
      <h1 className='text-lg mt-6 font-medium mb-9'>Listagem dos Alunos</h1>
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