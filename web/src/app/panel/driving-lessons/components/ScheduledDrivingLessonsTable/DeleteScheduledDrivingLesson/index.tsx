import { Trash } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/components/ui/use-toast'

import { ScheduleClass } from '@/utils/interfaces/schedule-class'
import { deleteScheduledDrivingLesson } from './action'

interface DeleteScheduledDrivingLessonProps {
  scheduledClass: ScheduleClass
}

export function DeleteScheduledDrivingLesson({
  scheduledClass,
}: DeleteScheduledDrivingLessonProps) {
  const { toast } = useToast()

  async function handleDeleteScheduledDrivingLesson() {
    const { message } = await deleteScheduledDrivingLesson(scheduledClass.id)

    if (message === 'Success!') {
      toast({
        title: 'Marcação da aula de condução deletada!',
        description: 'A marcação da aula de condução foi deletada com sucesso!',
      })
    } else {
      toast({
        title: 'Erro!',
        description: message,
        variant: 'destructive',
      })
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash size={16} className="hover:cursor-pointer hover:text-red-500" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente a
            aula de condução{' '}
            <span className="font-bold">{scheduledClass.class.name}</span>
            {` `}
            do aluno{' '}
            <span className="font-bold">{scheduledClass.student.name}</span> e
            removerá seus dados de nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteScheduledDrivingLesson()}
            className="bg-[#E3000F] transition-colors duration-300 enabled:hover:bg-[#E3000F]/80 disabled:cursor-not-allowed disabled:bg-[#E3000F]/60"
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
