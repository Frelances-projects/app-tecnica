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

import { deleteCodeLesson } from './action'

import { Class } from '@/utils/interfaces/class'

interface DeleteCodeLessonProps {
  lesson: Class
  trigger?: boolean
}

export function DeleteCodeLesson({ lesson, trigger }: DeleteCodeLessonProps) {
  const { toast } = useToast()

  async function handleDeleteCodeLesson() {
    const { message } = await deleteCodeLesson(lesson.id)

    if (message === 'Success!') {
      toast({
        title: 'Aula de código deletada!',
        description: 'A aula de código foi deletada com sucesso!',
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
      {trigger ? (
        <AlertDialogTrigger className="w-full rounded-lg border px-4 py-2 transition-colors duration-200 ease-linear hover:bg-[#E86255] hover:text-white">
          Deletar Aula
        </AlertDialogTrigger>
      ) : (
        <AlertDialogTrigger>
          <Trash
            size={16}
            className="hover:cursor-pointer hover:text-red-500"
          />
        </AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente a
            aula de código <span className="font-bold">{lesson.name}</span>
            {` `}
            com o código <span className="font-bold">{lesson.code}</span> e
            removerá seus dados de nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteCodeLesson()}
            className="bg-[#E3000F] transition-colors duration-300 enabled:hover:bg-[#E3000F]/80 disabled:cursor-not-allowed disabled:bg-[#E3000F]/60"
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
