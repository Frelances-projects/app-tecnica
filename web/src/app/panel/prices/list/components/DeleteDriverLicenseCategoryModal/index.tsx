'use client'
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

import { deleteDriverLicenseCategory } from "./action"

interface DeleteDriverLicenseCategoryModalProps {
  id: string
  title: string
}

export function DeleteDriverLicenseCategoryModal({ id, title }: DeleteDriverLicenseCategoryModalProps) {
  const { toast } = useToast()
  
  async function handleDeleteDriverLicenseCategory() {
    const { message } = await deleteDriverLicenseCategory(id)

    if (message === 'Success!') {
      toast({
        title: 'Informação deletada!',
        description: 'Informação deletada com sucesso!',
      })
    } else {
      toast({
        title: 'Erro!',
        description: message,
        variant: 'destructive'
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
            Essa ação não pode ser desfeita. Isso excluirá permanentemente a categoria <span className="font-bold">{title}</span>{` `}
            e removerá seus dados de nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteDriverLicenseCategory()}
            className="bg-[#E3000F] enabled:hover:bg-[#E3000F]/80 disabled:bg-[#E3000F]/60 disabled:cursor-not-allowed transition-colors duration-300"
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}