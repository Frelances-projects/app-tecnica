import { SearchStudentInput } from "./SearchStudentInput";
import { StudentsTable } from "./StudentsTable";

import { Student } from "@/app/panel/students/list/page";

interface ListOfStudentsProps {
  students: Student[];
}

export function ListOfStudents({ students }: ListOfStudentsProps) {
  return (
    <section className="w-full max-w-7xl -mt-4 pl-10">
      <h1 className='text-lg mt-6 font-medium mb-9'>Listagem dos Alunos</h1>
      <SearchStudentInput />

      <StudentsTable students={students} />
    </section>
  )
}