import { AxiosError } from 'axios'
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

import { api } from '@/lib/api'

import { Test } from '@/utils/interfaces/tests'
import { errorMessages } from '@/utils/errors/errorMessages'

interface DeleteCodeExamModalProps {
  test: Test
}

export function DeleteCodeExamModal({ test }: DeleteCodeExamModalProps) {
  const { toast } = useToast()

  async function handleDeleteCodeExam() {
    try {
      await api.delete(`/test/${test.id}`)

      toast({
        title: 'Exame de código deletado!',
        description: 'O exame de código foi deletado com sucesso',
      })
      location.reload()
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          if (error.response?.data.message === errorMessages.testNotFound) {
            return toast({
              title: 'Exame de código não encontrado!',
              description: 'Parece que esse exame de código já foi deletado!',
              variant: 'destructive',
            })
          }
        } else {
          return toast({
            title: 'Erro!',
            description:
              'Ocorreu um erro no servidor! Por favor tente novamente mais tarde',
            variant: 'destructive',
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
