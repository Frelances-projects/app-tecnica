import { Pencil, Trash } from 'lucide-react'

import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Student } from '@/app/panel/students/list/page'

interface StudentsTableProps {
  students: Student[]
}

export function StudentsTable({ students }: StudentsTableProps) {
  return (
    <div className="relative overflow-x-auto">
      <TableComponent>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Número</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Data inscrição</TableHead>
            <TableHead>Escola de registro</TableHead>
            <TableHead>Editar</TableHead>
            <TableHead>Deletar</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {students.map(student => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.number}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.enrolledAt}</TableCell>
              <TableCell>{student.school.name}</TableCell>
              <TableCell>
                <Pencil size={16} className="hover:cursor-pointer" />
              </TableCell>
              <TableCell>
                <Trash size={16} className="hover:cursor-pointer hover:text-red-500" />
              </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </TableComponent>
    </div>
  )
}