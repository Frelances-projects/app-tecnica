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

import { Class } from "@/utils/interfaces/class"
import { errorMessages } from "@/utils/errors/errorMessages"

interface DeleteCodeLessonProps {
  lesson: Class
}

export function DeleteCodeLesson({ lesson }: DeleteCodeLessonProps) {
  const { toast } = useToast()
  
  async function handleDeleteCodeLesson() {
    try {
      await api.delete(`/class/${lesson.id}`)

      toast({
        title: 'Aula de código deletada!',
        description: 'A aula de código foi deletada com sucesso!'
      })
      location.reload()
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          if (error.response?.data.message === errorMessages.classNotFound) {
            return toast({
              title: 'Aula de código não encontrado!',
              description: 'Parece que essa aula de código já foi deletada!',
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
            Essa ação não pode ser desfeita. Isso excluirá permanentemente a aula de código <span className="font-bold">{lesson.name}</span>{` `}
            com o código <span className="font-bold">{lesson.code}</span> e removerá seus dados de nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteCodeLesson()}
            className="bg-[#E3000F] enabled:hover:bg-[#E3000F]/80 disabled:bg-[#E3000F]/60 disabled:cursor-not-allowed transition-colors duration-300"
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}