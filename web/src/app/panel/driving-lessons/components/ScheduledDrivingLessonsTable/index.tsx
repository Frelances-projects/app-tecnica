import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DeleteScheduledDrivingLesson } from './DeleteScheduledDrivingLesson'
import { EditScheduledDrivingLessonModal } from './EditScheduledDrivingLessonModal'
import { StudentInfoModal } from '@/components/StudentInfoModal'

import { ScheduleClass } from '@/utils/interfaces/schedule-class'

interface ScheduledDrivingLessonsTableProps {
  scheduledClasses: ScheduleClass[]
}

export function ScheduledDrivingLessonsTable({
  scheduledClasses,
}: ScheduledDrivingLessonsTableProps) {
  return (
    <div className="relative overflow-x-auto">
      <TableComponent>
        <TableHeader>
          <TableRow>
            <TableHead>Status da aula</TableHead>
            <TableHead>Data da aula</TableHead>
            <TableHead>Título da aula</TableHead>
            <TableHead>Info aluno</TableHead>
            <TableHead>Veículo</TableHead>
            <TableHead>Escola</TableHead>
            <TableHead>Instrutor</TableHead>
            <TableHead>Justificação</TableHead>
            <TableHead>Editar</TableHead>
            <TableHead>Apagar</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {scheduledClasses.map((scheduledClass) => (
            <TableRow key={scheduledClass.id}>
              <TableCell>
                {scheduledClass.status === 'COMPLETED'
                  ? 'COMPLETADA'
                  : scheduledClass.status === 'CONFIRMED'
                    ? 'CONFIRMADA'
                    : scheduledClass.status === 'CANCELED'
                      ? 'CANCELADA'
                      : scheduledClass.status === 'PENDING'
                        ? 'PENDENTE'
                        : scheduledClass.status === 'MISSED'
                          ? 'FALTOU'
                          : 'DESMARCADA'}
              </TableCell>
              <TableCell>
                {scheduledClass.schedulingDate} {scheduledClass.schedulingHour}
              </TableCell>
              <TableCell>{scheduledClass.class.name}</TableCell>
              <TableCell>
                <StudentInfoModal student={scheduledClass.student} />
              </TableCell>
              <TableCell>{scheduledClass.vehicle ?? 'Não informado'}</TableCell>
              <TableCell>{scheduledClass.student.school.name}</TableCell>
              <TableCell>
                {scheduledClass?.instructor?.name ?? 'Não informado'}
              </TableCell>
              <TableCell>
                {scheduledClass?.justification ?? 'Não informado'}
              </TableCell>
              <TableCell>
                <EditScheduledDrivingLessonModal
                  scheduledClass={scheduledClass}
                />
              </TableCell>
              <TableCell>
                <DeleteScheduledDrivingLesson scheduledClass={scheduledClass} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableComponent>
    </div>
  )
}
