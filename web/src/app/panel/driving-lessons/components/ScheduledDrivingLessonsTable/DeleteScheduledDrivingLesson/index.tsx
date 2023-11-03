import { AxiosError } from "axios"
import { Trash } from "lucide-react"

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
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"

import { api } from "@/lib/api"

import { ScheduleClass } from "@/utils/interfaces/schedule-class"
import { errorMessages } from "@/utils/errors/errorMessages"

interface DeleteScheduledDrivingLessonProps {
  scheduledClass: ScheduleClass
}

export function DeleteScheduledDrivingLesson({ scheduledClass }: DeleteScheduledDrivingLessonProps) {
  const { toast } = useToast()
  
  async function handleDeleteScheduledDrivingLesson() {
    try {
      await api.delete(`/scheduled-class/${scheduledClass.id}`)

      toast({
        title: 'Marcação da aula de condução deletada!',
        description: 'A marcação da aula de condução foi deletada com sucesso!'
      })
      location.reload()
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          if (error.response?.data.message === errorMessages.scheduledClassNotFound) {
            return toast({
              title: 'Marcação da aula de condução não encontrado!',
              description: 'Parece que essa marcação já foi deletada!',
              variant: 'destructive'
            })
          }
        } else {
          return toast({
            title: 'Erro!',
            description: 'Ocorreu um erro no servidor! Por favor tente novamente mais tarde',
            variant: 'destructive'
          })
        }
      }
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
            Essa ação não pode ser desfeita. Isso excluirá permanentemente a aula de condução <span className="font-bold">{scheduledClass.class.name}</span>{` `}
            do aluno <span className="font-bold">{scheduledClass.student.name}</span> e removerá seus dados de nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteScheduledDrivingLesson()}
            className="bg-[#E3000F] enabled:hover:bg-[#E3000F]/80 disabled:bg-[#E3000F]/60 disabled:cursor-not-allowed transition-colors duration-300"
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}