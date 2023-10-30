import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EditStudentModal } from '../EditStudentModal';
import { DeleteStudentModal } from '../DeleteStudentModal';
import { CreateMarkupDialog } from './CreateMarkupDialog';

import { Student } from '@/utils/interfaces/student'

interface StudentsTableProps {
  students: Student[]
  activePathname: string
  categoryCard: {
    value: string;
    label: string;
    schoolId: string
  }[]
  schools: {
    value: string;
    label: string;
  }[]
}

export function StudentsTable({ students, activePathname, schools, categoryCard }: StudentsTableProps) {
  const haveCalendar = activePathname !== '/panel/students/list'
  const hasEditStudentModal = activePathname === '/panel/students/list'
  
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
            {hasEditStudentModal && (
              <TableHead>Editar</TableHead>
            )}
            <TableHead>Deletar</TableHead>
            {haveCalendar && (
              <TableHead>Agendar</TableHead>
            )}
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
              {hasEditStudentModal && (
                <TableCell>
                  <EditStudentModal
                    student={student}
                    schools={schools}
                    categoryCard={categoryCard}
                  />
                </TableCell>
              )}
              <TableCell>
                <DeleteStudentModal id={student?.id} title={student?.name} />
              </TableCell>
              {haveCalendar && (
                <TableCell>
                  <CreateMarkupDialog />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </TableComponent>
    </div>
  )
}