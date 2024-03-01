import { Contact } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import type { Student } from '@/utils/interfaces/student'

interface StudentInfoModalProps {
  student: Student
}

export function StudentInfoModal({ student }: StudentInfoModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Contact
          size={20}
          className="hover:cursor-pointer hover:text-green-600"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium">
            Informações de contato do aluno: <strong>{student.name}</strong>
          </AlertDialogTitle>

          <div className="flex flex-col items-start gap-y-3">
            <div className="mt-4 flex gap-x-4">
              <span className="text-lg">E-mail:</span>
              <strong className="text-lg">{student.email}</strong>
            </div>

            <div className="flex gap-x-4">
              <span className="text-lg">Telefone:</span>
              <strong className="text-lg">
                {student.phone || 'Nenhum Telefone cadastrado'}
              </strong>
            </div>

            <div className="flex gap-x-4">
              <span className="text-lg">ID Escola:</span>
              <strong className="text-lg">
                {student.imtId || 'Não informado'}
              </strong>
            </div>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="bg-[#E3000F] text-white transition-colors duration-300 hover:text-white enabled:hover:bg-[#E3000F]/80 disabled:cursor-not-allowed disabled:bg-[#E3000F]/60">
            Ok
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
