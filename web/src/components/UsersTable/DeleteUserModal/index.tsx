'use client'
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

import { deleteUser } from './action'

import type { User } from '@/utils/interfaces/user'

interface DeleteUserModalProps {
  user: User
  trigger?: boolean
}

export function DeleteUserModal({ user, trigger }: DeleteUserModalProps) {
  const { toast } = useToast()

  async function handleDeleteUser() {
    const { message } = await deleteUser(user.id)

    if (message === 'Success!') {
      toast({
        title: 'Utilizador deletado!',
        description: 'Utilizador deletado com sucesso!',
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
        <AlertDialogTrigger className="rounded-lg border py-2 transition-colors duration-200 ease-linear hover:bg-[#E86255] hover:text-white">
          Deletar Utilizador
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
            utilizador <span className="font-bold">{user.name}</span>
            {` `}e removerá seus dados de nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteUser()}
            className="bg-[#E3000F] transition-colors duration-300 enabled:hover:bg-[#E3000F]/80 disabled:cursor-not-allowed disabled:bg-[#E3000F]/60"
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
