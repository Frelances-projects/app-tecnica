import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DeleteScheduledDrivingLesson } from "./DeleteScheduledDrivingLesson";
import { EditScheduledDrivingLessonModal } from "./EditScheduledDrivingLessonModal";

import { ScheduleClass } from "@/utils/interfaces/schedule-class";

interface ScheduledDrivingLessonsTableProps {
  scheduledClasses: ScheduleClass[]
}

export function ScheduledDrivingLessonsTable({ scheduledClasses }: ScheduledDrivingLessonsTableProps) {
  return (
    <div className="relative overflow-x-auto">
      <TableComponent>
        <TableHeader>
          <TableRow>
            <TableHead>Status da aula</TableHead>
            <TableHead>Data da aula</TableHead>
            <TableHead>Título da aula</TableHead>
            <TableHead>Nome do aluno</TableHead>
            <TableHead>Escola</TableHead>
            <TableHead>Editar</TableHead>
            <TableHead>Apagar</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {scheduledClasses.map(scheduledClass => (
            <TableRow key={scheduledClass.id}>
              <TableCell>{scheduledClass.status === 'COMPLETED' ? 'COMPLETADA' : scheduledClass.status === 'CONFIRMED' ? 'CONFIRMADA' : scheduledClass.status === 'CANCELED' ? 'CANCELADA' :  scheduledClass.status === 'PENDING' ? 'PENDENTE' : 'DESMARCADA'}</TableCell>
              <TableCell>{scheduledClass.schedulingDate} {scheduledClass.schedulingHour}</TableCell>
              <TableCell>{scheduledClass.class.name}</TableCell>
              <TableCell>{scheduledClass.student.name}</TableCell>
              <TableCell>{scheduledClass.student.school.name}</TableCell>
              <TableCell>
                <EditScheduledDrivingLessonModal scheduledClass={scheduledClass} />
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