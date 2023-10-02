'use client'

import { useState } from "react";
import { SearchStudentInput } from "./SearchStudentInput";
import { StudentsTable } from "./StudentsTable";

import { Student } from "@/app/panel/students/list/page";

interface ListOfStudentsProps {
  students: Student[];
}

export function ListOfStudents({ students }: ListOfStudentsProps) {
  const [inputValue, setInputValue] = useState<string>('')
  
  const filteredStudents = students?.filter(student => {
    if (inputValue === '') return student

    const studentFiltered = student?.name?.toLocaleUpperCase()?.startsWith(inputValue.toLocaleUpperCase())

    return studentFiltered
  })

  return (
    <section className="w-full max-w-7xl -mt-4 pl-10">
      <h1 className='text-lg mt-6 font-medium mb-9'>Listagem dos Alunos</h1>
      <SearchStudentInput setInputValue={setInputValue} />

      <StudentsTable students={filteredStudents} />
    </section>
  )
}