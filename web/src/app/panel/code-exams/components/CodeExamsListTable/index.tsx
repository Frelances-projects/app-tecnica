import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DeleteCodeExamModal } from "./DeleteCodeExamModal";
import { EditCodeExamModal } from "./EditCodeExamModal";

import { Test } from "@/utils/interfaces/tests";

interface CodeExamsListTableProps {
  tests: Test[]
}

export function CodeExamsListTable({ tests }: CodeExamsListTableProps) {
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
                <EditCodeExamModal test={test} />
              </TableCell>
              <TableCell>
                <DeleteCodeExamModal test={test} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableComponent>
    </div>
  )
}