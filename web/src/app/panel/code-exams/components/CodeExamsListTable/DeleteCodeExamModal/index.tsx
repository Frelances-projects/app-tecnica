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

import { deleteCodeExam } from './action'

import { Test } from '@/utils/interfaces/tests'

interface DeleteCodeExamModalProps {
  test: Test
  trigger?: boolean
}

export function DeleteCodeExamModal({
  test,
  trigger,
}: DeleteCodeExamModalProps) {
  const { toast } = useToast()

  async function handleDeleteCodeExam() {
    const { message } = await deleteCodeExam(test.id)

    if (message === 'Success!') {
      toast({
        title: 'Exame de código deletado!',
        description: 'O exame de código foi deletado com sucesso',
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
          Deletar exame
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
            Essa ação não pode ser desfeita. Isso excluirá permanentemente o
            exame de código do aluno
            <span className="font-bold">{test.student.name}</span>
            {` `}
            da escola{' '}
            <span className="font-bold">{test.student.school.name}</span> e
            removerá seus dados de nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteCodeExam()}
            className="bg-[#E3000F] transition-colors duration-300 enabled:hover:bg-[#E3000F]/80 disabled:cursor-not-allowed disabled:bg-[#E3000F]/60"
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
