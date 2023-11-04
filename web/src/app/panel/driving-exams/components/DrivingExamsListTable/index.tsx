import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EditDrivingExamModal } from "./EditDrivingExamModal";
import { DeleteDrivingExamModal } from "./DeleteDrivingExamModal";

import { Test } from "@/utils/interfaces/tests";

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
            <TableHead>Escola de registro</TableHead>
            <TableHead>Editar</TableHead>
            <TableHead>Deletar</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tests.map(test => (
            <TableRow key={test.id}>
              <TableCell>{test.status}</TableCell>
              <TableCell>{test.testDate} {test.testHour}</TableCell>
              <TableCell>{test.student.name}</TableCell>
              <TableCell>{test.student.school.name}</TableCell>
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