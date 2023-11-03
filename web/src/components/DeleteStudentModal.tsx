'use client'
import { Trash } from "lucide-react"
import { AxiosError } from "axios";
import { api } from "@/lib/api";

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
import { useToast } from "./ui/use-toast"

import { errorMessages } from "@/utils/errors/errorMessages";

interface DeleteStudentModalProps {
  id: string
  title?: string
}

export function DeleteStudentModal({ id, title }: DeleteStudentModalProps) {
  const { toast } = useToast()

  async function handleDeleteStudent() {
    try {
      await api.delete(`/student/${id}`)

      toast({
        title: 'Estudante Deletado!',
        description: 'Estudante deletado com sucesso!',
      })
      location.reload()
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          if (error.response?.data.message === errorMessages.studentNotFound) {
            return toast({
              title: 'Estudante não encontrado!',
              description: 'Parece que esse estudante já foi deletado, por favor atualize a página',
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
      } else {
        toast({
          title: 'Erro!',
          description: 'Ocorreu um erro no servidor! Por favor tente novamente mais tarde',
          variant: 'destructive'
        })
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
            Essa ação não pode ser desfeita. Isso excluirá permanentemente o aluno <span className="font-bold">{title}</span>{` `}
            e removerá seus dados de nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteStudent()} className="bg-[#E3000F] enabled:hover:bg-[#E3000F]/80 disabled:bg-[#E3000F]/60 disabled:cursor-not-allowed transition-colors duration-300">Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}