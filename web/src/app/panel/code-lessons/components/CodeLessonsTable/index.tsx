import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DeleteCodeLesson } from './DeleteCodeLesson'

import { Class } from '@/utils/interfaces/class'

interface CodeLessonsTableProps {
  classes: Class[]
}

export function CodeLessonsTable({ classes }: CodeLessonsTableProps) {
  return (
    <div className="relative overflow-x-auto">
      <TableComponent>
        <TableHeader>
          <TableRow>
            <TableHead>Código da aula</TableHead>
            <TableHead>Título da aula</TableHead>
            <TableHead>Descrição da aula</TableHead>
            <TableHead>Apagar</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {classes.map((lesson) => (
            <TableRow key={lesson.id}>
              <TableCell>{lesson.code}</TableCell>
              <TableCell>{lesson.name}</TableCell>
              <TableCell>{lesson.description}</TableCell>
              <TableCell>
                <DeleteCodeLesson lesson={lesson} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableComponent>
    </div>
  )
}
