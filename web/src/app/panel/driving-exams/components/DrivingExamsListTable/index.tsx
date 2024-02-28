import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EditDrivingExamModal } from './EditDrivingExamModal'
import { DeleteDrivingExamModal } from './DeleteDrivingExamModal'
import { StudentInfoModal } from '@/components/StudentInfoModal'

import { Test } from '@/utils/interfaces/tests'

interface DrivingExamsListTableProps {
  tests: Test[]
}

export function DrivingExamsListTable({ tests }: DrivingExamsListTableProps) {
  return (
    <div className="relative overflow-x-auto">
      <TableComponent>
        <TableHeader>
          <TableRow>
            <TableHead>Status do exame</TableHead>
            <TableHead>Data do exame</TableHead>
            <TableHead>Nome do aluno</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead>Escola</TableHead>
            <TableHead>Instrutor</TableHead>
            <TableHead>Editar</TableHead>
            <TableHead>Apagar</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tests.map((test) => (
            <TableRow key={test.id}>
              <TableCell>
                {test.status === 'APPROVED'
                  ? 'APROVADO'
                  : test.status === 'DISAPPROVED'
                    ? 'REPROVADO'
                    : 'MARCADO'}
              </TableCell>
              <TableCell>
                {test.testDate} {test.testHour}
              </TableCell>
              <TableCell>{test.student.name}</TableCell>
              <TableCell>
                <StudentInfoModal student={test.student} />
              </TableCell>
              <TableCell>{test.student.school.name}</TableCell>
              <TableCell>{test?.instructor?.name ?? 'Não informado'}</TableCell>
              <TableCell>
                <EditDrivingExamModal test={test} />
              </TableCell>
              <TableCell>
                <DeleteDrivingExamModal test={test} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableComponent>
    </div>
  )
}
