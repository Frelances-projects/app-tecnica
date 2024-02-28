import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { StudentInfoModal } from '@/components/StudentInfoModal'

import type { ScheduleClass } from '@/utils/interfaces/schedule-class'
import type { Test } from '@/utils/interfaces/tests'

interface InstructorsScheduleTableProps {
  data: (Test | ScheduleClass)[]
}

export function InstructorsScheduleTable({
  data,
}: InstructorsScheduleTableProps) {
  return (
    <div className="relative overflow-x-auto">
      <TableComponent>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Nome do aluno</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead>Escola</TableHead>
            <TableHead>Instrutor</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => {
            if (item.slug === 'scheduled-class') {
              const scheduledClass = item as ScheduleClass

              return (
                <TableRow key={item.id}>
                  <TableCell>
                    {scheduledClass.schedulingDate}{' '}
                    {scheduledClass.schedulingHour}
                  </TableCell>
                  <TableCell>Aula condução</TableCell>
                  <TableCell>{scheduledClass.student.name}</TableCell>
                  <TableCell>
                    <StudentInfoModal student={scheduledClass.student} />
                  </TableCell>
                  <TableCell>{scheduledClass.student.school.name}</TableCell>
                  <TableCell>
                    {scheduledClass.instructor
                      ? scheduledClass.instructor.name
                      : 'Não informado'}
                  </TableCell>
                </TableRow>
              )
            } else {
              const test = item as Test

              return (
                <TableRow key={item.id}>
                  <TableCell>
                    {test.testDate} {test.testHour}
                  </TableCell>
                  <TableCell>
                    {test.category === 'THEORETICAL'
                      ? 'Teste Teórico'
                      : 'Teste Prático'}
                  </TableCell>
                  <TableCell>{test.student.name}</TableCell>
                  <TableCell>
                    <StudentInfoModal student={test.student} />
                  </TableCell>
                  <TableCell>{test.student.school.name}</TableCell>
                  <TableCell>
                    {test.instructor ? test.instructor.name : 'Não informado'}
                  </TableCell>
                </TableRow>
              )
            }
          })}
        </TableBody>
      </TableComponent>
    </div>
  )
}
