import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EditStudentModal } from '../EditStudentModal'
import { DeleteStudentModal } from '../DeleteStudentModal'

import { Student } from '@/utils/interfaces/student'

interface StudentsTableProps {
  students: Student[]
  activePathname: string
  categoryCard: {
    value: string
    label: string
    schoolId: string
  }[]
  schools: {
    value: string
    label: string
  }[]
}

export function StudentsTable({
  students,
  activePathname,
  schools,
  categoryCard,
}: StudentsTableProps) {
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
            <TableHead>Escola</TableHead>
            <TableHead>Aulas de código</TableHead>
            <TableHead>Aulas de condução</TableHead>
            {hasEditStudentModal && <TableHead>Editar</TableHead>}
            <TableHead>Apagar</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {students.map((student) => {
            const completedLessons = student.scheduledClass?.filter(
              (scheduledClass) =>
                scheduledClass.status === 'COMPLETED' ||
                scheduledClass.status === 'CONFIRMED',
            )
            const completedCodeLessons =
              completedLessons?.filter(
                (lesson) => lesson.class.category === 'THEORETICAL',
              ).length || 0
            const completedPracticalLessons =
              completedLessons?.filter(
                (lesson) => lesson.class.category === 'PRACTICAL',
              ).length || 0

            return (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.number}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.enrolledAt}</TableCell>
                <TableCell>{student.school.name}</TableCell>
                <TableCell align="center">{completedCodeLessons}</TableCell>
                <TableCell align="center">
                  {completedPracticalLessons}
                </TableCell>
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
              </TableRow>
            )
          })}
        </TableBody>
      </TableComponent>
    </div>
  )
}
