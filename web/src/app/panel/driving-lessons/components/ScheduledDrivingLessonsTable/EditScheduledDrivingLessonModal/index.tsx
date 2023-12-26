import { Pencil } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { EditScheduledClassForm } from './EditScheduledClassForm'

import { ScheduleClass } from '@/utils/interfaces/schedule-class'

interface EditScheduledDrivingLessonModalProps {
  scheduledClass: ScheduleClass
}

export function EditScheduledDrivingLessonModal({
  scheduledClass,
}: EditScheduledDrivingLessonModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Pencil size={16} className="hover:cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full max-w-xl overflow-y-auto">
        <h1 className="text-lg font-bold">
          Editar marcação da aula de condução para o aluno:{' '}
          {scheduledClass.student.name}
        </h1>

        <EditScheduledClassForm scheduledClass={scheduledClass}>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              className="bg-[#E3000F] transition-colors duration-300 enabled:hover:bg-[#E3000F]/80 disabled:cursor-not-allowed disabled:bg-[#E3000F]/60"
            >
              Editar
            </AlertDialogAction>
          </AlertDialogFooter>
        </EditScheduledClassForm>
      </AlertDialogContent>
    </AlertDialog>
  )
}
